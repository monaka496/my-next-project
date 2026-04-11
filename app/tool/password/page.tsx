"use client";

import { useState, useCallback } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
  });

  const toolId = "password";
  const displayTitle = "パスワード生成ツール";

  const generatePassword = useCallback(() => {
    let charset = "";
    if (options.uppercase) charset += "ABCDEFGHJKLMNPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijkmnopqrstuvwxyz";
    if (options.numbers) charset += "23456789";
    if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!options.excludeSimilar) {
      if (options.uppercase) charset += "IO";
      if (options.lowercase) charset += "l";
      if (options.numbers) charset += "10";
    }

    if (charset === "") {
      setPassword("オプションを選択してください");
      return;
    }

    let res = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      res += charset[array[i] % charset.length];
    }
    setPassword(res);
  }, [length, options]);

  const copyToClipboard = () => {
    if (!password || password.startsWith("オプション")) return;
    navigator.clipboard.writeText(password);
    alert("コピーしました！");
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />

      <h1 className={styles.title}>{displayTitle}</h1>

      {/* ①設定エリアを上に移動 */}
      <div className={styles.section}>
        <h2 className={styles.label}>設定</h2>
        <div className={styles.optionsGrid}>
          <div className={styles.optionItem}>
            <label>長さ: {length}</label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className={styles.rangeInput}
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={options.uppercase}
                onChange={() =>
                  setOptions({ ...options, uppercase: !options.uppercase })
                }
              />{" "}
              大文字 (A-Z)
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={() =>
                  setOptions({ ...options, lowercase: !options.lowercase })
                }
              />{" "}
              小文字 (a-z)
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={() =>
                  setOptions({ ...options, numbers: !options.numbers })
                }
              />{" "}
              数字 (0-9)
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.symbols}
                onChange={() =>
                  setOptions({ ...options, symbols: !options.symbols })
                }
              />{" "}
              記号 (!@#...)
            </label>
            <label>
              <input
                type="checkbox"
                checked={options.excludeSimilar}
                onChange={() =>
                  setOptions({
                    ...options,
                    excludeSimilar: !options.excludeSimilar,
                  })
                }
              />{" "}
              紛らわしい文字を除外
            </label>
          </div>
        </div>
      </div>

      {/* 結果表示エリア */}
      <div className={styles.resultArea}>
        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>生成結果</span>
            {password && !password.startsWith("オプション") && (
              <button onClick={copyToClipboard} className={styles.copyButton}>
                コピー
              </button>
            )}
          </div>
          {/* ②パスワードの有無でクラスを切り替え */}
          <div
            className={`${styles.resultBox} ${password ? styles.passwordActive : styles.passwordPlaceholder}`}
          >
            {password ||
              "設定を確認して「パスワードを生成する」ボタンを押してください"}
          </div>
          <button onClick={generatePassword} className={styles.generateButton}>
            パスワードを生成する
          </button>
        </div>
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>このツールのセキュリティについて</h2>
        <p>
          本ツールはブラウザ標準の <code>crypto.getRandomValues()</code>{" "}
          APIを使用しており、暗号学的に安全な乱数を生成しています。
          処理はすべてローカルで行われ、外部送信はされません。
        </p>
      </div>

      <ToolNav currentId={toolId} />
    </div>
  );
}
