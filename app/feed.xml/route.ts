import { generateRssFeed } from "@/app/_libs/feed";

// ✅ SSG（静的書き出し）を強制する設定
export const dynamic = "force-static";

export const GET = async () => {
  const xml = await generateRssFeed();

  // 静的書き出しの場合は headers の Cache-Control は無視されますが、
  // XMLとして正しく出力するために Content-Type は残しておきます
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
};
