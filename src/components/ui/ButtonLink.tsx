import { Link, type LinkProps } from "react-router-dom";
import type { ReactNode } from "react";

type ButtonLinkVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonLinkProps = LinkProps & {
  variant?: ButtonLinkVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-brand-primary text-white shadow-[0_4px_14px_rgba(255,115,0,0.30)] hover:bg-[#e86500] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,115,0,0.40)] focus-visible:ring-brand-primary active:translate-y-0 active:shadow-sm active:bg-brand-secondary",
  secondary:
    "bg-brand-dark-blue text-white shadow-[0_4px_14px_rgba(0,71,173,0.22)] hover:bg-brand-navy hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,43,150,0.30)] focus-visible:ring-brand-dark-blue active:translate-y-0 active:shadow-sm",
  outline:
    "border-2 border-brand-navy/20 bg-transparent text-brand-navy hover:bg-brand-navy/5 hover:border-brand-navy/35 hover:-translate-y-0.5 focus-visible:ring-brand-navy active:translate-y-0",
  ghost:
    "border-2 border-white/25 bg-white/8 text-white backdrop-blur-sm hover:bg-white hover:text-brand-navy hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] focus-visible:ring-white active:translate-y-0 active:shadow-sm",
};

export const ButtonLink = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};