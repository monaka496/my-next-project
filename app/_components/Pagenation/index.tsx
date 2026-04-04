import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Link from "next/link";
import styles from "./index.module.css";

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
};

export default function Pagination({
  totalCount,
  current = 1,
  basePath = "/blog",
}: Props) {
  const totalPages = Math.ceil(totalCount / NEWS_LIST_LIMIT);
  if (totalPages <= 1) return null; // 1ページしかない場合は表示しない

  const getVisiblePages = () => {
    const range = 1;
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= current - range && i <= current + range)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.container}>
        {/* 前へボタン */}
        {current > 1 && (
          <li className={styles.list}>
            <Link
              href={`${basePath}/p/${current - 1}`}
              className={styles.arrow}
            >
              &lt;
            </Link>
          </li>
        )}

        {getVisiblePages().map((p, index) => (
          <li className={styles.list} key={index}>
            {typeof p === "number" ? (
              <Link
                href={`${basePath}/p/${p}`}
                className={`${styles.item} ${current === p ? styles.current : ""}`}
              >
                {p}
              </Link>
            ) : (
              <span className={styles.ellipsis}>{p}</span>
            )}
          </li>
        ))}

        {/* 次へボタン */}
        {current < totalPages && (
          <li className={styles.list}>
            <Link
              href={`${basePath}/p/${current + 1}`}
              className={styles.arrow}
            >
              &gt;
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
