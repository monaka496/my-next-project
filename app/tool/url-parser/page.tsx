"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Breadcrumbs from "../_components/Toolbreadcrumbs";
import ToolNav from "../_components/ToolNav";

type Param = {
  key: string;
  value: string;
};

export default function UrlParserPage() {
  const [urlInput, setUrlInput] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [params, setParams] = useState<Param[]>([]);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const toolId = "url-parser";
  const displayTitle = "URLパラメータ解析・編集";

  // URLをパースして分解する
  useEffect(() => {
    if (!urlInput) {
      setBaseUrl("");
      setParams([]);
      return;
    }

    try {
      const url = new URL(
        urlInput.startsWith("http") ? urlInput : `https://${urlInput}`,
      );
      setBaseUrl(`${url.origin}${url.pathname}`);

      const newParams: Param[] = [];
      url.searchParams.forEach((value, key) => {
        newParams.push({ key, value });
      });
      setParams(newParams);
    } catch (e) {
      // 不完全なURLの場合は何もしない
    }
  }, [urlInput]);

  // パラメータが編集されたらURLを再構築する
  useEffect(() => {
    if (!baseUrl) {
      setGeneratedUrl("");
      return;
    }

    try {
      const url = new URL(baseUrl);
      params.forEach((p) => {
        if (p.key) url.searchParams.append(p.key, p.value);
      });
      setGeneratedUrl(decodeURIComponent(url.toString()));
    } catch (e) {
      setGeneratedUrl("");
    }
  }, [baseUrl, params]);

  const updateParam = (index: number, key: string, value: string) => {
    const newParams = [...params];
    newParams[index] = { key, value };
    setParams(newParams);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("コピーしました！");
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs currentPage={displayTitle} currentId={toolId} />

      <h1 className={styles.title}>{displayTitle}</h1>

      <div className={styles.section}>
        <label className={styles.label}>解析したいURLを入力</label>
        <textarea
          className={styles.textarea}
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://example.com/page?id=123&name=monaka..."
          style={{ height: "80px" }}
        />
      </div>

      {params.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.label}>パラメータ一覧（編集可能）</h2>
          <div className={styles.paramGrid}>
            <div className={styles.paramHeader}>
              <span>Key</span>
              <span>Value (Decoded)</span>
            </div>
            {params.map((param, index) => (
              <div key={index} className={styles.paramRow}>
                <input
                  type="text"
                  value={param.key}
                  onChange={(e) =>
                    updateParam(index, e.target.value, param.value)
                  }
                  className={styles.paramInput}
                />
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) =>
                    updateParam(index, param.key, e.target.value)
                  }
                  className={styles.paramInput}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {generatedUrl && (
        <div className={styles.resultArea}>
          <div className={styles.resultCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>再構築されたURL</span>
              <button
                onClick={() => copyToClipboard(generatedUrl)}
                className={styles.copyButton}
              >
                コピー
              </button>
            </div>
            <div className={styles.resultBox}>{generatedUrl}</div>
          </div>
        </div>
      )}

      <div className={styles.contentSection}>
        <hr className={styles.hr} />
        <h2>このツールの使いどころ</h2>
        <p>
          長いURLを貼り付けると、自動的に <code>?</code>{" "}
          以降のクエリパラメータを分解して表形式にします。
          各パラメータの値はデコードされた状態で表示されるため、読みやすくなっています。
        </p>
        <p>
          また、表の中の値を直接書き換えることで、新しいパラメータを持つURLを即座に生成できます。
          テスト用のリダイレクトURL作成などに便利です。
        </p>
      </div>

      <ToolNav currentId={toolId} />
    </div>
  );
}
