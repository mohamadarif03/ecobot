import { Link } from "react-router-dom";
import SkateDeckRailDemo from "../demo";

export default function SectionPage() {
  return (
    <div className="relative">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-black/80 hover:bg-black rounded-full backdrop-blur-md transition-all shadow-md hover:scale-105"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
      <SkateDeckRailDemo autoplay={true} />
    </div>
  );
}
