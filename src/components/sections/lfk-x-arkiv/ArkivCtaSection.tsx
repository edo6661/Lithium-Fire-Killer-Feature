import { useState } from "react";
import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { AnimateIn } from "../../ui/AnimateIn";
import { Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const { cta } = LFK_X_ARKIV_CONTENT;

export const ArkivCtaSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const params = new URLSearchParams({ email });

      // Menggunakan URL Web App Apps Script paling baru: AKfycbzcmq_lSelgu9uDYn8lMgUzW8azLCNxX3MT7TqzSAZmbkRb_2QfJ4uKwzu3jMM1wOOS
      await fetch(
        "https://script.google.com/macros/s/AKfycbzcmq_lSelgu9uDYn8lMgUzW8azLCNxX3MT7TqzSAZmbkRb_2QfJ4uKwzu3jMM1wOOS/exec",
        {
          method: "POST",
          body: params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          mode: "no-cors", // Menggunakan no-cors karena Google Apps Script akan meredirect request ke server hosting Google
        }
      );

      setStatus("success");
      setEmail("");

      // Notifikasi sukses akan hilang otomatis setelah 6 detik
      setTimeout(() => {
        setStatus("idle");
      }, 6000);
    } catch (error) {
      console.error("Error submitting email:", error);
      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  return (
    <section className="relative z-10 mx-auto max-w-5xl px-4 py-8 text-center sm:px-6 lg:px-8">
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

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mx-auto mt-10 w-full max-w-lg rounded-full border border-green-500/30 bg-green-500/10 py-4 px-6 backdrop-blur-md flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                  <span className="text-sm font-bold text-green-400 text-left">
                    Terima kasih! Email Anda telah tersimpan dan tim kami akan segera menghubungi Anda.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto mt-10 w-full max-w-lg relative"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={cta.inputPlaceholder}
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-full border border-white/20 bg-white/5 py-4 pl-6 pr-36 sm:pr-40 text-sm font-bold text-white placeholder:text-slate-500 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 backdrop-blur-md transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center gap-2 rounded-full bg-white px-5 sm:px-6 text-sm font-extrabold text-slate-900 transition-transform hover:scale-105 active:scale-95 disabled:opacity-80 disabled:hover:scale-100"
                  >
                    {status === "loading" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        Join List
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="absolute -bottom-7 left-0 right-0 text-center text-xs font-bold text-red-400">
                      Terjadi kesalahan jaringan. Silakan coba lagi.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Limited Edition • Exclusive Drop
            </p>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
};