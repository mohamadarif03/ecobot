export type QuestionDifficulty = "mudah" | "sedang";

export interface QuizOption {
  id: string; // e.g. "a", "b", "c", "d"
  teks: string;
}

export interface QuizQuestion {
  id: string;
  topikId: string;
  tingkat: QuestionDifficulty;
  teks: string; // Max 25 words
  gambar?: string; // Path to SVG/image in /assets/sampah
  pilihan: QuizOption[]; // 3-4 options, max 10 words each
  benarId: string;
  penjelasan: string; // 1-2 friendly sentences explaining the reason
  hint?: string;
  materiSlug: string; // Slug of Pustaka topic for review links
}

export interface QuizTopicMeta {
  id: string;
  slug: string;
  judul: string;
  deskripsi: string;
  icon: string;
  color: string;
  badgeBg: string;
}
