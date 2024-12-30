import { ChevronRightIcon } from "../ui/icons/chevron-right";
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
    <a
      className={styles.link}
      href="https://www.webjet.com.au/"
      target="_blank"
    >
      <article className={styles.card}>
        <img className={styles.image} src={image} alt={`${name} image`} />

        <div className={styles.info}>
          <h2>{name}</h2>
          <div className={styles.ratings}>
            <DiamondRatings count={rating} />
          </div>
          <div className={styles.roomType}>
            <b className={styles.roomTypeTitle}>Room type:</b>
            {roomType}
          </div>
        </div>

        <div className={styles.price}>
          <div>${price}</div>

          <div className={styles.indicator}>
            <ChevronRightIcon width={16} height={16} />
          </div>
        </div>
      </article>
    </a>
  );
}
