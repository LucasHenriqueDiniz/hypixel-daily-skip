import { applyI18n, t } from "../lib/i18n";
import { getSettings, patchSettings } from "../lib/storage";
import type { Message, Settings } from "../lib/types";

const LOG = "[Hypixel Base]";

function setStatus(text: string): void {
  const status = document.getElementById("status");
  if (status) status.textContent = text;
}

async function getActiveTabId(): Promise<number | null> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.id ?? null;
}

async function notifyActiveTab(message: Message): Promise<void> {
  const tabId = await getActiveTabId();
  if (!tabId) return;

  try {
    await chrome.tabs.sendMessage(tabId, message);
  } catch {
    console.log(`${LOG} active tab without content script`);
  }
}

function bindToggle(id: keyof Pick<Settings, "enabled" | "autoSkip" | "autoHoverCards">): void {
  const input = document.getElementById(id) as HTMLInputElement | null;
  if (!input) return;

  input.addEventListener("change", async () => {
    const settings = await patchSettings({ [id]: input.checked });
    await notifyActiveTab({ type: "SETTINGS_UPDATED", settings });
    setStatus(t("settingsSaved", settings.language));
  });
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

  bindToggle("enabled");
  bindToggle("autoSkip");
  bindToggle("autoHoverCards");

  language?.addEventListener("change", async () => {
    await patchSettings({ language: language.value as Settings["language"] });
    window.location.reload();
  });

}

void render();
