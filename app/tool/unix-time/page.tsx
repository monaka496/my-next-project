"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

export default function UnixTimePage() {
  const [now, setNow] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [resultDate, setResultDate] = useState("");
  const [resultTimestamp, setResultTimestamp] = useState("");

  const toolId = "unix-time";
  const displayTitle = "Unixタイムスタンプ相互変換";

  // 現在時刻の更新
  useEffect(() => {
    const timer = setInterval(
      () => setNow(Math.floor(Date.now() / 1000)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  // 変換ロジック
  useEffect(() => {
    if (!inputVal) {
      setResultDate("");
      setResultTimestamp("");
      return;
    }

    // 数値（タイムスタンプ）から日時に変換
    if (/^\d+$/.test(inputVal)) {
      let ts = parseInt(inputVal);
      // 10桁（秒）なら1000倍してミリ秒にする
      if (inputVal.length === 10) ts *= 1000;
      const date = new Date(ts);
      setResultDate(isNaN(date.getTime()) ? "無効な値" : date.toLocaleString());
      setResultTimestamp("");
    }
    // 文字列（日時）からタイムスタンプに変換
    else {
      const date = new Date(inputVal);
      if (!isNaN(date.getTime())) {
        const ts = Math.floor(date.getTime() / 1000);
        setResultTimestamp(`${ts} (秒) / ${date.getTime()} (ミリ秒)`);
        setResultDate("");
      } else {
        setResultDate("解析できません");
        setResultTimestamp("");
      }
    }
  }, [inputVal]);

  const copyToClipboard = (text: string) => {
    const cleanText = text.split(" (")[0]; // 解説用の文字を除去
    navigator.clipboard.writeText(cleanText);
    alert("コピーしました！");
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />

      <h1 className={styles.title}>{displayTitle}</h1>

      {/* 現在のタイムスタンプ表示 */}
      <div className={styles.section}>
        <div className={styles.nowCard}>
          <span className={styles.nowLabel}>現在のUnixタイムスタンプ (秒)</span>
          <div className={styles.nowValue}>
            <code>{now}</code>
            <button
              onClick={() => copyToClipboard(now.toString())}
              className={styles.copyButtonSmall}
            >
              コピー
            </button>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>
          変換したい値 (数値または日時文字列)
        </label>
        <input
          type="text"
          className={styles.inputField}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="例: 1712841600 または 2024/04/11 22:00"
        />
      </div>

      <div className={styles.resultArea}>
        {resultDate && (
          <div className={styles.resultCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>日時 (Local Time)</span>
              <button
                onClick={() => copyToClipboard(resultDate)}
                className={styles.copyButton}
              >
                コピー
              </button>
            </div>
            <div className={styles.resultBox}>{resultDate}</div>
          </div>
        )}

        {resultTimestamp && (
          <div className={styles.resultCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>Unixタイムスタンプ</span>
              <button
                onClick={() => copyToClipboard(resultTimestamp)}
                className={styles.copyButton}
              >
                コピー
              </button>
            </div>
            <div className={styles.resultBox}>{resultTimestamp}</div>
          </div>
        )}
      </div>

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>Unixタイムスタンプとは？</h2>
        <p>
          Unixエポック（1970年1月1日 00:00:00
          UTC）からの経過秒数です。多くのシステムで時間の管理やログの記録に使用されています。
        </p>
        <h2>ヒント</h2>
        <p>
          ・10桁の数字は「秒」、13桁の数字は「ミリ秒」として自動判別します。
          <br />
          ・「now」や「2024-04-11」といった形式もブラウザのDate機能が許容する範囲で解析可能です。
        </p>
      </div>

      <ToolNav currentId={toolId} />
    </div>
  );
}
