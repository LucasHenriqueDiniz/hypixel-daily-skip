type UiLanguage = "auto" | "en" | "pt_BR" | "es" | "fr" | "de";

const STRINGS: Record<Exclude<UiLanguage, "auto">, Record<string, string>> = {
  en: {
    popupTitle: "Hypixel Daily Skip",
    enabled: "Enable extension",
    autoSkip: "Auto skip video",
    autoHoverCards: "Auto hover cards",
    language: "Language",
    runNow: "Run now",
    runNowSent: "Action sent to current tab.",
    settingsSaved: "Settings saved.",
    supportTitle: "Make a donation",
    supportDesc: "If this extension helps you, consider donating to keep updates coming.",
    supportButton: "Donate",
    optionsTitle: "Hypixel Daily Skip - Options",
    optionsHeader: "Settings",
    enabledDesc: "Master switch for all automations.",
    autoSkipDesc: "Clicks the Skip button when available.",
    autoHoverCardsDesc: "Hovers each card to reveal rewards.",
    languageDesc: "Popup/options display language.",
    save: "Save",
    restoreDefaults: "Restore defaults",
    defaultsRestored: "Defaults restored.",
    languageAuto: "Auto (browser)",
    languageEn: "English",
    languagePtBr: "Portuguese (BR)",
    languageEs: "Spanish",
    languageFr: "French",
    languageDe: "German"
  },
  pt_BR: {
    popupTitle: "Hypixel Daily Skip",
    enabled: "Ativar extensão",
    autoSkip: "Pular vídeo automaticamente",
    autoHoverCards: "Passar o mouse nos cards",
    language: "Idioma",
    runNow: "Executar agora",
    runNowSent: "Ação enviada para a aba atual.",
    settingsSaved: "Configurações salvas.",
    supportTitle: "Faça uma doação",
    supportDesc: "Se esta extensão te ajuda, considere doar para manter novas atualizações.",
    supportButton: "Doar",
    optionsTitle: "Hypixel Daily Skip - Opções",
    optionsHeader: "Configurações",
    enabledDesc: "Chave principal para todas as automações.",
    autoSkipDesc: "Clica no botão Skip quando ele aparecer.",
    autoHoverCardsDesc: "Passa o mouse em cada card para revelar as recompensas.",
    languageDesc: "Idioma exibido no popup e nas opções.",
    save: "Salvar",
    restoreDefaults: "Restaurar padrões",
    defaultsRestored: "Padrões restaurados.",
    languageAuto: "Automático (navegador)",
    languageEn: "Inglês",
    languagePtBr: "Português (BR)",
    languageEs: "Espanhol",
    languageFr: "Francês",
    languageDe: "Alemão"
  },
  es: {
    popupTitle: "Hypixel Daily Skip",
    enabled: "Activar extensión",
    autoSkip: "Saltar video automáticamente",
    autoHoverCards: "Auto hover en cartas",
    language: "Idioma",
    runNow: "Ejecutar ahora",
    runNowSent: "Acción enviada a la pestaña actual.",
    settingsSaved: "Configuración guardada.",
    supportTitle: "Haz una donación",
    supportDesc: "Si esta extensión te ayuda, considera donar para mantener nuevas actualizaciones.",
    supportButton: "Donar",
    optionsTitle: "Hypixel Daily Skip - Opciones",
    optionsHeader: "Configuración",
    enabledDesc: "Interruptor principal para todas las automatizaciones.",
    autoSkipDesc: "Pulsa el botón Skip cuando esté disponible.",
    autoHoverCardsDesc: "Pasa el ratón por cada carta para revelar recompensas.",
    languageDesc: "Idioma mostrado en popup y opciones.",
    save: "Guardar",
    restoreDefaults: "Restablecer",
    defaultsRestored: "Valores restablecidos.",
    languageAuto: "Auto (navegador)",
    languageEn: "Inglés",
    languagePtBr: "Portugués (BR)",
    languageEs: "Español",
    languageFr: "Francés",
    languageDe: "Alemán"
  },
  fr: {
    popupTitle: "Hypixel Daily Skip",
    enabled: "Activer l'extension",
    autoSkip: "Passer la vidéo automatiquement",
    autoHoverCards: "Survol auto des cartes",
    language: "Langue",
    runNow: "Exécuter",
    runNowSent: "Action envoyée à l'onglet actuel.",
    settingsSaved: "Paramètres enregistrés.",
    supportTitle: "Faire un don",
    supportDesc: "Si cette extension vous aide, pensez à faire un don pour continuer les mises à jour.",
    supportButton: "Faire un don",
    optionsTitle: "Hypixel Daily Skip - Options",
    optionsHeader: "Paramètres",
    enabledDesc: "Interrupteur principal pour toutes les automatisations.",
    autoSkipDesc: "Clique sur Skip lorsqu'il est disponible.",
    autoHoverCardsDesc: "Survole chaque carte pour révéler les récompenses.",
    languageDesc: "Langue affichée dans le popup et les options.",
    save: "Enregistrer",
    restoreDefaults: "Réinitialiser",
    defaultsRestored: "Paramètres réinitialisés.",
    languageAuto: "Auto (navigateur)",
    languageEn: "Anglais",
    languagePtBr: "Portugais (BR)",
    languageEs: "Espagnol",
    languageFr: "Français",
    languageDe: "Allemand"
  },
  de: {
    popupTitle: "Hypixel Daily Skip",
    enabled: "Erweiterung aktivieren",
    autoSkip: "Video automatisch überspringen",
    autoHoverCards: "Karten automatisch hovern",
    language: "Sprache",
    runNow: "Jetzt ausführen",
    runNowSent: "Aktion an aktuellen Tab gesendet.",
    settingsSaved: "Einstellungen gespeichert.",
    supportTitle: "Spende machen",
    supportDesc: "Wenn diese Erweiterung hilft, unterstütze Updates mit einer Spende.",
    supportButton: "Spenden",
    optionsTitle: "Hypixel Daily Skip - Einstellungen",
    optionsHeader: "Einstellungen",
    enabledDesc: "Hauptschalter für alle Automationen.",
    autoSkipDesc: "Klickt auf Skip, sobald verfügbar.",
    autoHoverCardsDesc: "Fährt über jede Karte, um Belohnungen aufzudecken.",
    languageDesc: "Anzeigesprache für Popup und Optionen.",
    save: "Speichern",
    restoreDefaults: "Zurücksetzen",
    defaultsRestored: "Standards wiederhergestellt.",
    languageAuto: "Auto (Browser)",
    languageEn: "Englisch",
    languagePtBr: "Portugiesisch (BR)",
    languageEs: "Spanisch",
    languageFr: "Französisch",
    languageDe: "Deutsch"
  }
};

function resolveLanguage(language: UiLanguage): Exclude<UiLanguage, "auto"> {
  if (language !== "auto") return language;
  const ui = chrome.i18n.getUILanguage().toLowerCase();
  if (ui.startsWith("pt")) return "pt_BR";
  if (ui.startsWith("es")) return "es";
  if (ui.startsWith("fr")) return "fr";
  if (ui.startsWith("de")) return "de";
  return "en";
}

export function t(key: string, language: UiLanguage = "auto"): string {
  const lang = resolveLanguage(language);
  return STRINGS[lang][key] || key;
}

export function applyI18n(root: ParentNode = document, language: UiLanguage = "auto"): void {
  const textNodes = root.querySelectorAll<HTMLElement>("[data-i18n]");
  textNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (!key) return;
    node.textContent = t(key, language);
  });

  const titleNodes = root.querySelectorAll<HTMLElement>("[data-i18n-title]");
  titleNodes.forEach((node) => {
    const key = node.dataset.i18nTitle;
    if (!key) return;
    node.title = t(key, language);
  });
}
