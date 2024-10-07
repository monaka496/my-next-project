import styles from "./page.module.css";
import { getNewsList } from "./_libs/microcms";
import { TOP_NEWS_LIMIT, NEWS_LIST_LIMIT } from "./_constants";
import NewsList from "./_components/NewsList";
import Hero from "@/app/_components/Hero";
import Pagenation from "./_components/Pagenation";

export default async function Home() {
  const { contents: news, totalCount } = await getNewsList({
    limit: TOP_NEWS_LIMIT,
  });

  return (
    <>
      <section className={styles.news}>
        <NewsList news={news} />
        <Pagenation totalCount={totalCount} />
      </section>
    </>
  );
}
