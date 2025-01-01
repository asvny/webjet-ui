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
  // List of hotels to display
  hotels: Array<Hotel>;
  // Name of the city where the hotels are located
  city: string;
  // Initial search text for hotel names
  initialSearchByName: string;
  // Initial search filter for ratings
  initialSearchByRating: Array<Ratings>;
  // Handler function for hotel name search
  onSearchByName: (text: string) => void;
  // Handler function for rating search
  onSearchByRating: (ratings: Array<Ratings>) => void;
}

export function HotelListingView(props: HotelListingViewProps) {
  const {
    hotels,
    city,
    initialSearchByName,
    initialSearchByRating,
    onSearchByName,
    onSearchByRating,
  } = props;

  // Placeholder ads in the right side bar
  const ads = <Ads className={styles.ads} />;

  // Title to show the number of hotels in the given city
  const title = (
    <h1 className={styles.title}>
      {hotels.length} Hotels Available in {city}
    </h1>
  );

  // Left section containing filters for hotel name and rating
  const left = (
    <FilterContainer>
      <FilterSection>
        <FilterByHotelName
          initialValue={initialSearchByName}
          onSubmit={onSearchByName}
        />
      </FilterSection>
      <FilterSection>
        <FilterByRating
          initialValue={initialSearchByRating}
          onChange={onSearchByRating}
        />
      </FilterSection>
    </FilterContainer>
  );

  // Displays the hotel cards
  const list = hotels.map((hotel) => {
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
  });

  return (
    <Layout
      header={<Header />}
      content={
        <Container title={title} right={ads} left={left}>
          {list}
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

      {children}
    </div>
  );
}

function FilterSection(props: React.PropsWithChildren) {
  const { children } = props;

  return <section className={styles.filterSection}>{children}</section>;
}
