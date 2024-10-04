import type { Tag } from "@/app/_libs/microcms"; // Tag型をインポート
import style from "./index.module.css";

type Props = {
  tags: Tag[]; // タグの配列をTag型に変更
};

export default function Tag({ tags }: Props) {
  // tagsが存在しない場合は何も表示しない
  if (!Array.isArray(tags) || tags.length === 0) {
    return null;
  }

  return (
    <ul className={style.tagContainer}>
      {tags.map((tag) => (
        <li key={tag.id} className={style.tag}>
          {tag.name}
        </li>
      ))}
    </ul>
  );
}
