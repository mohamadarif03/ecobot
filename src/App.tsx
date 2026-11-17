import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SectionPage from "./pages/SectionPage";
import BerandaPage from "./pages/BerandaPage";
import OnboardingPage from "./pages/OnboardingPage";
import MainGamePage from "./pages/MainGamePage";
import MisiPage from "./pages/MisiPage";
import PrivasiPage from "./pages/PrivasiPage";
import SumberPage from "./pages/SumberPage";
import KuisPage from "./pages/KuisPage";
import KuisPlayerPage from "./pages/KuisPlayerPage";
import AksiNyataPage from "./pages/AksiNyataPage";
import PencapaianPage from "./pages/PencapaianPage";
import {
  PustakaPage,
  TokoPage,
  PapanPeringkatPage,
  PengaturanPage,
  BantuanPage,
} from "./pages/PlaceholderPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/section" element={<SectionPage />} />

        {/* Legal & Reference Pages */}
        <Route path="/privasi" element={<PrivasiPage />} />
        <Route path="/sumber" element={<SumberPage />} />

        {/* ECOBOT Educational Dashboard Pages */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/beranda" element={<BerandaPage />} />
        <Route path="/main-game" element={<MainGamePage />} />
        <Route path="/misi" element={<MisiPage />} />
        <Route path="/pustaka" element={<PustakaPage />} />
        <Route path="/kuis" element={<KuisPage />} />
        <Route path="/kuis/main" element={<KuisPlayerPage />} />
        <Route path="/aksi-nyata" element={<AksiNyataPage />} />
        <Route path="/pencapaian" element={<PencapaianPage />} />
        <Route path="/toko" element={<TokoPage />} />
        <Route path="/papan-peringkat" element={<PapanPeringkatPage />} />
        <Route path="/pengaturan" element={<PengaturanPage />} />
        <Route path="/bantuan" element={<BantuanPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
