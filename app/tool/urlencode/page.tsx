"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

export default function UrlConverterPage() {
  const [input, setInput] = useState("");
  const [urlEncoded, setUrlEncoded] = useState("");
  const [urlDecoded, setUrlDecoded] = useState("");

  // --- 設定情報 ---
  const toolId = "urlencode"; // 構造化データとナビゲーションに使用
  const displayTitle = "URLエンコード・デコード";
  const displayDescription =
    "日本語などのマルチバイト文字や記号をURLセーフな形式に変換（エンコード）したり、元の文字列に復元（デコード）したりします。";

  useEffect(() => {
    // 入力が空の場合は結果も空にする
    if (!input) {
      setUrlEncoded("");
      setUrlDecoded("");
      return;
    }

    // エンコード処理
    try {
      setUrlEncoded(encodeURIComponent(input));
    } catch (e) {
      setUrlEncoded("エラー: エンコードできません");
    }

    // デコード処理
    try {
      setUrlDecoded(decodeURIComponent(input));
    } catch (e) {
      setUrlDecoded(
        "（有効なURLエンコード文字列を入力するとデコードされます）",
      );
    }
  }, [input]);

  const copyToClipboard = (text: string) => {
    if (!text || text.startsWith("（") || text.startsWith("エラー")) return;
    navigator.clipboard.writeText(text);
    alert("コピーしました！");
  };

  return (
    <div className={styles.container}>
      {/* 階層名とIDをPropsで渡し、構造化データを動的に生成 */}
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />

      <h1 className={styles.title}>{displayTitle}</h1>
      <p className={styles.description}>{displayDescription}</p>

      <div className={styles.section}>
        <label className={styles.label}>入力テキスト</label>
        <textarea
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="変換したいURLや文字列を入力..."
        />
      </div>

      {/* 修正ポイント：classNameを grid から resultArea に変更 */}
      <div className={styles.resultArea}>
        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>URLエンコード結果</span>
            <button
              onClick={() => copyToClipboard(urlEncoded)}
              className={styles.copyButton}
            >
              コピー
            </button>
          </div>
          <div className={styles.resultBox}>{urlEncoded || "..."}</div>
        </div>

        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>URLデコード結果</span>
            <button
              onClick={() => copyToClipboard(urlDecoded)}
              className={styles.copyButton}
            >
              コピー
            </button>
          </div>
          <div className={styles.resultBox}>{urlDecoded || "..."}</div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>URLエンコード（パーセントエンコード）とは？</h2>
        <p>
          URLエンコードとは、URLの中で直接使えない文字（日本語や特定の記号など）を、
          ブラウザが正しく理解できる「%xx」という形式に変換することです。
        </p>
        <h2>使い方</h2>
        <p>
          上の入力ボックスに、エンコードしたい日本語や、デコードしたい「%」混じりの文字列を貼り付けてください。
          リアルタイムで下に結果が表示されます。当ツールはブラウザ上で処理を行うため、入力した内容がサーバーに送信されることはありません。
        </p>
      </div>

      {/* 現在のIDを渡し、ナビゲーションから自分を除外 */}
      <ToolNav currentId={toolId} />
    </div>
  );
}
