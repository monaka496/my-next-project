"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

export default function JsonFormatPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");

  const toolId = "json-format";
  const displayTitle = "JSON整形（フォーマッター）";
  const displayDescription = "JSON文字列を読みやすく整形します。";

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setOutput("");
      if (e instanceof Error) {
        setError(`無効なJSON形式です: ${e.message}`);
      } else {
        setError("無効なJSON形式です");
      }
    }
  }, [input, indent]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    alert("コピーしました！");
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />

      <h1 className={styles.title}>{displayTitle}</h1>
      <p className={styles.description}>{displayDescription}</p>

      <div className={styles.section}>
        <div className={styles.labelWrapper}>
          <label className={styles.label}>JSONを入力</label>
          <div className={styles.options}>
            <label className={styles.subLabel}>インデント:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className={styles.select}
            >
              <option value={2}>2スペース</option>
              <option value={4}>4スペース</option>
            </select>
          </div>
        </div>
        <textarea
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"id":1,"name":"test"}...'
        />
      </div>

      <div className={styles.resultArea}>
        {error && <div className={styles.errorBox}>{error}</div>}

        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>整形結果</span>
            <button
              onClick={copyToClipboard}
              className={styles.copyButton}
              disabled={!output}
            >
              コピー
            </button>
          </div>
          <pre className={styles.resultBox}>
            <code>{output || "ここに結果が表示されます"}</code>
          </pre>
        </div>
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>JSON整形ツールの特徴</h2>
        <p>
          APIから返ってきた1行のJSONや、ログに含まれる読みにくいデータを貼り付けるだけで、
          瞬時に構造を解析し、適切なインデントを付与して表示します。
        </p>
        <h2>セキュリティについて</h2>
        <p>
          入力されたJSONデータは、すべてお使いのブラウザのJavaScriptエンジンによって処理されます。
          外部サーバーへデータを送信することはないため、開発中の機密データや個人情報を含むJSONでも安全にご利用いただけます。
        </p>
      </div>

      <ToolNav currentId={toolId} />
    </div>
  );
}
