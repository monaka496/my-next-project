"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { News } from "@/app/_libs/microcms";
import Date from "../Date";
import Category from "../Category";
import TableOfContents from "../ToC";
import styles from "./index.module.css";
import * as cheerio from "cheerio";
import Recommend from "@/app/_components/Recommend";
import Tag from "@/app/_components/Tag";
import SNS from "../SNS";
import Breadcrumb from "../Breadcrumb";

type Props = {
  data: News;
  relatedContents: News[];
};

export default function Article({ data, relatedContents }: Props) {
  // 1. 本文の結合とXスクリプトの除去
  const rawContent =
    data.main
      ?.map((block) => {
        if (block.fieldId === "main_text") return block.editor;
        if (block.fieldId === "html") return block.html;
        return "";
      })
      .join("") || "";

  // 埋め込みコードに含まれる <script> タグを削除して React Error #418 を防ぐ
  const mainContent = rawContent.replace(
    /<script.*?\bplatform\.twitter\.com\/widgets\.js\b.*?>.*?<\/script>/gi,
    ""
  );

  useEffect(() => {
    // ページ遷移時や初回表示時にツイートをレンダリングする
    // @ts-ignore
    if (window.twttr && window.twttr.widgets) {
      // @ts-ignore
      window.twttr.widgets.load();
    }
  }, [data]);

  if (!data || !data.main) {
    return <div>記事が見つかりませんでした。</div>;
  }

  const $ = cheerio.load(mainContent);
  const toc: { id: string; text: string }[] = [];
  $("h2, h3").each((_, element) => {
    const id =
      $(element).attr("id") ||
      $(element).text().replace(/\s+/g, "-").toLowerCase();
    const text = $(element).text();
    if (!$(element).attr("id")) $(element).attr("id", id);
    toc.push({ id, text });
  });

  return (
    <>
      {/* 2. X(Twitter)のスクリプトはここだけで管理する */}
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />

      <main>
        {/* ...（中略：サムネイルから日付表示まで） */}
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
        {/* ...（meta情報など） */}
        <div className={styles.meta}>
          <Link
            href={`/blog/category/${data.category.id}`}
            className={styles.categoryLink}
          >
            <Category category={data.category} />
          </Link>
        </div>
        <div className={styles.date}>
          <Date date={data.publishedAt ?? data.createdAt} />
          <span className={styles.promotion}>このページはPRを含みます</span>
        </div>

        <TableOfContents toc={toc} />

        <div className={styles.content}>
          {data.main.map((block, index) => {
            if (block.fieldId === "main_text" || block.fieldId === "html") {
              // ここでもスクリプトを除去したHTMLを流し込む
              const cleanHtml = (
                block.fieldId === "main_text" ? block.editor : block.html
              ).replace(
                /<script.*?\bplatform\.twitter\.com\/widgets\.js\b.*?>.*?<\/script>/gi,
                ""
              );

              return (
                <div
                  key={`${block.fieldId}-${index}`}
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                  className={styles.content}
                />
              );
            }
            if (block.fieldId === "product") {
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
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <SNS id={data.id} title={data.title} />
        <div>
          <h2 className={styles.recommendh2}>関連記事</h2>
          <Recommend contents={relatedContents} title={data.category.name} />
        </div>
      </main>
    </>
  );
}
