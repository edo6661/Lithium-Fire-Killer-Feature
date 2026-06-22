import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send, CheckCircle2, ShieldCheck, Clock, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "../../ui/AnimateIn";

type FormData = { firstName: string; email: string; message: string };
type FormField = keyof FormData;
type FormErrors = Partial<Record<FormField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase =
  "mt-2 w-full rounded-2xl border bg-white/[0.03] backdrop-blur-md px-4 py-3.5 text-sm text-white placeholder:text-white/25 transition-all duration-300 ease-out focus:outline-none focus:ring-1 [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#0b1120] [&:-webkit-autofill]:[-webkit-text-fill-color:white]";

const inputClass = (hasError: boolean) =>
  `${inputBase} ${hasError
    ? "border-red-500/40 focus:border-red-500 focus:ring-red-500 focus:shadow-[0_0_16px_rgba(239,68,68,0.12)]"
    : "border-white/8 hover:border-white/15 focus:border-accent focus:ring-accent focus:shadow-[0_0_20px_rgba(56,152,212,0.12)]"
  }`;

const TRUST_ICONS = [ShieldCheck, Users, Clock];

const errorVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: { opacity: 1, height: "auto", marginTop: 6 },
};

export const ContactFormSection = () => {
  const { t } = useTranslation("contact");
  const [formData, setFormData] = useState<FormData>({ firstName: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const trustPoints = (t("form.trustPoints", { returnObjects: true }) || []) as string[];

  useEffect(() => {
    if (isSuccess) successRef.current?.focus();
  }, [isSuccess]);

  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {};
    if (!data.firstName.trim()) errs.firstName = t("form.errors.required");
    const email = data.email.trim();
    if (!email) errs.email = t("form.errors.required");
    else if (!EMAIL_PATTERN.test(email)) errs.email = t("form.errors.emailInvalid");
    if (!data.message.trim()) errs.message = t("form.errors.required");
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as FormField]: value }));
    setErrors((prev) => ({ ...prev, [name as FormField]: undefined }));
    setIsSuccess(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSuccess(true);
    setFormData({ firstName: "", email: "", message: "" });
  };

  return (
    <section className="bg-surface py-20 border-y border-white/5 sm:py-24 lg:py-8" aria-labelledby="contact-form-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_480px] lg:items-start lg:gap-16 xl:gap-28">

          <AnimateIn direction="right" className="space-y-6 self-start lg:pt-2">
            <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">
              {t("form.badge")}
            </span>
            <h2 id="contact-form-heading" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-[1.12] whitespace-pre-line">
              {t("form.heading")}
            </h2>
            <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
              {t("form.description")}
            </p>

            <ul className="space-y-4 pt-2">
              {trustPoints.map((label, idx) => {
                const Icon = TRUST_ICONS[idx] || ShieldCheck;
                return (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background border border-white/10">
                      <Icon className="size-4 text-accent" strokeWidth={2} aria-hidden />
                    </div>
                    <span className="text-sm font-semibold text-white/80 sm:text-base">{label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-2 rounded-2xl border border-white/10 bg-background/50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted">{t("form.trustedBy.label")}</p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-white/75">
                {t("form.trustedBy.value")}
              </p>
            </div>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.1}>
            <div className="relative rounded-3xl border border-white/10 bg-background/80 backdrop-blur-xl p-7 shadow-2xl sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-40">
                <div className="h-[60%] w-[60%] rounded-full bg-accent/10 blur-[80px]" aria-hidden />
              </div>

              <div className="relative z-10">
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      transition={{ duration: 0.3 }}
                      ref={successRef}
                      tabIndex={-1}
                      className="mb-6 flex items-start gap-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 focus:outline-none"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-400" aria-hidden />
                      <div className="space-y-1">
                        <p className="text-sm font-extrabold text-white">{t("form.success.title")}</p>
                        <p className="text-sm font-medium leading-relaxed text-foreground-muted">{t("form.success.message")}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest text-foreground-muted">
                      {t("form.fields.firstName.label")} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="firstName" name="firstName" type="text" autoComplete="given-name" required
                      placeholder={t("form.fields.firstName.placeholder")}
                      value={formData.firstName} onChange={handleChange}
                      className={inputClass(Boolean(errors.firstName))}
                    />
                    <AnimatePresence>
                      {errors.firstName && (
                        <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                          <span aria-hidden>⚠</span> {errors.firstName}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-foreground-muted">
                      {t("form.fields.email.label")} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" autoComplete="email" required
                      placeholder={t("form.fields.email.placeholder")}
                      value={formData.email} onChange={handleChange}
                      className={inputClass(Boolean(errors.email))}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                          <span aria-hidden>⚠</span> {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-foreground-muted">
                      {t("form.fields.message.label")} <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message" name="message" rows={5} required
                      placeholder={t("form.fields.message.placeholder")}
                      value={formData.message} onChange={handleChange}
                      className={`${inputClass(Boolean(errors.message))} min-h-[130px] resize-y leading-relaxed`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                          <span aria-hidden>⚠</span> {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ y: -2, scale: 1.015 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                      className="group relative w-full overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(56,152,212,0.35)] hover:shadow-[0_8px_32px_rgba(56,152,212,0.55)] hover:bg-[#2d85bf] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" aria-hidden />
                      <span className="relative flex items-center justify-center gap-2">
                        <Send className="size-4" aria-hidden />
                        {t("form.submitLabel")}
                      </span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
};