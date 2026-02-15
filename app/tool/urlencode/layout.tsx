import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "URLエンコード・デコード | 便利ツール一覧 | monaka",
  description:
    "日本語などのマルチバイト文字や記号をURLセーフな形式に変換（エンコード）したり、元の文字列に復元（デコード）したりします。",
  openGraph: {
    title: "URLエンコード・デコード | 便利ツール一覧 | monaka",
    description:
      "日本語などのマルチバイト文字や記号をURLセーフな形式に変換（エンコード）したり、元の文字列に復元（デコード）したりします。",
  },
  twitter: {
    title: "URLエンコード・デコード | 便利ツール一覧 | monaka",
    description:
      "日本語などのマルチバイト文字や記号をURLセーフな形式に変換（エンコード）したり、元の文字列に復元（デコード）したりします。",
  },
};

export default function UrlEncodeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
