import Image from "next/image";
import styles from "./index.module.css";

type Props = {
  id: string;
  title: string;
};

export const Share: React.FC<Props> = ({ id, title }) => {
  if (!id || !title) return null;

  const url = `https://monaka496.com/blog/${id}/`;

  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${url}`;
  const facebookLink = `https://www.facebook.com/sharer.php?u=${url}`;
  const hatenaLink = `https://b.hatena.ne.jp/entry/${url}`;
  const mastodonLink = `https://toot.kytta.dev/share?text=${encodeURIComponent(
    `${title}\n${url}`
  )}`;
  const blueskyLink = `https://bsky.app/intent/compose?text=${encodeURIComponent(
    `${title} ${url}`
  )}`;
  const noteLink = `https://note.mu/intent/post?url=${encodeURIComponent(url)}`;

  return (
    <div className={styles.share}>
      <h3 className={styles.sharetitle}>＼　この記事をシェアする　／</h3>
      <ul className={styles.shareul}>
        <li>
          <a
            href={twitterLink}
            className={`${styles.sharebutton} ${styles.sharex}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon_x.svg"
              alt="Xでシェアする"
              width={22}
              height={22}
              className={styles.icon}
            />
          </a>
        </li>
        <li>
          <a
            href={facebookLink}
            className={`${styles.sharebutton} ${styles.sharefb}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon_facebook.svg"
              alt="Facebookでシェアする"
              width={22}
              height={22}
              className={styles.icon}
            />
          </a>
        </li>
        <li>
          <a
            href={hatenaLink}
            className={`${styles.sharebutton} ${styles.sharehatena}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon_hatena.svg"
              alt="はてなブックマークする"
              width={22}
              height={22}
              className={styles.icon}
            />
          </a>
        </li>
        <li>
          <a
            href={mastodonLink}
            className={`${styles.sharebutton} ${styles.sharemstdn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon_mastodon.svg"
              alt="Mastodonでシェアする"
              width={22}
              height={22}
              className={styles.icon}
            />
          </a>
        </li>
        <li>
          <a
            href={blueskyLink}
            className={`${styles.sharebutton} ${styles.sharebsky}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon_bluesky.svg"
              alt="Blueskyでシェアする"
              width={22}
              height={22}
              className={styles.icon}
            />
          </a>
        </li>
        <li>
          <a
            href={noteLink}
            className={`${styles.sharebutton} ${styles.sharenote}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icon_note.svg"
              alt="noteでシェアする"
              width={22}
              height={22}
              className={styles.icon}
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Share;
