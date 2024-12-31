import { BrowserHistory } from "history";
import React from "react";
import { Ratings } from "../hotel_listing/types";
import { getNameAndRatingsParams } from "./get_name_rating_filter";

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
