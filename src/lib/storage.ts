import type { Settings } from "./types";

export const DEFAULT_SETTINGS: Settings = {
  enabled: true,
  autoSkip: true,
  autoHoverCards: true,
  language: "en",
  repoOwner: "",
  repoName: ""
};

export async function getSettings(): Promise<Settings> {
  const data = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  return {
    enabled: Boolean(data.enabled),
    autoSkip: Boolean(data.autoSkip),
    autoHoverCards: Boolean(data.autoHoverCards),
    language:
      data.language === "en" ||
      data.language === "pt_BR" ||
      data.language === "es" ||
      data.language === "fr" ||
      data.language === "de" ||
      data.language === "auto"
        ? data.language
        : "auto",
    repoOwner: String(data.repoOwner ?? "").trim(),
    repoName: String(data.repoName ?? "").trim()
  };
}

export async function saveSettings(settings: Settings): Promise<void> {
  await chrome.storage.sync.set(settings);
}

export async function patchSettings(patch: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const next: Settings = { ...current, ...patch };
  await saveSettings(next);
  return next;
}

export async function resetSettings(): Promise<Settings> {
  await saveSettings(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}
