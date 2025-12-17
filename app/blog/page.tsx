import { getNewsList } from "../_libs/microcms";
import NewsList from "../_components/NewsList";
import Pagenation from "../_components/Pagenation";
import { NEWS_LIST_LIMIT } from "../_constants";

export const dynamic = "force-static";

export default async function Page() {
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
  });

  return (
    <>
      <NewsList news={news} />
      <Pagenation totalCount={totalCount} />
    </>
  );
}
