import styles from "./layout.module.css";

interface LayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const { header, content } = props;

  return (
    <div className={styles.container}>
      {header}

      <main className={styles.mainContainer}>{content}</main>
    </div>
  );
}
