import Link from "next/link";
import Image from "next/image";
import type { News } from "@/app/_libs/microcms";
import Date from "../Date";
import Category from "../Category";
import TableOfContents from "../ToC"; // ToCコンポーネントをインポート
import styles from "./index.module.css";
import * as cheerio from "cheerio";

type Props = {
  data: News;
};

export default function Article({ data }: Props) {
  // data.contentがundefinedまたは空の場合のハンドリング
  if (!data || !data.content) {
    return <div>記事が見つかりませんでした。</div>; // エラーハンドリング
  }

  // Cheerioを使って目次を生成
  const $ = cheerio.load(data.content);
  const toc: { id: string; text: string }[] = [];

  // h2 と h3 見出しを解析
  $("h2, h3").each((_, element) => {
    const id =
      $(element).attr("id") ||
      $(element).text().replace(/\s+/g, "-").toLowerCase();
    const text = $(element).text();

    if (!$(element).attr("id")) {
      $(element).attr("id", id); // idを追加
    }

    toc.push({ id, text });
  });

  return (
    <main>
      {data.thumbnail && (
        <Image
          src={data.thumbnail.url}
          alt=""
          className={styles.thumbnail}
          width={data.thumbnail.width}
          height={data.thumbnail.height}
        />
      )}
      <h1 className={styles.title}>{data.title}</h1>
      <div className={styles.meta}>
        <Link
          href={`/blog/category/${data.category.id}`}
          className={styles.categoryLink}
        >
          <Category category={data.category} />
        </Link>
        <Date date={data.publishedAt ?? data.createdAt} />
      </div>

      {/* 目次を表示 */}
      <TableOfContents toc={toc} />

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      />
    </main>
  );
}
