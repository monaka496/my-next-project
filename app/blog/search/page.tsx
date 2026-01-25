"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- タイトルの動的変更 ---
    if (q) {
      document.title = `「${q}」の検索結果 | monaka`;
    } else {
      document.title = `検索 | monaka`;
    }
    // ------------------------

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

export default function Page() {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <SearchResults />
    </Suspense>
  );
}
