import * as React from "react";
import { createRoot } from "react-dom/client";
import { HotelListing } from "./hotel_listing/main";
import "./reset.css";
import "./global.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const hotelListings = [
  {
    id: "QWERty12345aBcD67890u",
    name: "The Grand Arcadia",
    rating: 5,
    price: 320,
    room_type: "Studio Apartment (No Housekeeping)",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/850000/845400/845390/e394a620_z.jpg",
  },
  {
    id: "AsDfGh45678zXcV01234w",
    name: "Cityscape Inn",
    rating: 4,
    price: 275,
    room_type: "Standard Room, Non-Smoking",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/570000/564500/564404/3398b9cd_z.jpg",
  },
  {
    id: "ZxCvBnm09876Poiu54321",
    name: "Harborview Plaza",
    rating: 3,
    price: 150,
    room_type: "Deluxe King Room",
    image:
      "https://hotelimages.webjet.com.au/hotels/1000000/850000/845400/845390/0259fb01_z.jpg",
  },
  {
    id: "LkjHgFq15243yUoi98276",
    name: "Luxury Stay Retreat",
    rating: 5,
    price: 450,
    room_type: "Studio Apartment (Daily Cleaning)",
    image:
      "https://hotelimages.webjet.com.au/hotels/1000000/460000/451200/451160/a1830e51_z.jpg",
  },
  {
    id: "NmMjKi85742LoPa86432u",
    name: "Urban Oasis Hotel",
    rating: 4,
    price: 200,
    room_type: "Standard Room, Smoking",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/30000/23800/23775/0a626b13_z.jpg",
  },
  {
    id: "PlOitRd35789MnKj09354",
    name: "Panorama Heights",
    rating: 2,
    price: 100,
    room_type: "Economy Double Room",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/850000/845400/845390/e394a620_z.jpg",
  },
  {
    id: "GrEkLp12893YtUi08657h",
    name: "Riverview Lodge",
    rating: 3,
    price: 180,
    room_type: "Deluxe Twin Room (City View)",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/570000/564500/564404/3398b9cd_z.jpg",
  },
  {
    id: "QqWwEr12356TyUi87654o",
    name: "Seabreeze Resort",
    rating: 4,
    price: 280,
    room_type: "Premium Ocean View Room",
    image:
      "https://hotelimages.webjet.com.au/hotels/1000000/850000/845400/845390/0259fb01_z.jpg",
  },
  {
    id: "YuLoPl56784HjKx03219m",
    name: "Summit Skyline",
    rating: 5,
    price: 500,
    room_type: "Presidential Suite with Balcony",
    image:
      "https://hotelimages.webjet.com.au/hotels/1000000/460000/451200/451160/a1830e51_z.jpg",
  },
  {
    id: "KoJlRf34562NmIu87543t",
    name: "Downtown Comfort Inn",
    rating: 2,
    price: 90,
    room_type: "Economy Single Room",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/30000/23800/23775/0a626b13_z.jpg",
  },
  {
    id: "WpLaIt54682HvBj06254r",
    name: "Mountain Crest Hotel",
    rating: 4,
    price: 220,
    room_type: "Mountain View Deluxe Suite",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/850000/845400/845390/e394a620_z.jpg",
  },
  {
    id: "MvKiNc73915PoQu68432e",
    name: "Azure Bay Retreat",
    rating: 5,
    price: 350,
    room_type: "Luxury Oceanfront Suite",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/570000/564500/564404/3398b9cd_z.jpg",
  },
  {
    id: "WqErTy10547UoPl94872n",
    name: "Pine Valley Lodge",
    rating: 3,
    price: 170,
    room_type: "Standard Room, Two Beds",
    image:
      "https://hotelimages.webjet.com.au/hotels/1000000/850000/845400/845390/0259fb01_z.jpg",
  },
  {
    id: "AsRkPl63749TvGh98210j",
    name: "Golden Peak Resort",
    rating: 4,
    price: 300,
    room_type: "Superior Room, Garden View",
    image:
      "https://hotelimages.webjet.com.au/hotels/1000000/460000/451200/451160/a1830e51_z.jpg",
  },
  {
    id: "MwLoKc85312XqIt97645u",
    name: "Riverstone Hotel",
    rating: 2,
    price: 120,
    room_type: "Single Studio with Kitchenette",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/30000/23800/23775/0a626b13_z.jpg",
  },
  {
    id: "PlOkJh72934QwMf68741d",
    name: "The Sapphire Inn",
    rating: 5,
    price: 400,
    room_type: "Executive Suite with Terrace",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/850000/845400/845390/e394a620_z.jpg",
  },
  {
    id: "YtOpRx04268HvJk95371g",
    name: "Sunrise Paradise",
    rating: 3,
    price: 160,
    room_type: "Deluxe Family Suite",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/570000/564500/564404/3398b9cd_z.jpg",
  },
  {
    id: "MkWpIt94627NvEj35498o",
    name: "The Velvet Retreat",
    rating: 4,
    price: 260,
    room_type: "Premium King Room",
    image:
      "https://hotelimages.webjet.com.au/hotels/1000000/850000/845400/845390/0259fb01_z.jpg",
  },
  {
    id: "VqRyXu28364LnKo78153p",
    name: "Coral Reef Resort",
    rating: 5,
    price: 420,
    room_type: "Honeymoon Suite with Jacuzzi",
    image:
      "https://hotelimages.webjet.com.au/hotels/1000000/460000/451200/451160/a1830e51_z.jpg",
  },
  {
    id: "PkJcMv98425RnLt64213v",
    name: "Silver Fern Stay",
    rating: 3,
    price: 140,
    room_type: "Budget Single Room",
    image:
      "https://hotelimages.webjet.com.au/lodging/1000000/30000/23800/23775/0a626b13_z.jpg",
  },
];

enum Ratings {
  ALL = "ALL",
  FIVE = "5",
  FOUR = "4",
  THREE = "3",
  TWO = "2",
}

const api = {
  async fetchHotels() {
    return {
      hotels: hotelListings,
      city: "Melbourne",
    };
  },
};

const presenter = {
  storeHotels(dispatch, { hotels, city }) {
    dispatch({
      type: "STORE_HOTELS",
      payload: {
        hotels,
        city,
      },
    });
  },

  changeSearchFilters(dispatch, { name, rating }) {
    dispatch({
      type: "CHANGE_FILTERS",
      payload: {
        name,
        rating,
      },
    });
  },
};

function Main() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
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
          const searchRating = action.payload.rating;
          newState.searchName = searchName;

          const results = newState.allHotels.filter((hotel) =>
            hotel.name.toLowerCase().includes(searchName.toLowerCase())
          );
          newState.hotelResults = results;

          return newState;
        }
      }

      return state;
    },
    {
      searchName: "",
      searchRating: Ratings.ALL,
      allHotels: [],
      hotelResults: [],
      city: null,
    }
  );

  console.log(state);

  React.useEffect(() => {
    api.fetchHotels().then((response) => {
      presenter.storeHotels(dispatch, {
        hotels: response.hotels,
        city: response.city,
      });
    });
  }, []);

  React.useEffect(() => {
    let unlisten = history.listen((t) => {
      const searchP = new URLSearchParams(t.location.search);

      presenter.changeSearchFilters(dispatch, {
        name: searchP.get("name"),
        rating: searchP.get("rating"),
      });
    });

    return () => {
      unlisten();
    };
  });

  const handleSearchByName = React.useCallback((text) => {
    if (text.length === 0) {
      history.push(`${history.location.pathname}`);
      return;
    }

    history.push(`${history.location.pathname}?name=${text}`);
  }, []);

  const handleSearchByRating = React.useCallback(() => {
    // if (text.length === 0) {
    //   history.push(`${history.location.pathname}`);
    //   return;
    // }
    // history.push(`${history.location.pathname}?name=${text}`);
  }, []);

  return (
    <HotelListing
      hotels={state.hotelResults}
      city={state.city}
      onSearchByName={handleSearchByName}
      onSearchByRating={handleSearchByRating}
    />
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
