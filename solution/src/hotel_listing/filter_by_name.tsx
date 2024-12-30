import React from "react";
import { Accordion } from "../ui/accordion/accordion";

import styles from "./filter_by_name.module.css";

interface FilterByHotelNameProps {
  initialValue: string;
  onSubmit: (text: string) => void;
}

export function FilterByHotelName({
  onSubmit,
  initialValue,
}: FilterByHotelNameProps) {
  const [searchText, setSearchText] = React.useState(initialValue);

  return (
    <Accordion title="Hotel Name">
      <div className={styles.nameFilterWrapper}>
        <input
          className={styles.nameFilterInput}
          type="text"
          value={searchText}
          placeholder="Enter Hotel Name"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className={styles.nameFilterButton}
          type="button"
          onClick={() => onSubmit(searchText)}
        >
          Go
        </button>
      </div>
    </Accordion>
  );
}
