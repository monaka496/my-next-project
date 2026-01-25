import {
  getCategoryDetail,
  getNewsList,
  getAllCategoryList,
} from "@/app/_libs/microcms";
import { notFound } from "next/navigation";
import { Metadata } from "next"; // Metadata型をインポート
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagenation";
import Category from "@/app/_components/Category";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

export async function generateStaticParams() {
  const categories = await getAllCategoryList();

  return categories.map((category: { id: string }) => ({
    id: category.id,
  }));
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// --- ここから追加 ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryDetail(id).catch(() => null);

  if (!category) {
    return {
      title: "カテゴリ未設定 | monaka",
    };
  }

  return {
    title: `${category.name}の記事一覧 | monaka`,
    description: `${category.name}に関する新着記事一覧です。`,
  };
}
// --- ここまで追加 ---

export default async function Page({ params }: Props) {
  const { id } = await params;

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
