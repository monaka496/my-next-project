import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

export const runtime = "edge";

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  // ❗ Next.js 16 では searchParams は Promise なので await 必須
  const { q = "" } = await searchParams;

  const { contents: news } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    q,
  });

  return (
    <>
      <NewsList news={news} />
    </>
  );
}
