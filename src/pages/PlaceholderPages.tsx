import { PlaceholderPage } from "../components/dashboard/PlaceholderPage";
import {
  BookOpen,
  HelpCircle,
  Leaf,
  Trophy,
  ShoppingBag,
  Award,
  Settings,
  Info,
} from "lucide-react";

export function PustakaPage() {
  return (
    <PlaceholderPage
      title="Pustaka Edukasi"
      subtitle="Kumpulan kartu belajar interaktif dan fakta ramah anak"
      icon={<BookOpen className="w-10 h-10 text-sky-600" />}
      moduleName="Pustaka Edukasi Lingkungan"
      description="Pelajari jenis sampah organik, anorganik, limbah B3 berbahaya, serta teknik membuat kompos ramah lingkungan di rumah."
    />
  );
}

export function BantuanPage() {
  return (
    <PlaceholderPage
      title="Bantuan & Panduan"
      subtitle="Cara bermain, panduan kontrol, dan tanya jawab ramah anak"
      icon={<Info className="w-10 h-10 text-sky-600" />}
      moduleName="Panduan Bermain bersama Ecobot"
      description="Pelajari cara menggerakkan karakter, mengambil sampah, memilih tong yang tepat, serta tip agar selalu menang dalam misi."
    />
  );
}
