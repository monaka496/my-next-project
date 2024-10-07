import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import SideMenu from "./_components/SideMenu";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <div className="layout">
          <main className="content">{children}</main>
          <aside className="sidemenu">
            <SideMenu />
          </aside>
        </div>
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-PB3JSF3G" />
    </html>
  );
}
