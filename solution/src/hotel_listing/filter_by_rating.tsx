import layoutStyles from "./layout.module.css";
import { Accordion } from "../ui/accordion/accordion";
import React from "react";

import styles from "./filter_by_rating.module.css";
import { DiamondIcon } from "../ui/icons/diamond";

enum Ratings {
  ALL = "ALL",
  FIVE = "5",
  FOUR = "4",
  THREE = "3",
  TWO = "2",
}

export function FilterByRating({ onChange }) {
  const [ratings, setRatings] = React.useState([Ratings.ALL]);

  const handleChange = React.useCallback((e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (!isChecked) {
      return setRatings((ratings) =>
        ratings.filter((rating) => rating !== value)
      );
    }

    if (value === Ratings.ALL) {
      return setRatings([Ratings.ALL]);
    }

    setRatings((ratings) =>
      [...ratings, value].filter((rating) => rating !== Ratings.ALL)
    );
  }, []);

  return (
    <section className={layoutStyles.filterSection}>
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
    </section>
  );
}

// Helper

function DiamondRatings({ count }) {
  const stars = [];

  for (let i = 0; i < count; i++) {
    stars.push(<DiamondIcon width={16} height={16} key={i} />);
  }

  return <>{stars}</>;
}
