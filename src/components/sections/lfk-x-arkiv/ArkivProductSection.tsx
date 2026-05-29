import { motion } from "framer-motion";
import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { AnimateIn } from "../../ui/AnimateIn";

const { product } = LFK_X_ARKIV_CONTENT;

export const ArkivProductSection = () => {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">

      {/* Top Text & Heading */}
      <div className="grid items-end gap-10 lg:grid-cols-2">
        <AnimateIn direction="up">
          <p className="text-xs font-bold leading-relaxed tracking-wider text-slate-600 sm:text-sm uppercase max-w-sm">
            {product.statement}
          </p>
        </AnimateIn>
        <AnimateIn direction="up" delay={0.2}>
          <h2 className="whitespace-pre-line text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {product.heading}
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs font-bold text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Extinguisher Image overlapping the table */}
      <div className="relative mt-16 lg:mt-24">
        {/* Table Background */}
        <AnimateIn direction="up" delay={0.3} className="relative z-0 overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 shadow-2xl backdrop-blur-xl lg:w-3/4">
          <div className="w-full overflow-x-auto p-6 sm:p-10">
            <table className="w-full text-left text-sm text-slate-700">
              <tbody>
                {product.specs.map((row, i) => (
                  <tr key={row.label} className={i !== 0 ? "border-t border-slate-300/30" : ""}>
                    <td className={`py-4 pr-4 align-top ${row.isHeader ? 'font-extrabold text-slate-900' : 'font-bold text-slate-800'}`}>
                      {row.label}
                    </td>
                    <td className={`py-4 whitespace-pre-line ${row.isHeader ? 'font-extrabold text-slate-900' : 'font-medium'}`}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateIn>

        {/* 3D Extinguisher Render (Absolute on Desktop) */}
        <AnimateIn
          direction="left"
          delay={0.5}
          className="relative mt-10 flex justify-center lg:absolute lg:-bottom-10 lg:right-0 lg:mt-0 lg:w-[45%]"
        >
          {/* Ganti src dengan gambar tabung Saru Anda jika ada, sementara menggunakan dummy 3d shape */}
          <motion.img
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src="/arkiv/graphic-elements/Blob-2.png"
            alt="Saru Extinguisher Artwork"
            className="w-64 drop-shadow-2xl sm:w-80 lg:w-[400px] z-20"
          />
        </AnimateIn>
      </div>
    </section>
  );
};