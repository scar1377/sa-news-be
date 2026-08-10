import { describe, test, expect } from "vitest";
import { isCustomError, isValidId } from "../src/utils/helper-function";

describe("isCustomError", () => {
  test("returns false when pass null", () => {
    expect(isCustomError(null)).toBe(false);
  });
  test("returns false when pass a non-object argument", () => {
    expect(isCustomError("banana")).toBe(false);
  });
  test("returns false when pass an error object without a property of status", () => {
    expect(isCustomError({ msg: "no status" })).toBe(false);
  });
  test("returns false for invalid status type", () => {
    expect(isCustomError({ status: "banana", msg: "status is a string" })).toBe(
      false,
    );
  });
  test("returns false when pass an error object without a property of msg", () => {
    expect(isCustomError({ status: 400 })).toBe(false);
  });
  test("returns false for invalid msg type", () => {
    expect(isCustomError({ status: 400, msg: undefined })).toBe(false);
  });
  test("returns true when pass an error object with both status and msg properties", () => {
    expect(isCustomError({ status: 404, msg: "error not found" })).toBe(true);
  });
});

describe("isValidId", () => {
  test("returns true if the id is 0", () => {
    expect(isValidId(0)).toBe(true);
  });
  test("returns true if the id is an integer", () => {
    expect(isValidId(1)).toBe(true);
  });
  test("returns true if the id is a negative integer", () => {
    expect(isValidId(-1)).toBe(true);
  });
  test("returns false if the id is NaN", () => {
    expect(isValidId(NaN)).toBe(false);
  });
  test("returns false if the id is not an integer", () => {
    expect(isValidId(1.5)).toBe(false);
  });
});
