/* 渡具知ダイヤモンドクラブ — 画面遷移・入力制御・表示言語の切り替え */
(() => {
  "use strict";

  /** 運用上の人数制限はなし。桁の打ち間違いで画面が固まらないための安全値（Code.gs と同じ値にする） */
  const MAX_PLAYERS = 999;
  /** 年代の値（保存されるのは常にこの日本語の値。表示名は i18n.js の "age.○○"） */
  const AGE_VALUES = ["小学生未満", "小学生", "中学生", "高校生", "成人"];
  /** 性別の値（保存されるのは常にこの日本語の値。表示名は i18n.js の "gender.○○"） */
  const GENDER_VALUES = ["男性", "女性", "その他", "回答しない"];

  const { LANGS, DICT, TERMS } = window.I18N;

  /** ⑤以降のコンテンツで使えるよう、入力内容は state にまとめる */
  const state = { lang: "ja", games: [], players: [], groupID: null };
  window.clubState = state;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $("#app");

  /* ============================================================
     表示言語
     ============================================================ */
  const STORAGE_KEY = "club-lang";
  let lang = "ja";

  /** {漢字|よみ} → <ruby>漢字<rt>よみ</rt></ruby> */
  const RUBY_RE = /\{([^|{}]+)\|([^{}]+)\}/g;
  const toRuby = (s) => s.replace(RUBY_RE, "<ruby>$1<rt>$2</rt></ruby>");
  const stripRuby = (s) => s.replace(RUBY_RE, "$1");

  function pick(entry) {
    return entry[lang] ?? entry.ja ?? "";
  }
  function fill(s, params) {
    return s.replace(/\{([a-z]+)\}/g, (m, k) => (k in params ? params[k] : m));
  }
  /** 画面に出す文言（HTML。ひらがな/英語では素のテキスト、読み仮名版ではルビ付き） */
  function t(key, params = {}) {
    const entry = DICT[key];
    if (!entry) return key;
    const s = fill(pick(entry), params);
    return lang === "ruby" ? toRuby(s) : s;
  }
  /** 属性・選択肢・タイトルなど、ルビを付けられない場所用の文言 */
  function tp(key, params = {}) {
    const entry = DICT[key];
    return entry ? stripRuby(fill(pick(entry), params)) : key;
  }

  function loadLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (LANGS.some((l) => l.id === saved)) return saved;
    } catch (_) { /* 保存できない環境では標準のまま */ }
    return "ja";
  }
  function saveLang() {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* 何もしない */ }
  }

  /* ---------- メッセージ（言語を切り替えても出ている文言を追従させる） ---------- */
  function setMsg(el, key, params) {
    el.dataset.key = key || "";
    el.dataset.params = JSON.stringify(params || {});
    el.innerHTML = key ? t(key, params) : "";
  }
  function refreshMsgs() {
    $$(".msg, .press-hint").forEach((el) => {
      if (el.dataset.key) el.innerHTML = t(el.dataset.key, JSON.parse(el.dataset.params || "{}"));
    });
  }

  /* ---------- タイトルの弧の文字：長さに合わせて文字サイズを調整 ---------- */
  const arcText = $("#arc-text");
  const arcPath = $("#arc-text textPath");
  const ARC_MAX = 70;     // 最大の文字サイズ(px)
  const ARC_WIDTH = 890;  // 弧に収めたい幅(px)
  const measureCtx = document.createElement("canvas").getContext("2d");

  function fitArc() {
    const text = arcPath.textContent;
    const family = getComputedStyle(arcText).fontFamily;
    measureCtx.font = `${ARC_MAX}px ${family}`;
    const width = measureCtx.measureText(text).width + [...text].length * ARC_MAX * 0.06; // 字間 .06em 込み
    arcText.style.fontSize = Math.min(ARC_MAX, (ARC_MAX * ARC_WIDTH) / width) + "px";
  }

  /* ---------- 利用規約の書き出し ---------- */
  function renderTerms() {
    $("#terms-list").innerHTML = TERMS.map((it) => {
      if (it.type === "gap") return '<li class="terms-gap" aria-hidden="true"></li>';
      const s = it[lang] ?? it.ja;
      return `<li${it.type === "h" ? ' class="terms-header"' : ""}>${lang === "ruby" ? toRuby(s) : s}</li>`;
    }).join("");
  }

  /* ---------- プレイヤー行のラベル ---------- */
  function labelRow(row) {
    const n = row.dataset.n;
    $(".player-label", row).textContent = tp("playerLabel", { n });
    $(".nick", row).placeholder = tp("nickname");
    const sel = $(".age", row);
    sel.setAttribute("aria-label", tp("ageAria", { n }));
    $("option[value='']", sel).textContent = tp("agePlaceholder");
    $$("option[data-age]", sel).forEach((o) => (o.textContent = tp("age." + o.value)));
    const genderSel = $(".gender", row);
    genderSel.setAttribute("aria-label", tp("genderAria", { n }));
    $("option[value='']", genderSel).textContent = tp("genderPlaceholder");
    $$("option[data-gender]", genderSel).forEach((o) => (o.textContent = tp("gender." + o.value)));
  }

  /* ---------- 言語を適用 ---------- */
  function applyLang(next, { save = true } = {}) {
    lang = next;
    state.lang = lang;
    document.documentElement.lang = lang === "en" ? "en" : "ja";
    document.documentElement.dataset.ui = lang;

    $$("[data-i18n]").forEach((el) => (el.innerHTML = t(el.dataset.i18n)));
    $$("[data-i18n-aria-label]").forEach((el) => el.setAttribute("aria-label", tp(el.dataset.i18nAriaLabel)));

    document.title = tp("title");
    arcPath.textContent = tp("title");
    fitArc();

    renderTerms();
    $$(".player-row", rows).forEach(labelRow);
    refreshMsgs();

    qrImg.alt = tp("qrAlt");
    $$("#lang-menu [data-lang]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.lang === lang)));
    if (save) saveLang();
  }

  /* ---------- 地球儀メニュー ---------- */
  const langBtn = $("#lang-btn");
  const langMenu = $("#lang-menu");
  langMenu.innerHTML = LANGS.map(
    (l) => `<li role="none"><button type="button" role="menuitemradio" data-lang="${l.id}" aria-checked="false">${l.label}</button></li>`
  ).join("");
  const langItems = () => $$("[data-lang]", langMenu);

  function openMenu() {
    langMenu.hidden = false;
    langBtn.setAttribute("aria-expanded", "true");
    (langItems().find((b) => b.dataset.lang === lang) || langItems()[0]).focus();
  }
  function closeMenu(returnFocus = false) {
    if (langMenu.hidden) return;
    langMenu.hidden = true;
    langBtn.setAttribute("aria-expanded", "false");
    if (returnFocus) langBtn.focus();
  }

  langBtn.addEventListener("click", () => (langMenu.hidden ? openMenu() : closeMenu()));
  langMenu.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (!b) return;
    applyLang(b.dataset.lang);
    closeMenu(true);
  });
  langMenu.addEventListener("keydown", (e) => {
    const items = langItems();
    const i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    else if (e.key === "Home") { e.preventDefault(); items[0].focus(); }
    else if (e.key === "End") { e.preventDefault(); items[items.length - 1].focus(); }
    else if (e.key === "Tab") closeMenu();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(true); });
  document.addEventListener("click", (e) => { if (!e.target.closest("#lang")) closeMenu(); });

  /* ============================================================
     画面切り替え
     ============================================================ */
  function show(n) {
    n = Number(n);
    app.dataset.screen = n;
    $$(".screen").forEach((el) => el.classList.toggle("is-active", el.dataset.screen === String(n)));
    // 進行表示
    $$("#steps li").forEach((li) => {
      const s = Number(li.dataset.step);
      li.classList.toggle("is-done", s < n);
      li.classList.toggle("is-current", s === n);
      if (s === n) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
    if (n === 5) loadQr();       // ⑤を開くたびにQR画像を読み直す
    if (n !== 6) resetPress();   // ⑥を離れたら「>>>」の押し回数を戻す
    const el = $(`#screen-${n}`);
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-go]");
    if (btn && !btn.disabled) show(btn.dataset.go);
  });

  /* ---------- ② ゲーム選択（複数選択可） ---------- */
  const msg2 = $("#msg-2");
  $$('input[name="game"]').forEach((c) => c.addEventListener("change", () => setMsg(msg2, null)));

  $("#next-2").addEventListener("click", () => {
    const games = $$('input[name="game"]:checked').map((c) => c.value);
    if (!games.length) {
      setMsg(msg2, "errGame");
      return;
    }
    state.games = games;
    show(3);
  });

  /* ---------- ③ プレイヤー情報 ---------- */
  const count = $("#count");
  const playersBox = $("#players");
  const rows = $("#player-rows");
  const msg3 = $("#msg-3");

  function buildRow(i) {
    const id = String(i + 1).padStart(2, "0");
    const row = document.createElement("div");
    row.className = "player-row";
    row.dataset.n = id;
    row.innerHTML = `
      <label class="player-label" for="nick-${id}"></label>
      <input class="field nick" id="nick-${id}" type="text" maxlength="12" autocomplete="off">
      <span class="select-wrap">
        <select class="field age" id="age-${id}" required>
          <option value="" selected disabled></option>
          ${AGE_VALUES.map((a) => `<option value="${a}" data-age></option>`).join("")}
        </select>
      </span>
      <span class="select-wrap">
        <select class="field gender" id="gender-${id}" required>
          <option value="" selected disabled></option>
          ${GENDER_VALUES.map((g) => `<option value="${g}" data-gender></option>`).join("")}
        </select>
      </span>`;
    labelRow(row);
    return row;
  }

  /** 入力された人数に合わせて入力欄を用意する（入力済みの内容は保持） */
  function syncRows() {
    const raw = count.value.trim();
    const n = /^\d+$/.test(raw) ? parseInt(raw, 10) : 0;
    setMsg(msg3, null);

    if (n < 1 || n > MAX_PLAYERS) {
      playersBox.hidden = true;
      if (raw !== "") setMsg(msg3, "errCountRange", { max: MAX_PLAYERS });
      return 0;
    }
    playersBox.hidden = false;
    while (rows.children.length < n) rows.appendChild(buildRow(rows.children.length));
    while (rows.children.length > n) rows.lastElementChild.remove();
    return n;
  }
  count.addEventListener("input", syncRows);

  $("#info-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const n = syncRows();
    $$(".field").forEach((f) => f.classList.remove("is-invalid"));

    if (!n) {
      count.classList.add("is-invalid");
      setMsg(msg3, "errCountRequired", { max: MAX_PLAYERS });
      count.focus();
      return;
    }
    const list = $$(".player-row", rows).map((row) => ({
      nickname: $(".nick", row).value.trim(),
      age: $(".age", row).value,
      gender: $(".gender", row).value,
      nickEl: $(".nick", row),
      ageEl: $(".age", row),
      genderEl: $(".gender", row),
    }));
    const bad = list.filter((p) => !p.nickname || !p.age || !p.gender);
    if (bad.length) {
      list.forEach((p) => {
        if (!p.nickname) p.nickEl.classList.add("is-invalid");
        if (!p.age) p.ageEl.classList.add("is-invalid");
        if (!p.gender) p.genderEl.classList.add("is-invalid");
      });
      setMsg(msg3, "errPlayers");
      const first = bad[0];
      (!first.nickname ? first.nickEl : !first.age ? first.ageEl : first.genderEl).focus();
      return;
    }
    state.players = list.map(({ nickname, age, gender }) => ({ nickname, age, gender }));
    show(4);
  });
  rows.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
  count.addEventListener("input", () => count.classList.remove("is-invalid"));

  /* ---------- ④ 利用規約 ---------- */
  const agree = $("#agree");
  const next4 = $("#next-4");
  agree.addEventListener("change", () => {
    const on = agree.checked;
    next4.classList.toggle("is-visible", on);   // チェックするまで NEXT は現れない
    next4.disabled = !on;
    next4.tabIndex = on ? 0 : -1;
    next4.setAttribute("aria-hidden", String(!on));
  });

  /* ---------- 受付ログ（④の NEXT を押した瞬間に記録する） ---------- */
  const pad = (n, len = 2) => String(n).padStart(len, "0");

  function formatTimeStamp(d) {
    const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    return `${date} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  /** 例: G-261105-143205-A7F（1回の受付で1つ。同じグループの人は同じ値になる） */
  function createGroupID(d) {
    const date = `${pad(d.getFullYear() % 100)}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    const time = `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    const random = Math.floor(Math.random() * 36 ** 3).toString(36).toUpperCase().padStart(3, "0");
    return `G-${date}-${time}-${random}`;
  }

  next4.addEventListener("click", () => {
    if (state.groupID) return;   // 二重押しでも1回だけ記録する
    const now = new Date();
    state.groupID = createGroupID(now);
    window.ClubLog.record({
      groupID: state.groupID,
      timeStamp: formatTimeStamp(now),
      games: state.games,
      players: state.players.map((p) => ({ name: p.nickname, age: p.age, gender: p.gender })),
    });
  });

  /* ---------- ⑤ チュートリアル（QR画像） ---------- */
  const qrBox = $("#qr-box");
  const qrImg = $("#qr-img");
  qrImg.addEventListener("load", () => qrBox.classList.remove("is-missing"));
  qrImg.addEventListener("error", () => qrBox.classList.add("is-missing"));
  function loadQr() {
    // ?t=… を付けて毎回読み直す（latestQr.jpg を差し替えても古い画像が残らないように）
    qrImg.src = "qrCode/latestQr.jpg?t=" + Date.now();
  }

  /* ---------- ⑥ 受付完了（「>>>」は3回押すと最初の画面に戻る） ---------- */
  const PRESS_TO_RETURN = 3;
  const PRESS_RESET_MS = 4000;   // 押す間隔が空いたら回数を戻す
  const next6 = $("#next-6");
  const pressHint = $("#press-hint");
  let presses = 0;
  let pressTimer = null;

  function renderPress() {
    if (!presses) { setMsg(pressHint, null); return; }
    setMsg(pressHint, "pressHint", {
      n: PRESS_TO_RETURN - presses,
      dots: "◆".repeat(presses) + "◇".repeat(PRESS_TO_RETURN - presses),
    });
  }
  function resetPress() {
    presses = 0;
    clearTimeout(pressTimer);
    renderPress();
  }
  next6.addEventListener("click", () => {
    presses++;
    clearTimeout(pressTimer);
    if (presses >= PRESS_TO_RETURN) { resetAll(); return; }
    renderPress();
    pressTimer = setTimeout(resetPress, PRESS_RESET_MS);
  });

  /* スタッフ向けの合図：記録に問題がある間だけ「>>>」を赤くする */
  window.ClubLog.onStatusChange((hasProblem) => next6.classList.toggle("is-log-failed", hasProblem));

  /** 次のお客さんのために、入力内容を消して最初の画面に戻る */
  function resetAll() {
    state.games = [];
    state.players = [];
    state.groupID = null;
    $$('input[name="game"]').forEach((c) => (c.checked = false));
    count.value = "";
    rows.innerHTML = "";
    playersBox.hidden = true;
    agree.checked = false;
    agree.dispatchEvent(new Event("change"));
    setMsg(msg2, null);
    setMsg(msg3, null);
    $$(".field").forEach((f) => f.classList.remove("is-invalid"));
    resetPress();
    applyLang("ja");   // 表示言語も標準の日本語に戻す
    show(1);
  }

  /* ---------- 起動 ---------- */
  applyLang(loadLang(), { save: false });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitArc); // フォント読み込み後に再計算
  show(1);
})();
