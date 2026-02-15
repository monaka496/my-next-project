"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

export default function WordCountPage() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState({
    chars: 0,
    charsNoSpaces: 0,
    lines: 0,
    bytes: 0,
  });

  const toolId = "wordcount";
  const displayTitle = "文字数カウント";
  const displayDescription =
    "入力されたテキストの文字数、行数、バイト数をリアルタイムで計測します。";

  useEffect(() => {
    // 文字数（空白含む）
    const chars = input.length;
    // 文字数（空白・改行除外）
    const charsNoSpaces = input.replace(/\s+/g, "").length;
    // 行数（空の状態なら0、それ以外は改行コードの数+1）
    const lines = input ? input.split(/\r\n|\r|\n/).length : 0;
    // バイト数（UTF-8）
    const bytes = new TextEncoder().encode(input).length;

    setStats({ chars, charsNoSpaces, lines, bytes });
  }, [input]);

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
          placeholder="ここにテキストを貼り付けると自動でカウントします..."
        />
      </div>

      <div className={styles.resultArea}>
        <div className={styles.gridStats}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>文字数 (空白含む)</span>
            <span className={styles.statValue}>
              {stats.chars.toLocaleString()}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>文字数 (空白除外)</span>
            <span className={styles.statValue}>
              {stats.charsNoSpaces.toLocaleString()}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>行数</span>
            <span className={styles.statValue}>
              {stats.lines.toLocaleString()}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>バイト数 (UTF-8)</span>
            <span className={styles.statValue}>
              {stats.bytes.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>文字数カウントツールの仕組み</h2>
        <p>
          当ツールは、JavaScriptの `length` プロパティおよび `TextEncoder`
          を使用して、 ブラウザ上で即座に文字解析を行っています。
        </p>
        <h2>主な活用シーン</h2>
        <p>
          ・ブログ記事（SEO）の文字数確認
          <br />
          ・SNS（X/Twitterなど）の投稿制限チェック
          <br />
          ・レポートや課題のボリューム確認
        </p>
      </div>

      <ToolNav currentId={toolId} />
    </div>
  );
}
