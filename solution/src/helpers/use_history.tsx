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
    let unlisten = history.listen(({ location }) => {
      const searchParams = new URLSearchParams(location.search);

      callback({
        name: searchParams.get("name") ?? "",
        // TODO
        // ratings: searchParams.get("ratings"),
        ratings: [],
      });
    });

    return () => {
      unlisten();
    };
  });
}
