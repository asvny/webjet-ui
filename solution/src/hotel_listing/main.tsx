import React from "react";
import { BrowserHistory } from "history";
import { ApiInterface } from "../services/api";
import { useHotelListingReducer } from "./hotel_listing_reducer";
import { useHistory } from "../helpers/use_history";
import { HotelListingView } from "./hotel_listing_view";

interface MainHotelListingProps {
  history: BrowserHistory;
  api: ApiInterface;
}

export function MainHotelListing(props: MainHotelListingProps) {
  const { history, api } = props;

  const [state, dispatch] = useHotelListingReducer();

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
    if (text.length === 0) {
      history.push(`${history.location.pathname}`);
      return;
    }

    history.push(`${history.location.pathname}?name=${text}`);
  }, []);

  const handleSearchByRating = React.useCallback(() => {
    // TODO
  }, []);

  if (state.status !== "loaded") {
    return <div>Loading...</div>;
  }

  return (
    <HotelListingView
      city={state.city}
      hotels={state.hotelResults}
      onSearchByName={handleSearchByName}
      onSearchByRating={handleSearchByRating}
    />
  );
}
