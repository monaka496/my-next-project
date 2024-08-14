import Image from "next/image";
import styles from "./page.module.css";

import { profile } from "console";
import { getMenbersList } from "../_libs/microcms";
import { MEMBERS_LIST_LIMIT } from "@/app/_constants";

export default async function Page() {
  const data = await getMenbersList({ limit: MEMBERS_LIST_LIMIT });
  return (
    <div className={styles.containter}>
      {data.contents.length === 0 ? (
        <p className={styles.empty}>メンバーが登録されていません。</p>
      ) : (
        <ul>
          {data.contents.map((member) => (
            <li key={member.id} className={styles.list}>
              <Image
                className={styles.image}
                src={member.image.url}
                alt=""
                width={member.image.width}
                height={member.image.height}
              />
              <dl>
                <dt className={styles.name}>{member.name}</dt>
                <dt className={styles.position}>{member.position}</dt>
                <dt className={styles.profile}>{member.profile}</dt>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
