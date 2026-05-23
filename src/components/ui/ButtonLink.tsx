import { Link, type LinkProps } from "react-router-dom";
import type { ReactNode } from "react";

type ButtonLinkVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonLinkProps = LinkProps & {
  variant?: ButtonLinkVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-secondary focus-visible:ring-brand-primary",
  secondary:
    "bg-brand-dark-blue text-white hover:bg-brand-navy focus-visible:ring-brand-dark-blue",
  outline:
    "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white focus-visible:ring-brand-navy",
  ghost:
    "border-2 border-white text-white hover:bg-white hover:text-brand-primary focus-visible:ring-white",
};

export const ButtonLink = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};