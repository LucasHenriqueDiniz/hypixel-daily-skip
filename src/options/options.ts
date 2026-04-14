import { applyI18n, t } from "../lib/i18n";
import { getSettings, resetSettings, saveSettings } from "../lib/storage";

function setStatus(message: string): void {
  const status = document.getElementById("status");
  if (status) status.textContent = message;
}

async function render(): Promise<void> {
  const settings = await getSettings();
  applyI18n(document, settings.language);

  const enabled = document.getElementById("enabled") as HTMLInputElement | null;
  const autoSkip = document.getElementById("autoSkip") as HTMLInputElement | null;
  const autoHoverCards = document.getElementById("autoHoverCards") as HTMLInputElement | null;
  const language = document.getElementById("language") as HTMLSelectElement | null;

  if (enabled) enabled.checked = settings.enabled;
  if (autoSkip) autoSkip.checked = settings.autoSkip;
  if (autoHoverCards) autoHoverCards.checked = settings.autoHoverCards;
  if (language) language.value = settings.language;

  const saveBtn = document.getElementById("save");
  saveBtn?.addEventListener("click", async () => {
    await saveSettings({
      enabled: Boolean(enabled?.checked),
      autoSkip: Boolean(autoSkip?.checked),
      autoHoverCards: Boolean(autoHoverCards?.checked),
      language: (language?.value as typeof settings.language) || "auto",
      repoOwner: settings.repoOwner,
      repoName: settings.repoName
    });
    setStatus(t("settingsSaved", (language?.value as typeof settings.language) || "auto"));
  });

  const resetBtn = document.getElementById("reset");
  resetBtn?.addEventListener("click", async () => {
    const defaults = await resetSettings();
    if (enabled) enabled.checked = defaults.enabled;
    if (autoSkip) autoSkip.checked = defaults.autoSkip;
    if (autoHoverCards) autoHoverCards.checked = defaults.autoHoverCards;
    if (language) language.value = defaults.language;
    applyI18n(document, defaults.language);
    setStatus(t("defaultsRestored", defaults.language));
  });
}

void render();
