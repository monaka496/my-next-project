"use client"; // useEffectを含むAdUnitを使うため追加

import type { News } from "@/app/_libs/microcms";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { RECOMMEND_LIST_LIMIT } from "@/app/_constants/";
import AdUnit from "../AdUnit"; // 1で作ったコンポーネント

type Props = {
  contents: News[];
  title: string;
};

export default function Recommend({ contents, title }: Props) {
  if (!contents || contents.length === 0) {
    return <div>記事がありません</div>;
  }

  const limitedContents = contents.slice(0, RECOMMEND_LIST_LIMIT);

  return (
    <section className={styles.recommendContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.recommendItems}>
          {limitedContents.map((item) => (
            <div key={item.id} className={styles.recommendItem}>
              <Link href={`/blog/${item.id}`} className={styles.recommendLink}>
                <Image
                  src={item.thumbnail?.url || "/no-image.png"}
                  alt={item.title}
                  width={1200}
                  height={630}
                  className={styles.thumbnail}
                  priority
                />
                <div className={styles.titleContainer}>
                  <h4 className={styles.titleText}>{item.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ここに関連記事広告を表示 */}
      <div className={styles.adSection}>
        <AdUnit />
      </div>
    </section>
  );
}
