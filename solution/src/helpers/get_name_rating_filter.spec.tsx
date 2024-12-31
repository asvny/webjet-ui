import { expect, test } from "vitest";
import { getNameAndRatingsParams } from "./get_name_rating_filter";
import { Ratings } from "../hotel_listing/types";

test("should return default name and ALL rating when no parameters are provided", () => {
  const result = getNameAndRatingsParams("");
  expect(result).toEqual({ name: "", ratings: [Ratings.ALL] });
});

test("should return name and single rating when `ratings` is provided as a single rating", () => {
  const search = "?name=Hotel&ratings=3";
  const result = getNameAndRatingsParams(search);
  expect(result).toEqual({ name: "Hotel", ratings: [Ratings.THREE] });
});

test("should decode special characters in `name` and `ratings` params correctly", () => {
  const search = "?name=Hotel%20Name&ratings=3%2C5";
  const result = getNameAndRatingsParams(search);
  expect(result).toEqual({
    name: "Hotel Name",
    ratings: [Ratings.THREE, Ratings.FIVE],
  });
});

test("should handle empty string as name and ALL ratings", () => {
  const search = "?name=&ratings=ALL";
  const result = getNameAndRatingsParams(search);
  expect(result).toEqual({ name: "", ratings: [Ratings.ALL] });
});

test("should default to ALL rating when `ratings` parameter is not present", () => {
  const search = "?name=Hotel";
  const result = getNameAndRatingsParams(search);
  expect(result).toEqual({ name: "Hotel", ratings: [Ratings.ALL] });
});

test("should handle empty value for `ratings` parameter", () => {
  const search = "?name=Hotel&ratings=";
  const result = getNameAndRatingsParams(search);
  expect(result).toEqual({ name: "Hotel", ratings: [Ratings.ALL] });
});

test("should return name and ALL ratings by default when no `ratings` param is provided", () => {
  const search = "?name=Hotel";
  const result = getNameAndRatingsParams(search);
  expect(result).toEqual({ name: "Hotel", ratings: [Ratings.ALL] });
});

test("should handle query containing only the `ratings` param and no `name`", () => {
  const search = "?ratings=4,5";
  const result = getNameAndRatingsParams(search);
  expect(result).toEqual({ name: "", ratings: [Ratings.FOUR, Ratings.FIVE] });
});
