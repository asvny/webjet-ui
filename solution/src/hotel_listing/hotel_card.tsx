import { ChevronRightIcon } from "../ui/icons/chevron-right";
import { DiamondRatings } from "../ui/rating/rating";
import styles from "./hotel_card.module.css";

interface HotelListingCardProps {
  // Hotel name
  name: string;
  // Image URL for the hotel
  image: string;
  // Price for the hotel
  price: number;
  // Rating stars for the hotel
  rating: number;
  // Type of room
  roomType: string;
}

export function HotelListingCard(props: HotelListingCardProps) {
  const { name, image, price, rating, roomType } = props;

  return (
    // For demo purpose, link directs to Webjet for booking; opens in a new tab
    <a
      className={styles.link}
      href="https://www.webjet.com.au/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <article className={styles.card}>
        <img className={styles.image} src={image} alt={`${name} image`} />

        <div className={styles.info}>
          <h2>{name}</h2>
          <div className={styles.ratings}>
            <DiamondRatings count={rating} />
          </div>
          <div className={styles.roomType}>
            <strong className={styles.roomTypeTitle}>Room type:</strong>
            {roomType}
          </div>
        </div>

        <div className={styles.price}>
          <div>${price}</div>

          {/* This is only shown in smaller device like phones */}
          <div className={styles.indicator}>
            <ChevronRightIcon width={16} height={16} />
          </div>
        </div>
      </article>
    </a>
  );
}
