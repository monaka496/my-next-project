import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "文字数カウント | 便利ツール一覧 | monaka",
  description:
    "リアルタイムで文字数、行数、バイト数をカウントします。空白の除外設定や、原稿用紙換算も可能。ブログ執筆やSNS投稿の文字数確認に最適です。",
  openGraph: {
    title: "文字数カウント | 便利ツール一覧 | monaka",
    description:
      "リアルタイムで文字数、行数、バイト数をカウントします。データはブラウザ内で処理されるため安心です。",
  },
};

export default function WordCountLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
