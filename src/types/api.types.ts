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
  created_at: number | Date;
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
