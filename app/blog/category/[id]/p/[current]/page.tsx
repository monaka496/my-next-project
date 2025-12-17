import { notFound } from "next/navigation";
import {
  getCategoryDetail,
  getNewsList,
  getAllCategoryList,
} from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagenation";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: Promise<{
    id: string;
    current: string;
  }>;
};

export async function generateStaticParams() {
  const categories = await getAllCategoryList();
  const paths = [];

  for (const category of categories) {
    const { totalCount } = await getNewsList({
      limit: 0,
      filters: `category[equals]${category.id}`,
    });

    const maxPage = Math.ceil(totalCount / NEWS_LIST_LIMIT);

    for (let p = 1; p <= maxPage; p++) {
      paths.push({
        id: category.id,
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

  const category = await getCategoryDetail(id).catch(notFound);

  const { contents: news, totalCount } = await getNewsList({
    filters: `category[equals]${category.id}`,
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <Pagenation
        totalCount={totalCount}
        current={current}
        basePath={`/blog/category/${category.id}`}
      />
    </>
  );
}
