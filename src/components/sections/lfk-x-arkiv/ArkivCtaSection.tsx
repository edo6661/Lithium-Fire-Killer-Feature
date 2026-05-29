import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { AnimateIn } from "../../ui/AnimateIn";
import { Mail, ArrowRight } from "lucide-react";

const { cta } = LFK_X_ARKIV_CONTENT;

export const ArkivCtaSection = () => {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8">
      <AnimateIn direction="up">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-10 shadow-2xl sm:p-16 lg:p-20">

          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)]" />
          <div className="bg-noise absolute inset-0 opacity-10" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-md shadow-xl">
              <Mail className="size-8 text-white" />
            </div>

            <h2 className="text-3xl font-black tracking-tighter text-white sm:text-4xl lg:text-5xl max-w-2xl leading-tight">
              {cta.heading}
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
              {cta.description}
            </p>

            <form className="mx-auto mt-10 w-full max-w-lg relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={cta.inputPlaceholder}
                className="w-full rounded-full border border-white/20 bg-white/5 py-4 pl-6 pr-36 sm:pr-40 text-sm font-bold text-white placeholder:text-slate-500 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-md transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center gap-2 rounded-full bg-white px-5 sm:px-6 text-sm font-extrabold text-slate-900 transition-transform hover:scale-105 active:scale-95"
              >
                Join List
                <ArrowRight className="size-4" />
              </button>
            </form>

            <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Limited Edition • Exclusive Drop
            </p>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
};