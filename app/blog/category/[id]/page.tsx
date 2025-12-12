import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagenation";
import Category from "@/app/_components/Category";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

export const runtime = "edge";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = await params; // ← ★ここが重要（Next.js 15対応）

  const category = await getCategoryDetail(id).catch(notFound);

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
  });

  return (
    <>
      <p>
        <Category category={category} />
        の一覧
      </p>
      <NewsList news={news} />
      <Pagenation
        totalCount={totalCount}
        basePath={`/blog/category/${category.id}`}
      />
    </>
  );
}
