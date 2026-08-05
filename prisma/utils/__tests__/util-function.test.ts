import { describe, test, expect } from "vitest";
import { createRef } from "../util-functions";
describe("createRef", () => {
  test("return an empty object when pass an empty array as argument", () => {
    expect(createRef([], "title", "article_id")).toEqual({});
  });
  test("return an object with one key-value pair when pass an array of single object", () => {
    expect(
      createRef(
        [{ article_id: 74, title: "TenHag the man!" }],
        "title",
        "article_id",
      ),
    ).toEqual({ "TenHag the man!": 74 });
  });
  test("return an object with key-value pairs when pass an array of multiple objects", () => {
    expect(
      createRef(
        [
          { article_id: 72, title: "Stone Soup" },
          { article_id: 73, title: "The vegan carnivore?" },
          { article_id: 74, title: "TenHag the man!" },
        ],
        "title",
        "article_id",
      ),
    ).toEqual({
      "Stone Soup": 72,
      "The vegan carnivore?": 73,
      "TenHag the man!": 74,
    });
  });
  test("input is not mutated", () => {
    const inputArr = [
      { article_id: 72, title: "Stone Soup" },
      { article_id: 73, title: "The vegan carnivore?" },
      { article_id: 74, title: "TenHag the man!" },
    ];
    createRef(inputArr, "title", "article_id");
    expect(inputArr).toEqual([
      { article_id: 72, title: "Stone Soup" },
      { article_id: 73, title: "The vegan carnivore?" },
      { article_id: 74, title: "TenHag the man!" },
    ]);
  });
});
