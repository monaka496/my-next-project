import type { Category } from "@/app/_libs/microcms";
import style from "./index.module.css";

type Props = {
  category: Category;
};

export default function Category({ category }: Props) {
  return <span className={style.tag}>{category.name}</span>;
}
