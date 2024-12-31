import React from "react";
import { Accordion } from "../ui/accordion/accordion";

import styles from "./filter_by_name.module.css";

interface FilterByHotelNameProps {
  // Initial value of the search input
  initialValue: string;
  // Callback function triggered on submission
  onSubmit: (text: string) => void;
}

export function FilterByHotelName({
  onSubmit,
  initialValue,
}: FilterByHotelNameProps) {
  const [searchText, setSearchText] = React.useState(initialValue);

  return (
    <Accordion title="Hotel Name">
      <div className={styles.wrapper}>
        {/* Text input for entering the hotel name  */}
        <input
          className={styles.input}
          type="text"
          value={searchText}
          placeholder="Enter Hotel Name"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        {/* Button to trigger the search submission */}
        <button
          className={styles.button}
          type="button"
          onClick={() => onSubmit(searchText)}
        >
          Go
        </button>
      </div>
    </Accordion>
  );
}
