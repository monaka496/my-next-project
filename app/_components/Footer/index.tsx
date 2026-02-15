import Link from "next/link";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <Link href="/tool/">便利ツール</Link>
          </li>
          <li className={styles.item}>
            <Link href="/privacy/">プライバシーポリシー</Link>
          </li>
          <li className={styles.item}>
            <Link href="/contact/">お問い合わせ</Link>
          </li>
          <li className={styles.item}>
            <Link href="/feed.xml">RSSで購読する</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.cr}>© monaka ALL Rights Reserved</p>
    </footer>
  );
}
