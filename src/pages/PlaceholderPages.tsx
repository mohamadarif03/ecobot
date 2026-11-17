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

export function PencapaianPage() {
  return (
    <PlaceholderPage
      title="Pencapaian & Badge"
      subtitle="Koleksi piala, badge kebersihan, dan kartu fakta unik"
      icon={<Trophy className="w-10 h-10 text-amber-500" />}
      moduleName="Koleksi Badge & Prestasi"
      description="Buka seluruh badge petualang kota bersih dan unduh sertifikat kelulusan digitalmu setelah semua misi rampung."
    />
  );
}

export function TokoPage() {
  return (
    <PlaceholderPage
      title="Toko Hadiah"
      subtitle="Tukarkan poin belajarmu dengan aksesori keren"
      icon={<ShoppingBag className="w-10 h-10 text-rose-500" />}
      moduleName="Toko Aksesori Ecobot"
      description="Gunakan poin yang didapat dari memilah sampah untuk membeli topi, kacamata, dan stiker keren untuk karakter dan Ecobot."
    />
  );
}

export function PapanPeringkatPage() {
  return (
    <PlaceholderPage
      title="Papan Peringkat"
      subtitle="Lihat relawan cilik teraktif minggu ini di seluruh kota"
      icon={<Award className="w-10 h-10 text-indigo-600" />}
      moduleName="Papan Peringkat Mingguan"
      description="Kumpulkan XP dari game, kuis, dan aksi nyata untuk memuncaki podium pahlawan lingkungan tanpa data pribadi."
    />
  );
}

export function PengaturanPage() {
  return (
    <PlaceholderPage
      title="Pengaturan"
      subtitle="Atur volume suara, kualitas visual grafis, dan kontrol game"
      icon={<Settings className="w-10 h-10 text-slate-600" />}
      moduleName="Pengaturan Game & Dashboard"
      description="Sesuaikan kontrol sentuh analog di ponsel atau tombol WASD di laptop, audio musik latar, dan kualitas grafis 3D."
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
