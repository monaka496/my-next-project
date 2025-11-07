import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import SideMenu from "./_components/SideMenu";
import {
  getAllCategoryList,
  getAllTagList,
  type Category,
  type Tag,
} from "./_libs/microcms";

export const metadata: Metadata = {
  metadataBase: new URL("https://monaka496.com"),
  title: {
    template: "%s | monaka",
    default: "monaka",
  },
  description: "日々の学びをアウトプットするブログです。",
  openGraph: {
    title: "monaka",
    description: "日々の学びをアウトプットするブログです。",
    images: ["/ogp.png"],
  },
};

// カテゴリ・タグリスト
async function getData() {
  const categories = await getAllCategoryList(); // カテゴリデータを取得
  const tags = await getAllTagList(); // タグデータを取得
  return { categories, tags };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { categories, tags } = await getData(); // カテゴリ・タグデータを取得

  return (
    <html lang="ja">
      <body>
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6783574511450629"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        ></Script> */}
        <Header />
        <div className="layout">
          <main className="content">{children}</main>
          <aside className="sidemenu">
            <SideMenu categories={categories} tags={tags} />
          </aside>
        </div>
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-PB3JSF3G" />
    </html>
  );
}
