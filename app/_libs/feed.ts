import { Feed } from "feed";
import { getAllNewsList } from "@/app/_libs/microcms";

export const generateRssFeed = async (): Promise<string> => {
  const baseUrl = "https://monaka496.com";
  const feed = new Feed({
    title: "monaka",
    description: "日々の学びをアウトプットするブログです。",
    id: baseUrl,
    link: baseUrl,
    language: "ja",
    copyright: "© monaka ALL Rights Reserved",
    generator: baseUrl,
  });

  const posts = await getAllNewsList();

  posts.forEach((post) => {
    const publishDate = post.publishedAt
      ? new Date(post.publishedAt)
      : new Date();

    feed.addItem({
      title: post.title,
      description: post.description,
      date: publishDate,
      id: `${baseUrl}/blog/${post.id}`,
      link: `${baseUrl}/blog/${post.id}`,
    });
  });

  // RSSフィードを文字列として取得
  let rssFeed = feed.rss2();

  // <media:content> タグを各 <item> に追加
  posts.forEach((post) => {
    const thumbnailUrl =
      post.thumbnail?.url || `${baseUrl}/default-thumbnail.jpg`;
    const mimeType = thumbnailUrl.endsWith(".png") ? "image/png" : "image/jpeg"; // MIMEタイプを推定
    const mediaTag = `<media:content url="${thumbnailUrl}" width="1920" height="1080" type="${mimeType}"/>`;

    rssFeed = rssFeed.replace(
      `<link>${baseUrl}/blog/${post.id}</link>`,
      `<link>${baseUrl}/blog/${post.id}</link>\n    ${mediaTag}`
    );
  });

  // RSSに Media RSS 名前空間を追加
  rssFeed = rssFeed.replace(
    '<rss version="2.0">',
    '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" >'
  );

  return rssFeed;
};
