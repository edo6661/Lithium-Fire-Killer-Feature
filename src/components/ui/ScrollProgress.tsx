import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  // Spring physics — smooth tracking tanpa lag
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #3898d4 0%, #60a5fa 50%, #22d3ee 100%)",
        }}
        aria-hidden="true"
      />
      {/* Trailing glow dot */}
      <motion.div
        className="fixed top-0 z-[100] h-[2px] w-8 rounded-full blur-sm"
        style={{
          scaleX,
          transformOrigin: "left",
          background: "linear-gradient(90deg, transparent, #3898d4, #22d3ee)",
          opacity: 0.7,
        }}
        aria-hidden="true"
      />
    </>
  );
};