import { getTagDetail, getNewsList, getAllTagList } from "@/app/_libs/microcms"; // 綴りを修正
import NewsList from "@/app/_components/NewsList";
import { notFound } from "next/navigation";
import { Metadata } from "next"; // Metadataをインポート
import Tag from "@/app/_components/Tag";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagenation from "@/app/_components/Pagenation";

export async function generateStaticParams() {
  const response = await getAllTagList();

  return response.map((tag: { id: string }) => ({
    id: tag.id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

// --- メタデータ生成関数を追加 ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tag = await getTagDetail(id).catch(() => null);

  if (!tag) {
    return { title: "タグ | monaka" };
  }

  return {
    title: `タグ「${tag.name}」の記事一覧 | monaka`,
    description: `タグ「${tag.name}」が付いた新着記事の一覧です。`,
  };
}

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
