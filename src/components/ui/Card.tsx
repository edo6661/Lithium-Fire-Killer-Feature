import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

type CardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
  accentColor?: string;
};

export const Card = ({
  icon: Icon,
  title,
  description,
  children,
}: CardProps) => {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-surface/40 p-6 backdrop-blur-md shadow-lg transition-colors duration-300 hover:border-white/15 hover:bg-surface/70 sm:p-8"
    >
      {/* Top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-accent to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      {/* Radial ambient glow behind icon */}
      <div
        className="pointer-events-none absolute top-6 left-6 size-24 rounded-full bg-accent/15 blur-[40px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      {/* Icon */}
      <div
        className="relative mb-6 inline-flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(56,152,212,0.3)]"
        aria-hidden
      >
        <Icon className="size-6 stroke-[1.75]" />
      </div>

      <h3 className="relative text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-accent sm:text-xl">
        {title}
      </h3>

      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-foreground-muted sm:text-[0.95rem]">
        {description}
      </p>

      {children && <div className="relative mt-5">{children}</div>}
    </motion.article>
  );
};