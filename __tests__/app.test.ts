import request from "supertest";
import { describe, test, expect, beforeEach } from "vitest";
import app from "../src/app";

import { testData } from "../prisma/db/data/test-data";
import { seed } from "../prisma/db/seed";
import { prisma } from "../prisma/db/connection";

import { ArticleSummary, Topic } from "../src/types/api.types";

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

  describe("api/topics", () => {
    test("GET api/topics - status 200", async () => {
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

  describe("/api/articles", () => {
    describe("GET /api/articles", async () => {
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
  });
});
