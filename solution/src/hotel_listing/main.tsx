import { Header } from "./header";
import { Layout } from "./layout";
import layoutStyles from "./layout.module.css";

import adsImage from "./assets/ads.png";

import { FilterByHotelName } from "./filter_by_name";
import { FilterByRating } from "./filter_by_rating";
import React from "react";

interface HotelListingProps {
  hotels: Array<any>;
  city: string;
}

export function HotelListing(props: HotelListingProps) {
  const { hotels, city, onSearchByName } = props;

  return (
    <Layout
      header={<Header />}
      content={
        <Container
          title={
            <h1 className={layoutStyles.title}>
              {hotels.length} Hotels Available in {city}
            </h1>
          }
          right={<Ads />}
          left={
            <FilterContainer>
              <FilterByHotelName onSubmit={onSearchByName} />
              <FilterByRating />
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

interface ContainerProps {
  children: React.ReactNode;
  title: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}

function Container(props: ContainerProps) {
  const { children, title, left, right } = props;

  return (
    <div className={layoutStyles.wrapper}>
      {title}
      {left}
      <div className={layoutStyles.listings}>{children}</div>
      {right}
    </div>
  );
}

function Ads() {
  return (
    <div className={layoutStyles.ads}>
      {/* Actual ads link can be put here */}
      <a href="https://www.webjet.com.au/" target="_blank" rel="noopener">
        <img
          src={adsImage}
          alt="27 day Grand Scandinavia tour with baltics cruises and flights - $6999"
        />
      </a>
    </div>
  );
}

interface FilterContainerProps {
  children: React.ReactNode;
}

function FilterContainer(props: FilterContainerProps) {
  const { children } = props;

  return (
    <div className={layoutStyles.filterContainer}>
      <div className={layoutStyles.filterTitle}>Filter results</div>

      <form>{children}</form>
    </div>
  );
}

interface HotelListingCardProps {
  name: string;
  image: string;
  price: number;
  rating: number;
  roomType: string;
}

function HotelListingCard(props: HotelListingCardProps) {
  const { name, image, price, rating, roomType } = props;

  return (
    <article>
      <img src={image} alt={`${name} image`} />

      <h2>{name}</h2>

      <div>{rating}</div>
      <div>{roomType}</div>

      <div>{price}</div>
    </article>
  );
}
