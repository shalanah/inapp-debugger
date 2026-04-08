import type {
  CompatibilityData,
  CompatibilityQuery,
  CompatibilityResult,
  FeatureCategory,
  Platform,
  Feature,
  SupportStatus,
  EscapeMethod,
} from "./types";

export class CompatibilityDatabase {
  private data: CompatibilityData;

  constructor(data: CompatibilityData) {
    this.data = data;
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /**
   * Returns the latest version key for an app on a platform.
   *
   * Prefers the explicit `latest` pointer on the platform object.
   * Falls back to date-sorting versions for data that predates the pointer
   * (backwards compatibility during migration).
   */
  private getLatestVersionId(appId: string, platform: Platform): string | null {
    const platformData = this.data.apps[appId]?.platforms[platform];
    if (!platformData) return null;

    // Prefer the explicit pointer — O(1) and author-controlled
    if (platformData.latest) return platformData.latest;

    // Fallback: pick highest testedDate (for pre-migration data)
    let latestVersion: string | null = null;
    let latestDate = "";
    for (const [versionId, versionData] of Object.entries(platformData.versions)) {
      if (versionData.testedDate > latestDate) {
        latestDate = versionData.testedDate;
        latestVersion = versionId;
      }
    }
    return latestVersion;
  }

  /**
   * Resolves note IDs (or arrays of IDs) to their full text from noteDefinitions.
   * Falls back to the raw string if the ID isn't found (graceful degradation).
   */
  private resolveNotes(notes: string | string[] | undefined): string | undefined {
    if (!notes) return undefined;

    const resolve = (id: string) => this.data.noteDefinitions[id] ?? id;

    if (Array.isArray(notes)) {
      return notes.map(resolve).join(" ");
    }
    return resolve(notes);
  }

  /**
   * Strips legacy compound status values (e.g. "n-browser", "n-silent")
   * back to their clean base status. Provides tolerance for data that hasn't
   * been fully migrated to the new schema yet.
   */
  private normalizeStatus(raw: string): SupportStatus {
    const valid: SupportStatus[] = ["y", "n", "p", "u", "experimental"];
    if (valid.includes(raw as SupportStatus)) return raw as SupportStatus;

    // Legacy compound format: "n-browser", "n-silent", "n-sfsvc", "n-note"
    const base = raw.split("-")[0] as SupportStatus;
    if (valid.includes(base)) return base;

    return "u";
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /**
   * Get support data for a specific app / platform / feature combination.
   *
   * When `version` is omitted (the common case), resolves via the platform's
   * `latest` pointer so callers never need to know the current version key.
   */
  getSupport(query: CompatibilityQuery): CompatibilityResult | null {
    const { app, platform, feature } = query;

    const platformData = this.data.apps[app]?.platforms[platform];
    if (!platformData) return null;

    const versionId = query.version ?? this.getLatestVersionId(app, platform);
    if (!versionId) return null;

    const versionData = platformData.versions[versionId];
    if (!versionData) return null;

    const rawStatus = versionData.support[feature];
    if (rawStatus === undefined) return null;

    const status = this.normalizeStatus(rawStatus);
    const statusInfo = this.data.statuses[status];
    const resolvedNotes = this.resolveNotes(versionData.notes?.[feature]);

    return {
      supported: status === "y",
      status,
      statusInfo,
      testedDate: versionData.testedDate,
      appVersion: versionData.appVersion,
      osVersion: versionData.osVersion,
      engine: versionData.engine,
      notes: resolvedNotes,
    };
  }

  /**
   * Get all app IDs that fully support a feature on a platform.
   */
  getAppsByFeature(feature: Feature, platform: Platform): string[] {
    return Object.entries(this.data.apps)
      .filter(([appId, appData]) => {
        if (!appData.platforms[platform]) return false;
        const versionId = this.getLatestVersionId(appId, platform);
        if (!versionId) return false;
        const raw = appData.platforms[platform].versions[versionId]?.support[feature];
        return this.normalizeStatus(raw ?? "u") === "y";
      })
      .map(([appId]) => appId);
  }

  /**
   * Get a complete support matrix for a platform, keyed by app ID then feature.
   * Status values are normalized (clean SupportStatus, no compound strings).
   */
  getSupportMatrix(platform: Platform): Record<string, Record<Feature, SupportStatus>> {
    const matrix: Record<string, Record<Feature, SupportStatus>> = {};

    for (const [appId, appData] of Object.entries(this.data.apps)) {
      const platformData = appData.platforms[platform];
      if (!platformData) continue;

      const versionId = this.getLatestVersionId(appId, platform);
      if (!versionId) continue;

      const versionData = platformData.versions[versionId];
      if (!versionData) continue;

      const normalized = Object.fromEntries(
        Object.entries(versionData.support).map(([f, s]) => [
          f,
          this.normalizeStatus(s),
        ])
      ) as Record<Feature, SupportStatus>;

      matrix[appId] = normalized;
    }

    return matrix;
  }

  /**
   * Get the most recent `testedDate` across all apps on a platform.
   */
  getLatestTestDate(platform: Platform): string {
    let latestDate = "";

    for (const [appId, appData] of Object.entries(this.data.apps)) {
      if (!appData.platforms[platform]) continue;
      const versionId = this.getLatestVersionId(appId, platform);
      if (!versionId) continue;
      const testDate = appData.platforms[platform].versions[versionId]?.testedDate;
      if (testDate && testDate > latestDate) latestDate = testDate;
    }

    return latestDate;
  }

  /**
   * Get all configured escape methods for a platform.
   */
  getEscapeMethods(platform: Platform): EscapeMethod[] {
    const platformInfo = this.data.platforms[platform];
    if (!platformInfo) return [];

    const methods: EscapeMethod[] = [];
    if (platformInfo.escapeMethod) methods.push(platformInfo.escapeMethod);
    if (platformInfo.escapeMethods) methods.push(...Object.values(platformInfo.escapeMethods));
    return methods;
  }

  /**
   * Get all apps that have data for a given platform.
   */
  getAppsForPlatform(platform: Platform): Array<{ id: string; name: string }> {
    return Object.entries(this.data.apps)
      .filter(([_, appData]) => appData.platforms[platform])
      .map(([appId, appData]) => ({ id: appId, name: appData.name }));
  }

  /**
   * Get feature definition (title, description, category, platforms).
   */
  getFeature(featureId: Feature) {
    return this.data.features[featureId];
  }

  /**
   * Get status definition (title, description, symbol).
   */
  getStatus(statusId: SupportStatus) {
    return this.data.statuses[statusId];
  }

  /**
   * Get all apps that have a note for a specific feature on a platform,
   * with the note text resolved from noteDefinitions.
   */
  getAppsWithNotes(
    feature: Feature,
    platform: Platform,
  ): Array<{ app: string; note: string }> {
    const results: Array<{ app: string; note: string }> = [];

    for (const [appId, appData] of Object.entries(this.data.apps)) {
      const platformData = appData.platforms[platform];
      if (!platformData) continue;

      const versionId = this.getLatestVersionId(appId, platform);
      if (!versionId) continue;

      const noteIds = platformData.versions[versionId]?.notes?.[feature];
      if (!noteIds) continue;

      const resolved = this.resolveNotes(noteIds);
      if (resolved) results.push({ app: appId, note: resolved });
    }

    return results;
  }

  /**
   * Search apps by name or ID (case-insensitive substring match).
   */
  searchApps(query: string): Array<{ id: string; name: string; platforms: string[] }> {
    const term = query.toLowerCase();
    return Object.entries(this.data.apps)
      .filter(([appId, appData]) =>
        appData.name.toLowerCase().includes(term) || appId.includes(term)
      )
      .map(([appId, appData]) => ({
        id: appId,
        name: appData.name,
        platforms: Object.keys(appData.platforms),
      }));
  }

  /**
   * Get summary statistics about the dataset.
   */
  getStats() {
    return {
      totalApps: Object.keys(this.data.apps).length,
      androidApps: this.getAppsForPlatform("android").length,
      iosApps: this.getAppsForPlatform("ios").length,
      totalFeatures: Object.keys(this.data.features).length,
      totalNoteDefinitions: Object.keys(this.data.noteDefinitions).length,
      lastUpdated: this.data.lastUpdated,
      version: this.data.version,
    };
  }

  /**
   * Get all note definitions.
   */
  getNoteDefinitions() {
    return this.data.noteDefinitions;
  }

  /**
   * Get a single note definition by ID.
   */
  getNoteDefinition(noteId: string): string | undefined {
    return this.data.noteDefinitions[noteId];
  }

  /**
   * Export rows suitable for a display table, with optional category filtering.
   * Each row has `app`, `appId`, and one key per applicable feature.
   *
   * @param platform  - The platform to export data for.
   * @param category  - Optional category filter (e.g. "download"). Omit for all.
   */
  exportTableData(
    platform: Platform,
    category?: FeatureCategory,
  ): Array<Record<string, SupportStatus | string>> {
    const apps = this.getAppsForPlatform(platform);

    const features = Object.entries(this.data.features)
      .filter(([_, def]) => {
        const platformMatch = !def.platforms || def.platforms.includes(platform);
        const categoryMatch = !category || def.category === category;
        return platformMatch && categoryMatch;
      })
      .map(([id]) => id as Feature);

    return apps.map((app) => {
      const row: Record<string, SupportStatus | string> = {
        app: app.name,
        appId: app.id,
      };
      for (const feature of features) {
        row[feature] = this.getSupport({ app: app.id, platform, feature })?.status ?? "u";
      }
      return row;
    });
  }

  /**
   * Get all features grouped by category, optionally filtered to a platform.
   * Useful for rendering grouped column headers in the compatibility table.
   */
  getFeaturesByCategory(platform?: Platform): Record<FeatureCategory, Feature[]> {
    const grouped = {} as Record<FeatureCategory, Feature[]>;

    for (const [featureId, def] of Object.entries(this.data.features)) {
      if (platform && def.platforms && !def.platforms.includes(platform)) continue;
      const cat = def.category;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(featureId as Feature);
    }

    return grouped;
  }
}

// ---------------------------------------------------------------------------
// Factory & standalone utilities
// ---------------------------------------------------------------------------

export function createCompatibilityDatabase(data: CompatibilityData): CompatibilityDatabase {
  return new CompatibilityDatabase(data);
}

export function isSupported(
  data: CompatibilityData,
  app: string,
  platform: Platform,
  feature: Feature,
): boolean {
  return new CompatibilityDatabase(data).getSupport({ app, platform, feature })?.supported ?? false;
}

export function getStatusSymbol(
  status: SupportStatus,
  statusData: Record<string, { symbol?: string }>,
): string {
  return statusData[status]?.symbol ?? (status === "y" ? "✅" : "❌");
}
