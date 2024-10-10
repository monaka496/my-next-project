import Image from "next/image";
import styles from "./index.module.css";

type Props = {
  id: string;
  title: string;
};

export const Share: React.FC<Props> = (props) => {
  const { id, title } = props;

  if (!id || !title) {
    return null;
  }

  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=https://monaka496.com/blog/${id}/`;
  const facebookLink = `https://www.facebook.com/sharer.php?u=https://monaka496.com/blog/${id}/`;
  const hatenaLink = `https://b.hatena.ne.jp/entry/https://monaka496.com/blog/${id}/`;

  return (
    <div className={styles.share}>
      <h3 className={styles.sharetitle}>記事をシェアする</h3>
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
              className={styles.icon}
              width={16}
              height={16}
            />
            ポストする
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
              className={styles.icon}
              width={16}
              height={16}
            />
            シェアする
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
              className={styles.icon}
              width={16}
              height={16}
            />
            ブックマークする
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Share;
