const tg = typeof window !== "undefined" ? (window as any).Telegram?.WebApp : null;

export function useTelegram() {
  const isTelegram = !!tg;

  if (isTelegram) {
    tg.ready();
    tg.expand();
  }

  return { isTelegram, tg };
}
