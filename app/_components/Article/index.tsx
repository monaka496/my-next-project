"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
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
import Profile from "@/app/_components/Profile";

type Props = {
  data: News;
  relatedContents: News[];
};

export default function Article({ data, relatedContents }: Props) {
  const rawContent =
    data.main
      ?.map((block) => {
        if (block.fieldId === "main_text") return block.editor;
        if (block.fieldId === "html") return block.html;
        return "";
      })
      .join("") || "";

  const mainContent = rawContent.replace(
    /<script.*?\bplatform\.twitter\.com\/widgets\.js\b.*?>.*?<\/script>/gi,
    "",
  );

  useEffect(() => {
    hljs.highlightAll();

    const blocks = document.querySelectorAll("pre");
    blocks.forEach((block) => {
      if (block.querySelector(`.${styles.copyButton}`)) return;

      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className = styles.copyButton;

      button.addEventListener("click", async () => {
        const code = block.querySelector("code");
        if (code) {
          await navigator.clipboard.writeText(code.innerText);
          button.innerText = "Copied!";
          setTimeout(() => (button.innerText = "Copy"), 2000);
        }
      });

      block.style.position = "relative";
      block.appendChild(button);
    });

    // @ts-ignore
    if (window.twttr && window.twttr.widgets) {
      // @ts-ignore
      window.twttr.widgets.load();
    }
  }, [data, mainContent]);

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
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />

      <Script
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

        <TableOfContents toc={toc} />

        <div className={styles.content}>
          {data.main.map((block, index) => {
            if (block.fieldId === "main_text" || block.fieldId === "html") {
              const cleanHtml = (
                block.fieldId === "main_text" ? block.editor : block.html
              ).replace(
                /<script.*?\bplatform\.twitter\.com\/widgets\.js\b.*?>.*?<\/script>/gi,
                "",
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
                      <a
                        href={block.yahoo_link}
                        target="_blank"
                        className={`${styles.link} ${styles.yahoo}`}
                      >
                        Yahoo!ショッピング
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

        <section>
          <Profile />
        </section>

        <div>
          <h2 className={styles.recommendh2}>関連記事</h2>
          <Recommend contents={relatedContents} title={data.category.name} />
        </div>
      </main>
    </>
  );
}
