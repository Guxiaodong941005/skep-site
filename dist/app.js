// Skep site: copy buttons, tab switchers, optional GitHub star count. No trackers.
(() => {
  "use strict";

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
    toast(ok ? "Copied to clipboard" : "Copy failed: select the text manually");
    if (ok) {
      btn.classList.add("copied");
      const label = btn.classList.contains("copy-corner") ? btn.querySelector("span") : null;
      const prev = label ? label.textContent : "";
      if (label) label.textContent = "Copied";
      setTimeout(() => {
        btn.classList.remove("copied");
        if (label) label.textContent = prev;
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
