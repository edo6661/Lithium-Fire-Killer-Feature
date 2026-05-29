import { motion } from "framer-motion";
import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { AnimateIn } from "../../ui/AnimateIn";
import { ShieldCheck, Globe, Gavel } from "lucide-react";

const { visionary } = LFK_X_ARKIV_CONTENT;

export const ArkivVisionarySection = () => {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <AnimateIn direction="right">
            {/* Placeholder untuk foto Arkiv */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-300 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop"
                alt="Arkiv Visionary"
                className="size-full object-cover grayscale-[30%]"
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.2} className="space-y-6">
            <h2 className="whitespace-pre-line text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {visionary.heading}
            </h2>
            <p className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
              {visionary.description}
            </p>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/50 bg-white/30 p-3 text-center shadow-sm">
                <ShieldCheck className="mb-2 size-6 text-slate-800" />
                <p className="text-[10px] font-extrabold uppercase text-slate-900 leading-tight">Partnership</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/50 bg-white/30 p-3 text-center shadow-sm">
                <Globe className="mb-2 size-6 text-slate-800" />
                <p className="text-[10px] font-extrabold uppercase text-slate-900 leading-tight">Global Brand Projects</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/50 bg-white/30 p-3 text-center shadow-sm">
                <Gavel className="mb-2 size-6 text-slate-800" />
                <p className="text-[10px] font-extrabold uppercase text-slate-900 leading-tight">Global Art Market</p>
              </div>
            </div>

            <div className="border-l-2 border-slate-400 pl-4 pt-2">
              <p className="text-lg font-bold italic text-slate-800">
                {visionary.quote}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-500">{visionary.quoteAuthor}</p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};