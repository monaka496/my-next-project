import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagenation";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: Promise<{
    current: string;
  }>;
};

// --- メタデータ生成関数を追加 ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { current: currentStr } = await params;
  const current = parseInt(currentStr, 10);

  // 1ページ目のときはシンプルに、2ページ目以降はページ番号を付与
  const pageSuffix = current > 1 ? ` (${current}ページ目)` : "";

  return {
    title: `新着記事${pageSuffix} | monaka`,
    description: `monakaの新着記事一覧、${current}ページ目です。最新のニュースやブログ記事をお届けします。`,
  };
}

export async function generateStaticParams() {
  const { totalCount } = await getNewsList({ limit: 0 });
  const maxPage = Math.ceil(totalCount / NEWS_LIST_LIMIT);

  const paths = [];
  for (let p = 1; p <= maxPage; p++) {
    paths.push({
      current: p.toString(),
    });
  }

  return paths;
}

export default async function Page({ params }: Props) {
  const { current: currentStr } = await params;

  const current = parseInt(currentStr, 10);
  if (Number.isNaN(current) || current < 1) notFound();

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });

  if (news.length === 0) notFound();

  return (
    <>
      <NewsList news={news} />
      <Pagenation totalCount={totalCount} current={current} />
    </>
  );
}
