import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { KeyRound, Loader2, Shield, X } from "lucide-react";
import {
  readArkivAccessKey,
  verifyArkivAccessKey,
  writeArkivAccessKey,
} from "../../../utils/arkiv-access";

interface ArkivAccessGateModalProps {
  open: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}

export const ArkivAccessGateModal = ({
  open,
  onClose,
  onUnlocked,
}: ArkivAccessGateModalProps) => {
  const { t } = useTranslation("lfk-x-arkiv");
  const [keyInput, setKeyInput] = useState(() => readArkivAccessKey());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await verifyArkivAccessKey(keyInput);
      writeArkivAccessKey(keyInput);
      onUnlocked();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("payment.accessGate.errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[96] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label={t("payment.accessGate.closeAria")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 sm:bg-slate-900/55 sm:backdrop-blur-sm"
          />
          <motion.form
            onSubmit={(e) => void handleSubmit(e)}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-[1] w-full max-w-md rounded-[1.75rem] border border-white/50 bg-white p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-5" />
            </button>

            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#1A80C1]/10 text-[#1A80C1]">
              <Shield className="size-7" />
            </div>
            <h2 className="mt-5 text-center text-2xl font-black tracking-tight text-slate-900">
              {t("payment.accessGate.heading")}
            </h2>
            <p className="mt-2 text-center text-sm font-medium leading-relaxed text-slate-500">
              {t("payment.accessGate.description")}
            </p>

            <label className="mt-7 block text-[10px] font-black uppercase tracking-wider text-slate-400">
              {t("payment.accessGate.keyLabel")}
            </label>
            <div className="relative mt-2">
              <KeyRound className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                required
                autoComplete="off"
                spellCheck={false}
                disabled={loading}
                placeholder={t("payment.accessGate.keyPlaceholder")}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pr-4 pl-11 text-sm font-semibold text-slate-900 caret-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1A80C1] focus:ring-4 focus:ring-[#1A80C1]/15 disabled:opacity-60 [-webkit-text-fill-color:#0f172a] [&:-webkit-autofill]:[-webkit-text-fill-color:#0f172a] [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#fff]"
              />
            </div>

            {error ? (
              <p
                role="alert"
                className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading || !keyInput.trim()}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#1A80C1] py-3.5 text-sm font-black text-white shadow-lg shadow-[#1A80C1]/30 transition hover:bg-[#1672ad] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t("payment.accessGate.verifying")}
                </>
              ) : (
                t("payment.accessGate.submit")
              )}
            </button>
          </motion.form>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};

/** Gate Buy Now: verify INTERNAL_DASHBOARD_KEY (shared dengan /internal). */
export function useArkivAccessGate(onAllowed: () => void) {
  const [gateOpen, setGateOpen] = useState(false);
  const [checking, setChecking] = useState(false);

  const requestAccess = useCallback(async () => {
    const existing = readArkivAccessKey();
    if (existing) {
      setChecking(true);
      try {
        await verifyArkivAccessKey(existing);
        onAllowed();
        return;
      } catch {
        /* key lama invalid — minta lagi */
      } finally {
        setChecking(false);
      }
    }
    setGateOpen(true);
  }, [onAllowed]);

  const closeGate = useCallback(() => setGateOpen(false), []);

  const handleUnlocked = useCallback(() => {
    setGateOpen(false);
    onAllowed();
  }, [onAllowed]);

  return {
    gateOpen,
    checking,
    requestAccess,
    closeGate,
    handleUnlocked,
  };
}
