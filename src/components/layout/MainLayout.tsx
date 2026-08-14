import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

export const MainLayout = () => {
  const location = useLocation();

  // Menangkap posisi scroll untuk efek parallax
  const { scrollY } = useScroll();

  // Saat di-scroll ke bawah (0 -> 1000px), glow akan bergerak ke atas secara perlahan
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -250]);
  const opacity = useTransform(scrollY, [0, 300], [0.8, 0.3]);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-background selection:bg-accent/30 selection:text-white">

      {/* Scroll Progress Bar Global */}
      <ScrollProgress />

      {/* TAHAP 7: Parallax Ambient Glow Background */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center overflow-hidden" aria-hidden>
        {/* Glow Atas - Bergerak lebih lambat */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute -top-[20%] w-[800px] h-[400px] rounded-[100%] bg-accent/5 blur-[120px]"
        />
        {/* Glow Bawah Kanan - Bergerak lebih cepat untuk ilusi kedalaman */}
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[60%] -right-[20%] w-[600px] h-[500px] rounded-[100%] bg-blue-500/5 blur-[120px]"
        />
      </div>

      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>

      <Header />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          key={location.pathname}
          id="main-content"
          tabIndex={-1}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative z-10 min-h-[70vh] w-full max-w-full overflow-x-hidden pt-[72px]"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <div className="relative z-10">
        <Footer />
      </div>

      <WhatsAppButton />
    </div>
  );
};