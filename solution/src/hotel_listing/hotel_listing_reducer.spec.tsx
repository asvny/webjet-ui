import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import { act } from "react";

import { useHotelListingReducer } from "./hotel_listing_reducer";
import { Ratings } from "./types";

const initialSearchValues = { searchName: "", searchRating: [Ratings.ALL] };

test("should initialize state correctly", () => {
  const { result } = renderHook(() =>
    useHotelListingReducer(initialSearchValues)
  );

  expect(result.current[0].searchName).toBe("");
  expect(result.current[0].searchRating).toEqual([Ratings.ALL]);
  expect(result.current[0].status).toBe("idle");
  expect(result.current[0].hotelResults).toEqual([]);
  expect(result.current[0].city).toBeNull();
});

test("should store hotels and city", () => {
  const hotels = [
    {
      id: "1",
      name: "A",
      price: 300,
      rating: 5,
      room_type: "A Room",
      image: "a.jpg",
    },
    {
      id: "2",
      name: "B",
      price: 200,
      rating: 4,
      room_type: "B Room",
      image: "b.jpg",
    },
  ];

  const { result } = renderHook(() =>
    useHotelListingReducer(initialSearchValues)
  );

  // Dispatch STORE_HOTELS action
  act(() => {
    result.current[1]({
      type: "STORE_HOTELS",
      payload: { hotels, city: "Melbourne" },
    });
  });

  expect(result.current[0].allHotels).toEqual([
    {
      id: "2",
      name: "B",
      price: 200,
      rating: 4,
      room_type: "B Room",
      image: "b.jpg",
    },
    {
      id: "1",
      name: "A",
      price: 300,
      rating: 5,
      room_type: "A Room",
      image: "a.jpg",
    },
  ]);
  expect(result.current[0].city).toBe("Melbourne");
  expect(result.current[0].status).toBe("loaded");
});

test("should apply name and rating filters", () => {
  const hotels = [
    {
      id: "1",
      name: "The Grand Arcadia",
      price: 200,
      rating: 5,
      room_type: "A Room",
      image: "a.jpg",
    },
    {
      id: "2",
      name: "Cityscape Inn",
      price: 300,
      rating: 4,
      room_type: "B Room",
      image: "b.jpg",
    },
  ];

  const { result } = renderHook(() =>
    useHotelListingReducer(initialSearchValues)
  );

  // Dispatch STORE_HOTELS action
  act(() => {
    result.current[1]({
      type: "STORE_HOTELS",
      payload: { hotels, city: "Melbourne" },
    });
  });

  // Dispatch CHANGE_FILTERS to update the filters
  act(() => {
    result.current[1]({
      type: "CHANGE_FILTERS",
      payload: { ratings: [Ratings.FIVE], name: "Grand" },
    });
  });

  expect(result.current[0].hotelResults).toEqual([
    {
      id: "1",
      name: "The Grand Arcadia",
      price: 200,
      rating: 5,
      room_type: "A Room",
      image: "a.jpg",
    },
  ]);
});

test("should return empty hotel results when no hotels match the filter", () => {
  const hotels = [
    {
      id: "1",
      name: "The Grand Arcadia",
      price: 200,
      rating: 5,
      room_type: "A Room",
      image: "a.jpg",
    },
    {
      id: "2",
      name: "Cityscape Inn",
      price: 300,
      rating: 4,
      room_type: "B Room",
      image: "b.jpg",
    },
  ];

  const { result } = renderHook(() =>
    useHotelListingReducer(initialSearchValues)
  );

  act(() => {
    result.current[1]({
      type: "STORE_HOTELS",
      payload: { hotels, city: "Melbourne" },
    });
  });

  act(() => {
    result.current[1]({
      type: "CHANGE_FILTERS",
      payload: { ratings: [Ratings.THREE], name: "" },
    });
  });

  expect(result.current[0].hotelResults).toEqual([]);
});

test("should filter hotels by name case insensitively", () => {
  const hotels = [
    {
      id: "1",
      name: "The Grand Arcadia",
      price: 200,
      rating: 5,
      room_type: "A Room",
      image: "a.jpg",
    },
    {
      id: "2",
      name: "Cityscape Inn",
      price: 300,
      rating: 4,
      room_type: "B Room",
      image: "b.jpg",
    },
  ];

  const { result } = renderHook(() =>
    useHotelListingReducer({ ...initialSearchValues, searchName: "arcadia" })
  );

  act(() => {
    result.current[1]({
      type: "STORE_HOTELS",
      payload: { hotels, city: "Melbourne" },
    });
  });

  expect(result.current[0].hotelResults).toEqual([
    {
      id: "1",
      name: "The Grand Arcadia",
      price: 200,
      rating: 5,
      room_type: "A Room",
      image: "a.jpg",
    },
  ]);
});
