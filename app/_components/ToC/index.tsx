import React from "react";
import styles from "./index.module.css";

interface TocItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  toc: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  if (toc.length === 0) {
    return null;
  }

  return (
    <div className={styles.toc}>
      <h2 className={styles.h2}>目次</h2>
      <ul>
        {toc.map((item) => (
          <li className={styles.tocli} key={item.id}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
