import type { Category } from "@/app/_libs/microcms";
import styles from "./index.module.css";
import Link from "next/link";

type Props = {
  category: Category;
};

export default function Breadcrumb({ category }: Props) {
  const breadcrumbList = [
    {
      "@type": "ListItem",
      position: 1,
      name: "記事一覧",
      item: "https://monaka496.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: category.name,
      item: `https://monaka496.com/blog/category/${category.id}`,
    },
  ];

  return (
    <>
      {/* パンくずリスト表示 */}
      <ul className={styles.breadcrumb}>
        <li className={styles.breadcrumbitem}>
          <Link href="/" className={styles.breadcrumblink}>
            記事一覧
          </Link>
        </li>
        <li className={styles.breadcrumbitem}>
          <Link
            href={`/blog/category/${category.id}`}
            className={styles.breadcrumblink}
          >
            {category.name}
          </Link>
        </li>
      </ul>

      {/* 構造化データを埋め込む */}
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
