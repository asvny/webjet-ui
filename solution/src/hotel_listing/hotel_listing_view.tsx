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
  initialSearchByName: string;
  onSearchByName: (text: string) => void;
  onSearchByRating: (ratings: Array<Ratings>) => void;
}

export function HotelListingView(props: HotelListingViewProps) {
  const {
    hotels,
    city,
    initialSearchByName,
    onSearchByName,
    onSearchByRating,
  } = props;

  const ads = <Ads className={styles.ads} />;

  const title = (
    <h1 className={styles.title}>
      {hotels.length} Hotels Available in {city}
    </h1>
  );

  const left = (
    <FilterContainer>
      <FilterSection>
        <FilterByHotelName
          initialValue={initialSearchByName}
          onSubmit={onSearchByName}
        />
      </FilterSection>
      <FilterSection>
        <FilterByRating onChange={onSearchByRating} />
      </FilterSection>
    </FilterContainer>
  );

  return (
    <Layout
      header={<Header />}
      content={
        <Container title={title} right={ads} left={left}>
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

      <form onSubmit={(e) => e.preventDefault()}>{children}</form>
    </div>
  );
}

function FilterSection(props: React.PropsWithChildren) {
  const { children } = props;

  return <section className={styles.filterSection}>{children}</section>;
}
