import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-white shadow-md shadow-brand-primary/25 hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/35 focus-visible:ring-brand-primary active:translate-y-0 active:shadow-sm",
  secondary:
    "bg-brand-dark-blue text-white shadow-md shadow-brand-dark-blue/20 hover:bg-brand-navy hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-dark-blue/30 focus-visible:ring-brand-dark-blue active:translate-y-0 active:shadow-sm",
  outline:
    "border-2 border-brand-navy/20 bg-transparent text-brand-navy hover:bg-brand-navy/5 hover:border-brand-navy/40 hover:-translate-y-0.5 focus-visible:ring-brand-navy active:translate-y-0",
};

export const Button = ({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};