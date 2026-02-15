// app/tool/_components/ToolNav/index.tsx
import Link from "next/link";
import styles from "./index.module.css";

const ALL_TOOLS = [
  { id: "urlencode", title: "URLエンコード" },
  { id: "base64", title: "Base64変換" },
];

export default function ToolNav({ currentId }: { currentId: string }) {
  const otherTools = ALL_TOOLS.filter((tool) => tool.id !== currentId);

  return (
    <div className={styles.footerNav}>
      <h2 className={styles.footerNavTitle}>他のツールも使ってみる</h2>
      <div className={styles.footerLinkWrapper}>
        {otherTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tool/${tool.id}`}
            className={styles.footerLink}
          >
            {tool.title} →
          </Link>
        ))}
        <Link href="/tool" className={styles.footerLinkSecondary}>
          ツール一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
