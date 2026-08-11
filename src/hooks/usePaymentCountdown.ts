import { useEffect, useState } from "react";

/** Format sisa waktu jadi HH:MM:SS atau MM:SS. */
export function formatCountdown(remainingMs: number): string {
  const totalSec = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export function usePaymentCountdown(expiredDate: string | null | undefined): {
  remainingMs: number | null;
  label: string | null;
  isDone: boolean;
} {
  const [remainingMs, setRemainingMs] = useState<number | null>(() => {
    if (!expiredDate) return null;
    const deadline = new Date(expiredDate).getTime();
    if (Number.isNaN(deadline)) return null;
    return Math.max(0, deadline - Date.now());
  });

  useEffect(() => {
    if (!expiredDate) {
      setRemainingMs(null);
      return;
    }

    const deadline = new Date(expiredDate).getTime();
    if (Number.isNaN(deadline)) {
      setRemainingMs(null);
      return;
    }

    const tick = () => {
      setRemainingMs(Math.max(0, deadline - Date.now()));
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [expiredDate]);

  if (remainingMs == null) {
    return { remainingMs: null, label: null, isDone: false };
  }

  return {
    remainingMs,
    label: formatCountdown(remainingMs),
    isDone: remainingMs <= 0,
  };
}
