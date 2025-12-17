import { MetadataRoute } from "next";
import { getAllCategoryList, getAllNewsList } from "./_libs/microcms";

// ✅ SSG（静的書き出し）を強制する設定を追加
export const dynamic = "force-static";

const buildUrl = (path?: string) => `https://monaka496.com${path ?? ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsContents = await getAllNewsList();
  const categoryContents = await getAllCategoryList();

  const newsUrls: MetadataRoute.Sitemap = newsContents.map((content) => ({
    url: buildUrl(`/blog/${content.id}`),
    lastModified: content.revisedAt,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categoryContents.map(
    (content) => ({
      url: buildUrl(`/blog/category/${content.id}`),
      lastModified: content.revisedAt,
    })
  );

  const now = new Date();

  return [
    {
      url: buildUrl(),
      lastModified: now,
    },
    {
      url: buildUrl("/contact"),
      lastModified: now,
    },
    {
      url: buildUrl("/blog"),
      lastModified: now,
    },
    ...newsUrls,
    ...categoryUrls,
  ];
}
