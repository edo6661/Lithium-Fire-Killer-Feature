import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

import type { ToastState } from "../../hooks/useCreateInvoiceVa";

interface ToastProps {
  toast: ToastState | null;
  onClose: () => void;
  durationMs?: number;
}

export const Toast = ({ toast, onClose, durationMs = 6000 }: ToastProps) => {
  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(timer);
  }, [toast, onClose, durationMs]);

  const isError = toast?.variant === "error";

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed top-24 right-4 z-[100] flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl sm:right-6"
          style={{
            borderColor: isError ? "rgba(248,113,113,0.35)" : "rgba(74,222,128,0.35)",
            backgroundColor: isError ? "rgba(127,29,29,0.92)" : "rgba(6,78,59,0.92)",
          }}
        >
          {isError ? (
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-300" />
          ) : (
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-300" />
          )}
          <p className="flex-1 text-sm font-semibold leading-snug text-white">
            {toast.message}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Tutup notifikasi"
          >
            <X className="size-4" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
