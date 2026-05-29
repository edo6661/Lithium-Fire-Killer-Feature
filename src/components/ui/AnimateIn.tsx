import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none" | "scale";

type AnimateInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
};

// Easing curve — smooth deceleration (tidak "bouncy")
const ease = [0.21, 0.47, 0.32, 0.98] as const;

const variants: Record<Direction, Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -28 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0 } },
  none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, scale: 0.93 },
    visible: { opacity: 1, scale: 1 },
  },
};

export const AnimateIn = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.52,
  once = true,
  amount = 0.15,
}: AnimateInProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px", amount }}
      transition={{ duration, delay, ease }}
      variants={variants[direction]}
    >
      {children}
    </motion.div>
  );
};