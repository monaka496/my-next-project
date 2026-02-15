"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

export default function Base64ConverterPage() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  // --- 設定情報 ---
  const toolId = "base64"; // 構造化データとナビゲーションに使用
  const displayTitle = "Base64エンコード・デコード";
  const displayDescription =
    "テキストをBase64形式に変換、または元の文字列に復元します。日本語（UTF-8）にも対応しています。";

  useEffect(() => {
    if (!input) {
      setEncoded("");
      setDecoded("");
      return;
    }

    // --- Base64 エンコード処理 (日本語対応) ---
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const binString = Array.from(data, (byte) =>
        String.fromCharCode(byte),
      ).join("");
      setEncoded(btoa(binString));
    } catch (e) {
      setEncoded("エラー: エンコードできません");
    }

    // --- Base64 デコード処理 (日本語対応) ---
    try {
      const binString = atob(input.trim());
      const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
      setDecoded(new TextDecoder().decode(bytes));
    } catch (e) {
      setDecoded("（有効なBase64文字列を入力するとデコードされます）");
    }
  }, [input]);

  const copyToClipboard = (text: string) => {
    if (!text || text.startsWith("（") || text.startsWith("エラー")) return;
    navigator.clipboard.writeText(text);
    alert("コピーしました！");
  };

  return (
    <div className={styles.container}>
      {/* currentPage と toolId を渡し、パンくずの見た目と構造化データを同期 */}
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />

      <h1 className={styles.title}>{displayTitle}</h1>
      <p className={styles.description}>{displayDescription}</p>

      <div className={styles.section}>
        <label className={styles.label}>
          入力テキスト（またはBase64文字列）
        </label>
        <textarea
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="変換したいテキストをここに入力..."
        />
      </div>

      {/* 修正ポイント：1カラムレイアウト用の resultArea クラスを使用 */}
      <div className={styles.resultArea}>
        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Base64エンコード結果</span>
            <button
              onClick={() => copyToClipboard(encoded)}
              className={styles.copyButton}
            >
              コピー
            </button>
          </div>
          <div className={styles.resultBox}>{encoded || "..."}</div>
        </div>

        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Base64デコード結果</span>
            <button
              onClick={() => copyToClipboard(decoded)}
              className={styles.copyButton}
            >
              コピー
            </button>
          </div>
          <div className={styles.resultBox}>{decoded || "..."}</div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>Base64とは？</h2>
        <p>
          Base64は、データを64種類の英数字のみを使用して表現する方式です。
          バイナリデータをテキスト形式で扱いたい場合や、メール送信、HTML内への画像埋め込みなどで広く利用されています。
        </p>
        <h2>日本語対応について</h2>
        <p>
          通常のBase64変換では日本語が文字化けすることがありますが、当ツールはUTF-8形式で正しく処理を行うため、
          日本語を含むテキストも安全に変換・復元が可能です。
        </p>
      </div>

      {/* 現在のIDを渡し、ナビゲーションから自分を除外 */}
      <ToolNav currentId={toolId} />
    </div>
  );
}
