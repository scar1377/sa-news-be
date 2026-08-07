export type TopicRawData = {
  slug: string;
  description: string;
  img_url: string;
};

export type UserRawData = {
  username: string;
  name: string;
  avatar_url: string;
};

export type ArticleRawData = {
  title: string;
  topic: string;
  author: string;
  body: string;
  created_at: number | Date;
  votes: number;
  article_img_url: string;
};

export type CommentRawData = {
  body: string;
  votes: number;
  author: string;
  article_title: string;
  created_at: number | Date;
};
export type SeedData = {
  topics: TopicRawData[];
  users: UserRawData[];
  articles: ArticleRawData[];
  comments: CommentRawData[];
};
