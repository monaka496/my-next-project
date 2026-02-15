import styles from "./page.module.css";
import {
  getNewsList,
  getAllCategoryList,
  getAllTagList,
} from "./_libs/microcms"; // 追加
import { TOP_NEWS_LIMIT } from "./_constants";
import NewsList from "./_components/NewsList";
// Heroコンポーネントは必要に応じて return 内に追加してください
// import Hero from "@/app/_components/Hero";
import Pagenation from "./_components/Pagenation";
import SideMenu from "./_components/SideMenu";

export default async function Home() {
  // 1. ニュース、カテゴリ、タグのデータを並列で取得
  const [newsData, categories, tags] = await Promise.all([
    getNewsList({ limit: TOP_NEWS_LIMIT }),
    getAllCategoryList(),
    getAllTagList(),
  ]);

  const { contents: news, totalCount } = newsData;

  return (
    <div className="layout">
      {" "}
      {/* レイアウト用のクラス（元々 layout.tsx にあったもの）を追加 */}
      <main className="content">
        <section className={styles.news}>
          <NewsList news={news} />
          <Pagenation totalCount={totalCount} />
        </section>
      </main>
      {/* 2. サイドメニューをここに配置 */}
      <aside className="sidemenu">
        <SideMenu categories={categories} tags={tags} />
      </aside>
    </div>
  );
}
