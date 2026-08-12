import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FloatingBlobsProps = {
  className?: string;
};

type BlobSpec = {
  src: string;
  className: string;
  animate: { y?: number[]; x?: number[]; rotate?: number[] };
  duration: number;
  delay?: number;
  mobile?: boolean;
};

const BLOBS: BlobSpec[] = [
  {
    src: "/arkiv/graphic-elements/Blob.png",
    className: "absolute top-[10%] left-[-5%] w-48 opacity-70 sm:w-80 sm:opacity-80",
    animate: { y: [0, -30, 0], rotate: [0, 10, -5, 0] },
    duration: 8,
    mobile: true,
  },
  {
    src: "/arkiv/graphic-elements/Blob-2.png",
    className: "absolute top-[30%] right-[-10%] w-56 opacity-75 sm:w-96 sm:opacity-90",
    animate: { y: [0, 40, 0], rotate: [0, -10, 5, 0] },
    duration: 12,
    mobile: true,
  },
  {
    src: "/arkiv/graphic-elements/Blob-3.png",
    className: "absolute bottom-[40%] left-[5%] hidden w-48 opacity-70 sm:block",
    animate: { y: [0, -25, 0] },
    duration: 9,
    delay: 1,
  },
  {
    src: "/arkiv/graphic-elements/Blob-4.png",
    className: "absolute bottom-[10%] right-[10%] hidden w-56 opacity-85 sm:block",
    animate: { x: [0, -20, 0], y: [0, 20, 0] },
    duration: 10,
  },
  {
    src: "/arkiv/graphic-elements/Blob-5.png",
    className: "absolute top-[60%] left-[30%] hidden w-32 opacity-60 sm:block",
    animate: { y: [0, -15, 0], rotate: [0, 5, 0] },
    duration: 7,
    delay: 2,
  },
];

export const FloatingBlobs = ({ className = "" }: FloatingBlobsProps) => {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const visibleBlobs = isMobile ? BLOBS.filter((b) => b.mobile) : BLOBS;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden
    >
      {visibleBlobs.map((blob) => (
        <motion.img
          key={blob.src}
          src={blob.src}
          alt=""
          decoding="async"
          loading="lazy"
          animate={reduceMotion || isMobile ? undefined : blob.animate}
          transition={
            reduceMotion || isMobile
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: blob.delay,
                }
          }
          className={blob.className}
        />
      ))}
    </div>
  );
};
