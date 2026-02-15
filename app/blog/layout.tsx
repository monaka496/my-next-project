import Hero from "@/app/_components/Hero";
import SideMenu from "@/app/_components/SideMenu"; // 追加
import { getAllCategoryList, getAllTagList } from "@/app/_libs/microcms"; // 追加

export const metadata = {
  title: "新着記事",
};

type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

export default async function NewsLayout({ children }: Props) {
  // 1. サイドメニューに必要なデータを取得
  const [categories, tags] = await Promise.all([
    getAllCategoryList(),
    getAllTagList(),
  ]);

  return (
    <div className="layout">
      {" "}
      {/* Sheetの外に出して幅を確保 */}
      <main className="content">
        {children} {/* ここに各記事や一覧が入る */}
      </main>
      <aside className="sidemenu">
        <SideMenu categories={categories} tags={tags} />
      </aside>
    </div>
  );
}
