import Image from "next/image";
import style from "./index.module.css";
import { formatDate } from "@/app/_libs/utils";

type Props = {
  date: string;
  updatedAt?: string;
};

export default function Date({ date, updatedAt }: Props) {
  return (
    <div className={style.container}>
      <span
        className={style.dateItem}
        aria-label={`投稿日: ${formatDate(date)}`}
      >
        <Image src="/clock.svg" alt="" width={16} height={16} loading="eager" />
        <time dateTime={date}>{formatDate(date)}</time>
      </span>

      {updatedAt && updatedAt !== date && (
        <span
          className={style.dateItem}
          aria-label={`更新日: ${formatDate(updatedAt)}`}
        >
          <Image src="/refresh.svg" alt="" width={16} height={16} />
          <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
        </span>
      )}
    </div>
  );
}
