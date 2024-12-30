import React from "react";
import { Hotel } from "../services/api";
import { Ratings } from "./types";

type State =
  | {
      searchName: string;
      searchRating: Array<Ratings>;
      allHotels: Array<Hotel>;
      hotelResults: Array<Hotel>;
      city: string | null;
      status: "loading" | "idle";
    }
  | {
      searchName: string;
      searchRating: Array<Ratings>;
      allHotels: Array<Hotel>;
      hotelResults: Array<Hotel>;
      city: string;
      status: "loaded";
    };

const initialState: State = {
  searchName: "",
  searchRating: [Ratings.ALL],
  allHotels: [],
  hotelResults: [],
  city: null,
  status: "idle",
};

type Action =
  | {
      type: "STORE_HOTELS";
      payload: { hotels: Array<Hotel>; city: string };
    }
  | {
      type: "CHANGE_FILTERS";
      payload: { ratings: Array<Ratings>; name: string };
    };

export function useHotelListingReducer(
  initialStateProp: Pick<State, "searchName" | "searchRating">
) {
  const result = React.useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case "STORE_HOTELS": {
          const newState = window.structuredClone(state);

          const ascendingHotels = sortHotels(action.payload.hotels);

          newState.allHotels = ascendingHotels;
          newState.city = action.payload.city;
          newState.status = "loaded";

          newState.hotelResults = filterHotels(
            newState.allHotels,
            newState.searchName,
            [Ratings.ALL]
          );

          return newState;
        }

        case "CHANGE_FILTERS": {
          const newState = window.structuredClone(state);

          const searchName = action.payload.name ?? "";
          const searchRating = action.payload.ratings;

          newState.searchName = searchName;
          newState.hotelResults = filterHotels(
            newState.allHotels,
            searchName,
            searchRating
          );

          return newState;
        }

        default: {
          return state;
        }
      }
    },
    {
      ...initialState,
      ...initialStateProp,
    }
  );

  return result;
}

// Helpers

function sortHotels(hotels: Array<Hotel>) {
  return hotels.sort((hotelA, hotelB) => hotelA.price - hotelB.price);
}

function filterHotels(
  hotels: Array<Hotel>,
  searchName: string,
  searchRating: Ratings[]
) {
  return hotels.filter((hotel) => {
    const hasNameMatch = hotel.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const hasRatingMatch = searchRating.includes(Ratings.ALL)
      ? true
      : searchRating.includes(`${hotel.rating}` as Ratings);

    return hasNameMatch && hasRatingMatch;
  });
}
