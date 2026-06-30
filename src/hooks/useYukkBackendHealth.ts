import { useEffect, useState } from "react";

import { fetchYukkBackendHealth } from "../services/invoice.service";

export function useYukkBackendHealth(): {
  isChecking: boolean;
  isBackendReachable: boolean;
} {
  const [isChecking, setIsChecking] = useState(true);
  const [isBackendReachable, setIsBackendReachable] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void fetchYukkBackendHealth()
      .then(() => {
        if (!cancelled) {
          // Backend merespons — form tetap aktif (readiness YUKK dicek saat create VA).
          setIsBackendReachable(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsBackendReachable(false);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsChecking(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { isChecking, isBackendReachable };
}
