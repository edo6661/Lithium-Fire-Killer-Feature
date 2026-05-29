import { motion } from "framer-motion";
import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { AnimateIn } from "../../ui/AnimateIn";
import { Shield, Sparkles } from "lucide-react";

const { product } = LFK_X_ARKIV_CONTENT;

export const ArkivProductSection = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">

      {/* Top Text & Heading */}
      <div className="grid items-end gap-12 lg:grid-cols-2 mb-20">
        <AnimateIn direction="up">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white mb-6">
            <Shield className="size-4" />
            The Masterpiece
          </div>
          <h2 className="whitespace-pre-line text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
            {product.heading}
          </h2>
        </AnimateIn>

        <AnimateIn direction="up" delay={0.2} className="lg:justify-self-end">
          <p className="text-sm font-bold leading-relaxed tracking-wider text-slate-600 sm:text-base uppercase max-w-md border-l-2 border-slate-900 pl-6">
            {product.statement}
          </p>
        </AnimateIn>
      </div>

      <div className="flex flex-wrap gap-4 mb-12">
        {product.tags.map((tag, idx) => (
          <AnimateIn direction="up" delay={0.3 + (idx * 0.1)} key={tag}>
            <span className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/50 px-4 py-2 text-sm font-bold text-slate-700 backdrop-blur-md shadow-sm">
              <Sparkles className="size-4 text-slate-400" />
              {tag}
            </span>
          </AnimateIn>
        ))}
      </div>

      {/* Extinguisher Image & Specs Grid */}
      <div className="relative mt-8 flex flex-col lg:flex-row items-center lg:items-stretch gap-10">

        {/* 3D Render Image Container */}
        <AnimateIn
          direction="right"
          delay={0.4}
          className="relative w-full lg:w-1/2 flex items-center justify-center rounded-[3rem] bg-gradient-to-b from-slate-200 to-white border border-white p-12 shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,transparent_70%)]" />
          <motion.img
            animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            src="/arkiv/graphic-elements/Blob-2.png"
            alt="Saru Extinguisher Artwork"
            className="relative z-20 w-64 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:w-80 lg:w-[400px]"
          />
        </AnimateIn>

        {/* Table Background */}
        <AnimateIn direction="left" delay={0.5} className="w-full lg:w-1/2 flex flex-col">
          <div className="flex-1 overflow-hidden rounded-[3rem] border border-white/60 bg-white/60 shadow-2xl backdrop-blur-xl p-8 sm:p-12">
            <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-300 pb-4">
              Collection Specs
            </h3>
            <table className="w-full text-left text-sm sm:text-base text-slate-700 border-collapse">
              <tbody>
                {product.specs.map((row) => {
                  if ('isHeader' in row && row.isHeader) return null;
                  return (
                    <tr key={row.label} className="border-b border-slate-200 last:border-0 group hover:bg-white/40 transition-colors">
                      <td className="py-5 pr-4 align-top font-bold text-slate-500 w-1/3 group-hover:text-slate-900 transition-colors">
                        {row.label}
                      </td>
                      <td className="py-5 align-top font-bold text-slate-900 whitespace-pre-line">
                        {row.value}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};