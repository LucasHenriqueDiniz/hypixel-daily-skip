import { getSettings } from "./storage";
import type { VersionCheckResult } from "./types";

function normalizeVersion(raw: string): string {
  return raw.trim().replace(/^v/i, "");
}

function compareSemver(a: string, b: string): number {
  const pa = normalizeVersion(a).split(".").map((v) => Number.parseInt(v, 10) || 0);
  const pb = normalizeVersion(b).split(".").map((v) => Number.parseInt(v, 10) || 0);
  const size = Math.max(pa.length, pb.length);

  for (let i = 0; i < size; i += 1) {
    const av = pa[i] ?? 0;
    const bv = pb[i] ?? 0;
    if (av > bv) return 1;
    if (av < bv) return -1;
  }
  return 0;
}

export async function checkLatestVersion(): Promise<VersionCheckResult> {
  const currentVersion = chrome.runtime.getManifest().version;
  const settings = await getSettings();

  if (!settings.repoOwner || !settings.repoName) {
    return { ok: false, reason: "missing_repo", currentVersion };
  }

  const url = `https://api.github.com/repos/${settings.repoOwner}/${settings.repoName}/releases/latest`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" }
    });
  } catch {
    return { ok: false, reason: "network_error", currentVersion };
  }

  if (!response.ok) {
    return { ok: false, reason: "network_error", currentVersion };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return { ok: false, reason: "invalid_response", currentVersion };
  }

  if (!data || typeof data !== "object") {
    return { ok: false, reason: "invalid_response", currentVersion };
  }

  const tagName = (data as { tag_name?: unknown }).tag_name;
  const htmlUrl = (data as { html_url?: unknown }).html_url;

  if (typeof tagName !== "string" || typeof htmlUrl !== "string") {
    return { ok: false, reason: "invalid_response", currentVersion };
  }

  const latestVersion = normalizeVersion(tagName);
  const updateAvailable = compareSemver(latestVersion, currentVersion) > 0;

  return {
    ok: true,
    currentVersion,
    latestVersion,
    updateAvailable,
    releaseUrl: htmlUrl
  };
}
