import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

export const revalidate = 60;
export const runtime = "edge";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
  searchParams?: { dk?: string } | Promise<{ dk?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const resolvedSearchParams =
    searchParams instanceof Promise ? await searchParams : searchParams;

  const slug = resolvedParams.slug;

  const data = await getNewsDetail(slug, {
    draftKey: resolvedSearchParams?.dk,
  }).catch(() => notFound());

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

export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const resolvedSearchParams =
    searchParams instanceof Promise ? await searchParams : searchParams;

  const slug = resolvedParams.slug;

  const data = await getNewsDetail(slug, {
    draftKey: resolvedSearchParams?.dk,
  }).catch(() => notFound());

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
