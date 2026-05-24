import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type StaggerChildrenProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
};

const containerVariants = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export const StaggerChildren = ({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerChildrenProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={containerVariants(staggerDelay)}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};