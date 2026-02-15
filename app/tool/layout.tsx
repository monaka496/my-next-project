import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "便利ツール一覧 | エンジニア向けオンラインツール集 | monaka",
  description:
    "URLエンコードやBase64変換など、エンジニアの日常業務を効率化する便利ツール集です。データはブラウザ内で処理されるため、セキュリティ面も安心です。",
  openGraph: {
    title: "便利ツール一覧 | エンジニア向けオンラインツール集 | monaka",
    description:
      "登録不要・完全無料で使えるエンジニア向け便利ツール一覧。URL変換、Base64、開発効率化ツールなど。",
  },
};

export default function ToolListLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
