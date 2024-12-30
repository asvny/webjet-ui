import React from "react";
import { DiamondIcon } from "../icons/diamond";

interface DiamondRatingsProps {
  count: number;
}

export const DiamondRatings = React.memo(({ count }: DiamondRatingsProps) => {
  const stars = [];

  for (let i = 0; i < count; i++) {
    stars.push(<DiamondIcon width={16} height={16} key={i} />);
  }

  return <>{stars}</>;
});
