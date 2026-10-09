// Skep site: i18n (EN | 中文), copy buttons, tab switchers, optional GitHub star count. No trackers.
(() => {
  "use strict";

  // ---- i18n -------------------------------------------------------------
  // Flat dictionaries at /i18n/{en,zh}.json. Elements carry data-i18n="key";
  // data-i18n-attr="aria-label" (etc.) translates that attribute instead of the text.
  // A value may contain {0}, {1}… placeholders, which re-insert the element's original
  // child elements (e.g. <code>skep</code>) in that order, so CLI tokens never change.
  const LANGS = { en: "en", zh: "zh-CN" };
  const STORE_KEY = "skep.lang";
  const dicts = {};
  let langSelect = null;
  let dict = {};
  let currentLang = "en";

  const nodes = Array.from(document.querySelectorAll("[data-i18n]")).map((el) => {
    const attr = el.getAttribute("data-i18n-attr");
    if (attr) return { el, attr, original: el.getAttribute(attr) || "" };
    const slots = Array.from(el.children);
    if (!slots.length) return { el, original: el.textContent };
    let original = "";
    el.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) original += n.textContent;
      else if (n.nodeType === Node.ELEMENT_NODE) original += `{${slots.indexOf(n)}}`;
    });
    return { el, slots, original };
  });

  // English strings as written in the page: the last-resort fallback for any key.
  const pageEn = {};
  nodes.forEach((n) => { if (!(n.el.dataset.i18n in pageEn)) pageEn[n.el.dataset.i18n] = n.original; });

  function t(key, fallback) {
    const v = dict[key] ?? dicts.en?.[key] ?? pageEn[key];
    return typeof v === "string" ? v : fallback;
  }

  function fill(n, value) {
    if (n.attr) { n.el.setAttribute(n.attr, value); return; }
    if (!n.slots) { n.el.textContent = value; return; }
    const parts = value.split(/\{(\d+)\}/);
    const used = parts.filter((_, i) => i % 2 === 1).map(Number);
    // Never drop a slot (a <code>, link or icon): fall back to the page's English.
    if (n.slots.some((_, i) => !used.includes(i))) value = n.original;
    const out = [];
    value.split(/\{(\d+)\}/).forEach((part, i) => {
      if (i % 2 === 0) { if (part) out.push(document.createTextNode(part)); }
      else if (n.slots[Number(part)]) out.push(n.slots[Number(part)]);
    });
    n.el.replaceChildren(...out);
  }

  function applyLang(lang) {
    currentLang = lang;
    dict = dicts[lang] || {};
    nodes.forEach((n) => fill(n, t(n.el.dataset.i18n, n.original)));
    document.documentElement.lang = LANGS[lang];
    if (langSelect) langSelect.value = lang;
  }

  async function loadDict(lang) {
    if (dicts[lang]) return dicts[lang];
    const r = await fetch(`/i18n/${lang}.json`, { cache: "no-cache" });
    if (!r.ok) throw new Error(`i18n ${lang}: HTTP ${r.status}`);
    const d = await r.json();
    if (!d || typeof d !== "object") throw new Error(`i18n ${lang}: bad dictionary`);
    dicts[lang] = d;
    return d;
  }

  let langRequest = 0;
  async function setLang(lang, persist) {
    const request = ++langRequest;
    if (!(lang in LANGS)) lang = "en";
    if (persist) { try { localStorage.setItem(STORE_KEY, lang); } catch { /* storage unavailable */ } }
    try {
      await loadDict("en").catch(() => null);
      if (lang !== "en") await loadDict(lang);
    } catch {
      lang = "en"; // dictionary missing or unreadable: stay in English
    }
    if (request !== langRequest) return; // a newer selection superseded this one
    applyLang(lang);
  }

  langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", () => setLang(langSelect.value, true));
  }

  let saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch { saved = null; }
  setLang(saved in LANGS ? saved : "en", false);

  const toastEl = document.querySelector("[data-toast]");
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback for non-secure contexts / older browsers.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      ta.remove();
      return ok;
    }
  }

  // Strip comment lines and trailing "# ..." annotations from a command block.
  function commandsFrom(el) {
    return el.textContent
      .split("\n")
      .map((l) => l.replace(/\s+#\s.*$/, "").trimEnd())
      .filter((l) => l && !l.trimStart().startsWith("#"))
      .join("\n");
  }

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".copy-btn");
    if (!btn) return;
    let text = btn.dataset.copy;
    if (!text && btn.dataset.copyTarget) {
      const target = document.getElementById(btn.dataset.copyTarget);
      if (target) text = commandsFrom(target);
    }
    if (!text) return;
    const ok = await copyText(text);
    toast(ok ? t("toast.copied", "Copied to clipboard") : t("toast.copyFailed", "Copy failed. Please copy the command manually."));
    if (ok) {
      btn.classList.add("copied");
      const label = btn.classList.contains("copy-corner") ? btn.querySelector("[data-i18n]") : null;
      if (label) label.textContent = t("btn.copied", "Copied");
      clearTimeout(btn._copiedTimer);
      btn._copiedTimer = setTimeout(() => {
        btn.classList.remove("copied");
        if (label) label.textContent = t("btn.copy", "Copy");
      }, 1500);
    }
  });

  // Accessible tabs (WAI-ARIA pattern with arrow-key navigation).
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      tab.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab, false));
      tab.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") next = tabs[0];
        else if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
  });

  // GitHub star count: one anonymous public API call, cached per browser for an hour.
  const starsEl = document.querySelector("[data-stars]");
  const countEl = document.querySelector("[data-stars-count]");
  if (starsEl && countEl) {
    const KEY = "skep:stars";
    const show = (n) => {
      if (typeof n !== "number" || n < 1) return;
      countEl.textContent = n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
      starsEl.hidden = false;
    };
    let cached = null;
    try { cached = JSON.parse(localStorage.getItem(KEY) || "null"); } catch { cached = null; }
    if (cached && Date.now() - cached.t < 3600e3) {
      show(cached.n);
    } else {
      fetch("https://api.github.com/repos/Guxiaodong941005/skepAgent", { headers: { Accept: "application/vnd.github+json" } })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!d || typeof d.stargazers_count !== "number") return;
          show(d.stargazers_count);
          try { localStorage.setItem(KEY, JSON.stringify({ n: d.stargazers_count, t: Date.now() })); } catch { /* ignore */ }
        })
        .catch(() => {});
    }
  }
})();
