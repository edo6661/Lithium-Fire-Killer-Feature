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
import { isArkivPurchaseUnavailable } from "../../../services/invoice.service";

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
  const unavailable = isArkivPurchaseUnavailable(stock);
  const dailyFull = !stock?.soldOut && stock?.dailyQuota?.exhausted === true;
  const unavailableLabel = stock?.soldOut
    ? t("product.soldOut")
    : dailyFull
      ? t("product.dailyLimitReached")
      : t("product.soldOut");

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid items-end gap-12 lg:grid-cols-2 mb-20">
        <AnimateIn direction="up">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white mb-6">
            {t("product.badge")}
          </div>
          <h2 className="text-5xl font-black tracking-tighter text-slate-900 sm:text-6xl lg:text-7xl leading-[0.9]">
            {t("product.heading")}
          </h2>
          {onCheckout ? (
            <div className="mt-8 flex flex-col items-start gap-3">
              <Button
                type="button"
                disabled={unavailable}
                onClick={onCheckout}
                className="bg-slate-900 px-8 py-4 text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {unavailable ? unavailableLabel : t("product.checkoutBtn")}
              </Button>
              {stock && !unavailable ? (
                <p className="text-sm font-bold text-slate-600">
                  {t("product.stockHint", {
                    remaining: stock.quantityRemaining,
                    initial: stock.quantityInitial,
                  })}
                </p>
              ) : stock && dailyFull ? (
                <p className="text-sm font-bold text-slate-600">
                  {t("product.dailyLimitHint")}
                </p>
              ) : null}
            </div>
          ) : null}
        </AnimateIn>

        <AnimateIn direction="up" delay={0.2} className="lg:justify-self-end">
          <div className="max-w-md border-l-4 border-accent pl-8">
            <p className="text-lg font-bold leading-relaxed text-slate-900 mb-4">
              {t("product.description")}
            </p>
            <p className="text-sm font-black uppercase tracking-widest text-accent">
              {t("product.statement")}
            </p>
          </div>
        </AnimateIn>
      </div>

      <div className="flex flex-col gap-12">
        <div className="relative flex flex-col lg:flex-row items-stretch gap-10">
          <AnimateIn
            direction="right"
            delay={0.4}
            className="relative w-full lg:w-1/2 flex min-h-[420px] flex-col items-center justify-center gap-5 rounded-[3rem] bg-gradient-to-b from-slate-200 to-white border border-white p-6 sm:p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,152,212,0.1)_0%,transparent_70%)]" />

            <div className="relative z-20 flex w-full flex-1 items-center justify-center">
              <span className="absolute left-3 top-3 z-30 rounded-lg border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 backdrop-blur-md">
                {t(`product.views.${activeView}`)}
              </span>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeView}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.25 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  }}
                  src={ARKIV_PRODUCT_VIEWS[activeView]}
                  alt={`Saru — ${t(`product.views.${activeView}`)}`}
                  className="relative z-20 w-[min(92%,480px)] max-h-[min(62vh,480px)] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:w-[min(88%,440px)] lg:w-[min(95%,480px)]"
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

          <AnimateIn direction="left" delay={0.5} className="w-full lg:w-1/2">
            <div className="h-full overflow-hidden rounded-[3rem] border border-white/60 bg-white/60 shadow-2xl backdrop-blur-xl p-8 sm:p-12">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="text-accent" />
                {t("product.tableHeader")}
              </h3>
              <table className="w-full text-left text-sm sm:text-base text-slate-700 border-collapse">
                <tbody>
                  {specs.map((row, idx) =>
                    "tiers" in row ? (
                      <tr key={idx}>
                        <td className="py-5 pr-4 align-top font-black text-slate-900 text-xs uppercase tracking-widest w-1/3">
                          {row.label}
                        </td>
                        <td className="py-5 align-top">
                          <ul className="space-y-4">
                            {row.tiers.map((tier: any, i: number) => (
                              <li key={i}>
                                <p className="font-black text-slate-800 text-xs uppercase tracking-wide">
                                  {tier.label}
                                </p>
                                <p className="mt-1 font-bold text-slate-600">{tier.value}</p>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ) : (
                      <tr key={idx}>
                        <td className="py-5 pr-4 align-top font-black text-slate-900 text-xs uppercase tracking-widest w-1/3">
                          {row.label}
                        </td>
                        <td className="py-5 align-top font-bold text-slate-600 whitespace-pre-line">
                          {row.value}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </AnimateIn>
        </div>

        <div className="rounded-[3rem] bg-white/40 border border-white p-8 lg:p-16 backdrop-blur-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Palette className="text-accent" size={24} />
                <h3 className="text-2xl font-black tracking-tight text-slate-900">
                  {t("product.whyArt.title")}
                </h3>
              </div>
              <p className="text-lg font-medium text-slate-600 leading-relaxed mb-8">
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
                  className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider px-5 py-3 rounded-full"
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
