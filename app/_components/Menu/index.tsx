"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import cx from "classnames";
import styles from "./index.module.css";

export default function Menu() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <div className={styles.menu}>
      <nav className={cx(styles.nav, isOpen && styles.open)}>
        <ul className={styles.items}>
          <li>
            <Link href="/tool/" onClick={close}>
              便利ツール
            </Link>
          </li>
          <li>
            <Link href="/privacy/" onClick={close}>
              プライバシーポリシー
            </Link>
          </li>
          <li>
            <Link
              href="/contact/"
              className={styles.feedbuttonsecondary}
              onClick={close}
            >
              お問い合わせ
            </Link>
          </li>
          <li>
            <Link href="/feed.xml" className={styles.feedbuttonprimary}>
              RSSで購読する
            </Link>
          </li>
        </ul>
        <button className={cx(styles.button, styles.close)} onClick={close}>
          <Image
            src="/close.svg"
            alt="閉じる"
            width={24}
            height={24}
            priority
          />
        </button>
      </nav>
      <button className={styles.button} onClick={open}>
        <Image src="/menu.svg" alt="メニュー" width={24} height={24} />
      </button>
    </div>
  );
}
