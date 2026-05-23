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
    <article className="flex h-full flex-col rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
      <div
        className="mb-5 inline-flex size-14 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"
        aria-hidden
      >
        <Icon className="size-7" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-bold text-brand-navy sm:text-xl">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-navy/75 sm:text-base">
        {description}
      </p>
      {children}
    </article>
  );
};
