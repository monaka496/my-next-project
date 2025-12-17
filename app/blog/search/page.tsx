"use client";

import { useEffect, useState, Suspense } from "react"; // Suspenseを追加
import { useSearchParams } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

// 検索ロジックを別コンポーネントに切り出す（Next.jsの仕様でuseSearchParamsを使う場合はSuspenseが必要）
function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  // ✅ 型を指定してneverエラーを回避
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { contents } = await getNewsList({
          limit: NEWS_LIST_LIMIT,
          q,
        });
        setNews(contents);
      } catch (error) {
        console.error("検索エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [q]);

  if (loading) return <p>検索中...</p>;

  return (
    <>
      {q && (
        <p>
          「{q}」の検索結果: {news.length}件
        </p>
      )}
      <NewsList news={news} />
    </>
  );
}

// メインのPageコンポーネント
export default function Page() {
  return (
    // useSearchParamsを使うコンポーネントはSuspenseで囲むのがNext.jsのルールです
    <Suspense fallback={<p>読み込み中...</p>}>
      <SearchResults />
    </Suspense>
  );
}
