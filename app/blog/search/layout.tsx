// search/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false, // 検索エンジンに登録させない
    follow: false, // 検索結果内のリンクを辿らせない
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
