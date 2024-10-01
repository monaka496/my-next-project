import Link from "next/link";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <Link href="/blog">新着記事</Link>
          </li>
          <li className={styles.item}>
            <Link href="/contact">お問い合わせ</Link>
          </li>
          <li>
            <Link href="/privacy">プライバシーポリシー</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.cr}>© monaka. ALL Rights Reserved</p>
    </footer>
  );
}
