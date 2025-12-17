"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getNewsDetail, getBlogsByCategory } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import Head from "next/head";

function PreviewContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const dk = searchParams.get("dk");

  const [data, setData] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || !dk) return;

    const fetchDraftAndRelated = async () => {
      try {
        const draftData = await getNewsDetail(slug, { draftKey: dk });
        setData(draftData);

        if (draftData.category?.id) {
          const { contents } = await getBlogsByCategory({
            limit: 4,
            filters: `category[equals]${draftData.category.id}[and]id[not_equals]${draftData.id}`,
          });
          setRelated(contents);
        }
      } catch (error) {
        console.error("プレビューデータの取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDraftAndRelated();
  }, [slug, dk]);

  if (loading)
    return (
      <p style={{ padding: "50px", textAlign: "center" }}>
        プレビューを読み込み中...
      </p>
    );

  if (!data)
    return (
      <p style={{ padding: "50px", textAlign: "center" }}>
        記事が見つかりません。draftKeyが無効な可能性があります。
      </p>
    );

  return (
    <>
      <title>プレビュー: {data.title}</title>
      <meta name="robots" content="noindex" />

      <Article data={data} relatedContents={related} />
    </>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PreviewContent />
    </Suspense>
  );
}
