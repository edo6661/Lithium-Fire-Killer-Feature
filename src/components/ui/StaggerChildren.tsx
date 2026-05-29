import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Easing curve konsisten dengan AnimateIn
const ease = [0.21, 0.47, 0.32, 0.98] as const;

type StaggerChildrenProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
};

const containerVariants = (staggerDelay: number, initialDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

// Item variants per arah — konsisten dengan AnimateIn
const itemVariantsMap: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.48, ease },
    },
  },
  down: {
    hidden: { opacity: 0, y: -22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.48, ease },
    },
  },
  left: {
    hidden: { opacity: 0, x: 28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.48, ease },
    },
  },
  right: {
    hidden: { opacity: 0, x: -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.48, ease },
    },
  },
  none: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease },
    },
  },
};

export const StaggerChildren = ({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0.04,
  once = true,
}: StaggerChildrenProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={containerVariants(staggerDelay, initialDelay)}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) => {
  const v = itemVariantsMap[direction] ?? itemVariantsMap.up;
  return (
    <motion.div className={className} variants={v}>
      {children}
    </motion.div>
  );
};