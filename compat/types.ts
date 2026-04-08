export interface CompatibilityData {
  $schema: string;
  title: string;
  description: string;
  lastUpdated: string;
  version: string;
  platforms: {
    [platformId: string]: PlatformInfo;
  };
  features: {
    [featureId: string]: FeatureDefinition;
  };
  statuses: {
    [statusId: string]: StatusDefinition;
  };
  noteDefinitions: {
    [noteId: string]: string;
  };
  /**
   * Registry of known engine types for display and tooling.
   * `requiresName: true` means the version entry should also supply `engine.name`.
   * `versionSource` tells consumers where to find the engine version for display.
   */
  engineTypes: {
    [engineTypeId: string]: EngineTypeDefinition;
  };
  apps: {
    [appId: string]: AppData;
  };
}

export interface EngineTypeDefinition {
  title: string;
  /** If true, the version entry must also provide engine.name (e.g. custom engines) */
  requiresName?: boolean;
  /**
   * Where to source the engine version from for display purposes.
   * "osVersion"     — engine version tracks the OS version (WKWebView, SFSafariViewController)
   * "engineVersion" — engine has its own version, stored on engine.version (future use)
   * Omit if version is not tracked.
   */
  versionSource?: "osVersion" | "engineVersion";
}

export interface PlatformInfo {
  description: string;
  notes?: string[];
  escapeMethod?: EscapeMethod;
  escapeMethods?: {
    [methodId: string]: EscapeMethod;
  };
}

export interface EscapeMethod {
  name: string;
  pattern: string;
  description?: string;
}

export type FeatureCategory =
  | "browser"
  | "download"
  | "escape"
  | "storage"
  | "share"
  | "forms"
  | "other";

export interface FeatureDefinition {
  title: string;
  description: string;
  /** Which platforms this feature applies to. Omit if universal. */
  platforms?: string[];
  /** Groups features for column display in the compatibility table */
  category: FeatureCategory;
}

export interface StatusDefinition {
  title: string;
  description: string;
  symbol?: string;
}

export interface AppData {
  name: string;
  description?: string;
  platforms: {
    [platformId: string]: PlatformSupport;
  };
}

export interface PlatformSupport {
  /**
   * Points to the version key in `versions` that should be shown by default.
   * Consumers read from versions[latest] without walking all entries.
   * When adding a new test entry, increment the key and update this pointer.
   */
  latest: string;
  versions: {
    /** Integer string keys — increment per new test entry, e.g. "1", "2", "3" */
    [versionId: string]: VersionSupport;
  };
}

export interface EngineInfo {
  /** References a key in `engineTypes` */
  type: string;
  /** For custom engines where type alone is insufficient, e.g. "X5", "Blink fork" */
  name?: string;
}

export interface VersionSupport {
  testedDate: string;
  /** App version at time of testing, e.g. "38.2.1" */
  appVersion?: string;
  /** OS version at time of testing, e.g. "18.3.2" */
  osVersion?: string;
  /**
   * The WebView/browser engine running inside the app.
   * Omit if unknown or not relevant.
   */
  engine?: EngineInfo;
  support: {
    /**
     * Values must be clean SupportStatus keys only: y | n | p | u | experimental
     * Qualifiers (e.g. "opens in browser", "silent fail") belong in `notes`, not here.
     */
    [featureId: string]: SupportStatus;
  };
  /**
   * Maps feature IDs to noteDefinition keys (or arrays of keys).
   * Always a sibling of `support`, never nested inside it.
   */
  notes?: {
    [featureId: string]: string | string[];
  };
}

// ---------------------------------------------------------------------------
// Utility types
// ---------------------------------------------------------------------------

/**
 * Clean status values only. Do not extend with qualifiers like "n-browser".
 * Use the `notes` field on VersionSupport for qualifiers.
 */
export type SupportStatus = "y" | "n" | "p" | "u" | "experimental";

export type Platform = "android" | "ios";

export type Feature =
  | "default_browser"
  | "detect_inapp"
  | "blob_download"
  | "static_download"
  | "intent_escape"
  | "safari_escape"
  | "browser_escape"
  // Storage (future)
  | "local_storage"
  | "session_storage"
  | "indexeddb"
  // Share / interaction (future)
  | "web_share"
  | "clipboard_read"
  | "clipboard_write"
  // Forms (future)
  | "autofill"
  | "form_submit";

export interface CompatibilityQuery {
  app: string;
  platform: Platform;
  feature: Feature;
  /**
   * Defaults to the platform's `latest` pointer when omitted.
   * Pass an explicit integer string to query historical data, e.g. "1".
   */
  version?: string;
}

export interface CompatibilityResult {
  supported: boolean;
  status: SupportStatus;
  statusInfo: StatusDefinition;
  testedDate: string;
  appVersion?: string;
  osVersion?: string;
  engine?: EngineInfo;
  /** Resolved note text. Multiple notes are joined with a space. */
  notes?: string;
}

export interface CompatibilityAPI {
  getSupport(query: CompatibilityQuery): CompatibilityResult | null;
  getAppsByFeature(feature: Feature, platform: Platform): string[];
  getSupportMatrix(
    platform: Platform
  ): Record<string, Record<Feature, SupportStatus>>;
  getLatestTestDate(platform: Platform): string;
  getEscapeMethods(platform: Platform): EscapeMethod[];
}
