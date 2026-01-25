import { notFound } from "next/navigation";
import { Metadata } from "next";
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

// --- メタデータ生成関数を追加 ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, current: currentStr } = await params;
  const current = parseInt(currentStr, 10);

  const tag = await getTagDetail(id).catch(() => null);

  if (!tag) {
    return { title: "タグ | monaka" };
  }

  // 1ページ目以外はタイトルの末尾にページ番号を追加
  const pageSuffix = current > 1 ? ` (${current}ページ目)` : "";

  return {
    title: `タグ「${tag.name}」の記事一覧${pageSuffix} | monaka`,
    description: `タグ「${tag.name}」が付いた記事一覧の${current}ページ目です。`,
  };
}

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
