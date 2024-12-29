import layoutStyles from "./layout.module.css";
import { Accordion } from "../ui/accordion/accordion";

import styles from "./filter_by_name.module.css";
import React from "react";

export function FilterByHotelName({ onSubmit }) {
  const [searchText, setSearchText] = React.useState("");

  return (
    <section className={layoutStyles.filterSection}>
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
            // disabled={searchText.length === 0}
            onClick={() => onSubmit(searchText)}
          >
            Go
          </button>
        </div>
      </Accordion>
    </section>
  );
}
