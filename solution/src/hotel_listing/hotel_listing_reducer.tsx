import React from "react";
import { Hotel } from "../services/api";
import { Ratings } from "./types";

// State type describes the shape of the reducer's state,
// which has two possible structures depending on whether data is still loading or loaded
type State =
  | {
      searchName: string;
      searchRating: Array<Ratings>;
      allHotels: Array<Hotel>;
      hotelResults: Array<Hotel>;
      city: null;
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
  // Search query for hotel names
  searchName: "",
  // Filter for hotel ratings
  searchRating: [Ratings.ALL],
  // Full list of all available hotels
  allHotels: [],
  // Filtered list of hotels based on search/filter criteria
  hotelResults: [],
  // City for the hotels being shown
  city: null,
  // Loading status
  status: "idle",
};

// Actions that can be dispatched to modify the state.
type Action =
  | {
      type: "STORE_HOTELS";
      payload: { hotels: Array<Hotel>; city: string };
    }
  | {
      type: "CHANGE_FILTERS";
      payload: { ratings: Array<Ratings>; name: string };
    };

// A custom hook to manage the hotel listing state
export function useHotelListingReducer(
  initialStateProp: Pick<State, "searchName" | "searchRating">
) {
  const result = React.useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case "STORE_HOTELS": {
          const newState = window.structuredClone(state);

          // Sort hotels by price in ascending order
          const ascendingHotels = sortHotels(action.payload.hotels);

          newState.allHotels = ascendingHotels;
          newState.city = action.payload.city;
          newState.status = "loaded";

          // Apply the current filters to the full list to get the results
          newState.hotelResults = filterHotels(
            newState.allHotels,
            newState.searchName,
            newState.searchRating
          );

          return newState;
        }

        case "CHANGE_FILTERS": {
          const newState = window.structuredClone(state);

          // Update search name and rating in the state
          const searchName = action.payload.name ?? "";
          const searchRating = action.payload.ratings;

          newState.searchName = searchName;
          newState.searchRating = searchRating;

          // Apply new filters and update the list of filtered hotels
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
      // Merge initial state from props (searchName and searchRating)
      ...initialStateProp,
    }
  );

  return result;
}

// Helpers

// Sort hotels by price in ascending order
function sortHotels(hotels: Array<Hotel>) {
  return hotels.sort((hotelA, hotelB) => hotelA.price - hotelB.price);
}

// Filter hotels based on the search name and rating
function filterHotels(
  hotels: Array<Hotel>,
  searchName: string,
  searchRating: Ratings[]
) {
  return hotels.filter((hotel) => {
    // Check if the hotel name matches the search query
    const hasNameMatch = hotel.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    // Check if the hotel rating matches the selected rating filter
    const hasRatingMatch = searchRating.includes(Ratings.ALL)
      ? true
      : searchRating.includes(`${hotel.rating}` as Ratings);

    // Only return hotels that match both name and rating criteria
    return hasNameMatch && hasRatingMatch;
  });
}
