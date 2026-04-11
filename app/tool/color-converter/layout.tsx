import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "カラーコード変換（HEX / RGB / HSL） | 便利ツール一覧 | monaka",
  description:
    "ブラウザ上でカラーコードを相互変換。HEX、RGB、HSL、RGBAに対応。背景色とのコントラスト確認や透明度調整も可能です。",
};

export default function ColorConverterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
