"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdUnit() {
  const initialized = useRef(false); // 二重実行防止用のフラグ

  useEffect(() => {
    // すでに初期化済みの場合は何もしない
    if (initialized.current) return;

    try {
      if (typeof window !== "undefined") {
        const adsbygoogle = window.adsbygoogle || [];

        // DOM上の未処理の広告枠があるか念のため確認
        // (開発モードでのエラー回避に非常に有効です)
        adsbygoogle.push({});

        initialized.current = true; // 完了フラグを立てる
      }
    } catch (err) {
      console.error("AdSense error", err);
    }
  }, []);

  return (
    <div style={{ marginTop: "20px", width: "100%", minHeight: "280px" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-6783574511450629"
        data-ad-slot="4324807365"
      ></ins>
    </div>
  );
}
