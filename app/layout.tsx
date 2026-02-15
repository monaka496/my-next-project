import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import SideMenu from "./_components/SideMenu";
import { getAllCategoryList, getAllTagList } from "./_libs/microcms";
import Adsense from "./_components/Adsense";

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

async function getData() {
  const categories = await getAllCategoryList();
  const tags = await getAllTagList();
  return { categories, tags };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categories, tags } = await getData();

  return (
    <html lang="ja">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PB3JSF3G');
          `}
        </Script>
        <Adsense />
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PB3JSF3G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Header />
        <main className="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
