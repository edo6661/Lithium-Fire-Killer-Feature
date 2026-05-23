import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";
import { CONTACT_PAGE_CONTENT } from "../../../content/contact";
import { Button } from "../../ui/Button";

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
  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-brand-navy/30 transition-all focus:outline-none focus:ring-2";

const inputClass = (hasError: boolean) =>
  `${inputBase} ${hasError
    ? "border-brand-secondary/60 focus:border-brand-secondary focus:ring-brand-secondary/20"
    : "border-brand-navy/15 focus:border-brand-primary focus:ring-brand-primary/20"
  }`;

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

  return (
    <section
      className="bg-gradient-to-b from-white to-[#f0f4ff] py-16 sm:py-20 lg:py-24"
      aria-labelledby="contact-form-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_480px] lg:gap-16">

          {/* Left: context text */}
          <div className="self-start lg:pt-2">
            <span className="inline-block rounded-full bg-brand-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">
              Kirim Pesan
            </span>
            <h2
              id="contact-form-heading"
              className="mt-4 text-2xl font-bold text-brand-navy sm:text-3xl lg:text-4xl"
            >
              Kami Siap Menjawab Pertanyaan Anda
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-navy/65">
              Ceritakan kebutuhan Anda — tim kami akan merespons dalam 1×24 jam kerja.
            </p>

            {/* Trust points */}
            <ul className="mt-8 space-y-4">
              {[
                "Konsultasi gratis tanpa komitmen",
                "Tim berpengalaman di bidang fire safety lithium",
                "Solusi disesuaikan dengan kebutuhan spesifik Anda",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-0.5 size-5 shrink-0 text-brand-accent"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="text-sm text-brand-navy/75 sm:text-base">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form card */}
          <div className="rounded-2xl border border-brand-navy/8 bg-white p-6 shadow-lg shadow-brand-navy/5 sm:p-8">
            {isSuccess && (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="mb-6 flex items-start gap-3 rounded-xl border border-brand-accent/30 bg-brand-accent/8 p-4 focus:outline-none"
              >
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-brand-accent" aria-hidden />
                <div>
                  <p className="text-sm font-bold text-brand-dark-blue">{form.success.title}</p>
                  <p className="mt-1 text-sm text-brand-navy/70">{form.success.message}</p>
                </div>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Nama Depan */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-brand-navy">
                  {fields.firstName.label}
                  <span className="text-brand-secondary" aria-hidden> *</span>
                  <span className="sr-only"> (wajib diisi)</span>
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
                {errors.firstName && (
                  <p id="firstName-error" role="alert" className="mt-1.5 text-xs text-brand-secondary">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-brand-navy">
                  {fields.email.label}
                  <span className="text-brand-secondary" aria-hidden> *</span>
                  <span className="sr-only"> (wajib diisi)</span>
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
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-xs text-brand-secondary">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Pesan */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-brand-navy">
                  {fields.message.label}
                  <span className="text-brand-secondary" aria-hidden> *</span>
                  <span className="sr-only"> (wajib diisi)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Ceritakan kebutuhan atau pertanyaan Anda..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputClass(Boolean(errors.message))} min-h-[120px] resize-y`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-brand-secondary">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full gap-2 py-3 text-base"
              >
                <Send className="size-4" aria-hidden />
                {form.submitLabel}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};