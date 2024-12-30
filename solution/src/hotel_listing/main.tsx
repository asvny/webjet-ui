import React from "react";
import { BrowserHistory, createPath } from "history";
import { ApiInterface } from "../services/api";
import { useHotelListingReducer } from "./hotel_listing_reducer";
import { useHistory } from "../helpers/use_history";
import { HotelListingView } from "./hotel_listing_view";
import { Ratings } from "./types";

interface MainHotelListingProps {
  history: BrowserHistory;
  api: ApiInterface;
}

export function MainHotelListing(props: MainHotelListingProps) {
  const { history, api } = props;

  const [state, dispatch] = useHotelListingReducer(
    getInitialSearch(history.location.search)
  );

  useHistory(history, ({ name, ratings }) => {
    dispatch({
      type: "CHANGE_FILTERS",
      payload: {
        name,
        ratings,
      },
    });
  });

  React.useEffect(() => {
    api.fetchHotels().then((response) => {
      dispatch({
        type: "STORE_HOTELS",
        payload: {
          hotels: response.hotels,
          city: response.city,
        },
      });
    });
  }, []);

  const handleSearchByName = React.useCallback((text: string) => {
    const searchParams = new URLSearchParams(history.location.search);
    searchParams.delete("name");

    if (text.length > 0) {
      searchParams.set("name", text);
    }

    const url = createPath({
      pathname: history.location.pathname,
      search: searchParams.toString(),
    });

    history.push(url);
  }, []);

  const handleSearchByRating = React.useCallback((ratings: Array<Ratings>) => {
    const searchParams = new URLSearchParams(history.location.search);
    searchParams.delete("ratings");

    if (ratings.length > 0) {
      const ratingsNumber = ratings.map((rating) =>
        rating == "ALL" ? rating : parseInt(rating)
      );

      searchParams.set("ratings", ratingsNumber.join(","));
    }

    const url = createPath({
      pathname: history.location.pathname,
      search: searchParams.toString(),
    });

    history.push(url);
  }, []);

  if (state.status !== "loaded") {
    return <div>Loading...</div>;
  }

  return (
    <HotelListingView
      city={state.city}
      hotels={state.hotelResults}
      initialSearchByName={state.searchName}
      onSearchByName={handleSearchByName}
      onSearchByRating={handleSearchByRating}
    />
  );
}

// Helpers

function getInitialSearch(search: string) {
  const searchParams = new URLSearchParams(search);

  return {
    searchName: searchParams.get("name") ?? "",
    // TODO
    searchRating: [],
  };
}
