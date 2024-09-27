import styles from "./page.module.css";

export default function Page() {
  return (
    <div>
      <section className={styles.section}>
        <h1 className={styles.h1}>お問い合わせ</h1>
      </section>
      <p className={styles.text}>
        ご質問、ご相談は下記フォームよりお問い合わせください。
        <br />
        お返事までお時間をいただく場合がございます。ご了承のほどよろしくお願いいたします。
      </p>
      <form
        className={styles.form}
        action="https://ssgform.com/s/i767b5V39NXh"
        method="post"
      >
        <input
          className={styles.input}
          type="text"
          name="お名前"
          placeholder="お名前"
          required
        />
        <input
          className={styles.input}
          type="email"
          name="メールアドレス"
          placeholder="メールアドレス"
          required
        />
        <textarea
          className={styles.textarea}
          name="お問い合わせ内容"
          placeholder="お問い合わせ内容"
          required
        ></textarea>
        <button className={styles.button} type="submit">
          送信する
        </button>
      </form>
    </div>
  );
}
