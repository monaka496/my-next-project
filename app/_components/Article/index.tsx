import Link from "next/link";
import Image from "next/image";
import type { News } from "@/app/_libs/microcms";
import Date from "../Date";
import Category from "../Category";
import TableOfContents from "../ToC";
import styles from "./index.module.css";
import * as cheerio from "cheerio";
import Recommend from "@/app/_components/Recommend";
import { getBlogsByCategory } from "@/app/_libs/microcms";
import Tag from "@/app/_components/Tag";
import SNS from "../SNS";
import Breadcrumb from "../Breadcrumb";
import { notFound } from "next/navigation";

type Props = {
  data: News;
};

export default async function Article({ data }: Props) {
  if (!data || !data.content) {
    return <div>記事が見つかりませんでした。</div>;
  }

  // Toc
  const $ = cheerio.load(data.content);
  const toc: { id: string; text: string }[] = [];

  $("h2, h3").each((_, element) => {
    const id =
      $(element).attr("id") ||
      $(element).text().replace(/\s+/g, "-").toLowerCase();
    const text = $(element).text();

    if (!$(element).attr("id")) {
      $(element).attr("id", id);
    }

    toc.push({ id, text });
  });

  // Recommend
  const categoryId = data.category.id;

  const { contents: relatedContents } = await getBlogsByCategory({
    limit: 4, // 表示する関連記事の数
    filters: `category[equals]${categoryId}[and]id[not_equals]${data.id}`,
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
      <Breadcrumb category={data.category} />
      <h1 className={styles.title}>{data.title}</h1>
      <div className={styles.meta}>
        <Link
          href={`/blog/category/${data.category.id}`}
          className={styles.categoryLink}
        >
          <Category category={data.category} />
        </Link>
        {data.tag && data.tag.length > 0 && (
          <div className={styles.tagLinks}>
            {data.tag.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.id}`}
                className={styles.tagLink}
              >
                <Tag tags={[tag]} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className={styles.date}>
        <Date date={data.publishedAt ?? data.createdAt} />
      </div>

      {/* 目次を表示 */}
      <TableOfContents toc={toc} />

      {/* コンテンツを表示 */}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      />

      {/* SNSを表示 */}
      <SNS id={data.id} title={data.title} />

      {/* 関連記事を表示 */}
      <div>
        <h2 className={styles.recommendh2}>関連記事</h2>
        <Recommend contents={relatedContents} title={data.category.name} />
      </div>
    </main>
  );
}
