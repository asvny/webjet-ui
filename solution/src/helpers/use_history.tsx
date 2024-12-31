import { BrowserHistory } from "history";
import React from "react";
import { Ratings } from "../hotel_listing/types";

type useHistoryCallbackType = (filters: {
  name: string;
  ratings: Array<Ratings>;
}) => void;

export function useHistory(
  history: BrowserHistory,
  callback: useHistoryCallbackType
) {
  React.useEffect(() => {
    // Listen for changes in the browser history
    let unlisten = history.listen(({ location }) => {
      callback(getNameAndRatingsParams(location.search));
    });

    return () => {
      //  Clean up the history listener
      unlisten();
    };
  });
}

// Helpers

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
