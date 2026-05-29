import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { AnimateIn } from "../../ui/AnimateIn";
import { ShieldCheck, Globe, Gavel, Sparkles } from "lucide-react";

const { visionary } = LFK_X_ARKIV_CONTENT;

export const ArkivVisionarySection = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        {/* Kolom Gambar */}
        <div className="lg:col-span-5 relative">
          <AnimateIn direction="right">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-slate-200 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop"
                alt="Arkiv Visionary"
                className="size-full object-cover grayscale-[40%] transition-transform duration-700 hover:scale-105"
              />
              {/* Badge Dekoratif di gambar */}
              <div className="absolute -bottom-6 -right-6 size-32 rounded-full border border-white/40 bg-white/20 backdrop-blur-xl z-20 flex items-center justify-center shadow-xl">
                <Sparkles className="size-10 text-slate-800" />
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Kolom Teks Konten */}
        <div className="lg:col-span-7">
          <AnimateIn direction="left" delay={0.2} className="space-y-10">
            <div>
              <h2 className="whitespace-pre-line text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                {visionary.heading}
              </h2>
              <div className="mt-8 h-1 w-24 bg-slate-900" />
            </div>

            <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg max-w-2xl">
              {visionary.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-y border-slate-300/50 py-8">
              {[
                { icon: ShieldCheck, label: "Partnership", desc: "Exclusive Collab" },
                { icon: Globe, label: "Global Brand", desc: "Worldwide Projects" },
                { icon: Gavel, label: "Art Market", desc: "High-end Galleries" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-slate-900">{item.label}</p>
                    <p className="text-xs font-semibold text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative pl-8 pt-4">
              <span className="absolute left-0 top-0 text-6xl text-slate-300 font-serif leading-none">"</span>
              <p className="text-xl font-bold italic leading-relaxed text-slate-800 relative z-10">
                {visionary.quote.replace(/"/g, '')}
              </p>
              <p className="mt-4 text-sm font-extrabold tracking-widest text-slate-500 uppercase">
                {visionary.quoteAuthor}
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};