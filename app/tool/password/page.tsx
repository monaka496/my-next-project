"use client";

import { useState, useEffect, useCallback } from "react";
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
    if (options.uppercase) charset += "ABCDEFGHJKLMNPQRSTUVWXYZ"; // 紛らわしいI, Oを除外
    if (options.lowercase) charset += "abcdefghijkmnopqrstuvwxyz"; // 紛らわしいlを除外
    if (options.numbers) charset += "23456789"; // 紛らわしい1, 0を除外
    if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // 類似文字を除外しない場合、文字を追加
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

  // 初回表示時と設定変更時に自動生成
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (!password || password.startsWith("オプション")) return;
    navigator.clipboard.writeText(password);
    alert("コピーしました！");
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />

      <h1 className={styles.title}>{displayTitle}</h1>

      <div className={styles.resultArea}>
        <div className={styles.resultCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>生成されたパスワード</span>
            <button onClick={copyToClipboard} className={styles.copyButton}>
              コピー
            </button>
          </div>
          <div className={`${styles.resultBox} ${styles.passwordDisplay}`}>
            {password}
          </div>
          <button onClick={generatePassword} className={styles.generateButton}>
            再生成する
          </button>
        </div>
      </div>

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
              紛らわしい文字を除外 (i, l, 1, o, 0など)
            </label>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>このツールのセキュリティについて</h2>
        <p>
          本ツールはブラウザ標準の `crypto.getRandomValues()`
          APIを使用しており、暗号学的に安全な乱数を生成しています。
          生成処理はすべてお使いのデバイス上で行われ、ネットワークを介して外部に送信されることはありません。
        </p>
      </div>

      <ToolNav currentId={toolId} />
    </div>
  );
}
