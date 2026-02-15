import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "安全なパスワード生成ツール | 便利ツール一覧 | monaka",
  description:
    "複雑で安全なパスワードをブラウザ上で生成します。長さの指定や記号の有無、紛らわしい文字の除外設定が可能。生成されたデータはサーバーに送信されないため安心です。",
  openGraph: {
    title: "安全なパスワード生成ツール | 便利ツール一覧 | monaka",
    description:
      "強力なパスワードを即座に生成。セキュリティに配慮し、ブラウザ完結で動作します。",
  },
};

export default function PasswordLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
