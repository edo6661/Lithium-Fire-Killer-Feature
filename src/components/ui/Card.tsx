import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type CardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
};

export const Card = ({ icon: Icon, title, description, children }: CardProps) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,43,150,0.05)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-brand-navy/12 hover:shadow-[0_24px_56px_rgba(0,43,150,0.11)] sm:p-8">
      {/* Top accent bar — animates in on hover */}
      <div
        className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-brand-primary via-brand-accent to-brand-dark-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      {/* Icon container */}
      <div
        className="mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-brand-primary/8 text-brand-primary ring-1 ring-brand-primary/12 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-primary/15 group-hover:ring-brand-primary/25 group-hover:shadow-[0_4px_16px_rgba(255,115,0,0.15)]"
        aria-hidden
      >
        <Icon className="size-6 stroke-[1.75]" />
      </div>

      <h3 className="text-lg font-bold tracking-tight text-brand-navy transition-colors duration-200 group-hover:text-brand-dark-blue sm:text-xl">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-navy/65 selection:bg-brand-primary/10 sm:text-base">
        {description}
      </p>
      {children && <div className="mt-5">{children}</div>}
    </article>
  );
};