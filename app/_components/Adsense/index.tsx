"use client";
import { useEffect, useRef } from "react";

export default function Adsense() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && adRef.current) {
        const adsbygoogle = (window as any).adsbygoogle || [];
        // 同じ広告枠への二重pushを防止
        if (adRef.current.childNodes.length === 0) {
          adsbygoogle.push({});
        }
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div ref={adRef}>
      {/* <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6783574511450629"
        data-ad-slot="4324807365"
        data-ad-format="autorelaxed"
      ></ins> */}
    </div>
  );
}
