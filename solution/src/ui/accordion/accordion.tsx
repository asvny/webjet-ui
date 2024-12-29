import React from "react";
import styles from "./accordion.module.css";

import { ChevronDownIcon } from "../icons/chevron-down";
import { ChevronRightIcon } from "../icons/chevron-right";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion(props: AccordionProps) {
  const { title, children } = props;

  const [open, setOpen] = React.useState(true);

  return (
    <details
      open={open}
      onToggle={(e) => {
        setOpen(e.currentTarget.open);
      }}
    >
      <summary className={styles.accordionSummary}>
        {open ? (
          <ChevronDownIcon className={styles.accordionIndicator} />
        ) : (
          <ChevronRightIcon className={styles.accordionIndicator} />
        )}
        <h3 className={styles.accordionTitle}>{title}</h3>
      </summary>

      <div className={styles.accordionContent}>{children}</div>
    </details>
  );
}
