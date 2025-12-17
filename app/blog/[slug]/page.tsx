import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsDetail, getAllNewsList } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

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

export default async function Page({ params }: Props) {
  const { slug } = await params;

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
