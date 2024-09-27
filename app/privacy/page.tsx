import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div>
      <section className={styles.section}>
        <h1 className={styles.h1}>プライバシーポリシー</h1>
      </section>
      <p className={styles.text}>
        本プライバシーポリシーは、monaka（
        <Link href="https://monaka496.com/" className={styles.link}>
          https://monaka496.com/
        </Link>
        ）
        （以下、「当サイト」とします。）の各種サービス（当サイトによる情報提供、各種お問合せの受付等）において、当サイトの訪問者（以下、「訪問者」とします。）の個人情報もしくはそれに準ずる情報を取り扱う際に、当サイトが遵守する方針を示したものです。
      </p>
      <h2 className={styles.h2}>基本方針</h2>
      <p className={styles.text}>
        当サイトは、個人情報の重要性を認識し、個人情報を保護することが社会的責務であると考え、個人情報に関する法令を遵守し、当サイトで取扱う個人情報の取得、利用、管理を適正に行います。当サイトで収集した情報は、利用目的の範囲内で適切に取り扱います。また、本プライバシーポリシーは、当サイトにおいてのみ適用されます。
      </p>
      <h2 className={styles.h2}>個人情報の取得と利用目的</h2>
      <p className={styles.text}>
        当サイトで取得する訪問者の個人情報と利用目的をご案内します。
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>目的</th>
            <th>内容</th>
            <th>取得項目</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>お問い合わせ対応のため</td>
            <td>
              <p>
                <a href="/contact/" className={styles.link}>
                  お問い合わせフォーム
                </a>
                を設けています。
                <br />
                訪問者が問い合わせをされた際に、
                <br />
                連絡のためフォームより入力情報を取得します。
              </p>
            </td>
            <td>
              <ul>
                <li>名前（ハンドルネーム可）</li>
                <li>メールアドレス</li>
                <li>お問い合せ内容</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className={styles.h2}>個人情報取得の同意について</h2>
      <p className={styles.text}>
        当サイトではお問い合わせフォームからお問い合わせをする前に、当プライバシーポリシーをご一読いただくよう案内しています。お問い合わせをされた時点で、その訪問者は当プライバシーポリシーに同意されたとみなします。
      </p>
      <p className={styles.text}>
        訪問者ご本人からの個人情報の開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。希望される場合は、お問い合わせフォームよりご連絡ください。
      </p>
      <h2 className={styles.h2}>Cookie情報の取得について</h2>
      <p className={styles.text}>
        当サイトでは、第三者から配信される広告が掲載される場合があり、これに関連して当該第三者が訪問者のCookie情報等を取得して、利用している場合があります。当該第三者によって取得されたCookie情報等は、当該第三者のプライバシーポリシーに従って取り扱われます。
      </p>
      <p className={styles.text}>
        訪問者は、当該第三者のウェブサイト内に設けられたオプトアウト（個人情報を第三者に提供することを停止すること）ページにアクセスして、当該第三者によるCookie情報等の広告配信への利用を停止することができます。
      </p>
      <p className={styles.text}>
        Cookieの送受信に関する設定を「すべてのCookieを許可する」、「すべてのCookieを拒否する」、「Cookieを受信したらユーザーに通知する」などから選択できます。設定方法は、ブラウザにより異なります。Cookieに関する設定方法は、お使いのブラウザの「ヘルプ」メニューでご確認ください。
      </p>
      <h2 className={styles.h2}>アクセス解析ツールについて</h2>
      <p className={styles.text}>
        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはアクセス情報の収集のためにCookieを使用しています。このアクセス情報は匿名で収集されており、個人を特定するものではありません。
      </p>
      <p className={styles.text}>
        GoogleアナリティクスのCookieは、26ヶ月間保持されます。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
      </p>
      <ul className={styles.ul}>
        <li>
          Googleアナリティクスの利用規約に関して確認したい場合は
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            className={styles.link}
          >
            こちら
          </a>
        </li>
        <li>
          「ユーザーが Google パートナーのサイトやアプリを使用する際の Google
          によるデータ使用」に関して確認したい場合は
          <a
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            className={styles.link}
          >
            こちら
          </a>
        </li>
      </ul>
      <h2 className={styles.h2}>Google AdSenseについて</h2>
      <p className={styles.text}>
        当サイトは、第三者配信の広告サービス「Google
        Adsense（グーグルアドセンス）」を利用しています。Googleなどの第三者広告配信事業者は、訪問者の興味に応じた広告を表示するために、Cookie（当サイトの訪問者が当サイトや他のサイトにアクセスした際の情報など）を使用することがあります。
      </p>
      <h2 className={styles.h2}>アフィリエイト広告の配信について</h2>
      <p className={styles.text}>
        当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。第三者（Amazonや他の広告掲載者）がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookieを設定したり、認識したりする場合があります。
      </p>
      <h2 className={styles.h2}>プライバシーポリシーの変更について</h2>
      <p className={styles.text}>
        当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
      </p>
      <p className={styles.text}>2024年10月1日 策定</p>
    </div>
  );
}
