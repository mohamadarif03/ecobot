"use client";

import * as React from "react";
import SkateDeckRail from "@/components/ui/skate-deck-rail";
import type { SkateDeck } from "@/components/ui/skate-deck-rail";
import { Check, ShoppingBag, ChevronDown } from "lucide-react";

export const SKATE_DEMO_DECKS: SkateDeck[] = [
  {
    id: "kulit-pisang",
    name: "Kulit Pisang",
    series: "Organik",
    width: "Organik",
    tag: "2-5 minggu",
    description: "Kulit pisang terurai cepat (2-5 minggu) dan dapat diolah menjadi kompos alami untuk menyuburkan tanah.",
    details: ["Sampah Organik", "2-5 Minggu terurai", "Tong Hijau", "Bisa dibuat kompos"],
    image: "/assets/sampah/kulit-pisang.svg",
  },
  {
    id: "koran",
    name: "Kertas Koran",
    series: "Anorganik",
    width: "Kertas",
    tag: "2-6 minggu",
    description: "Kertas bisa didaur ulang jadi kertas baru dan menyelamatkan pohon dari penebangan.",
    details: ["Kertas Kering", "2-6 Minggu terurai", "Tong Kuning", "Bisa didaur ulang"],
    image: "/assets/sampah/koran.svg",
  },
  {
    id: "puntung-rokok",
    name: "Puntung Rokok",
    series: "Anorganik",
    width: "Residu",
    tag: "1-12 tahun",
    description: "Filternya mengandung serat plastik selulosa asetat dan melepaskan zat beracun ke tanah dan air.",
    details: ["Residu Toksik", "1-12 Tahun terurai", "Tong Kuning", "Zat Kimia Beracun"],
    image: "/assets/sampah/puntung-rokok.svg",
  },
  {
    id: "kantong-plastik",
    name: "Kantong Plastik",
    series: "Anorganik",
    width: "Plastik",
    tag: "10-20 tahun",
    description: "Sering dimakan hewan laut karena dikira ubur-ubur, dan lama-lama pecah jadi mikroplastik berbahaya.",
    details: ["Plastik Sekali Pakai", "10-20 Tahun terurai", "Tong Kuning", "Ancaman Laut"],
    image: "/assets/sampah/kantong-plastik.svg",
  },
  {
    id: "kaleng",
    name: "Kaleng Aluminium",
    series: "Anorganik",
    width: "Logam",
    tag: "80-200 tahun",
    description: "Sangat lama terurai di alam, padahal aluminium bisa didaur ulang 100% berkali-kali tanpa batas.",
    details: ["Logam Aluminium", "80-200 Tahun terurai", "Tong Kuning", "100% Dapat Didaur Ulang"],
    image: "/assets/sampah/kaleng.svg",
  },
  {
    id: "botol-plastik",
    name: "Botol Plastik",
    series: "Anorganik",
    width: "PET",
    tag: "±450 tahun",
    description: "Lama sekali di alam dan hancur menjadi partikel mikroplastik yang mencemari air minum dan rantai makanan.",
    details: ["Plastik PET", "±450 Tahun terurai", "Tong Kuning", "Penyumbang Mikroplastik"],
    image: "/assets/sampah/botol-plastik.svg",
  },
  {
    id: "styrofoam",
    name: "Styrofoam",
    series: "Anorganik",
    width: "Polistirena",
    tag: "500+ tahun",
    description: "Sulit didaur ulang dan mudah hancur menjadi serpihan butiran kecil yang mencemari sungai dan lautan.",
    details: ["Polistirena", "500+ Tahun terurai", "Tong Kuning", "Sangat Sulit Terurai"],
    image: "/assets/sampah/styrofoam.svg",
  },
  {
    id: "botol-kaca",
    name: "Botol Kaca",
    series: "Anorganik",
    width: "Kaca",
    tag: "1.000+ tahun",
    description: "Hampir abadi di alam dan tidak terurai, tapi kaca bisa dicairkan dan didaur ulang seutuhnya tanpa kehilangan mutu.",
    details: ["Kaca Silika", "1.000+ Tahun terurai", "Tong Kuning", "Juara Daur Ulang Abadi"],
    image: "/assets/sampah/botol-kaca.svg",
  },
];

function AddToCart({ price }: { price?: string }) {
  const [added, setAdded] = React.useState(false);
  return (
    <button
      type="button"
      aria-pressed={added}
      onClick={() => setAdded((value) => !value)}
      className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
    >
      {added ? (
        <>
          <Check aria-hidden="true" className="size-3.5" />
          Tersimpan
        </>
      ) : (
        <>Fakta Terurai{price ? ` · ${price}` : ""}</>
      )}
    </button>
  );
}

export interface SkateDeckRailDemoProps {
  autoplay?: boolean;
  id?: string;
  eyebrow?: string;
  heading?: string;
  caption?: string;
  className?: string;
}

export default function SkateDeckRailDemo({
  autoplay = true,
  id,
  eyebrow = "Dinding Waktu · Lama Terurai",
  heading = "Berapa lama sampah bertahan di alam?",
  caption = "Geser rail untuk memilih sampah, putar atau klik untuk melihat detail lengkapnya.",
  className,
}: SkateDeckRailDemoProps = {}) {
  return (
    <div
      id={id}
      data-skate-demo
      className={`flex min-h-svh w-full items-center justify-center bg-background text-foreground scroll-mt-6 ${className ?? ""}`}
    >
      <SkateDeckRail
        items={SKATE_DEMO_DECKS}
        eyebrow={eyebrow}
        heading={heading}
        caption={caption}
        autoplay={autoplay}
        detailAction={(deck) => <AddToCart key={deck.id} price={deck.tag} />}
        action={
          <a
            href="#cara-bermain"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            <span>Pelajari Cara Bermain</span>
            <ChevronDown className="size-4" />
          </a>
        }
      />
    </div>
  );
}
