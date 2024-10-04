import { getTagDetail, getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { notFound } from "next/navigation";
import Tag from "@/app/_components/Tag";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagenation from "@/app/_components/Pagenation";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const tag = await getTagDetail(params.id).catch(notFound);
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    filters: `tag[contains]${tag.id}`,
  });

  return (
    <>
      <Tag tags={[tag]} />
      <NewsList news={news} />
      <Pagenation totalCount={totalCount} basePath={`/blog/tag/${tag.id}`} />
    </>
  );
}
