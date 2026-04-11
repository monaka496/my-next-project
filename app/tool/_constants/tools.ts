export const ALL_TOOLS = [
  {
    id: "urlencode",
    title: "URLエンコード・デコード",
    navTitle: "URLエンコード",
    description:
      "日本語や記号をURLセーフな形式に変換、または元の文字列に復元します。",
    icon: "🔗",
    category: "Network",
  },
  {
    id: "base64",
    title: "Base64エンコード・デコード",
    navTitle: "Base64変換",
    description:
      "テキストをBase64形式に変換、または元の文字列に復元します。マルチバイト対応。",
    icon: "📦",
    category: "Utility",
  },
  {
    id: "wordcount",
    title: "文字数カウント",
    navTitle: "文字数カウント",
    description:
      "文字数、行数、バイト数をリアルタイムに計測。空白除外カウントも可能です。",
    icon: "🔢",
    category: "Utility",
  },
  {
    id: "password",
    title: "パスワード生成",
    navTitle: "パスワード生成",
    description:
      "安全で強力なパスワードをブラウザ上で生成。長さや記号の有無を自由に設定できます。",
    icon: "🔑",
    category: "Security",
  },
  {
    id: "json-format",
    title: "JSON整形（フォーマッター）",
    navTitle: "JSON整形",
    description:
      "読みにくい一行のJSONを、指定したインデントで綺麗に整形します。エラー箇所の特定にも便利です。",
    icon: "JSON", // または "✨"
    category: "Developer",
  },
  {
    id: "html-escape",
    title: "HTMLエスケープ（特殊文字変換）",
    navTitle: "HTMLエスケープ",
    description:
      "HTMLタグなどの特殊文字（<, >, &, \", '）をエスケープ文字に変換、または元に戻します。",
    icon: "HTML",
    category: "Developer",
  },
  {
    id: "text-cleaner",
    title: "重複削除ツール",
    navTitle: "重複削除",
    description:
      "テキスト内の空行削除、重複行の統合、行頭・行末のスペース除去を一括で行います。",
    icon: "🧹",
    category: "Utility",
  },
  {
    id: "unix-time",
    title: "Unixタイムスタンプ相互変換",
    navTitle: "Unixタイムスタンプ",
    description:
      "Unixタイムスタンプを日時に変換、または日時からタイムスタンプを生成します。ミリ秒・秒の両方に対応。",
    icon: "🕒",
    category: "Developer",
  },
  {
    id: "url-parser",
    title: "URLパラメータ解析・編集",
    navTitle: "URLパラメータ解析",
    description:
      "複雑なURLを分解し、クエリパラメータを一覧表示・編集・再構築します。デバッグに最適です。",
    icon: "🔍",
    category: "Network",
  },
  {
    id: "color-converter",
    title: "カラーコード変換（HEX / RGB / HSL）",
    navTitle: "カラーコード変換",
    description:
      "HEX、RGB、HSL形式のカラーコードを相互に変換します。透明度の調整やプレビュー確認も可能です。",
    icon: "🎨",
    category: "Design",
  },
];
