import { useEffect, useState } from "react";

import {
  fetchArkivStock,
  type ArkivStockData,
} from "../services/invoice.service";

export function useArkivStock(): {
  stock: ArkivStockData | null;
  isLoading: boolean;
  refresh: () => void;
} {
  const [stock, setStock] = useState<ArkivStockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    void fetchArkivStock()
      .then((data) => {
        if (!cancelled) setStock(data);
      })
      .catch(() => {
        if (!cancelled) setStock(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  return {
    stock,
    isLoading,
    refresh: () => setTick((n) => n + 1),
  };
}
