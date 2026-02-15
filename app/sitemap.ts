import { MetadataRoute } from "next";
import { getAllCategoryList, getAllNewsList } from "./_libs/microcms";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

const buildUrl = (path?: string) => `https://monaka496.com${path ?? ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsContents = await getAllNewsList();
  const categoryContents = await getAllCategoryList();

  // --- ツールディレクトリを自動スキャン ---
  const toolDir = path.join(process.cwd(), "app/tool");
  let toolUrls: MetadataRoute.Sitemap = [];

  if (fs.existsSync(toolDir)) {
    const toolIds = fs
      .readdirSync(toolDir, { withFileTypes: true })
      .filter(
        (dirent) =>
          dirent.isDirectory() && // ディレクトリであること
          !dirent.name.startsWith("_") && // _components などの除外
          !dirent.name.startsWith("["), // 動的ルートなどの除外
      )
      .map((dirent) => dirent.name);

    toolUrls = toolIds.map((id) => ({
      url: buildUrl(`/tool/${id}/`),
      lastModified: new Date(),
      priority: 0.8,
    }));
  }

  // --- ブログ記事とカテゴリーのURL生成 ---
  const newsUrls: MetadataRoute.Sitemap = newsContents.map((content) => ({
    url: buildUrl(`/blog/${content.id}/`),
    lastModified: content.revisedAt,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categoryContents.map(
    (content) => ({
      url: buildUrl(`/blog/category/${content.id}/`),
      lastModified: content.revisedAt,
    }),
  );

  const now = new Date();

  return [
    {
      url: buildUrl(),
      lastModified: now,
      priority: 1.0,
    },
    {
      url: buildUrl("/contact/"),
      lastModified: now,
    },
    {
      url: buildUrl("/blog/"),
      lastModified: now,
    },
    {
      url: buildUrl("/tool/"),
      lastModified: now,
      priority: 0.9,
    },
    ...newsUrls,
    ...categoryUrls,
    ...toolUrls, // スキャンしたツールURLを結合
  ];
}
