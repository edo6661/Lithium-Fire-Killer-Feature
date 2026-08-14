import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { AboutPage } from "../pages/AboutPage";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";
import { LithiumFireSafetyPage } from "../pages/LithiumFireSafetyPage";
import { LfkXArkivPage } from "../pages/LfkXArkivPage";
import { InternalOrdersPage } from "../pages/InternalOrdersPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="internal" element={<InternalOrdersPage />} />

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
        <Route path="lfk-x-arkiv" element={<LfkXArkivPage />} />
        <Route
          path="kontak"
          element={<Navigate to="/contact" replace />}
        />

        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
