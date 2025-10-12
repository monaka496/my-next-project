import type { News } from "@/app/_libs/microcms";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Date from "@/app/_components/Date";
import { RECOMMEND_LIST_LIMIT } from "@/app/_constants/";

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
                  {item.publishedAt && <Date date={item.publishedAt} />}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* AdSenseの広告タグ */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6783574511450629"
        data-ad-slot="4324807365"
        data-ad-format="autorelaxed"
      ></ins>
    </section>
  );
}
