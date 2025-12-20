"use client";

import Script from "next/script";

export default function Adsense() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6783574511450629"
      crossOrigin="anonymous"
      strategy="afterInteractive" // ページの読み込み完了後に実行
    />
  );
}
