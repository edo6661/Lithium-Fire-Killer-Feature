import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    // Solid accent pill — glow shadow, shine sweep on hover
    "relative overflow-hidden bg-accent text-white shadow-[0_4px_20px_rgba(56,152,212,0.35)] hover:shadow-[0_8px_32px_rgba(56,152,212,0.55)] hover:bg-[#2d85bf] hover:-translate-y-0.5 focus-visible:ring-accent active:translate-y-0 active:scale-[0.97] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:transition-transform before:duration-500 hover:before:translate-x-full",
  secondary:
    "relative overflow-hidden bg-surface/80 backdrop-blur-md border border-white/10 text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:bg-surface hover:border-white/25 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] focus-visible:ring-white active:translate-y-0 active:scale-[0.97]",
  outline:
    "border border-white/15 bg-white/[0.04] text-white/85 backdrop-blur-sm hover:border-accent/50 hover:bg-accent/10 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(56,152,212,0.18)] focus-visible:ring-accent active:translate-y-0 active:scale-[0.97]",
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
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};