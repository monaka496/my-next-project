import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "重複削除ツール | 便利ツール一覧 | monaka",
  description:
    "テキストリストから重複した行や不要な空行を一括で削除します。行頭・行末の余白削除機能も搭載。データの整理やリスト作成を効率化します。",
  openGraph: {
    title: "重複削除ツール | 便利ツール一覧 | monaka",
    description:
      "リストデータの整理に最適。重複削除や空行詰めをブラウザ上で安全に行えます。",
  },
};

export default function TextCleanerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
