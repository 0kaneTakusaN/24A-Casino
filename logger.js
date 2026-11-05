/* 渡具知ダイヤモンドクラブ — 受付ログの送信と再送（送信先は Google Apps Script） */
window.ClubLog = (() => {
  "use strict";

  const ENDPOINT_KEY = "club-log-endpoint";
  const QUEUE_KEY = "club-log-queue";
  const REJECTED_KEY = "club-log-rejected";
  const ENDPOINT_RE = /^https:\/\/script\.google\.com\/.+\/exec$/;
  const REQUEST_TIMEOUT_MS = 20000;
  const RETRY_INTERVAL_MS = 30000;

  /* ---------- 端末内の保存（使えない環境ではメモリ上だけで動かす） ---------- */
  function readItem(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function writeItem(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* 何もしない */ }
  }
  function readList(key) {
    try {
      const list = JSON.parse(readItem(key));
      return Array.isArray(list) ? list : [];
    } catch (_) {
      return [];
    }
  }

  /**
   * 送信先URLは公開コードに書かず、端末に一度だけ設定する。
   * サイトを「…/#endpoint=ウェブアプリのURL」で開くと保存され、アドレス欄からは消える。
   */
  function loadEndpoint() {
    const match = location.hash.match(/^#endpoint=(.+)$/);
    if (!match) return readItem(ENDPOINT_KEY) || "";
    try { history.replaceState(null, "", location.pathname + location.search); } catch (_) { /* 何もしない */ }

    const url = decodeURIComponent(match[1]);
    if (!ENDPOINT_RE.test(url)) return readItem(ENDPOINT_KEY) || "";
    writeItem(ENDPOINT_KEY, url);
    return url;
  }

  const endpoint = loadEndpoint();
  const queue = readList(QUEUE_KEY);       // 未送信の記録（古い順）
  const rejected = readList(REJECTED_KEY); // サーバーに拒否された記録（再送しても通らないので分けて残す）

  let flushing = false;
  let sendFailed = false;
  let retryTimer = null;
  let statusListener = null;

  /** スタッフに知らせるべき状態か（設定漏れ・送信失敗中・拒否された記録あり） */
  function hasProblem() {
    return !endpoint || (sendFailed && queue.length > 0) || rejected.length > 0;
  }
  function notify() {
    if (statusListener) statusListener(hasProblem());
  }

  /* ---------- 通信 ---------- */
  async function post(record) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        // application/json だと事前確認(CORS)で止まるので text/plain で送る
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(record),
        redirect: "follow",
        credentials: "omit",
        cache: "no-store",
        signal: ctrl.signal,
      });
      return JSON.parse(await res.text());
    } finally {
      clearTimeout(timer);
    }
  }

  /** 先頭から順に送る。失敗したら記録を残したまま、時間をおいて再送する */
  async function flush() {
    clearTimeout(retryTimer);
    if (flushing || !endpoint) return;
    flushing = true;
    try {
      while (queue.length) {
        const result = await post(queue[0]);
        if (result.ok !== true && (result.ok !== false || result.error === "server_error")) {
          throw new Error("retryable response");
        }
        const record = queue.shift();
        if (result.ok === false) {
          rejected.push(record);
          writeItem(REJECTED_KEY, JSON.stringify(rejected));
        }
        writeItem(QUEUE_KEY, JSON.stringify(queue));
        sendFailed = false;
        notify();
      }
    } catch (_) {
      sendFailed = true;
      retryTimer = setTimeout(flush, RETRY_INTERVAL_MS);
    } finally {
      flushing = false;
      notify();
    }
  }

  /** 記録を端末に保存してから送信する（画面は送信の完了を待たない） */
  function record(entry) {
    queue.push(entry);
    writeItem(QUEUE_KEY, JSON.stringify(queue));
    flush();
  }

  /** 状態が変わるたびに listener(問題があるか) を呼ぶ */
  function onStatusChange(listener) {
    statusListener = listener;
    notify();
  }

  // サイトを開いたままアドレス欄で設定URLを開いても反映されるようにする
  window.addEventListener("hashchange", () => {
    if (location.hash.startsWith("#endpoint=")) location.reload();
  });
  window.addEventListener("online", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") flush();
  });
  flush(); // 前回の未送信分があれば送る

  return { record, onStatusChange };
})();
