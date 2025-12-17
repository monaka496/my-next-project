import { notFound } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagenation";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: Promise<{
    current: string;
  }>;
};

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
