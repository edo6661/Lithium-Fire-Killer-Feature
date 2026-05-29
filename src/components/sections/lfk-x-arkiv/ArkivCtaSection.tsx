import { motion } from "framer-motion";
import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { AnimateIn } from "../../ui/AnimateIn";

const { cta } = LFK_X_ARKIV_CONTENT;

export const ArkivCtaSection = () => {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <AnimateIn direction="up">
        <div className="rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm font-medium text-slate-600 sm:text-base">
            {cta.description}
          </p>

          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={cta.inputPlaceholder}
              className="flex-1 rounded-full border border-slate-300 bg-white/60 px-5 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
              type="submit"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-extrabold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              {cta.button}
            </button>
          </form>
        </div>
      </AnimateIn>
    </section>
  );
};