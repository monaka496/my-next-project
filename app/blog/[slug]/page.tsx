import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

export const revalidate = 60;
export const runtime = "edge";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(() => {
    notFound();
  });

  if (!data) {
    return {};
  }

  // ✅ 各種URLを絶対パス化
  const baseUrl = "https://monaka496.com";
  const pageUrl = `${baseUrl}/blog/${data.id}`;
  const imageUrl = data.thumbnail?.url?.startsWith("http")
    ? data.thumbnail.url
    : `${baseUrl}${data.thumbnail?.url || "/ogp.png"}`;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      url: pageUrl,
      siteName: "monaka",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(() => {
    notFound();
  });

  if (!data) {
    return notFound();
  }

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/blog">新着記事一覧へ</ButtonLink>
      </div>
    </>
  );
}
