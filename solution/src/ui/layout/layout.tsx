import styles from "./layout.module.css";

interface LayoutProps {
  // Header node to display logo
  header: React.ReactNode;
  // Actual listing content
  content: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const { header, content } = props;

  return (
    <div className={styles.container}>
      {header}

      <main className={styles.main}>{content}</main>
    </div>
  );
}
