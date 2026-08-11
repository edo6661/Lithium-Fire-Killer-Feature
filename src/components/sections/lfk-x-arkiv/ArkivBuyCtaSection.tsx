import { useTranslation } from "react-i18next";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { AnimateIn } from "../../ui/AnimateIn";
import {
  ACTIVE_ARKIV_BILLING,
  arkivAmountFor,
} from "../../../config/arkiv-billing";
import type { ArkivStockData } from "../../../services/invoice.service";
import { formatRupiah } from "../../../utils/format-currency";

interface ArkivBuyCtaSectionProps {
  onCheckout: () => void;
  stock?: ArkivStockData | null;
}

export const ArkivBuyCtaSection = ({
  onCheckout,
  stock = null,
}: ArkivBuyCtaSectionProps) => {
  const { t } = useTranslation("lfk-x-arkiv");
  const price = arkivAmountFor("VA");
  const soldOut = stock?.soldOut === true;

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <AnimateIn direction="up">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[3rem]">
          <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 size-64 rounded-full bg-slate-300/40 blur-3xl" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-14">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                <Sparkles className="size-3.5 text-accent" />
                {t("buyCta.badge")}
              </div>

              <h2 className="mt-6 text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl leading-[0.95]">
                {t("buyCta.heading")}
              </h2>

              <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                {t("buyCta.description")}
              </p>

              <ul className="mt-6 space-y-2.5 text-sm font-semibold text-slate-700">
                {(t("buyCta.points", { returnObjects: true }) as string[]).map(
                  (point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span>{point}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-7 text-white sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                {t("buyCta.priceLabel")}
              </p>
              <p className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                {formatRupiah(price)}
              </p>
              <p className="mt-2 text-sm font-medium text-white/60">
                {ACTIVE_ARKIV_BILLING.productLabel}
              </p>

              {stock ? (
                <div
                  className={`mt-5 rounded-2xl px-4 py-3 ${
                    soldOut
                      ? "bg-red-500/15 ring-1 ring-red-400/30"
                      : "bg-white/8 ring-1 ring-white/10"
                  }`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">
                    {soldOut ? t("buyCta.soldOut") : t("buyCta.stockLabel")}
                  </p>
                  {!soldOut ? (
                    <p className="mt-1 text-2xl font-black tracking-tight">
                      {stock.quantityRemaining}
                      <span className="text-base font-bold text-white/45">
                        {" "}
                        {t("buyCta.stockOf")} {stock.quantityInitial}
                      </span>
                    </p>
                  ) : null}
                  <p className="mt-1 text-xs font-semibold text-white/55">
                    {soldOut
                      ? t("buyCta.soldOut")
                      : t("buyCta.stockHint", {
                          remaining: stock.quantityRemaining,
                          initial: stock.quantityInitial,
                        })}
                  </p>
                </div>
              ) : null}

              <button
                type="button"
                disabled={soldOut}
                onClick={onCheckout}
                className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-7 py-5 text-base font-black tracking-wide text-white shadow-[0_8px_28px_rgba(56,152,212,0.45)] transition hover:bg-[#2d85bf] hover:shadow-[0_10px_32px_rgba(56,152,212,0.55)] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50 disabled:shadow-none sm:text-lg"
              >
                {soldOut ? t("buyCta.soldOut") : t("buyCta.button")}
                {!soldOut ? <ArrowRight className="size-5" /> : null}
              </button>

              <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-wider text-white/45">
                {t("buyCta.secureNote")}
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
};
