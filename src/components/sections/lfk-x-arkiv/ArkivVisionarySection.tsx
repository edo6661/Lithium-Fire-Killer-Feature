import { useTranslation } from "react-i18next";
import { AnimateIn } from "../../ui/AnimateIn";
import { Sparkles, Layout, Globe, Star } from "lucide-react";

export const ArkivVisionarySection = () => {
  const { t } = useTranslation("lfk-x-arkiv");
  const highlights = (t("visionary.highlights", { returnObjects: true }) || []) as Array<{ label: string; desc: string }>;
  const icons = [Layout, Globe, Star];

  return (
    <section className="relative z-10 mx-auto max-w-7xl overflow-x-clip px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid min-w-0 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative min-w-0 lg:col-span-5">
          <AnimateIn direction="up">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl sm:rounded-[2.5rem]">
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-slate-900/20 to-transparent" />
              <img
                src="/arkiv/arkiv-profile.jpeg"
                alt="Arkiv Vilmansa"
                decoding="async"
                loading="lazy"
                className="size-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 z-20 flex size-16 items-center justify-center rounded-full border border-white/40 bg-white/70 shadow-xl sm:bottom-6 sm:right-6 sm:size-24">
                <Sparkles className="size-7 text-slate-800 sm:size-10" />
              </div>
            </div>
          </AnimateIn>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <AnimateIn direction="up" delay={0.15} className="space-y-8 sm:space-y-10">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-accent">
                {t("visionary.heading")}
              </p>
              <h2 className="break-words text-3xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-5xl sm:tracking-tighter">
                {t("visionary.subheading")}
              </h2>
            </div>

            <div className="space-y-6">
              <p className="whitespace-pre-line break-words text-base leading-relaxed text-slate-700 sm:text-lg">
                {t("visionary.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 border-y border-slate-300/50 py-8 sm:grid-cols-3 sm:gap-6">
              {highlights.map((item, idx) => {
                const Icon = icons[idx] || Star;
                return (
                  <div key={idx} className="flex min-w-0 flex-col gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-900">
                        {item.label}
                      </p>
                      <p className="mt-1 break-words text-xs font-bold text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative min-w-0 pl-8 pt-4 sm:pl-10">
              <span className="absolute left-0 top-0 font-serif text-6xl leading-none text-slate-200 sm:text-7xl">
                "
              </span>
              <p className="relative z-10 break-words text-lg font-bold italic leading-relaxed text-slate-800 sm:text-xl">
                {t("visionary.quote")}
              </p>
              <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {t("visionary.quoteAuthor")}
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};