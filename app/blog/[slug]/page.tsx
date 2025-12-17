import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsDetail, getNewsList } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

/**
 * ビルド時に生成するパスを定義
 */
export async function generateStaticParams() {
  const response = await getNewsList(); // 必要に応じて { limit: 100 } 等を追加
  return response.contents.map((post) => ({
    slug: post.id,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * メタデータの生成
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // SSG時はURLパラメータが使えないため、draftKeyなしで取得
  const data = await getNewsDetail(slug).catch(() => notFound());

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url ?? ""],
    },
  };
}

/**
 * ページコンポーネント
 */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  // SSG時はURLパラメータが使えないため、draftKeyなしで取得
  const data = await getNewsDetail(slug).catch(() => notFound());

  if (!data) return notFound();

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/blog">新着記事一覧へ</ButtonLink>
      </div>
    </>
  );
}
