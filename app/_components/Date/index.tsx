import Image from "next/image";
import style from "./index.module.css";

type Props = {
  date: string;
};

export default function Date({ date }: Props) {
  return (
    <span className={style.date}>
      <Image src="/clock.svg" alt="" width={16} height={16} loading="eager" />
      {date}
    </span>
  );
}
