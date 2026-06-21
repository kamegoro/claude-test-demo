export interface FormData {
  name: string;
  email: string;
  category: "bug" | "feature" | "general";
  message: string;
}

export type ViewState = "form" | "confirm" | "complete";

export const categoryLabels: Record<FormData["category"], string> = {
  bug: "バグ報告",
  feature: "機能リクエスト",
  general: "一般的なお問い合わせ",
};
