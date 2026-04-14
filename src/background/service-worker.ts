import { DEFAULT_SETTINGS } from "../lib/storage";

const LOG = "[Hypixel Base]";

chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  const merged = { ...DEFAULT_SETTINGS, ...existing };
  await chrome.storage.sync.set(merged);
  console.log(`${LOG} settings initialized`);
});
