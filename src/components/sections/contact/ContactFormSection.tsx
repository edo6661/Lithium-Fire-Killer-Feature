import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send, CheckCircle2, ShieldCheck, Clock, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"; // Tambahan Framer Motion
import { CONTACT_PAGE_CONTENT } from "../../../content/contact";
import { Button } from "../../ui/Button";
import { AnimateIn } from "../../ui/AnimateIn";

const { form } = CONTACT_PAGE_CONTENT;

type FormData = { firstName: string; email: string; message: string };
type FormField = keyof FormData;
type FormErrors = Partial<Record<FormField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = form.errors.required;
  const email = data.email.trim();
  if (!email) errors.email = form.errors.required;
  else if (!EMAIL_PATTERN.test(email)) errors.email = form.errors.emailInvalid;
  if (!data.message.trim()) errors.message = form.errors.required;
  return errors;
};

const inputBase =
  "mt-2 w-full rounded-xl border bg-slate-50/80 px-4 py-3.5 text-sm text-brand-navy placeholder:text-brand-navy/30 transition-all duration-200 ease-out focus:bg-white focus:outline-none focus:ring-4 shadow-sm";

const inputClass = (hasError: boolean) =>
  `${inputBase} ${hasError
    ? "border-brand-secondary/40 focus:border-brand-secondary focus:ring-brand-secondary/8"
    : "border-slate-200 focus:border-brand-primary/60 focus:ring-brand-primary/8"
  }`;

const TRUST_POINTS = [
  { Icon: ShieldCheck, label: "Konsultasi gratis tanpa komitmen" },
  { Icon: Users, label: "Tim bersertifikasi fire safety lithium" },
  { Icon: Clock, label: "Respons dalam 1×24 jam kerja" },
];

export const ContactFormSection = () => {
  const [formData, setFormData] = useState<FormData>({ firstName: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSuccess) successRef.current?.focus();
  }, [isSuccess]);

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

  const { fields } = form;

  // Animasi untuk pesan error agar meluncur mulus dari atas ke bawah
  const errorVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: "auto", marginTop: 6 },
  };

  return (
    <section
      className="bg-gradient-to-b from-white to-slate-50/80 py-20 sm:py-24 lg:py-32"
      aria-labelledby="contact-form-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_480px] lg:items-start lg:gap-16 xl:gap-28">
          <AnimateIn direction="right" className="space-y-6 self-start lg:pt-2">

            {/* Left: Context */}
            <div className="space-y-6 self-start lg:pt-2">
              <span className="inline-block rounded-full bg-brand-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary">
                Kirim Pesan
              </span>
              <h2
                id="contact-form-heading"
                className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl leading-[1.12]"
              >
                Kami Siap Menjawab <br className="hidden sm:block" />
                Pertanyaan Anda
              </h2>
              <p className="text-base leading-relaxed text-brand-navy/65 sm:text-lg">
                Ceritakan kebutuhan sistem pengamanan operasional atau proteksi bisnis Anda — tim ahli kami akan merespons dalam 1×24 jam kerja.
              </p>

              {/* Trust points */}
              <ul className="space-y-4 pt-2">
                {TRUST_POINTS.map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-accent/8 ring-1 ring-brand-accent/15">
                      <Icon className="size-4.5 text-brand-accent" strokeWidth={2} aria-hidden />
                    </div>
                    <span className="text-sm font-semibold text-brand-navy/75 sm:text-base">{label}</span>
                  </li>
                ))}
              </ul>

              {/* Social proof strip */}
              <div className="mt-2 rounded-2xl border border-brand-navy/8 bg-gradient-to-br from-[#f0f4ff] to-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-navy/35">Dipercaya oleh</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-brand-navy/70">
                  Industri EV, manufaktur baterai, data center, pertambangan, dan berbagai sektor strategis di Indonesia.
                </p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.1}>
            {/* Right: Form Card */}
            <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_8px_40px_rgba(0,43,150,0.06)] sm:p-8 lg:p-10">

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    ref={successRef}
                    tabIndex={-1}
                    role="status"
                    aria-live="polite"
                    className="mb-6 flex items-start gap-4 rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-4 focus:outline-none"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-accent" aria-hidden />
                    <div className="space-y-1">
                      <p className="text-sm font-extrabold text-brand-dark-blue">{form.success.title}</p>
                      <p className="text-sm font-medium leading-relaxed text-brand-navy/65">{form.success.message}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {/* Nama Depan */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold tracking-wide text-brand-navy">
                    {fields.firstName.label}
                    <span className="ml-0.5 text-brand-secondary" aria-hidden>*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    placeholder="Masukkan nama depan Anda"
                    value={formData.firstName}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    className={inputClass(Boolean(errors.firstName))}
                  />
                  <AnimatePresence>
                    {errors.firstName && (
                      <motion.p
                        id="firstName-error"
                        role="alert"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="flex items-center gap-1.5 text-xs font-bold text-brand-secondary overflow-hidden"
                      >
                        <span aria-hidden>⚠</span> {errors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold tracking-wide text-brand-navy">
                    {fields.email.label}
                    <span className="ml-0.5 text-brand-secondary" aria-hidden>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass(Boolean(errors.email))}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        id="email-error"
                        role="alert"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="flex items-center gap-1.5 text-xs font-bold text-brand-secondary overflow-hidden"
                      >
                        <span aria-hidden>⚠</span> {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Pesan */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold tracking-wide text-brand-navy">
                    {fields.message.label}
                    <span className="ml-0.5 text-brand-secondary" aria-hidden>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Ceritakan kebutuhan pengamanan baterai lithium atau pertanyaan Anda..."
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${inputClass(Boolean(errors.message))} min-h-[130px] resize-y leading-relaxed`}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        id="message-error"
                        role="alert"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="flex items-center gap-1.5 text-xs font-bold text-brand-secondary overflow-hidden"
                      >
                        <span aria-hidden>⚠</span> {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-1">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full gap-2.5 py-3.5 text-sm shadow-lg shadow-brand-primary/15"
                  >
                    <Send className="size-4 stroke-[2.5]" aria-hidden />
                    {form.submitLabel}
                  </Button>
                  <p className="mt-3 text-center text-xs font-medium text-brand-navy/40">
                    Dengan mengirim pesan, Anda menyetujui kami menghubungi Anda kembali.
                  </p>
                </div>
              </form>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
};