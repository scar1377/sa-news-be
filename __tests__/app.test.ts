import request from "supertest";
import { describe, test, expect, beforeEach } from "vitest";
import app from "../src/app";

import { testData } from "../prisma/db/data/test-data";
import { seed } from "../prisma/db/seed";
import { prisma } from "../prisma/db/connection";

import { ArticleSummary, Comment, Topic, User } from "../src/types/api.types";

beforeEach(async () => await seed(prisma, testData));

describe("app", () => {
  test("status 404 - path not found", async () => {
    const {
      status,
      body: { msg },
    } = await request(app).get("/api/invalid-endpoint");
    expect(status).toBe(404);
    expect(msg).toBe("Path not found");
  });

  describe("/api/topics", () => {
    describe("GET /api/topics", () => {
      test("status 200 - responds with an array of topic objects", async () => {
        const { body, status } = await request(app).get("/api/topics");
        expect(status).toBe(200);
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics.length).toBe(testData.topics.length);
        body.topics.forEach((topic: Topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
            img_url: expect.any(String),
          });
        });
      });
    });
  });

  describe("/api/articles", () => {
    describe("GET /api/articles", () => {
      test("status 200 - responds with an array of article objects", async () => {
        const { body, status } = await request(app).get("/api/articles");
        expect(status).toBe(200);
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles.length).toBe(testData.articles.length);
        body.articles.forEach((article: ArticleSummary) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          });
        });
      });
    });

    describe("GET /api/articles/:article_id", () => {
      test("status 200 - responds with the related article object", async () => {
        const article_id = 1;
        const { status, body } = await request(app).get(
          `/api/articles/${article_id}`,
        );
        expect(status).toBe(200);
        expect(body.article).toBeInstanceOf(Object);
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T21:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
      test("status 404 - responds with article does not exist error message", async () => {
        const article_id = 9999;
        const { status, body } = await request(app).get(
          `/api/articles/${article_id}`,
        );
        expect(status).toBe(404);
        expect(body.msg).toBe(`Article does not exist`);
      });
      test("status 400 - responds with error message - invalid article_id(string)", async () => {
        const article_id = "banana";
        const { status, body } = await request(app).get(
          `/api/articles/${article_id}`,
        );
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid article_id");
      });
      test("status 400 - responds with error message - invalid article_id(not an integer)", async () => {
        const article_id = 1.5;
        const { status, body } = await request(app).get(
          `/api/articles/${article_id}`,
        );
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid article_id");
      });
    });

    describe("PATCH /api/articles/:article_id", () => {
      test("status 200 - responds with the updated article object", async () => {
        const article_id = 1;
        const voteUpdate = { inc_votes: 10 };
        const { status, body } = await request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate);
        expect(status).toBe(200);
        expect(body.article).toBeInstanceOf(Object);
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T21:11:00.000Z",
          votes: 110,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
      test("status 400 - responds with error message - missing required field", async () => {
        const article_id = 1;
        const voteUpdate = {};
        const { status, body } = await request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate);
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - missing required field");
      });
      test("status 400 - responds with error message - wrong value type", async () => {
        const article_id = 1;
        const voteUpdate = { inc_votes: "banana" };
        const { status, body } = await request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate);
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - wrong value type");
      });
      test("status 404 - responds with error message - article does not exist", async () => {
        const article_id = 9999;
        const voteUpdate = { inc_votes: 10 };
        const { status, body } = await request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate);
        expect(status).toBe(404);
        expect(body.msg).toBe("Article does not exist");
      });
      test("status 400 - responds with error message - invalid article_id", async () => {
        const article_id = "banana";
        const voteUpdate = { inc_votes: 10 };
        const { status, body } = await request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate);
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid article_id");
      });
      test("status 400 - responds with error message - invalid article_id", async () => {
        const article_id = 1.5;
        const voteUpdate = { inc_votes: 10 };
        const { status, body } = await request(app)
          .patch(`/api/articles/${article_id}`)
          .send(voteUpdate);
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid article_id");
      });
    });
  });

  describe("/api/users", () => {
    describe("GET /api/users", () => {
      test("status 200 - responds with an array of user objects", async () => {
        const { status, body } = await request(app).get("/api/users");

        expect(status).toBe(200);
        expect(body.users).toBeInstanceOf(Array);
        expect(body.users.length).toBe(testData.users.length);
        body.users.forEach((user: User) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
    });
  });

  describe("/api/articles/:article_id/comments", () => {
    describe("GET /api/articles/:article_id/comments", () => {
      test("status 200 - responds with an array of related comment objects", async () => {
        const article_id = 1;
        const { status, body } = await request(app).get(
          `/api/articles/${article_id}/comments`,
        );

        expect(status).toBe(200);
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments.length).toBe(11);
        body.comments.forEach((comment: Comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
            article_id: article_id,
          });
        });
      });
      test("status 200 - responds with an empty array when the article has no comments", async () => {
        const article_id = 2;
        const { status, body } = await request(app).get(
          `/api/articles/${article_id}/comments`,
        );

        expect(status).toBe(200);
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments).toEqual([]);
      });
      test("status 404 - responds with article not found error message", async () => {
        const article_id = 9999;
        const { status, body } = await request(app).get(
          `/api/articles/${article_id}/comments`,
        );

        expect(status).toBe(404);
        expect(body.msg).toBe(`Article does not exist`);
      });
      test("status 400 - responds with error message - invalid article_id (string)", async () => {
        const article_id = "banana";
        const { status, body } = await request(app).get(
          `/api/articles/${article_id}/comments`,
        );
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid article_id");
      });
      test("status 400 - responds with error message - invalid article_id (not an integer)", async () => {
        const article_id = 1.5;
        const { status, body } = await request(app).get(
          `/api/articles/${article_id}/comments`,
        );
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid article_id");
      });
    });

    describe("POST /api/articles/:article_id/comments", () => {
      test("status 201 - responds with the newly added comment object", async () => {
        const article_id = 1;
        const newComment = {
          username: "butter_bridge",
          body: "Testing comment",
        };
        const { status, body } = await request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(newComment);

        expect(status).toBe(201);
        expect(body.comment).toEqual({
          comment_id: expect.any(Number),
          body: "Testing comment",
          votes: 0,
          author: "butter_bridge",
          article_id,
          created_at: expect.any(String),
        });
      });
      describe("POST comment body validation: missing required fields", () => {
        test("status 400 - missing username", async () => {
          const article_id = 1;
          const newComment = {
            body: "Testing comment",
          };
          const { status, body } = await request(app)
            .post(`/api/articles/${article_id}/comments`)
            .send(newComment);

          expect(status).toBe(400);
          expect(body.msg).toBe("Bad request - missing required field");
        });
        test("status 400 - missing body", async () => {
          const article_id = 1;
          const newComment = {
            username: "butter_bridge",
          };
          const { status, body } = await request(app)
            .post(`/api/articles/${article_id}/comments`)
            .send(newComment);

          expect(status).toBe(400);
          expect(body.msg).toBe("Bad request - missing required field");
        });
        test("status 400 - empty object", async () => {
          const article_id = 1;
          const newComment = {};
          const { status, body } = await request(app)
            .post(`/api/articles/${article_id}/comments`)
            .send(newComment);

          expect(status).toBe(400);
          expect(body.msg).toBe("Bad request - missing required field");
        });
      });
      describe("POST comment body validation: wrong value type", () => {
        test("status 400 - wrong type username", async () => {
          const article_id = 1;
          const newComment = {
            username: 1,
            body: "Testing comment",
          };
          const { status, body } = await request(app)
            .post(`/api/articles/${article_id}/comments`)
            .send(newComment);

          expect(status).toBe(400);
          expect(body.msg).toBe("Bad request - wrong value type");
        });
        test("status 400 - wrong type body", async () => {
          const article_id = 1;
          const newComment = {
            username: "butter_bridge",
            body: null,
          };
          const { status, body } = await request(app)
            .post(`/api/articles/${article_id}/comments`)
            .send(newComment);

          expect(status).toBe(400);
          expect(body.msg).toBe("Bad request - wrong value type");
        });
      });
      test("status 404 - responds with error message - user does not exist", async () => {
        const article_id = 1;
        const newComment = {
          username: "banana",
          body: "Testing comment",
        };
        const { status, body } = await request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(newComment);

        expect(status).toBe(404);
        expect(body.msg).toBe("User does not exist");
      });
      test("status 404 - responds with article not found error message", async () => {
        const article_id = 9999;
        const newComment = {
          username: "butter_bridge",
          body: "Testing comment",
        };
        const { status, body } = await request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(newComment);
        expect(status).toBe(404);
        expect(body.msg).toBe(`Article does not exist`);
      });
      test("status 400 - responds with error message - invalid article_id(string)", async () => {
        const article_id = "banana";
        const newComment = {
          username: "butter_bridge",
          body: "Testing comment",
        };
        const { status, body } = await request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(newComment);
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid article_id");
      });
      test("status 400 - responds with error message - invalid article_id(not an integer)", async () => {
        const article_id = 1.5;
        const newComment = {
          username: "butter_bridge",
          body: "Testing comment",
        };
        const { status, body } = await request(app)
          .post(`/api/articles/${article_id}/comments`)
          .send(newComment);
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid article_id");
      });
    });
  });

  describe("/api/comments/:comment_id", () => {
    describe("DELETE /api/comments/:comment_id", () => {
      test("status 204 - responds with no content", async () => {
        const { status } = await request(app).delete("/api/comments/1");
        expect(status).toBe(204);
      });
      test("status 404 - responds with comment does not exist error message", async () => {
        const comment_id = 9999;
        const { status, body } = await request(app).delete(
          `/api/comments/${comment_id}`,
        );
        expect(status).toBe(404);
        expect(body.msg).toBe(`Comment does not exist`);
      });
      test("status 400 - responds with error message - invalid comment_id(string)", async () => {
        const comment_id = "banana";
        const { status, body } = await request(app).delete(
          `/api/comments/${comment_id}`,
        );
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid comment_id");
      });
      test("status 400 - responds with error message - invalid comment_id(not an integer)", async () => {
        const comment_id = 1.5;
        const { status, body } = await request(app).delete(
          `/api/comments/${comment_id}`,
        );
        expect(status).toBe(400);
        expect(body.msg).toBe("Bad request - invalid comment_id");
      });
    });
  });

  describe("GET /api/articles Queries", () => {
    test("status 200 - responds with an array of article objects sorted by dates in descending order by default", async () => {
      const { body, status } = await request(app).get("/api/articles");
      expect(status).toBe(200);
      const dates = body.articles.map((article: ArticleSummary) =>
        new Date(article.created_at).getTime(),
      );
      const sortedDates = [...dates].sort((a, b) => b - a);
      expect(dates).toEqual(sortedDates);
    });
    test("status 200 - responds with an array of article objects sorted by the query sort_by value", async () => {
      const { body, status } = await request(app).get(
        "/api/articles?sort_by=comment_count",
      );
      expect(status).toBe(200);
      const commentCounts = body.articles.map(
        (article: ArticleSummary) => article.comment_count,
      );
      const sortedCommentCounts = [...commentCounts].sort((a, b) => b - a);
      expect(commentCounts).toEqual(sortedCommentCounts);
    });
    test("status 200 - responds with an array of article objects sorted by the query sort_by value", async () => {
      const { body, status } = await request(app).get(
        "/api/articles?sort_by=title",
      );
      expect(status).toBe(200);
      const titles = body.articles.map(
        (article: ArticleSummary) => article.title,
      );
      const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));
      expect(titles).toEqual(sortedTitles);
    });
  });
});
