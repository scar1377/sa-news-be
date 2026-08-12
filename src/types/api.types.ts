export type Topic = {
  slug: string;
  description: string;
  img_url?: string;
};

export type Article = {
  article_id: number;
  title: string;
  topic: string;
  author: string;
  body: string;
  created_at: string;
  votes: number;
  article_img_url: string;
};

export type ArticleSummary = Omit<Article, "body"> & {
  comment_count: number;
};

export type CustomError = {
  status: number;
  msg: string;
};

export type User = {
  username: string;
  name: string;
  avatar_url: string;
};

export type Comment = {
  comment_id: number;
  body: string;
  author: string;
  votes: number;
  created_at: string;
  article_id: number;
};

export type SortByQuery =
  | "article_id"
  | "title"
  | "topic"
  | "created_at"
  | "author"
  | "votes";
