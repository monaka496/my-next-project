import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Unixタイムスタンプ相互変換 | 便利ツール一覧 | monaka",
  description:
    "Unixタイムスタンプと日時を相互に変換します。現在のタイムスタンプのリアルタイム表示や、ミリ秒（13桁）・秒（10桁）の自動判別機能を搭載。",
};

export default function UnixTimeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
