# Website i18n

- Load `/i18n/en.json` and `/i18n/zh.json` as UTF-8 JSON. Both use the same flat semantic keys; dots are part of the key, so look up `dict[key]`, not nested properties.
- Mark visible copy with `data-i18n="key"`, for example `<h1 data-i18n="hero.title">Coordinated over signed git.</h1>`. Set translated text with `textContent`; mark text-only children when a parent also contains icons or other markup.
- For accessible attributes, add `data-i18n-attr="aria-label"`, for example `<nav data-i18n="nav.sectionsLabel" data-i18n-attr="aria-label">…</nav>`. Set the named attribute without replacing the element's contents.
- Default to `en`. Show an **EN | 中文** switcher using `lang.en`, `lang.zh`, and `lang.switcherLabel`; update the document's `lang` to `en` or `zh-CN` and indicate the selected language.
- Persist the selected dictionary code (`en` or `zh`) with the `localStorage` key `skep.lang`. Restore only these supported values on load; fall back to English if storage is unavailable, the value is invalid, or a translation is missing.
- Use `btn.copy`, `btn.copied`, `toast.copied`, and `toast.copyFailed` for copy feedback, and translate dynamic messages with the active dictionary too.
- Preserve product names, shell/CLI commands (including copyable shell comments), filenames, and terminal identifiers. Keep clipboard payloads separate from translated button labels; never translate executable commands. The `demos.*` keys also cover terminal captions, status text, and fixed sample literals from the sources.
- The hive describes a conceptual workflow, not a network map: code and pull requests stay in the code repository, coordination events in the blackboard, and humans decide merges. D19 prohibits moving provider credentials, API keys, or provider configurations between devices in any form, including plaintext, ciphertext, hashes, or labels.
