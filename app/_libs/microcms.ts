import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

// --- 型定義 ---
export type Category = {
  name: string;
} & MicroCMSListContent;

export type Tag = {
  name: string;
} & MicroCMSListContent;

export type Main = {
  fieldId: string;
  editor: string;
  html: string;
  product_name: string;
  product_link: string;
  amazon_link: string;
  rakuten_link: string;
  product_image: {
    url: string;
    width: number;
    height: number;
  };
};

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
  tag: Tag[];
  main: Main[];
} & MicroCMSListContent;

// --- クライアントの作成 ---
// サーバーサイド環境変数と、ブラウザ用環境変数(NEXT_PUBLIC_)の両方を確認します
const serviceDomain =
  process.env.MICROCMS_SERVICE_DOMAIN ||
  process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey =
  process.env.MICROCMS_API_KEY || process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if (!apiKey) {
  throw new Error("MICROCMS_API_KEY is required");
}

// clientは1つだけ宣言します
export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});

// --- 各種データ取得関数 ---

export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: "news",
    queries,
  });
  return listData;
};

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
    customRequestInit: {
      next: {
        // SSGの場合はrevalidateの設定は無視されますが、開発時のために残しておきます
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });

  return detailData;
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Category>({
    endpoint: "category",
    contentId,
    queries,
  });

  return detailData;
};

export const getAllNewsList = async () => {
  const listData = await client.getAllContents<News>({
    endpoint: "news",
  });

  return listData;
};

export const getAllCategoryList = async () => {
  const listData = await client.getAllContents<Category>({
    endpoint: "category",
  });

  return listData;
};

type GetBlogsByCategoryParams = {
  limit: number;
  filters?: string;
};

export const getBlogsByCategory = async ({
  limit,
  filters,
}: GetBlogsByCategoryParams) => {
  const response = await client.get({
    endpoint: "news",
    queries: {
      limit: limit,
      filters: filters,
    },
  });

  return response;
};

// Tag関連
export const getTagDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Tag>({
    endpoint: "tag",
    contentId,
    queries,
  });

  return detailData;
};

export const getAllTagList = async () => {
  const listData = await client.getAllContents<Tag>({
    endpoint: "tag",
  });

  return listData;
};
