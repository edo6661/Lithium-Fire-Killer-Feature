import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { AboutPage } from "../pages/AboutPage";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";
import { LithiumFireSafetyPage } from "../pages/LithiumFireSafetyPage";
import { LfkXArkivPage } from "../pages/LfkXArkivPage"; // <-- Import ini

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route
          path="tentang-kami"
          element={<Navigate to="/about" replace />}
        />
        <Route
          path="lithium-fire-safety"
          element={<LithiumFireSafetyPage />}
        />
        <Route path="contact" element={<ContactPage />} />

        {/* Update rute lfk-x-arkiv di sini */}
        <Route path="lfk-x-arkiv" element={<LfkXArkivPage />} />

        <Route
          path="kontak"
          element={<Navigate to="/contact" replace />}
        />
      </Route>
    </Routes>
  );
};