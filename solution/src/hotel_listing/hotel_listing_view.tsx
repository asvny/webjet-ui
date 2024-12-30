import { Hotel } from "../services/api";
import { Ads } from "../ui/ads/ads";
import { Header } from "../ui/header/header";
import { Layout } from "../ui/layout/layout";
import { FilterByHotelName } from "./filter_by_name";
import { FilterByRating } from "./filter_by_rating";
import { HotelListingCard } from "./hotel_card";

import styles from "./hotel_listing_view.module.css";
import { Ratings } from "./types";

interface HotelListingViewProps {
  hotels: Array<Hotel>;
  city: string;
  onSearchByName: (text: string) => void;
  onSearchByRating: (ratings: Array<Ratings>) => void;
}

export function HotelListingView(props: HotelListingViewProps) {
  const { hotels, city, onSearchByName, onSearchByRating } = props;

  return (
    <Layout
      header={<Header />}
      content={
        <Container
          title={
            <h1 className={styles.title}>
              {hotels.length} Hotels Available in {city}
            </h1>
          }
          right={<Ads className={styles.ads} />}
          left={
            <FilterContainer>
              <FilterByHotelName onSubmit={onSearchByName} />
              <FilterByRating onChange={onSearchByRating} />
            </FilterContainer>
          }
        >
          {hotels.map((hotel) => {
            return (
              <HotelListingCard
                key={hotel.id}
                name={hotel.name}
                image={hotel.image}
                price={hotel.price}
                rating={hotel.rating}
                roomType={hotel.room_type}
              />
            );
          })}
        </Container>
      }
    />
  );
}

// Helpers

interface ContainerProps {
  children: React.ReactNode;
  title: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}

function Container(props: ContainerProps) {
  const { children, title, left, right } = props;

  return (
    <div className={styles.wrapper}>
      {title}
      {left}
      <div className={styles.listings}>{children}</div>
      {right}
    </div>
  );
}

function FilterContainer(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterTitle}>Filter results</div>

      <form>{children}</form>
    </div>
  );
}
