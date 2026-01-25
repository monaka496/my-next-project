// app/_components/Profile.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

export default function Profile() {
  const author = {
    name: "もなか",
    description:
      "Web制作で学んだことApple、スマホ関連のニュース、日常のつぶやきをまとめています。お気軽にフォローしてください。",
    avatar: "/cat.png",
    sns: {
      x: "https://x.com/monaka496",
      mastodon: "https://mastodon.social/@monaka496",
      bluesky: "https://bsky.app/profile/monaka496.bsky.social",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.label}>この記事を書いた人</div>
        <Image
          src={author.avatar}
          alt={author.name}
          width={80}
          height={80}
          className={styles.avatar}
        />
      </div>

      <div className={styles.rightSide}>
        <h3 className={styles.name}>{author.name}</h3>

        <p className={styles.description}>{author.description}</p>

        <div className={styles.snsLinks}>
          {author.sns.x && (
            <Link
              href={author.sns.x}
              target="_blank"
              rel="me"
              className={`${styles.snsIcon} ${styles.x}`}
            >
              <Image
                src="/icon_x.svg"
                alt="X"
                width={22}
                height={22}
                className={styles.icon}
              />
            </Link>
          )}
          {author.sns.mastodon && (
            <Link
              href={author.sns.mastodon}
              target="_blank"
              rel="me"
              className={`${styles.snsIcon} ${styles.mastodon}`}
            >
              <Image
                src="/icon_mastodon.svg"
                alt="Mastodon"
                width={22}
                height={22}
                className={styles.icon}
              />
            </Link>
          )}
          {author.sns.bluesky && (
            <Link
              href={author.sns.bluesky}
              target="_blank"
              rel="me"
              className={`${styles.snsIcon} ${styles.bluesky}`}
            >
              <Image
                src="/icon_bluesky.svg"
                alt="Bluesky"
                width={22}
                height={22}
                className={styles.icon}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
