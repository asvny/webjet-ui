import React from "react";
import { BrowserHistory, createPath } from "history";
import { ApiInterface } from "../services/api";
import { useHotelListingReducer } from "./hotel_listing_reducer";
import { useHistory } from "../helpers/use_history";
import { HotelListingView } from "./hotel_listing_view";
import { Ratings } from "./types";
import { getNameAndRatingsParams } from "../helpers/get_name_rating_filter";

interface MainHotelListingProps {
  // History object used for navigation
  history: BrowserHistory;
  // API object used to fetch hotel data
  api: ApiInterface;
}

export function MainHotelListing(props: MainHotelListingProps) {
  const { history, api } = props;

  // Initialize the reducer for managing hotel listing state
  const [state, dispatch] = useHotelListingReducer(
    getInitialSearch(history.location.search)
  );

  // Hook to synchronize changes in search filters with the URL
  useHistory(history, ({ name, ratings }) => {
    dispatch({
      type: "CHANGE_FILTERS",
      payload: {
        name,
        ratings,
      },
    });
  });

  // Fetch hotel data when the component is mounted
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

  // Handle changes in search by hotel name
  const handleSearchByName = React.useCallback((text: string) => {
    const searchParams = new URLSearchParams(history.location.search);
    // Remove the existing name filter
    searchParams.delete("name");

    if (text.length > 0) {
      // Set the new name filter
      searchParams.set("name", text);
    }

    // Update the URL to reflect the search filter
    const url = createPath({
      pathname: history.location.pathname,
      search: searchParams.toString(),
    });

    history.push(url);
  }, []);

  // Handle changes in search by rating
  const handleSearchByRating = React.useCallback((ratings: Array<Ratings>) => {
    const searchParams = new URLSearchParams(history.location.search);
    // Remove the existing ratings filter
    searchParams.delete("ratings");

    if (ratings.length > 0) {
      // Set the new ratings filter
      searchParams.set("ratings", ratings.join(","));
    }

    // Update the URL to reflect the search filter
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
      initialSearchByRating={state.searchRating}
      onSearchByName={handleSearchByName}
      onSearchByRating={handleSearchByRating}
    />
  );
}

// Helpers

function getInitialSearch(search: string) {
  const result = getNameAndRatingsParams(search);

  return {
    searchName: result.name,
    searchRating: result.ratings,
  };
}
