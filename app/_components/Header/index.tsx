import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Menu from "@/app/_components/Menu/index";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        monaka
      </Link>
      <Menu />
    </header>
  );
}
