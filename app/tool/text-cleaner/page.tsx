"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

export default function TextCleanerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState({
    removeEmpty: true,
    removeDuplicate: true,
    trimSpace: true,
  });

  const toolId = "text-cleaner";
  const displayTitle = "重複削除ツール";

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }

    // 行ごとに分割
    let lines = input.split(/\r\n|\r|\n/);

    // 行頭・行末のスペース削除
    if (options.trimSpace) {
      lines = lines.map((line) => line.trim());
    }

    // 空行削除
    if (options.removeEmpty) {
      lines = lines.filter((line) => line !== "");
    }

    // 重複削除
    if (options.removeDuplicate) {
      lines = Array.from(new Set(lines));
    }

    setOutput(lines.join("\n"));
  }, [input, options]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    alert("コピーしました！");
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />

      <h1 className={styles.title}>{displayTitle}</h1>

      <div className={styles.section}>
        <div className={styles.optionsGrid}>
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={options.removeEmpty}
                onChange={() =>
                  setOptions({ ...options, removeEmpty: !options.removeEmpty })
                }
              />{" "}
              空行を削除
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.removeDuplicate}
                onChange={() =>
                  setOptions({
                    ...options,
                    removeDuplicate: !options.removeDuplicate,
                  })
                }
              />{" "}
              重複した行を削除
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.trimSpace}
                onChange={() =>
                  setOptions({ ...options, trimSpace: !options.trimSpace })
                }
              />{" "}
              行頭・行末の空白を削除
            </label>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>入力テキスト</label>
        <textarea
          className={styles.textarea}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="整理したいリストを貼り付けてください..."
        />
      </div>

      <div className={styles.resultArea}>
        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>結果</span>
            <button
              onClick={copyToClipboard}
              className={styles.copyButton}
              disabled={!output}
            >
              コピー
            </button>
          </div>
          <textarea
            className={`${styles.textarea} ${styles.resultTextarea}`}
            value={output}
            readOnly
            placeholder="結果がここに表示されます..."
          />
        </div>
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>このツールの使い方</h2>
        <p>
          大量のメールアドレスリストや、ログファイルから抽出したデータ、キーワード一覧などから「重複」や「余計な改行」を瞬時に取り除きます。
        </p>
        <p>
          <strong>空行を削除:</strong> 文字が入っていない行をすべて詰めます。
          <br />
          <strong>重複した行を削除:</strong>{" "}
          同じ内容の行が複数ある場合、1つにまとめます。
          <br />
          <strong>空白を削除:</strong>{" "}
          各行の前後にあるスペース（半角・全角）を削除します。
        </p>
      </div>

      <ToolNav currentId={toolId} />
    </div>
  );
}
