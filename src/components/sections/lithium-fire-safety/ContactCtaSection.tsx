import { MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "../../ui/ButtonLink";

export const ContactCtaSection = () => {
  const { t } = useTranslation("lithium-fire-safety");

  return (
    <section className="relative overflow-hidden bg-background py-20 border-y border-white/5 sm:py-24 text-white" aria-labelledby="lfs-cta-heading">
      <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-accent/10 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-blue-500/10 blur-[80px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-sm"
          >
            <MessageCircle className="size-3.5" aria-hidden />
            {t("cta.badge")}
          </motion.div>

          <motion.h2
            id="lfs-cta-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.1]"
          >
            {t("cta.headline")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mx-auto max-w-lg text-base leading-relaxed text-foreground-muted sm:text-lg"
          >
            {t("cta.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row"
          >
            <ButtonLink
              to="/contact"
              className="group w-full sm:w-auto inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-bold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(56,152,212,0.2)]"
            >
              {t("cta.button")}
              <ArrowRight className="size-4 text-accent/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
            </ButtonLink>

            <motion.a
              href="https://wa.me/6281290003278"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-shadow duration-300 hover:shadow-[0_8px_36px_rgba(37,211,102,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" aria-hidden />
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="size-5 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.25a.75.75 0 0 0 .916.948l5.544-1.453A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.728 9.728 0 0 1-4.953-1.354l-.355-.211-3.684.966.984-3.595-.232-.371A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              {t("cta.waButton")}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};