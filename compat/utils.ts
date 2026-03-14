import compatJson from "./compat.json";

export type Platform = "android" | "ios";
export type StatusValue = "y" | "n" | "p" | "u" | "experimental";

export interface CompatRow {
  appId: string;
  appName: string;
  testedDate: string;
  support: Record<string, StatusValue>;
  notes: Record<string, string | string[]>;
  engine?: { type: string };
}

// Sort weight: lower = better
export const STATUS_SORT_ORDER: Record<string, number> = {
  y: 0,
  p: 1,
  experimental: 2,
  n: 3,
  u: 4,
};

export const STATUS_ICON: Record<string, string> = {
  y: "✅",
  n: "❌",
  p: "🟡",
  u: "-",
  experimental: "🧪",
};

/** Resolve one or more noteIds into a human-readable string */
export function resolveNotes(
  noteIds: string | string[] | undefined,
  noteDefinitions: Record<string, string>,
): string {
  if (!noteIds) return "";
  const ids = Array.isArray(noteIds) ? noteIds : [noteIds];
  return ids.map((id) => noteDefinitions[id] ?? id).join(" ");
}

/** Features visible for a given platform */
export function getFeaturesForPlatform(platform: Platform) {
  return Object.entries(compatJson.features)
    .filter(([, feature]) => {
      const platforms = (feature as any).platforms as string[] | undefined;
      return !platforms || platforms.includes(platform);
    })
    .map(([id, feature]) => ({ id, ...(feature as any) })) as Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    platforms?: string[];
  }>;
}

/** Flatten compat.json apps into rows for the given platform */
export function getCompatRows(platform: Platform): CompatRow[] {
  const rows: CompatRow[] = [];

  for (const [appId, appData] of Object.entries(compatJson.apps)) {
    const platformData = (appData as any).platforms?.[platform];
    if (!platformData) continue;

    const latestId: string = platformData.latest ?? "1";
    const versionData = platformData.versions?.[latestId];
    if (!versionData) continue;

    rows.push({
      appId,
      appName: (appData as any).name,
      testedDate: versionData.testedDate ?? "",
      support: versionData.support ?? {},
      notes: versionData.notes ?? {},
      engine: versionData.engine,
    });
  }

  return rows;
}

export interface PlatformData {
  support: Record<string, StatusValue>;
  notes: Record<string, string | string[]>;
  testedDate: string;
}

export interface CombinedCompatRow {
  appId: string;
  appName: string;
  android: PlatformData | null;
  ios: PlatformData | null;
}

function getPlatformData(
  appData: any,
  platform: Platform,
): PlatformData | null {
  const platformData = appData.platforms?.[platform];
  if (!platformData) return null;
  const latestId: string = platformData.latest ?? "1";
  const versionData = platformData.versions?.[latestId];
  if (!versionData) return null;
  return {
    support: versionData.support ?? {},
    notes: versionData.notes ?? {},
    testedDate: versionData.testedDate ?? "",
  };
}

/** Flatten both platforms into one row per app */
export function getCombinedCompatRows(): CombinedCompatRow[] {
  return Object.entries(compatJson.apps).map(([appId, appData]) => ({
    appId,
    appName: (appData as any).name,
    android: getPlatformData(appData as any, "android"),
    ios: getPlatformData(appData as any, "ios"),
  }));
}

/** All features keyed by platform */
export function getAllFeaturesByPlatform() {
  return {
    android: getFeaturesForPlatform("android"),
    ios: getFeaturesForPlatform("ios"),
  };
}
