import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Loader2,
  RefreshCw,
  X,
} from "lucide-react";

import { useInvoicePaymentStatus } from "../../../hooks/useInvoicePaymentStatus";
import type { InvoiceVaData } from "../../../types/invoice";
import { formatRupiah } from "../../../utils/format-currency";
import { Button } from "../../ui/Button";

interface PaymentInstructionModalProps {
  open: boolean;
  onClose: () => void;
  onMarkPaid: () => void;
  onPaymentComplete: () => void;
  vaData: InvoiceVaData | null;
}

export const PaymentInstructionModal = ({
  open,
  onClose,
  onMarkPaid,
  onPaymentComplete,
  vaData,
}: PaymentInstructionModalProps) => {
  const [copied, setCopied] = useState(false);

  const { isPaid, isChecking, checkError, checkStatus } = useInvoicePaymentStatus({
    orderId: vaData?.orderId ?? null,
    enabled: open && vaData?.status !== "PAID",
    onPaid: onMarkPaid,
  });

  if (!vaData) {
    return null;
  }

  const showSuccess = isPaid || vaData.status === "PAID";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(vaData.virtualAccountNo);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleFinish = () => {
    onPaymentComplete();
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Tutup dialog pembayaran"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-instruction-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-x-4 top-[10vh] z-[95] mx-auto max-h-[85vh] max-w-lg overflow-y-auto rounded-[2rem] border border-white/20 bg-white p-6 shadow-2xl sm:p-8"
          >
            {showSuccess ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
                  <CheckCircle2 className="size-10 text-green-600" />
                </div>
                <h2
                  id="payment-instruction-title"
                  className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl"
                >
                  Pembayaran Berhasil Diterima!
                </h2>
                <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-slate-600">
                  Pembayaran untuk{" "}
                  <span className="font-bold text-slate-900">{vaData.orderId}</span> sebesar{" "}
                  <span className="font-bold text-slate-900">
                    {formatRupiah(vaData.grandTotal)}
                  </span>{" "}
                  telah kami terima.
                </p>
                <Button type="button" className="mt-8 w-full py-4" onClick={handleFinish}>
                  Selesai
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">
                      Instruksi Pembayaran
                    </p>
                    <h2
                      id="payment-instruction-title"
                      className="mt-2 text-2xl font-black tracking-tight text-slate-900"
                    >
                      Virtual Account
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Tutup"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
                  <CreditCard className="size-4" />
                  Menunggu Pembayaran
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Nominal Tagihan
                    </p>
                    <p className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                      {formatRupiah(vaData.grandTotal)}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      No. dokumen: {vaData.orderId}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Bank Tujuan
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-lg font-black text-slate-900">
                      <Building2 className="size-5 text-accent" />
                      {vaData.virtualAccountBank}
                    </p>
                  </div>

                  <div className="rounded-2xl border-2 border-dashed border-accent/30 bg-accent/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Nomor Virtual Account
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <p className="flex-1 break-all font-mono text-xl font-black tracking-wider text-slate-900 sm:text-2xl">
                        {vaData.virtualAccountNo}
                      </p>
                      <button
                        type="button"
                        onClick={() => void handleCopy()}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 active:scale-95"
                      >
                        {copied ? (
                          <>
                            <Check className="size-4 text-green-400" />
                            Tersalin
                          </>
                        ) : (
                          <>
                            <Copy className="size-4" />
                            Salin
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => void checkStatus()}
                    disabled={isChecking}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-800 transition hover:border-accent hover:text-accent disabled:opacity-60"
                  >
                    {isChecking ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Memeriksa Status...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="size-4" />
                        Cek Status Pembayaran
                      </>
                    )}
                  </button>

                  {checkError ? (
                    <p
                      role="alert"
                      className="text-center text-xs font-semibold text-red-600"
                    >
                      {checkError}
                    </p>
                  ) : (
                    <p className="text-center text-xs leading-relaxed text-slate-500">
                      Status diperbarui otomatis setiap 5 detik setelah Anda transfer.
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
};
