"use client";
import { useEffect } from "react";

export default function AdSense() {
  useEffect(() => {
    try {
      // 広告を初期化
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-6783574511450629"
      data-ad-slot="4324807365"
      data-ad-format="autorelaxed"
      data-full-width-responsive="true"
    ></ins>
  );
}
