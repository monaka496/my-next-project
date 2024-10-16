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
  if (!data || !data.main) {
    return <div>記事が見つかりませんでした。</div>;
  }

  const mainContent = data.main
    .map((block) => {
      switch (block.fieldId) {
        case "main_text":
          return block.editor;
        default:
          return "";
      }
    })
    .join("");

  // Toc
  const $ = cheerio.load(mainContent);
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

  // JSON-LDデータを構築
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    image: data.thumbnail?.url,
    datePublished: data.publishedAt ?? data.createdAt,
    dateModified: data.updatedAt,
    author: {
      "@type": "Person",
      name: "もなか",
      url: "https://monaka496.com",
    },
    publisher: {
      "@type": "Organization",
      name: "monaka",
      logo: {
        "@type": "ImageObject",
        url: "https://monaka496.com/logo.svg",
      },
    },
    description: data.description,
    articleBody: mainContent,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://monaka496.com/blog/${data.id}`,
    },
  };

  return (
    <>
      {/* JSON-LDを表示 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          <span className={styles.promotion}>このページはPRを含みます</span>
        </div>

        {/* 目次を表示 */}
        <TableOfContents toc={toc} />

        {/* コンテンツを表示 */}
        <div className={styles.content}>
          {data.main.map((block, index) => {
            switch (block.fieldId) {
              case "main_text":
                return (
                  <div
                    key={`main_text-${index}`}
                    dangerouslySetInnerHTML={{ __html: block.editor }}
                    className={styles.content}
                  />
                );
              case "product":
                return (
                  <div key={`product-${index}`} className={styles.product}>
                    <Image
                      src={block.product_image.url}
                      alt={block.product_name}
                      width={block.product_image.width}
                      height={block.product_image.height}
                      className={styles.product_image}
                    />
                    <div className={styles.product_info}>
                      <span className={styles.product_name}>
                        {block.product_name}
                      </span>
                      <div className={styles.product_links}>
                        <a
                          href={block.amazon_link}
                          target="_blank"
                          className={`${styles.link} ${styles.amazon}`}
                        >
                          Amazon
                        </a>
                        <a
                          href={block.rakuten_link}
                          target="_blank"
                          className={`${styles.link} ${styles.rakuten}`}
                        >
                          楽天市場
                        </a>
                        <a
                          href="https:////ck.jp.ap.valuecommerce.com/servlet/referral?sid=3538656&pid=890957783"
                          target="_blank"
                          rel="nofollow"
                          className={`${styles.link} ${styles.yahoo}`}
                        >
                          Yahoo!ショッピング
                        </a>
                      </div>
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* SNSを表示 */}
        <SNS id={data.id} title={data.title} />

        {/* 関連記事を表示 */}
        <div>
          <h2 className={styles.recommendh2}>関連記事</h2>
          <Recommend contents={relatedContents} title={data.category.name} />
        </div>
      </main>
    </>
  );
}
