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

export function useHotelListingReducer() {
  const result = React.useReducer((state: State, action: Action) => {
    switch (action.type) {
      case "STORE_HOTELS": {
        const newState = window.structuredClone(state);

        const ascendingHotels = action.payload.hotels.sort(
          (hotelA, hotelB) => hotelA.price - hotelB.price
        );

        newState.allHotels = ascendingHotels;
        newState.hotelResults = ascendingHotels;
        newState.city = action.payload.city;

        return newState;
      }

      case "CHANGE_FILTERS": {
        const newState = window.structuredClone(state);

        const searchName = action.payload.name ?? "";
        const searchRating = action.payload.ratings;
        newState.searchName = searchName;

        const results = newState.allHotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchName.toLowerCase())
        );
        newState.hotelResults = results;

        return newState;
      }

      default: {
        return state;
      }
    }
  }, initialState);

  return result;
}
