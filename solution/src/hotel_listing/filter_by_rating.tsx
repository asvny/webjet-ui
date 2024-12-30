import { Accordion } from "../ui/accordion/accordion";
import React from "react";

import styles from "./filter_by_rating.module.css";
import { DiamondRatings } from "../ui/rating/rating";
import { Ratings } from "./types";

interface FilterByRatingProps {
  onChange: (rating: Array<Ratings>) => void;
}

export function FilterByRating({ onChange }: FilterByRatingProps) {
  const [ratings, setRatings] = React.useState([Ratings.ALL]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      const value = e.target.value as Ratings;
      const isChecked = e.target.checked;

      if (!isChecked) {
        return setRatings((ratings) => {
          const result = ratings.filter((rating) => rating !== value);

          return result.length > 0 ? result : [Ratings.ALL];
        });
      }

      if (value === Ratings.ALL) {
        return setRatings([Ratings.ALL]);
      }

      setRatings((ratings) => {
        const result = [...ratings, value].filter(
          (rating) => rating !== Ratings.ALL
        );

        return result.length > 0 ? result : [Ratings.ALL];
      });
    }, []);

  React.useEffect(() => {
    onChange(ratings);
  }, [onChange, ratings]);

  return (
    <Accordion title="Quality Rating">
      <ul className={styles.ratingFilterList}>
        <li>
          <label className={styles.ratingFilterItem}>
            <input
              type="checkbox"
              name="rating"
              className={styles.checkbox}
              value={Ratings.ALL}
              checked={ratings.includes(Ratings.ALL)}
              onChange={handleChange}
            />
            <span>All</span>
          </label>
        </li>

        <li>
          <label className={styles.ratingFilterItem}>
            <input
              type="checkbox"
              name="rating"
              className={styles.checkbox}
              value={Ratings.FIVE}
              checked={ratings.includes(Ratings.FIVE)}
              onChange={handleChange}
            />
            <span className={styles.ratingFilterStarWrapper}>
              <DiamondRatings count={5} />
            </span>
          </label>
        </li>

        <li>
          <label className={styles.ratingFilterItem}>
            <input
              type="checkbox"
              name="rating"
              className={styles.checkbox}
              value={Ratings.FOUR}
              checked={ratings.includes(Ratings.FOUR)}
              onChange={handleChange}
            />

            <span className={styles.ratingFilterStarWrapper}>
              <DiamondRatings count={4} />
            </span>
          </label>
        </li>

        <li>
          <label className={styles.ratingFilterItem}>
            <input
              type="checkbox"
              name="rating"
              className={styles.checkbox}
              value={Ratings.THREE}
              checked={ratings.includes(Ratings.THREE)}
              onChange={handleChange}
            />

            <span className={styles.ratingFilterStarWrapper}>
              <DiamondRatings count={3} />
            </span>
          </label>
        </li>

        <li>
          <label className={styles.ratingFilterItem}>
            <input
              type="checkbox"
              name="rating"
              className={styles.checkbox}
              value={Ratings.TWO}
              checked={ratings.includes(Ratings.TWO)}
              onChange={handleChange}
            />

            <span className={styles.ratingFilterStarWrapper}>
              <DiamondRatings count={2} />
            </span>
          </label>
        </li>
      </ul>
    </Accordion>
  );
}
