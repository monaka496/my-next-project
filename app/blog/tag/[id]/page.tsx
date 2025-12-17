import { getTagDetail, getNewsList, getAllTagList } from "@/app/_libs/microcms"; // 綴りを修正
import NewsList from "@/app/_components/NewsList";
import { notFound } from "next/navigation";
import Tag from "@/app/_components/Tag";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagenation from "@/app/_components/Pagenation";

export async function generateStaticParams() {
  const response = await getAllTagList();

  // response が直接配列の場合は、そのまま map を回します
  // tag の型定義は MicroCMSContentId をインポートするか、直接 id: string を指定します
  return response.map((tag: { id: string }) => ({
    id: tag.id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const tag = await getTagDetail(id).catch(notFound);

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    filters: `tag[contains]${tag.id}`,
  });

  if (!news) return notFound();

  return (
    <>
      <Tag tags={[tag]} />
      <NewsList news={news} />
      <Pagenation totalCount={totalCount} basePath={`/blog/tag/${tag.id}`} />
    </>
  );
}
