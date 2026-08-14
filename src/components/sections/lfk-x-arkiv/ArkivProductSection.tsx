import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "../../ui/AnimateIn";
import { Button } from "../../ui/Button";
import { Palette, ShieldCheck } from "lucide-react";
import {
  ARKIV_PRODUCT_VIEWS,
  type ArkivProductView,
} from "../../../config/arkiv-billing";
import type { ArkivStockData } from "../../../services/invoice.service";
import { resolveArkivWebPurchaseState } from "../../../services/invoice.service";

interface ArkivProductSectionProps {
  onCheckout?: () => void;
  stock?: ArkivStockData | null;
}

const VIEW_KEYS = ["front", "back", "left", "right"] as const satisfies readonly ArkivProductView[];

export const ArkivProductSection = ({
  onCheckout,
  stock = null,
}: ArkivProductSectionProps) => {
  const { t } = useTranslation("lfk-x-arkiv");
  const [activeView, setActiveView] = useState<ArkivProductView>("front");
  const tags = (t("product.tags", { returnObjects: true }) || []) as string[];
  const specs = (t("product.specs", { returnObjects: true }) || []) as Array<any>;
  
  const purchaseState = resolveArkivWebPurchaseState(stock);
  const isAvailable = purchaseState === "AVAILABLE";
  const isOfflineOnly = purchaseState === "OFFLINE_ONLY";
  const isSoldOut = purchaseState === "SOLD_OUT";

  const buttonLabel = isAvailable
    ? t("product.checkoutBtn")
    : isOfflineOnly
      ? t("product.offlineExhibitionBtn")
      : t("product.soldOut");

  return (
    <section className="relative z-10 mx-auto max-w-7xl overflow-x-clip px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-20 grid min-w-0 items-end gap-10 lg:grid-cols-2 lg:gap-12">
        <AnimateIn direction="up" className="min-w-0">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
            {t("product.badge")}
          </div>
          <h2 className="break-words text-[1.85rem] font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl sm:leading-[0.95] sm:tracking-tighter lg:text-6xl xl:text-7xl">
            {t("product.heading")}
          </h2>
          {onCheckout ? (
            <div className="mt-8 flex flex-col items-start gap-3">
              <Button
                type="button"
                onClick={onCheckout}
                className="bg-slate-900 px-8 py-4 text-white hover:bg-slate-800"
              >
                {buttonLabel}
              </Button>

            </div>
          ) : null}
        </AnimateIn>

        <AnimateIn direction="up" delay={0.2} className="min-w-0 lg:justify-self-end">
          <div className="max-w-md border-l-4 border-accent py-1 pl-5 pr-1 sm:pl-8">
            <p className="mb-4 text-base font-bold leading-relaxed break-words text-slate-900 sm:text-lg">
              {t("product.description")}
            </p>
            <p className="text-sm font-black uppercase tracking-widest text-accent">
              {t("product.statement")}
            </p>
          </div>
        </AnimateIn>
      </div>

      <div className="flex min-w-0 flex-col gap-12">
        <div className="relative flex min-w-0 flex-col items-stretch gap-8 lg:flex-row lg:gap-10">
          <AnimateIn
            direction="up"
            delay={0.4}
            className="relative flex min-h-[360px] w-full min-w-0 flex-col items-center justify-center gap-5 overflow-hidden rounded-[2rem] border border-white bg-gradient-to-b from-slate-200 to-white p-5 shadow-2xl sm:min-h-[420px] sm:rounded-[3rem] sm:p-8 lg:w-1/2"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,152,212,0.1)_0%,transparent_70%)]" />

            <div className="relative z-20 flex w-full min-w-0 flex-1 items-center justify-center">
              <span className="absolute left-3 top-3 z-30 rounded-lg border border-slate-200 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {t(`product.views.${activeView}`)}
              </span>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeView}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  src={ARKIV_PRODUCT_VIEWS[activeView]}
                  alt={`Saru — ${t(`product.views.${activeView}`)}`}
                  className="relative z-20 max-h-[min(52vh,420px)] w-[min(92%,480px)] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:max-h-[min(62vh,480px)] sm:w-[min(88%,440px)] lg:w-[min(95%,480px)]"
                  decoding="async"
                  loading="lazy"
                />
              </AnimatePresence>
            </div>

            <div className="relative z-20 flex w-full max-w-md justify-center gap-2 px-1">
              {VIEW_KEYS.map((view) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setActiveView(view)}
                  className={`flex-1 rounded-xl px-2 py-2 text-[10px] font-black uppercase tracking-wider transition-all duration-300 sm:px-3 ${
                    activeView === view
                      ? "border border-accent bg-accent text-white shadow-[0_0_14px_rgba(56,152,212,0.35)]"
                      : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  {t(`product.views.${view}`)}
                </button>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={0.5} className="w-full min-w-0 lg:w-1/2">
            <div className="h-full overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-2xl sm:rounded-[3rem] sm:p-12">
              <h3 className="mb-6 flex items-center gap-3 text-xl font-black text-slate-900 sm:mb-8 sm:text-2xl">
                <ShieldCheck className="shrink-0 text-accent" />
                <span className="min-w-0 break-words">{t("product.tableHeader")}</span>
              </h3>
              <div className="w-full min-w-0 space-y-5 text-sm text-slate-700 sm:text-base">
                {specs.map((row, idx) =>
                  "tiers" in row ? (
                    <div
                      key={idx}
                      className="grid gap-2 border-b border-slate-200/70 pb-5 last:border-0 last:pb-0 sm:grid-cols-[minmax(0,8rem)_1fr] sm:gap-4"
                    >
                      <p className="text-xs font-black uppercase tracking-widest text-slate-900">
                        {row.label}
                      </p>
                      <ul className="min-w-0 space-y-4">
                        {row.tiers.map((tier: any, i: number) => (
                          <li key={i} className="min-w-0">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-800">
                              {tier.label}
                            </p>
                            <p className="mt-1 break-words font-bold text-slate-600">
                              {tier.value}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className="grid gap-2 border-b border-slate-200/70 pb-5 last:border-0 last:pb-0 sm:grid-cols-[minmax(0,8rem)_1fr] sm:gap-4"
                    >
                      <p className="text-xs font-black uppercase tracking-widest text-slate-900">
                        {row.label}
                      </p>
                      <p className="min-w-0 break-words font-bold whitespace-pre-line text-slate-600">
                        {row.value}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </AnimateIn>
        </div>

        <div className="rounded-[2rem] border border-white bg-white/70 p-6 sm:rounded-[3rem] sm:p-8 lg:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <div className="mb-6 flex items-center gap-3">
                <Palette className="shrink-0 text-accent" size={24} />
                <h3 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  {t("product.whyArt.title")}
                </h3>
              </div>
              <p className="mb-8 text-base font-medium leading-relaxed break-words text-slate-600 sm:text-lg">
                {t("product.whyArt.content")}
              </p>
              <p className="text-xs font-black tracking-[0.3em] text-slate-900 opacity-40">
                {t("product.whyArt.label")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-slate-900 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-white sm:px-5 sm:py-3"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
