import React from "react";
import styles from "./accordion.module.css";

import { ChevronDownIcon } from "../icons/chevron-down";
import { ChevronRightIcon } from "../icons/chevron-right";

interface AccordionProps {
  // Title displayed in the accordion summary
  title: string;
  // Content to display when the accordion is open
  children: React.ReactNode;
}

export function Accordion(props: AccordionProps) {
  const { title, children } = props;

  // By default, keep the accordion open
  const [open, setOpen] = React.useState(true);

  return (
    <details
      open={open}
      onToggle={(e) => {
        setOpen(e.currentTarget.open);
      }}
    >
      <summary className={styles.summary}>
        {/* Based on open state, display open or close icon right before the label */}
        {open ? (
          <ChevronDownIcon className={styles.indicator} />
        ) : (
          <ChevronRightIcon className={styles.indicator} />
        )}
        <h3 className={styles.title}>{title}</h3>
      </summary>

      <div className={styles.content}>{children}</div>
    </details>
  );
}
