import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getNewsDetail,
  getAllNewsList,
  getBlogsByCategory,
} from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

/**
 * ビルド時に生成するパスを定義
 */
export async function generateStaticParams() {
  const contents = await getAllNewsList();

  return contents.map((post) => ({
    slug: post.id,
  }));
}

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * メタデータの生成
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getNewsDetail(slug).catch(() => notFound());

  if (!data) return {};

  const imageUrl = data?.thumbnail?.url;

  return {
    metadataBase: new URL("https://monaka496.com"),
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: imageUrl ? [imageUrl] : [],
      url: `https://monaka496.com/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: imageUrl ? [imageUrl] : [],
    },
    // note:cardは標準OGPがあれば自動で判定されるため、一旦標準に合わせます
  };
}

/**
 * ページコンポーネント
 */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  // 記事詳細を取得
  const data = await getNewsDetail(slug).catch(() => notFound());

  if (!data) return notFound();

  // 関連記事を取得
  const { contents: relatedContents } = await getBlogsByCategory({
    limit: 4,
    filters: `category[equals]${data.category.id}[and]id[not_equals]${data.id}`,
  });

  return (
    <>
      <Article data={data} relatedContents={relatedContents} />
      <div className={styles.footer}>
        <ButtonLink href="/blog">新着記事一覧へ</ButtonLink>
      </div>
    </>
  );
}
