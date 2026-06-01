// path: src/components/sections/lfk-x-arkiv/ArkivProductSection.tsx

import { motion } from "framer-motion";
import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { AnimateIn } from "../../ui/AnimateIn";
import { Palette, ShieldCheck } from "lucide-react";

const { product } = LFK_X_ARKIV_CONTENT;

export const ArkivProductSection = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Slide 5 & 7 Heading */}
      <div className="grid items-end gap-12 lg:grid-cols-2 mb-20">
        <AnimateIn direction="up">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white mb-6">
            {product.subheading}
          </div>
          <h2 className="text-5xl font-black tracking-tighter text-slate-900 sm:text-6xl lg:text-7xl leading-[0.9]">
            {product.heading}
          </h2>
        </AnimateIn>

        <AnimateIn direction="up" delay={0.2} className="lg:justify-self-end">
          <div className="max-w-md border-l-4 border-accent pl-8">
            <p className="text-lg font-bold leading-relaxed text-slate-900 mb-4">
              {product.description}
            </p>
            <p className="text-sm font-black uppercase tracking-widest text-accent">
              {product.statement}
            </p>
          </div>
        </AnimateIn>
      </div>

      {/* Slide 6: Why Art Section */}


      <div className="flex flex-col gap-12">
        {/* Slide 8: Tiers Grid */}
        <div className="relative flex flex-col lg:flex-row items-stretch gap-10">
          <AnimateIn direction="right" delay={0.4} className="relative w-full lg:w-1/2 flex min-h-[420px] items-center justify-center rounded-[3rem] bg-gradient-to-b from-slate-200 to-white border border-white p-8 sm:p-10 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,152,212,0.1)_0%,transparent_70%)]" />
            <motion.img
              animate={{ y: [0, -15, 0], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src="/arkiv/siluet-tabung.png"
              alt="Saru Art Piece"
              className="relative z-20 w-[min(92%,520px)] max-h-[min(72vh,560px)] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:w-[min(88%,480px)] lg:w-[min(95%,520px)]"
            />
          </AnimateIn>

          <AnimateIn direction="left" delay={0.5} className="w-full lg:w-1/2">
            <div className="h-full overflow-hidden rounded-[3rem] border border-white/60 bg-white/60 shadow-2xl backdrop-blur-xl p-8 sm:p-12">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="text-accent" />
                EXCLUSIVITY TIERS
              </h3>
              <table className="w-full text-left text-sm sm:text-base text-slate-700 border-collapse">
                <tbody>
                  {product.specs.map((row, idx) =>
                    "tiers" in row ? (
                      <tr key={idx}>
                        <td className="py-5 pr-4 align-top font-black text-slate-900 text-xs uppercase tracking-widest w-1/3">
                          {row.label}
                        </td>
                        <td className="py-5 align-top">
                          <ul className="space-y-4">
                            {row.tiers.map((tier) => (
                              <li key={tier.label}>
                                <p className="font-black text-slate-800 text-xs uppercase tracking-wide">
                                  {tier.label}
                                </p>
                                <p className="mt-1 font-bold text-slate-600">
                                  {tier.value}
                                </p>
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
                    )
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
                <h3 className="text-2xl font-black tracking-tight text-slate-900">{product.whyArt.title}</h3>
              </div>
              <p className="text-lg font-medium text-slate-600 leading-relaxed mb-8">
                {product.whyArt.content}
              </p>
              <p className="text-xs font-black tracking-[0.3em] text-slate-900 opacity-40">{product.whyArt.label}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider px-5 py-3 rounded-full">
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