import React from "react";
import { DiamondIcon } from "../icons/diamond";
import styles from "./rating.module.css";

interface DiamondRatingsProps {
  // Number of diamond icons to render
  count: number;
}

export const DiamondRatings = React.memo(({ count }: DiamondRatingsProps) => {
  const stars = [];

  for (let i = 0; i < count; i++) {
    stars.push(<DiamondIcon width={16} height={16} key={i} />);
  }

  return (
    // a11y: informs assistive technologies this is a non-interactive, image-like component
    <div className={styles.rating} role="img" aria-label={`${count} stars`}>
      {stars}
    </div>
  );
});
