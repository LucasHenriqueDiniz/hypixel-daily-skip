# Hypixel Daily Skip

Chrome extension (Manifest V3) for the Hypixel daily reward flow.

- Auto-clicks the `Skip` button when available
- Auto-hovers reward cards to reveal results
- Simple popup toggles for each automation
- UI language selector (`en`, `pt-BR`, `es`, `fr`, `de`, `auto`)

## Demo Video

https://www.youtube.com/watch?v=THPDR4GgqZk

## Target URL

The extension runs only on:

- `https://rewards.hypixel.net/claim-reward/*`

## Quick Start

```bash
npm install
npm run typecheck
npm run build
```

## Commands

- `npm run build` -> bundles scripts to `dist/`
- `npm run prepare:local` -> creates `load-unpacked/` ready for Chrome local load
- `npm run package:zip` -> creates `release/hypixel-daily-skip-v<version>.zip` and `upload.zip`

## Install Guides

<details>
  <summary><strong>Load Locally (Developer Mode)</strong></summary>

1. Run:

```bash
npm run prepare:local
```

2. Open `chrome://extensions`
3. Enable `Developer mode`
4. Click `Load unpacked`
5. Select the `load-unpacked/` folder

</details>

<details>
  <summary><strong>Publish to Chrome Web Store</strong></summary>

1. Bump `version` in `manifest.json` (for example `1.0.1`)
2. Run:

```bash
npm run package:zip
```

3. Upload `upload.zip` to the Chrome Web Store dashboard
4. Submit for review

Chrome will auto-update users after approval and publish.

</details>

<details>
  <summary><strong>Push to GitHub</strong></summary>

```bash
git add .
git commit -m "chore: update docs and release tooling"
git push
```

</details>

## Project Structure

- `manifest.json`
- `popup.html`
- `options.html`
- `src/content/main.ts`
- `src/popup/popup.ts`
- `src/options/options.ts`
- `src/lib/*`
- `_locales/*`
- `assets/icons/*`
- `scripts/prepare-local.ps1`
- `scripts/package-release.ps1`
