import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "URLパラメータ解析・編集 | 便利ツール一覧 | monaka",
  description:
    "URLに含まれるクエリパラメータを抽出し、キーと値のペアを一覧表示します。デコード機能や、値を編集して新しいURLを生成する機能も搭載。",
};

export default function UrlParserLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
