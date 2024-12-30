import { DiamondRatings } from "../ui/rating/rating";
import styles from "./hotel_card.module.css";

interface HotelListingCardProps {
  name: string;
  image: string;
  price: number;
  rating: number;
  roomType: string;
}

export function HotelListingCard(props: HotelListingCardProps) {
  const { name, image, price, rating, roomType } = props;

  return (
    <article className={styles.card}>
      <img
        style={{
          gridArea: "image",
        }}
        src={image}
        alt={`${name} image`}
      />

      <div
        style={{
          gridArea: "info",
        }}
      >
        <h2>{name}</h2>
        <div>
          <DiamondRatings count={rating} />
        </div>
        <div>{roomType}</div>
      </div>

      <div
        style={{
          gridArea: "price",
          backgroundColor: "#f1f1f1",
          textAlign: "end",
          paddingBlock: 24,
          paddingInline: 16,
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        ${price}
      </div>
    </article>
  );
}
