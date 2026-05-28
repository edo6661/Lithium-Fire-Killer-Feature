import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>

      <Header />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          key={location.pathname}
          id="main-content"
          tabIndex={-1}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative min-h-[60vh] w-full"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </>
  );
};