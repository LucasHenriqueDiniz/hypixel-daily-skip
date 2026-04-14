export type Settings = {
  enabled: boolean;
  autoSkip: boolean;
  autoHoverCards: boolean;
  language: "auto" | "en" | "pt_BR" | "es" | "fr" | "de";
  repoOwner: string;
  repoName: string;
};

export type Message =
  | { type: "RUN_NOW" }
  | { type: "SETTINGS_UPDATED"; settings: Settings };

export type VersionCheckResult =
  | {
      ok: true;
      currentVersion: string;
      latestVersion: string;
      updateAvailable: boolean;
      releaseUrl: string;
    }
  | {
      ok: false;
      reason: "missing_repo" | "network_error" | "invalid_response";
      currentVersion: string;
    };
