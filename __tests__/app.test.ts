import request from "supertest";
import { describe, test, expect, beforeEach, afterAll } from "vitest";
import app from "../src/app";
import { testData } from "../prisma/db/data/test-data";
import { seed } from "../prisma/db/seed";
import { prisma } from "../prisma/db/connection";

beforeEach(async () => await seed(prisma, testData));

describe("app", () => {
  describe("api/topic", () => {
    test("GET api/topics - status 200", async () => {
      const res = await request(app).get("/api/topics");
      expect(res.status).toBe(200);
    });
  });
});
