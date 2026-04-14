# Hypixel Daily Skip

Extensão Chrome (Manifest V3) feita para o Daily Reward do Hypixel.

- Pula o vídeo automaticamente quando o botão `Skip` aparece
- Faz hover automático nos cards para revelar a recompensa
- Mini menu com switches para ativar/desativar cada automação
- Idioma da interface configurável (`auto`, `pt-BR`, `en`, `es`, `fr`, `de`)

## Preview rápido

- Alvo: `https://rewards.hypixel.net/claim-reward/*`
- Script só roda nessa rota
- Configuração salva em `chrome.storage.sync`

## Estrutura

- `manifest.json`
- `popup.html`
- `options.html`
- `src/content/main.ts`
- `src/popup/popup.ts`
- `src/options/options.ts`
- `src/lib/*`
- `_locales/*`
- `assets/icons/*`

## Desenvolvimento local

```bash
npm install
npm run build
```

## Testar no Chrome

1. Abra `chrome://extensions`
2. Ative `Developer mode`
3. Clique em `Load unpacked`
4. Selecione a pasta do projeto

## Publicar na Chrome Web Store

1. Aumente a versão em `manifest.json` (ex: `1.0.1`)
2. Gere build: `npm run build`
3. Faça ZIP do projeto (sem `node_modules`)
4. Envie no painel da Chrome Web Store

### Atualizações

Quando você publica uma nova versão na Store, o Chrome atualiza automaticamente para os usuários (não precisa botão de "check update" dentro da extensão).

## Git (primeiro publish)

```bash
git init
git add .
git commit -m "feat: initial hypixel daily skip extension"
git branch -M main
git remote add origin <URL_DO_REPO>
git push -u origin main
```

## Ícones

Os ícones estão em `assets/icons/`:

- `icon16.png`
- `icon32.png`
- `icon48.png`
- `icon128.png`
