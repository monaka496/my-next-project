"use client";

import Link from "next/link";
import styles from "./index.module.css";

interface Props {
  currentPage: string;
  currentId?: string; // オプションにする（一覧ページでは不要なため）
}

export default function Breadcrumbs({ currentPage, currentId }: Props) {
  const isListPage = currentPage === "便利ツール一覧";

  // --- 構造化データの作成 ---
  const breadcrumbList = [
    {
      "@type": "ListItem",
      position: 1,
      name: "ホーム",
      item: "https://monaka496.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "便利ツール一覧",
      item: "https://monaka496.com/tool/",
    },
  ];

  // 個別ページかつIDがある場合は3階層目を追加
  if (!isListPage && currentId) {
    breadcrumbList.push({
      "@type": "ListItem",
      position: 3,
      name: currentPage,
      item: `https://monaka496.com/tool/${currentId}/`, // 渡されたIDで動的に組み立て
    });
  }

  return (
    <>
      <nav className={styles.breadcrumb}>
        <Link href="/">ホーム</Link>
        <span className={styles.separator}>＞</span>
        {isListPage ? (
          <span className={styles.current}>便利ツール一覧</span>
        ) : (
          <>
            <Link href="/tool/">便利ツール一覧</Link>
            <span className={styles.separator}>＞</span>
            <span className={styles.current}>{currentPage}</span>
          </>
        )}
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbList,
          }),
        }}
      />
    </>
  );
}
