import { getSettings } from "../lib/storage";
import type { Message, Settings } from "../lib/types";

const LOG = "[Hypixel Base]";

let settings: Settings;
let skipDone = false;
let hoverDone = false;
let skipAttemptCount = 0;
let hoverRunning = false;
let animationBoostApplied = false;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function isVisible(el: Element): boolean {
  const style = window.getComputedStyle(el as HTMLElement);
  return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
}

function findSkipButton(): HTMLButtonElement | null {
  const byClass = document.querySelector<HTMLButtonElement>('button[class*="skipButton"]');
  if (byClass) return byClass;

  const bySpan = Array.from(document.querySelectorAll<HTMLSpanElement>("span")).find((span) =>
    /skip/i.test((span.textContent || "").trim())
  );
  const parentButton = bySpan?.closest("button");
  if (parentButton instanceof HTMLButtonElement) return parentButton;

  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("button"));
  return buttons.find((btn) => /skip/i.test((btn.textContent || "").trim())) ?? null;
}

function triggerClick(button: HTMLButtonElement): void {
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const events: Array<"pointerdown" | "mousedown" | "pointerup" | "mouseup" | "click"> = [
    "pointerdown",
    "mousedown",
    "pointerup",
    "mouseup",
    "click"
  ];
  events.forEach((type) => {
    button.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y }));
  });
  button.click();
}

function fireHover(el: HTMLElement): void {
  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const eventTypes: Array<"pointerover" | "mouseover" | "pointerenter" | "mouseenter" | "mousemove" | "pointermove"> = [
    "pointerover",
    "mouseover",
    "pointerenter",
    "mouseenter",
    "mousemove",
    "pointermove"
  ];

  eventTypes.forEach((type) => {
    const ctor = type.startsWith("pointer") ? PointerEvent : MouseEvent;
    el.dispatchEvent(new ctor(type, { bubbles: true, cancelable: true, clientX: x, clientY: y }));
  });

  const container = el.querySelector<HTMLElement>('[class*="container___"], [class*="flipper___"], [class*="front___"], canvas');
  if (container) {
    eventTypes.forEach((type) => {
      const ctor = type.startsWith("pointer") ? PointerEvent : MouseEvent;
      container.dispatchEvent(new ctor(type, { bubbles: true, cancelable: true, clientX: x, clientY: y }));
    });
  }
}

async function hoverUntilFlipped(el: HTMLElement, card: HTMLElement, maxWaitMs: number): Promise<void> {
  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  fireHover(el);

  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    if (card.className.includes("cardFlipped")) return;
    el.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, clientX: x, clientY: y }));
    el.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, cancelable: true, clientX: x, clientY: y }));
    await sleep(60);
  }
}

function getCards(): HTMLElement[] {
  const shownContainer = document.querySelector<HTMLElement>('[class*="cardsShown"]');
  if (shownContainer) {
    const cards = Array.from(shownContainer.querySelectorAll<HTMLElement>('[class*="card___"], [class*="cardCommon___"], [class*="cardRare___"], [class*="cardEpic___"], [class*="cardLegendary___"]'));
    if (cards.length > 0) return cards;
  }

  return Array.from(
    document.querySelectorAll<HTMLElement>(
      '[class*="card___"], [class*="cardCommon___"], [class*="cardRare___"], [class*="cardEpic___"], [class*="cardLegendary___"]'
    )
  ).filter(isVisible);
}

function getUnflippedCards(): HTMLElement[] {
  return getCards().filter((card) => !card.className.includes("cardFlipped"));
}

function applyAnimationBoost(): void {
  if (animationBoostApplied) return;
  const style = document.createElement("style");
  style.id = "hypixel-auto-speedup";
  style.textContent = `
    [class*="index__chest"],
    [class*="index__cards"],
    [class*="index__card"],
    [class*="index__flipper"],
    [class*="index__glow"],
    [class*="index__container"] {
      animation-duration: 0.04s !important;
      animation-delay: 0s !important;
      transition-duration: 0.04s !important;
      transition-delay: 0s !important;
      transition-timing-function: linear !important;
      animation-timing-function: linear !important;
    }
    [class*="index__cardFlipped"] [class*="index__flipper"],
    [class*="index__card"] [class*="index__flipper"],
    [class*="index__flipper"] {
      transition-duration: 0.03s !important;
      animation-duration: 0.03s !important;
    }
  `;
  document.documentElement.appendChild(style);
  animationBoostApplied = true;
  console.log(`${LOG} animation speed boosted`);
}

function isSkipStillPresent(): boolean {
  return findSkipButton() !== null;
}

function isRewardStageVisible(): boolean {
  if (getCards().length > 0) return true;
  return Boolean(document.querySelector('[class*="cardsShown"]'));
}

async function autoHoverCards(): Promise<boolean> {
  if (!settings.enabled || !settings.autoHoverCards || hoverDone || hoverRunning) return false;

  hoverRunning = true;
  applyAnimationBoost();

  try {
    const cards = getCards();
    if (cards.length === 0) return false;

    for (let round = 0; round < 8; round += 1) {
      const unflipped = getUnflippedCards();
      if (unflipped.length === 0) {
        hoverDone = true;
        console.log(`${LOG} all cards flipped`);
        return true;
      }

      for (const card of unflipped) {
        const target =
          card.querySelector<HTMLElement>('[class*="container___"], [class*="flipper___"], [class*="front___"], canvas') ?? card;
        await hoverUntilFlipped(target, card, 800);
        await sleep(80);
      }
    }

    const stillUnflipped = getUnflippedCards();
    if (stillUnflipped.length === 0) {
      hoverDone = true;
      console.log(`${LOG} all cards flipped`);
      return true;
    }

    console.log(`${LOG} hover incomplete, remaining ${stillUnflipped.length} card(s)`);
    return false;
  } finally {
    hoverRunning = false;
  }
}

function autoSkip(): boolean {
  if (!settings.enabled || !settings.autoSkip || skipDone) return false;

  if (isRewardStageVisible() || !isSkipStillPresent()) {
    skipDone = true;
    return true;
  }

  const button = findSkipButton();
  if (!button || button.disabled || !isVisible(button)) return false;

  triggerClick(button);
  skipAttemptCount += 1;
  console.log(`${LOG} skip button click attempt ${skipAttemptCount}`);

  window.setTimeout(() => {
    if (isRewardStageVisible() || !isSkipStillPresent()) {
      skipDone = true;
      console.log(`${LOG} skip confirmed`);
      return;
    }

    if (skipAttemptCount >= 30) {
      console.log(`${LOG} skip not confirmed yet, keeping retries active`);
    }
  }, 350);

  return false;
}

async function runFlow(): Promise<void> {
  autoSkip();
  await autoHoverCards();
}

async function bootstrap(): Promise<void> {
  settings = await getSettings();
  await runFlow();

  const observer = new MutationObserver(async () => {
    autoSkip();
    await autoHoverCards();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style", "disabled"]
  });

  const retryTimer = window.setInterval(() => {
    void runFlow();
  }, 500);

  window.setTimeout(() => {
    observer.disconnect();
    window.clearInterval(retryTimer);
  }, 60_000);
}

chrome.runtime.onMessage.addListener((message: Message) => {
  if (message.type === "SETTINGS_UPDATED") {
    settings = message.settings;
    skipDone = false;
    hoverDone = false;
    hoverRunning = false;
    skipAttemptCount = 0;
    void runFlow();
    return;
  }

  if (message.type === "RUN_NOW") {
    skipDone = false;
    hoverDone = false;
    hoverRunning = false;
    skipAttemptCount = 0;
    void runFlow();
  }
});

void bootstrap();
