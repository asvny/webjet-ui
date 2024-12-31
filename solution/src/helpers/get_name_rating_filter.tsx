import { Ratings } from "../hotel_listing/types";

export function getNameAndRatingsParams(search: string) {
  // Parse the query parameters from the URL
  const searchParams = new URLSearchParams(search);

  // Extract 'ratings' query param - this returns either a string or null
  const ratings = searchParams.get("ratings");

  return {
    // Default to an empty string if 'name' is absent
    name: searchParams.get("name") ?? "",
    ratings: ratings
      ? // Parse ratings into an array
        (decodeURI(ratings).split(",") as Ratings[])
      : // Default to 'ALL' if no ratings are provided
        [Ratings.ALL],
  };
}
