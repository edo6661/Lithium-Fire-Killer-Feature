// path: src/components/sections/lfk-x-arkiv/ArkivVisionarySection.tsx

import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { AnimateIn } from "../../ui/AnimateIn";
import { Sparkles, Layout, Globe, Star } from "lucide-react";

const { visionary } = LFK_X_ARKIV_CONTENT;

export const ArkivVisionarySection = () => {
  const icons = [Layout, Globe, Star];

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5 relative">
          <AnimateIn direction="right">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-slate-200 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent z-10" />
              <img
                src="/arkiv/arkiv-profile.jpeg"
                alt="Arkiv Vilmansa"
                className="size-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute -bottom-6 -right-6 size-32 rounded-full border border-white/40 bg-white/20 backdrop-blur-xl z-20 flex items-center justify-center shadow-xl">
                <Sparkles className="size-10 text-slate-800" />
              </div>
            </div>
          </AnimateIn>
        </div>

        <div className="lg:col-span-7">
          <AnimateIn direction="left" delay={0.2} className="space-y-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-accent mb-4">{visionary.heading}</p>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl leading-[1.1]">
                {visionary.subheading}
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-base leading-relaxed text-slate-700 sm:text-lg whitespace-pre-line">
                {visionary.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-y border-slate-300/50 py-8">
              {visionary.highlights.map((item, idx) => {
                const Icon = icons[idx];
                return (
                  <div key={idx} className="flex flex-col gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-slate-900">{item.label}</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative pl-10 pt-4">
              <span className="absolute left-0 top-0 text-7xl text-slate-200 font-serif leading-none">"</span>
              <p className="text-xl font-bold italic leading-relaxed text-slate-800 relative z-10">
                {visionary.quote}
              </p>
              <p className="mt-4 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                {visionary.quoteAuthor}
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};