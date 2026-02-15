import Link from "next/link";
import styles from "./index.module.css";
import { ALL_TOOLS } from "../../_constants/tools";

export default function ToolNav({ currentId }: { currentId: string }) {
  // 現在表示しているツール（currentId）を除外したリストを作成
  const otherTools = ALL_TOOLS.filter((tool) => tool.id !== currentId);

  return (
    <div className={styles.footerNav}>
      <h2 className={styles.footerNavTitle}>他のツールも使ってみる</h2>
      <div className={styles.footerLinkWrapper}>
        {otherTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tool/${tool.id}/`} // 末尾スラッシュありに統一
            className={styles.footerLink}
          >
            {tool.navTitle} →
          </Link>
        ))}
        <Link href="/tool/" className={styles.footerLinkSecondary}>
          ツール一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
