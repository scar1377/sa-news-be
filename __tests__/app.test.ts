import request from "supertest";
import { describe, test, expect, beforeEach, afterAll } from "vitest";
import app from "../src/app";
import { testData } from "../prisma/db/data/test-data";
import { seed } from "../prisma/db/seed";
import { prisma } from "../prisma/db/connection";

beforeEach(async () => await seed(prisma, testData));

type Topic = {
  slug: string;
  description: string;
  img_url?: string;
};
describe("app", () => {
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
});
