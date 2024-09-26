import "./globals.css";

import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
