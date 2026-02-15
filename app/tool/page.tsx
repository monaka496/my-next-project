import Link from "next/link";
import styles from "./page.module.css";
import Breadcrumbs from "./_components/Toolbreadcrumbs";
import { ALL_TOOLS } from "./_constants/tools";

export default function ToolListPage() {
  // SEO用の構造化データ（定数から自動生成）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: ALL_TOOLS.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://monaka496.com/tool/${tool.id}/`,
      name: tool.title,
    })),
  };

  return (
    <div className={styles.container}>
      {/* 構造化データを埋め込む */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.header}>
        <Breadcrumbs currentPage="便利ツール一覧" />
        <h1 className={styles.title}>便利ツール一覧</h1>
        <p className={styles.subtitle}>
          エンジニアの業務を少し便利にする単機能ツール群。
          <br />
          <span>プライバシー保護:</span>{" "}
          すべての処理はブラウザ内で完結し、データはサーバーに送信されません。
        </p>
      </header>

      <div className={styles.grid}>
        {ALL_TOOLS.map((tool) => (
          <Link
            href={`/tool/${tool.id}/`}
            key={tool.id}
            className={styles.card}
          >
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{tool.icon}</span>
                <span className={styles.categoryTag}>{tool.category}</span>
              </div>
              <h2 className={styles.toolTitle}>{tool.title}</h2>
              <p className={styles.toolDescription}>{tool.description}</p>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.arrow}>ツールを開く</span>
              <span className={styles.arrowIcon}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
