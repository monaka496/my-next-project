import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Base64エンコード・デコード | 便利ツール一覧 | monaka",
  description:
    "テキストをBase64形式に変換、または元の文字列に復元します。日本語（UTF-8）の変換にも対応しており、データの転送や埋め込みに便利です。",
  openGraph: {
    title: "Base64エンコード・デコード | 便利ツール一覧 | monaka",
    description:
      "テキストをBase64形式に変換、または元の文字列に復元します。日本語（UTF-8）の変換にも対応しており、データの転送や埋め込みに便利です。",
  },
  twitter: {
    title: "Base64エンコード・デコード | 便利ツール一覧 | monaka",
    description:
      "テキストをBase64形式に変換、または元の文字列に復元します。日本語（UTF-8）の変換にも対応しており、データの転送や埋め込みに便利です。",
  },
};

export default function Base64Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
