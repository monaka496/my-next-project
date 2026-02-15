import Link from "next/link";
import styles from "./page.module.css";
import Breadcrumbs from "./_components/Toolbreadcrumbs";

const tools = [
  {
    id: "urlencode",
    title: "URLエンコード・デコード",
    description:
      "日本語や記号をURLセーフな形式に変換、または元の文字列に復元します。",
    icon: "🔗",
    category: "Network",
  },
  {
    id: "base64",
    title: "Base64エンコード・デコード",
    description:
      "テキストをBase64形式に変換、または元の文字列に復元します。マルチバイト対応。",
    icon: "📦",
    category: "Utility",
  },
];

export default function ToolListPage() {
  // SEO用の構造化データ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://monaka496.com/tool/${tool.id}`,
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
        {tools.map((tool) => (
          <Link href={`/tool/${tool.id}`} key={tool.id} className={styles.card}>
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
