import { Accordion } from "../ui/accordion/accordion";
import React from "react";

import styles from "./filter_by_rating.module.css";
import { DiamondRatings } from "../ui/rating/rating";
import { Ratings } from "./types";
import { Checkbox } from "../ui/checkbox/checkbox";

interface FilterByRatingProps {
  // Initial set of ratings to be selected
  initialValue?: Array<Ratings>;
  // Callback for when the rating filter changes
  onChange: (rating: Array<Ratings>) => void;
}

export function FilterByRating(props: FilterByRatingProps) {
  const { onChange, initialValue = [Ratings.ALL] } = props;

  // If there is no initial value, ALL is default then
  const [ratings, setRatings] = React.useState(initialValue);

  // Handler to toggle ratings when a checkbox is clicked
  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      const value = e.target.value as Ratings;
      const isChecked = e.target.checked;

      if (!isChecked) {
        // Remove unchecked rating, fallback to "All" if no other ratings remain
        return setRatings((ratings) => {
          let result = ratings.filter((rating) => rating !== value);

          result = result.length > 0 ? result : [Ratings.ALL];

          // Flush in the next frame
          setTimeout(() => {
            onChange(result);
          }, 0);

          return result;
        });
      }

      if (value === Ratings.ALL) {
        // Selecting "All" deselects other ratings
        const result = [Ratings.ALL];

        // Flush in the next frame
        setTimeout(() => {
          onChange(result);
        }, 0);

        return setRatings(result);
      }

      // Add checked rating and ensure "All" is deselected if present
      setRatings((ratings) => {
        let result: Array<Ratings> = [...ratings, value].filter(
          (rating) => rating !== Ratings.ALL
        );

        result = result.length > 0 ? result : [Ratings.ALL];

        // Flush in the next frame
        setTimeout(() => {
          onChange(result);
        }, 0);

        return result;
      });
    }, []);

  return (
    <Accordion title="Quality Rating">
      <form onSubmit={(e) => e.preventDefault()}>
        <ul className={styles.list}>
          <li>
            <Checkbox
              name="rating"
              label="All"
              value={Ratings.ALL}
              checked={ratings.includes(Ratings.ALL)}
              onChange={handleChange}
            />
          </li>

          <li>
            <Checkbox
              name="rating"
              label={<DiamondRatings count={5} />}
              value={Ratings.FIVE}
              checked={ratings.includes(Ratings.FIVE)}
              onChange={handleChange}
            />
          </li>

          <li>
            <Checkbox
              name="rating"
              label={<DiamondRatings count={4} />}
              value={Ratings.FOUR}
              checked={ratings.includes(Ratings.FOUR)}
              onChange={handleChange}
            />
          </li>

          <li>
            <Checkbox
              name="rating"
              label={<DiamondRatings count={3} />}
              value={Ratings.THREE}
              checked={ratings.includes(Ratings.THREE)}
              onChange={handleChange}
            />
          </li>

          <li>
            <Checkbox
              name="rating"
              label={<DiamondRatings count={2} />}
              value={Ratings.TWO}
              checked={ratings.includes(Ratings.TWO)}
              onChange={handleChange}
            />
          </li>
        </ul>
      </form>
    </Accordion>
  );
}
