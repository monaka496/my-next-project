import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "JSON整形（フォーマッター） | 便利ツール一覧 | monaka",
  description:
    "ブラウザ上でJSONデータを綺麗に整形・インデントします。スペース2つ、4つ、タブの切り替えが可能。データはサーバーに送信されないため、機密情報の整形も安心です。",
  openGraph: {
    title: "JSON整形（フォーマッター） | 便利ツール一覧 | monaka",
    description:
      "ぐちゃぐちゃなJSONをワンクリックで読みやすく整形。エラーチェックにも最適です。",
  },
};

export default function JsonFormatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
