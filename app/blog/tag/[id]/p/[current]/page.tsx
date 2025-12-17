import { notFound } from "next/navigation";
import { getNewsList, getTagDetail, getAllTagList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagenation from "@/app/_components/Pagenation";
import Tag from "@/app/_components/Tag";

type Props = {
  params: Promise<{
    id: string;
    current: string;
  }>;
};

export async function generateStaticParams() {
  const tags = await getAllTagList();
  const paths = [];

  for (const tag of tags) {
    const { totalCount } = await getNewsList({
      limit: 0,
      filters: `tag[contains]${tag.id}`,
    });

    const maxPage = Math.ceil(totalCount / NEWS_LIST_LIMIT);

    for (let p = 1; p <= maxPage; p++) {
      paths.push({
        id: tag.id,
        current: p.toString(),
      });
    }
  }

  return paths;
}

export default async function Page({ params }: Props) {
  const { id, current: currentStr } = await params;
  const current = parseInt(currentStr, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  const tag = await getTagDetail(id).catch(notFound);

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
    filters: `tag[contains]${tag.id}`,
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <Tag tags={[tag]} />
      <NewsList news={news} />
      <Pagenation
        totalCount={totalCount}
        current={current}
        basePath={`/blog/tag/${tag.id}`}
      />
    </>
  );
}
