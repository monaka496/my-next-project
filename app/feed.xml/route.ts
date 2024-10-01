import { generateRssFeed } from "@/app/_libs/feed";

export const GET = async () => {
  const xml = await generateRssFeed();

  const response = new Response(xml, {
    status: 200,
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate", // 24時間キャッシュする
      "Content-Type": "text/xml",
    },
  });

  return response;
};
