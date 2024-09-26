import Image from "next/image";
import styles from "./index.module.css";

export default function Hero() {
  return (
    <section className={styles.container}>
      <Image
        className={styles.bgimg}
        src="/img-mv.jpg"
        alt=""
        width={4000}
        height={1200}
      />
    </section>
  );
}
