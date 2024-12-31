import webjetLogo from "./assets/webjet-logo-au-red.png";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      {/* a11y:  Descriptive alt text for screen readers */}
      <img src={webjetLogo} className={styles.logo} alt="Webjet logo" />
    </header>
  );
}
