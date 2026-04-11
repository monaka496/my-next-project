"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

export default function ColorConverterPage() {
  const [input, setInput] = useState("#563BFF");
  const [mounted, setMounted] = useState(false);
  const [converted, setConverted] = useState<{
    hex: string;
    rgb: string;
  } | null>(null);

  const toolId = "color-converter";
  const displayTitle = "カラーコード変換";

  // マウント状態を管理
  useEffect(() => {
    setMounted(true);
  }, []);

  // ブラウザ上でのみ色を変換する
  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;

    const el = document.createElement("div");
    el.style.color = input;
    document.body.appendChild(el);
    const rgbRaw = window.getComputedStyle(el).color;
    document.body.removeChild(el);

    if (!rgbRaw || rgbRaw === "rgba(0, 0, 0, 0)" || rgbRaw === "transparent") {
      setConverted(null);
      return;
    }

    const rgbMatch = rgbRaw.match(/\d+/g);
    if (!rgbMatch) {
      setConverted(null);
      return;
    }

    const [r, g, b] = rgbMatch.map(Number);
    const toHex = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    setConverted({ hex, rgb: rgbRaw });
  }, [input, mounted]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("コピーしました！");
  };

  // マウント前は何も表示しないか、ローディングを表示してハイドレーションエラーを防ぐ
  if (!mounted) {
    return <div className={styles.container}></div>;
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />
      <h1 className={styles.title}>{displayTitle}</h1>
      <p className={styles.description}>
        HEX、RGB、カラーネームを相互に変換します。
      </p>

      <div className={styles.section}>
        <label className={styles.label}>カラーコードを入力</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.textarea}
          style={{ height: "54px" }}
          placeholder="例: #563bff, rgb(86, 59, 255), red"
        />
      </div>

      <div className={styles.resultArea}>
        {converted ? (
          <div className={styles.resultCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>変換結果</span>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: converted.rgb,
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                }}
              />
            </div>

            <div className={styles.paramGrid}>
              <div className={styles.paramHeader}>
                <span>Format</span>
                <span>Value</span>
              </div>

              <div className={styles.paramRow}>
                <div
                  style={{
                    padding: "14px 16px",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: "#475569",
                    borderRight: "1px solid #e2e8f0",
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    minWidth: "80px",
                  }}
                >
                  HEX
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "12px",
                    flex: 1,
                    background: "#fff",
                  }}
                >
                  <input
                    className={styles.paramInput}
                    value={converted.hex}
                    readOnly
                    style={{ border: "none", flex: 1 }}
                  />
                  <button
                    onClick={() => copyToClipboard(converted.hex)}
                    className={styles.copyButton}
                  >
                    コピー
                  </button>
                </div>
              </div>

              <div className={styles.paramRow}>
                <div
                  style={{
                    padding: "14px 16px",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: "#475569",
                    borderRight: "1px solid #e2e8f0",
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    minWidth: "80px",
                  }}
                >
                  RGB
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "12px",
                    flex: 1,
                    background: "#fff",
                  }}
                >
                  <input
                    className={styles.paramInput}
                    value={converted.rgb}
                    readOnly
                    style={{ border: "none", flex: 1 }}
                  />
                  <button
                    onClick={() => copyToClipboard(converted.rgb)}
                    className={styles.copyButton}
                  >
                    コピー
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "16px",
              background: "#fff1f2",
              color: "#e11d48",
              borderRadius: "12px",
              fontSize: "0.9rem",
              border: "1px solid #fda4af",
            }}
          >
            有効な色を入力してください
          </div>
        )}
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>使い方と対応形式</h2>
        <p>
          入力欄に「#」から始まる16進数、または「rgb()」形式の数値を入力してください。
          「red」「blue」といったカラーネームの変換にも対応しています。
        </p>
      </div>

      <ToolNav currentId={toolId} />
    </div>
  );
}
