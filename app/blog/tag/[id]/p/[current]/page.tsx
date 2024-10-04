import { notFound } from "next/navigation";
import { getNewsList, getTagDetail } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagenation from "@/app/_components/Pagenation";
import Tag from "@/app/_components/Tag";

type Props = {
  params: {
    id: string;
    current: string;
  };
};

export default async function Page({ params }: Props) {
  const tag = await getTagDetail(params.id).catch(notFound);
  const current = parseInt(params.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

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
