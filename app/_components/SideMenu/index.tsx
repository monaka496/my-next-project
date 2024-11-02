// app_components/SideMenu/index.tsx
import type { Category, Tag } from "@/app/_libs/microcms"; // Category,Tag型をインポート
import SearchField from "../SearchField";
import styles from "./index.module.css";
import Link from "next/link";
import Script from "next/script";

type Props = {
  categories: Category[]; // カテゴリの配列をCategory型に変更
  tags: Tag[]; // タグの配列をTag型に変更
};

export default function SideMenu({ categories, tags }: Props) {
  return (
    <>
      {/* AdSenseの広告タグ */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6783574511450629"
        data-ad-slot="1648670387"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      {/* AdSenseのスクリプトを読み込む */}
      <Script id="adsbygoogle-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>

      <SearchField />
      <h3 className={styles.sidetitle}>カテゴリ</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className={styles.categorylist}>
            <Link
              key={category.id}
              href={`/blog/category/${category.id}`}
              className={styles.categorylink}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <h3 className={styles.sidetitle}>タグ</h3>
      <ul className={styles.tagContainer}>
        {tags &&
          tags.map((tag) => (
            <li key={tag.id} className={styles.taglist}>
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.id}`}
                className={styles.taglink}
              >
                {tag.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
