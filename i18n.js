/* ============================================================
   表示言語ごとの文言（ここだけ直せば文言が変わります）

   ja   : 日本語（標準）
   hira : ひらがな版（小学生未満向け）
   ruby : 読み仮名版（小学生向け） … {漢字|よみ} と書くと <ruby> に変換されます
   en   : English

   ・文言中の {n} や {max} は、プログラムが数字に置き換えます（そのまま残してください）
   ・利用規約は一番下の TERMS を編集してください（1項目ごとに4言語が並んでいます）
   ============================================================ */
window.I18N = {
  /* メニューに出す表示名（切り替えても変わりません） */
  LANGS: [
    { id: "ja",   label: "日本語" },
    { id: "hira", label: "ひらがな" },
    { id: "ruby", label: "ふりがなつき" },
    { id: "en",   label: "English" },
  ],

  DICT: {
    /* ---------- ① タイトル ---------- */
    title: {
      ja:   "渡具知ダイヤモンドクラブ(仮称)",
      hira: "とぐちダイヤモンドクラブ(かりのなまえ)",
      ruby: "渡具知ダイヤモンドクラブ(仮称)",          // 弧の文字はルビ不可のため、下に読みを別表示
      en:   "Toguchi Diamond Club (Working Title)",
    },
    titleReading: {
      ja: "", hira: "", en: "",
      ruby: "とぐちダイヤモンドクラブ(かりのなまえ)",
    },

    /* ---------- 進行表示 ---------- */
    stepsAria: { ja: "進行状況", hira: "すすみぐあい", ruby: "進行状況", en: "Progress" },
    step2: { ja: "ゲーム",   hira: "ゲーム",   ruby: "ゲーム",   en: "Games" },
    step3: { ja: "プレイヤー", hira: "プレイヤー", ruby: "プレイヤー", en: "Players" },
    step4: {
      ja: "利用規約", hira: "きまり", en: "Terms",
      ruby: "{利用規約|りようきやく}",
    },

    /* ---------- ② ゲーム選択 ---------- */
    gamesHeading: {
      ja:   "プレイするゲームを選択してください。(複数選択可能)",
      hira: "あそぶゲームを えらんでください。(いくつでも えらべます)",
      ruby: "プレイするゲームを{選択|せんたく}してください。({複数|ふくすう}{選択|せんたく}{可能|かのう})",
      en:   "Choose the games you want to play. (You can choose more than one)",
    },
    blackjack: { ja: "ブラックジャック", hira: "ブラックジャック", ruby: "ブラックジャック", en: "Blackjack" },
    poker:     { ja: "ポーカー",         hira: "ポーカー",         ruby: "ポーカー",         en: "Poker" },
    roulette:  { ja: "ルーレット",       hira: "ルーレット",       ruby: "ルーレット",       en: "Roulette" },
    errGame: {
      ja:   "ゲームを1つ以上選択してください。",
      hira: "ゲームを ひとつ いじょう えらんでください。",
      ruby: "ゲームを1つ{以上|いじょう}{選択|せんたく}してください。",
      en:   "Please choose at least one game.",
    },

    /* ---------- ③ プレイヤー情報 ---------- */
    countLabel: {
      ja:   "人数を入力：",
      hira: "にんずうを いれてください：",
      ruby: "{人数|にんずう}を{入力|にゅうりょく}：",
      en:   "Number of players:",
    },
    caption: {
      ja:   "情報を入力：",
      hira: "じょうほうを いれてください：",
      ruby: "{情報|じょうほう}を{入力|にゅうりょく}：",
      en:   "Player details:",
    },
    playerLabel: { ja: "プレイヤー{n}", hira: "プレイヤー{n}", ruby: "プレイヤー{n}", en: "Player {n}" },
    nickname:    { ja: "ニックネーム", hira: "ニックネーム", ruby: "ニックネーム", en: "Nickname" },
    ageAria: {
      ja: "プレイヤー{n}の年代", hira: "プレイヤー{n}の ねんだい", ruby: "プレイヤー{n}の年代", en: "Player {n} age group",
    },
    /* プルダウンの中はルビが使えないため、読みは（　）で付けています */
    agePlaceholder: { ja: "年代", hira: "ねんだい", ruby: "年代(ねんだい)", en: "Age group" },
    /* キー（小学生未満 など）は保存される値なので変えないでください */
    "age.小学生未満": { ja: "小学生未満", hira: "しょうがくせいみまん", ruby: "小学生未満(みまん)", en: "Preschool" },
    "age.小学生":     { ja: "小学生",     hira: "しょうがくせい",       ruby: "小学生",            en: "Elementary" },
    "age.中学生":     { ja: "中学生",     hira: "ちゅうがくせい",       ruby: "中学生",            en: "Junior high" },
    "age.高校生":     { ja: "高校生",     hira: "こうこうせい",         ruby: "高校生",            en: "High school" },
    "age.成人":       { ja: "成人",       hira: "せいじん(おとな)",     ruby: "成人(せいじん)",    en: "Adult" },
    genderAria: {
      ja: "プレイヤー{n}の性別", hira: "プレイヤー{n}の せいべつ", ruby: "プレイヤー{n}の性別", en: "Player {n} gender",
    },
    genderPlaceholder: { ja: "性別", hira: "せいべつ", ruby: "性別(せいべつ)", en: "Gender" },
    /* キー（男性 など）は保存される値なので変えないでください */
    "gender.男性":       { ja: "男性",       hira: "だんせい",       ruby: "男性(だんせい)",     en: "Male" },
    "gender.女性":       { ja: "女性",       hira: "じょせい",       ruby: "女性(じょせい)",     en: "Female" },
    "gender.その他":     { ja: "その他",     hira: "そのた",         ruby: "その他(た)",         en: "Other" },
    "gender.回答しない": { ja: "回答しない", hira: "かいとうしない", ruby: "回答(かいとう)しない", en: "Prefer not to say" },

    errCountRange: {
      ja:   "人数は1〜{max}人で入力してください。",
      hira: "にんずうは 1〜{max}にんで いれてください。",
      ruby: "{人数|にんずう}は1〜{max}人で{入力|にゅうりょく}してください。",
      en:   "Please enter a number of players from 1 to {max}.",
    },
    errCountRequired: {
      ja:   "人数を1〜{max}人で入力してください。",
      hira: "にんずうを 1〜{max}にんで いれてください。",
      ruby: "{人数|にんずう}を1〜{max}人で{入力|にゅうりょく}してください。",
      en:   "Please enter a number of players from 1 to {max}.",
    },
    errPlayers: {
      ja:   "すべてのプレイヤーのニックネーム、年代、性別を入力してください。",
      hira: "みんなの ニックネーム、ねんだい、せいべつを いれてください。",
      ruby: "すべてのプレイヤーのニックネーム、{年代|ねんだい}、{性別|せいべつ}を{入力|にゅうりょく}してください。",
      en:   "Please enter a nickname, age group, and gender for every player.",
    },

    /* ---------- ⑤ チュートリアル ---------- */
    tutorialHeading: {
      ja:   "チュートリアルを開始する",
      hira: "あそびかたの せつめいを はじめる",
      ruby: "チュートリアルを{開始|かいし}する",
      en:   "Start the tutorial",
    },
    tutorialBody1: {
      ja:   "お使いのスマートフォンから左のQRコードを読み込んで、チュートリアルを開始しましょう。",
      hira: "スマートフォンで ひだりの QRコードを よみとって、あそびかたの せつめいを はじめましょう。",
      ruby: "お{使|つか}いのスマートフォンから{左|ひだり}のQRコードを{読|よ}み{込|こ}んで、チュートリアルを{開始|かいし}しましょう。",
      en:   "Scan the QR code on the left with your smartphone to start the tutorial.",
    },
    tutorialBody2: {
      ja:   "ゲームルールを事前に把握している場合は、そのまま教室内の席に進んで頂いて構いません。",
      hira: "ゲームの ルールを もう しっている ときは、そのまま きょうしつの せきに すすんで だいじょうぶです。",
      ruby: "ゲームルールを{事前|じぜん}に{把握|はあく}している{場合|ばあい}は、そのまま{教室内|きょうしつない}の{席|せき}に{進|すす}んで{頂|いただ}いて{構|かま}いません。",
      en:   "If you already know the game rules, you may go straight to your seat in the classroom.",
    },
    qrAlt: {
      ja: "チュートリアル用のQRコード", hira: "あそびかた せつめいの QRコード", ruby: "チュートリアル用のQRコード", en: "QR code for the tutorial",
    },

    /* ---------- ⑥ 受付完了 ---------- */
    doneHeading: { ja: "ありがとうございました。", hira: "ありがとうございました。", ruby: "ありがとうございました。", en: "Thank you." },
    doneLine1: {
      ja:   "これにて受付の処理はすべて完了しました。",
      hira: "うけつけは ぜんぶ おわりました。",
      ruby: "これにて{受付|うけつけ}の{処理|しょり}はすべて{完了|かんりょう}しました。",
      en:   "Your registration is now complete.",
    },
    doneLine2: {
      ja:   "入力端末をスタッフへ返却してください。",
      hira: "にゅうりょくした たんまつを スタッフに かえしてください。",
      ruby: "{入力端末|にゅうりょくたんまつ}をスタッフへ{返却|へんきゃく}してください。",
      en:   "Please return this device to a staff member.",
    },
    doneLine3: {
      ja:   "ゲームをお楽しみください！",
      hira: "ゲームを たのしんでください！",
      ruby: "ゲームをお{楽|たの}しみください！",
      en:   "Enjoy the game!",
    },
    /* ">>>" を押した回数のお知らせ（{dots} は ◆◇◇ のような進み具合） */
    pressHint: {
      ja:   "{dots}　あと{n}回押すと、最初の画面に戻ります。",
      hira: "{dots}　あと {n}かい おすと、さいしょの がめんに もどります。",
      ruby: "{dots}　あと{n}回押すと、{最初|さいしょ}の{画面|がめん}に{戻|もど}ります。",
      en:   "{dots}  Press {n} more to return to the start.",
    },

    /* ---------- ④ 利用規約 ---------- */
    termsHeading: {
      ja:   "利用規約を確認してください。",
      hira: "きまりを よんでください。",
      ruby: "{利用規約|りようきやく}を{確認|かくにん}してください。",
      en:   "Please read the terms of use.",
    },
    termsAria: { ja: "利用規約", hira: "きまり", ruby: "利用規約", en: "Terms of use" },
    agree: {
      ja:   "これらの内容に同意します。",
      hira: "これらの ないように どういします。",
      ruby: "これらの{内容|ないよう}に{同意|どうい}します。",
      en:   "I agree to these terms.",
    },
  },

  /* ============================================================
     利用規約（上から順に表示）
       type: "h"   … 見出し（太字・下線）
       type: "li"  … 箇条書き
       type: "gap" … 空白行
     ============================================================ */
  TERMS: [
    { type: "h",
      ja:   "プレイに関する規約",
      hira: "あそびかたの きまり",
      ruby: "プレイに{関|かん}する{規約|きやく}",
      en:   "Rules for playing" },
    { type: "li",
      ja:   "スタッフの案内や指示に従い、よいプレイ環境を保つよう努めてください。",
      hira: "スタッフの あんないや しじに したがって、みんなが たのしく あそべるように してください。",
      ruby: "スタッフの{案内|あんない}や{指示|しじ}に{従|したが}い、よいプレイ{環境|かんきょう}を{保|たも}つよう{努|つと}めてください。",
      en:   "Please follow the staff's guidance and instructions, and help keep the play area comfortable for everyone." },
    { type: "li",
      ja:   "体調不良やトラブルが発生した際は、近くのスタッフに速やかに報告してください。",
      hira: "げんきが ないときや こまったことが あったときは、ちかくの スタッフに すぐ しらせてください。",
      ruby: "{体調不良|たいちょうふりょう}やトラブルが{発生|はっせい}した{際|さい}は、{近|ちか}くのスタッフに{速|すみ}やかに{報告|ほうこく}してください。",
      en:   "If you feel unwell or run into any trouble, tell a nearby staff member right away." },
    { type: "li",
      ja:   "写真や動画の撮影は可能ですが、他の参加者が映り込まないように配慮する必要があります。",
      hira: "しゃしんや どうがは とれますが、ほかの ひとが うつらないように きをつけてください。",
      ruby: "{写真|しゃしん}や{動画|どうが}の{撮影|さつえい}は{可能|かのう}ですが、{他|ほか}の{参加者|さんかしゃ}が{映|うつ}り{込|こ}まないように{配慮|はいりょ}する{必要|ひつよう}があります。",
      en:   "You may take photos and videos, but please take care not to capture other participants." },
    { type: "li",
      ja:   "小学生未満の参加者は、保護者付き添いのもとプレイして頂きます。",
      hira: "しょうがくせいより ちいさい おともだちは、おうちの ひとと いっしょに あそんでください。",
      ruby: "小学生{未満|みまん}の{参加者|さんかしゃ}は、{保護者|ほごしゃ}{付|つ}き{添|そ}いのもとプレイして{頂|いただ}きます。",
      en:   "Participants under elementary school age must play with a parent or guardian." },
    { type: "li",
      ja:   "混雑等のやむを得ない場合が発生した際に、プレイ回数に上限を設ける場合があります。",
      hira: "こんでいるときなどは、あそべる かいすうを かぎることが あります。",
      ruby: "{混雑|こんざつ}{等|など}のやむを{得|え}ない{場合|ばあい}が{発生|はっせい}した{際|さい}に、プレイ{回数|かいすう}に{上限|じょうげん}を{設|もう}ける{場合|ばあい}があります。",
      en:   "When it is crowded, or in other unavoidable cases, we may limit the number of times you can play." },
    { type: "li",
      ja:   "ルール違反やマナー違反等が発覚した場合は、プレイを中断して頂きます。",
      hira: "ルールや マナーを まもらなかったときは、あそぶのを やめて もらいます。",
      ruby: "ルール{違反|いはん}やマナー{違反|いはん}{等|など}が{発覚|はっかく}した{場合|ばあい}は、プレイを{中断|ちゅうだん}して{頂|いただ}きます。",
      en:   "If you break the rules or behave badly, we may ask you to stop playing." },

    { type: "gap" },

    { type: "h",
      ja:   "個人情報の扱いに関する規約",
      hira: "こじんじょうほうの あつかいかた",
      ruby: "{個人情報|こじんじょうほう}の{扱|あつか}いに{関|かん}する{規約|きやく}",
      en:   "Handling of personal information" },
    { type: "li",
      ja:   "入力された情報(ニックネーム, 年代, 性別)については、以下の用途にて利用します。<br>-1. ゲームの進行<br>-2. ランキング表示<br>-3. ゲームごとの累計プレイ人数および年代・性別の推移<br>",
      hira: "いれた じょうほう(ニックネーム、ねんだい、せいべつ)は、つぎの ことに つかいます。<br>-1. ゲームを すすめる ため<br>-2. ランキングを ひょうじする ため<br>-3. ゲームごとの あそんだ ひとの かずと ねんだい・せいべつの うつりかわり<br>",
      ruby: "{入力|にゅうりょく}された{情報|じょうほう}(ニックネーム, {年代|ねんだい}, {性別|せいべつ})については、{以下|いか}の{用途|ようと}にて{利用|りよう}します。<br>-1. ゲームの{進行|しんこう}<br>-2. ランキング{表示|ひょうじ}<br>-3. ゲームごとの{累計|るいけい}プレイ{人数|にんずう}および{年代|ねんだい}・{性別|せいべつ}の{推移|すいい}<br>",
      en:   "The information you enter (nickname, age group, gender) will be used for the following purposes:<br>-1. Running the game<br>-2. Showing rankings<br>-3. Counting total players and age-group and gender trends for each game<br>" },
    { type: "li",
      ja:   "公序良俗に反するニックネームを利用しないでください。",
      hira: "ほかの ひとが いやな きもちに なる ニックネームは つかわないでください。",
      ruby: "{公序良俗|こうじょりょうぞく}に{反|はん}するニックネームを{利用|りよう}しないでください。",
      en:   "Please do not use a nickname that is offensive or against public order and morals." },

    { type: "gap" },

    { type: "h",
      ja:   "金銭やチップに関する規約",
      hira: "おかねや チップの きまり",
      ruby: "{金銭|きんせん}やチップに{関|かん}する{規約|きやく}",
      en:   "Money and chips" },
    { type: "li",
      ja:   "使用するチップ・ポイントはすべて架空のものであり、現金や金券に交換することは出来ません。",
      hira: "つかう チップや ポイントは ぜんぶ ほんものでは ありません。おかねや きんけんには かえられません。",
      ruby: "{使用|しよう}するチップ・ポイントはすべて{架空|かくう}のものであり、{現金|げんきん}や{金券|きんけん}に{交換|こうかん}することは{出来|でき}ません。",
      en:   "All chips and points are fictional. They cannot be exchanged for cash or gift certificates." },
    { type: "li",
      ja:   "参加費と別に、お金や物を賭ける行為はおやめください。",
      hira: "さんかひとは べつに、おかねや ものを かけることは やめてください。",
      ruby: "{参加費|さんかひ}と{別|べつ}に、お{金|かね}や{物|もの}を{賭|か}ける{行為|こうい}はおやめください。",
      en:   "Apart from the participation fee, please do not bet money or goods." },
    { type: "li",
      ja:   "参加者同士でチップの売買や譲渡はおやめください。",
      hira: "おともだちどうしで、チップを うったり かったり、あげたり しないでください。",
      ruby: "{参加者同士|さんかしゃどうし}でチップの{売買|ばいばい}や{譲渡|じょうと}はおやめください。",
      en:   "Please do not sell, buy, or give chips to other participants." },
  ],
};
