import layoutStyles from "./layout.module.css";
import { Accordion } from "../ui/accordion/accordion";
import React from "react";

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
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                name="rating"
                value={Ratings.ALL}
                checked={ratings.includes(Ratings.ALL)}
                onChange={handleChange}
              />
              <span>All</span>
            </label>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                name="rating"
                value={Ratings.FIVE}
                checked={ratings.includes(Ratings.FIVE)}
                onChange={handleChange}
              />
              <span>5 stars</span>
            </label>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                name="rating"
                value={Ratings.FOUR}
                checked={ratings.includes(Ratings.FOUR)}
                onChange={handleChange}
              />

              <span>4 stars</span>
            </label>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                name="rating"
                value={Ratings.THREE}
                checked={ratings.includes(Ratings.THREE)}
                onChange={handleChange}
              />

              <span>3 stars</span>
            </label>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                name="rating"
                value={Ratings.TWO}
                checked={ratings.includes(Ratings.TWO)}
                onChange={handleChange}
              />

              <span>2 stars</span>
            </label>
          </li>
        </ul>
      </Accordion>
    </section>
  );
}
