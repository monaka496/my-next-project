import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "HTMLエスケープ（特殊文字変換） | 便利ツール一覧 | monaka",
  description:
    "HTMLタグの特殊文字（<, >, &, \", '）をHTMLエンティティ（&lt;など）に変換します。ブログのコード表示やプログラミング時のエスケープ処理に最適です。",
  openGraph: {
    title: "HTMLエスケープ（特殊文字変換） | 便利ツール一覧 | monaka",
    description:
      "HTMLタグを安全に表示するためのエスケープツール。ブラウザ完結で安全に変換できます。",
  },
};

export default function HtmlEscapeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
