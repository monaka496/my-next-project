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

    const thumbnailUrl =
      post.thumbnail?.url || `${baseUrl}/default-thumbnail.jpg`;

    const descriptionWithImage = `
      <img src="${thumbnailUrl}" alt="${post.title}" style="max-width:100%;height:auto;" />
      <p>${post.description}</p>
    `;

    feed.addItem({
      title: post.title,
      description: descriptionWithImage,
      date: publishDate,
      id: `${baseUrl}/blog/${post.id}`,
      link: `${baseUrl}/blog/${post.id}`,
    });
  });

  return feed.rss2();
};
