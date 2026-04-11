"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

export default function HtmlEscapePage() {
  const [input, setInput] = useState("");
  const [escaped, setEscaped] = useState("");
  const [unescaped, setUnescaped] = useState("");

  const toolId = "html-escape";
  const displayTitle = "HTMLエスケープ（特殊文字変換）";
  const displayDescription =
    "HTMLの特殊文字をエスケープ形式に変換、または元の形式に復元します。";

  useEffect(() => {
    if (!input) {
      setEscaped("");
      setUnescaped("");
      return;
    }

    // エスケープ処理
    const escapeMap: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    setEscaped(input.replace(/[&<>"']/g, (s) => escapeMap[s]));

    // アンエスケープ（復元）処理
    const unescapeMap: { [key: string]: string } = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
    };
    setUnescaped(
      input.replace(/(&(amp|lt|gt|quot|#39);)/g, (s) => unescapeMap[s]),
    );
  }, [input]);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("コピーしました！");
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />

      <h1 className={styles.title}>{displayTitle}</h1>
      <p className={styles.description}>{displayDescription}</p>

      <div className={styles.section}>
        <label className={styles.label}>テキストを入力</label>
        <textarea
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<div>サンプル</div> など..."
        />
      </div>

      <div className={styles.resultArea}>
        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              エスケープ後（&lt; → &amp;lt;）
            </span>
            <button
              onClick={() => copyToClipboard(escaped)}
              className={styles.copyButton}
            >
              コピー
            </button>
          </div>
          <div className={styles.resultBox}>{escaped || "..."}</div>
        </div>

        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>復元（&amp;lt; → &lt;）</span>
            <button
              onClick={() => copyToClipboard(unescaped)}
              className={styles.copyButton}
            >
              コピー
            </button>
          </div>
          <div className={styles.resultBox}>{unescaped || "..."}</div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>HTMLエスケープとは？</h2>
        <p>
          HTMLで特別な意味を持つ文字（{"` < `"} や {"` > `"}{" "}
          など）を、ブラウザがタグとして解釈しないように特定の文字列（実体参照）に置き換える処理です。
          ブログ記事の中でソースコードを表示したい場合などに必須の作業となります。
        </p>
        <h2>エスケープ対象の文字</h2>
        <p>
          当ツールでは、セキュリティ上の理由から以下の5文字を標準的に変換します。
          <br />・{"`&`"}（アンパサンド）
          <br />・{"`<`"}（不等号：より小さい）
          <br />・{"`>`"}（不等号：より大きい）
          <br />・{'`"`'}（ダブルクォーテーション）
          <br />・{"`'`"}（シングルクォーテーション）
        </p>
      </div>

      <ToolNav currentId={toolId} />
    </div>
  );
}
