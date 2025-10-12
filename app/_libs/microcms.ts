import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

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

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

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

// Tag
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
