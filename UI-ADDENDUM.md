# UI addendum: a hive for code agents

Design proposal only. Do not change `index.html`, `styles.css`, or `app.js` as part of this deliverable. Future implementation uses semantic HTML, existing CSS tokens, and the inline SVG sprite; no framework, external icon package, web font, image asset, or JavaScript dependency is needed.

## 1. Placement and purpose

Insert one section, `#the-hive`, immediately after `#how-it-works` and before `#architecture` in `index.html`.

Current sequence → proposed sequence:

**How it works → The hive → Architecture → Features → Security → Quickstart**

The three installation/protocol steps remain unchanged. The new section explains the name and gives readers a human-centered picture of the asynchronous coding workflow. Architecture remains the place for Unix sockets, reducers, publishers, and separate repositories; do not duplicate its terminal diagram.

Reuse `.section`, `.wrap`, `.section-head`, `.kicker`, `.mono`, `.sub`, `.card`, and `.i`. Keep this section on `--bg-base`; preserve the following Architecture section's `.section-alt` treatment. Do not add another top-navigation item: the existing navigation is already dense. An optional inline “Explore the architecture” link leads to `#architecture`.

## 2. Visual direction: subtle bee and hex motifs

- Keep the current technical, dark interface and existing logo. No mascot redesign, yellow background, cartoon swarm, or honey-themed controls.
- Use a small outline hive beside the section kicker and one tiny bee near the Skep node. The bee represents an agent at work, not a status indicator or clickable control.
- Place three to seven sparse hex outlines behind the heading's right edge or the workflow panel's upper-right corner. Use decorative SVG at roughly 5–8% opacity, masked or clipped within this section. Never put the pattern beneath essential text.
- Keep content cards rectangular with `--radius`. Hexagonal badges can frame icons, but never clip text or create hex-shaped buttons.
- Use cyan for coordination and connectors, emerald for the signed-log symbol, and a restrained amber accent for the bee/hive. All meaningful states retain text labels; color alone conveys nothing.
- Prefer static artwork. No flying bees, pulsing “live” lights, animated signatures, or fake progress states on this explanatory section.

### Existing token mapping

| Role | Existing token | Application |
| --- | --- | --- |
| Section canvas | `--bg-base` | Match the main page background |
| Workflow nodes | `--bg-surface` | Existing `.card` treatment |
| Device subcards | `--bg-surface-elevated` | Distinguish machines within stage 3 |
| Quiet outlines | `--border-subtle` | Cards and decorative hex strokes |
| Structural outlines | `--border-active` | Connectors and icon frames |
| Headings | `--text-primary` | Stage names and merge ownership |
| Body copy | `--text-secondary` | All essential descriptive text |
| Optional annotations | `--text-muted` | Nonessential labels only; verify contrast |
| Coordination | `--accent-cyan` (`#06B6D4`) | Skep and directional marks |
| Signed log | `--accent-emerald` | Signature icon, paired with “SSH-signed” |
| Hive hint | `--accent-amber` | Small bee/hive detail, not the main palette |

Reuse `--font-sans`, `--font-mono`, `--wrap`, `--gutter`, and `--radius`. Do not redefine root tokens or alter the hero's `.grid-bg` globally.

## 3. The name and metaphor

**English copy:**

- Kicker: “The hive”
- Heading: “A hive for agents. You hold the merge.”
- Introduction: “A skep is a traditional basket beehive. Here, the hive is a shared way of working: agents run on your devices, coordinate through signed git, and bring the result back to you.”
- Small supporting line: “Independent devices. Shared coordination. Human control.”

Keep the metaphor bounded: the hive is the collaboration model, not a hosted service or central controller. Do not describe Skep as a queen bee, claim that agents share memory, or imply credentials travel between devices. Agents generate plans, reviews, and code; device daemons enforce the protocol and sign and publish blackboard events.

The workflow illustration focuses on asynchronous blackboard collaboration. It is not a network topology or a depiction of the separate live LAN session mode.

## 4. Workflow visual and English copy

**Human → Skep → Agents on devices → Signed blackboard → Human merge**

Use five numbered stages. Stage 3 contains three compact device rows rather than three additional stages. Desktop connectors suggest the reading order; the device group may use a short decorative fan-out inside its own card. Do not draw inbound connections between devices.

| Stage | Visible heading | Body copy | Small label / visual |
| --- | --- | --- | --- |
| 01 | You set the goal | “Describe the task and approve the plan before execution.” | Human outline; “Human” |
| 02 | Skep coordinates | “Use the CLI to guide work; per-device daemons enforce the protocol.” | Existing logo; “CLI + per-device daemons” |
| 03 | Agents work locally | “Agents run in local worktrees. Each device keeps its own provider credentials.” | “Laptop”, “GPU workstation”, “Always-on server” |
| 04 | Signed git records the handoff | “Daemons publish SSH-signed events to the blackboard: plans, claims, reviews, and delivery.” | Signed-log icon; “Shared event log” |
| 05 | You review and merge | “Inspect the code, checks, and stacked pull requests. You decide what merges.” | Human + existing `i-merge`; “Never auto-merges” |

**Figure caption:** “A conceptual workflow, not a network map. Devices sync with the git blackboard throughout the work. Code and pull requests live in the code repository; coordination events live in the blackboard.”

**Trust note:** “Signed events make the handoff auditable. They do not replace code review.”

**Optional text link:** “Explore the architecture →”

Treat the three devices as illustrative, not required simultaneous participants. This picture does not imply that every task uses several agents; preserve the existing single-agent fast-path message.

## 5. Proposed HTML outline

This is a future implementation outline, not a patch. The numbered list is the accessible reading order and remains understandable without artwork or CSS. Native headings and list semantics provide the explanation; no custom diagram widget or JavaScript is necessary.

```html
<section class="section hive" id="the-hive" aria-labelledby="hive-title">
  <div class="hive-motif" aria-hidden="true">
    <svg class="hive-hex-field" viewBox="0 0 160 100" focusable="false">
      <use href="#i-hive-comb"></use>
    </svg>
  </div>
  <div class="wrap hive-inner">
    <header class="section-head">
      <p class="kicker mono hive-kicker">
        <svg class="i" aria-hidden="true" focusable="false"><use href="#i-hive"></use></svg>
        The hive
      </p>
      <h2 id="hive-title">A hive for agents. You hold the merge.</h2>
      <p class="sub">A skep is a traditional basket beehive. Here, the hive is a shared way of working: agents run on your devices, coordinate through signed git, and bring the result back to you.</p>
      <p class="hive-tagline">Independent devices. Shared coordination. Human control.</p>
    </header>

    <figure class="hive-workflow" aria-labelledby="hive-caption">
      <ol class="hive-flow" role="list">
        <li class="card hive-node hive-node--human">
          <span class="hive-step mono">01 · Human</span>
          <svg class="i hive-icon" aria-hidden="true" focusable="false"><use href="#i-human"></use></svg>
          <h3>You set the goal</h3>
          <p>Describe the task and approve the plan before execution.</p>
        </li>
        <li class="card hive-node hive-node--skep">
          <span class="hive-step mono">02 · Skep</span>
          <svg class="hive-logo" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><use href="#logo"></use></svg>
          <svg class="i hive-bee" aria-hidden="true" focusable="false"><use href="#i-bee"></use></svg>
          <h3>Skep coordinates</h3>
          <p>Use the CLI to guide work; per-device daemons enforce the protocol.</p>
          <p class="hive-meta mono">CLI + per-device daemons</p>
        </li>
        <li class="card hive-node hive-node--devices">
          <span class="hive-step mono">03 · Local agents</span>
          <h3>Agents work locally</h3>
          <p>Agents run in local worktrees. Each device keeps its own provider credentials.</p>
          <ul class="hive-devices" role="list" aria-label="Example devices">
            <li class="hive-device">Laptop</li>
            <li class="hive-device">GPU workstation</li>
            <li class="hive-device">Always-on server</li>
          </ul>
        </li>
        <li class="card hive-node hive-node--blackboard">
          <span class="hive-step mono">04 · Shared event log</span>
          <svg class="i hive-icon" aria-hidden="true" focusable="false"><use href="#i-signed-log"></use></svg>
          <h3>Signed git records the handoff</h3>
          <p>Daemons publish SSH-signed events to the blackboard: plans, claims, reviews, and delivery.</p>
        </li>
        <li class="card hive-node hive-node--merge">
          <span class="hive-step mono">05 · Human merge</span>
          <svg class="i hive-icon" aria-hidden="true" focusable="false"><use href="#i-merge"></use></svg>
          <h3>You review and merge</h3>
          <p>Inspect the code, checks, and stacked pull requests. You decide what merges.</p>
          <p class="hive-meta">Never auto-merges</p>
        </li>
      </ol>
      <figcaption class="hive-caption" id="hive-caption">A conceptual workflow, not a network map. Devices sync with the git blackboard throughout the work. Code and pull requests live in the code repository; coordination events live in the blackboard.</figcaption>
    </figure>
    <p class="hive-trust-note">Signed events make the handoff auditable. They do not replace code review.</p>
    <a class="hive-link" href="#architecture">Explore the architecture →</a>
  </div>
</section>
```

## 6. CSS class contract and responsive behavior

Add a scoped `/* hive */` block in a future `styles.css` change. Do not change shared `.card`, `.section`, `.i`, or `.brand-mark` rules to achieve this design.

| Class | Responsibility |
| --- | --- |
| `.hive` | Section-local isolation and decorative clipping; retain inherited section padding |
| `.hive-motif` | Absolute decorative layer; `pointer-events: none`; clip this layer rather than focusable content |
| `.hive-hex-field` | Sparse, low-opacity hex strokes; hide at small widths if crowded |
| `.hive-inner` | Positioned content above the decoration |
| `.hive-kicker` | Inline icon/text alignment, small gap |
| `.hive-tagline` | Supporting text in secondary color, separated from introduction |
| `.hive-workflow` | Reset default figure margins; provide breathing room after heading |
| `.hive-flow` | Grid list; reset padding and markers; preserve native list meaning with `role="list"` |
| `.hive-node` | Compact card padding, `min-width: 0`, normal text wrapping, equal height on desktop |
| `.hive-node--human`, `.hive-node--merge` | Same human icon treatment, visually bookending the sequence |
| `.hive-node--skep` | Cyan coordination emphasis, no oversized “central server” treatment |
| `.hive-node--devices` | Device subgroup container; no invented connection status |
| `.hive-node--blackboard` | Emerald icon, explicit signed-log label |
| `.hive-step` | Small monospace stage label, visible numbering independent of color |
| `.hive-icon`, `.hive-logo`, `.hive-bee` | Explicit SVG dimensions; `currentColor`; logo keeps its 32×32 viewBox |
| `.hive-devices`, `.hive-device` | Compact vertical list and surface-elevated device rows |
| `.hive-meta` | Secondary text below node copy |
| `.hive-caption`, `.hive-trust-note` | Readable secondary text, not faint decorative annotations |
| `.hive-link` | Existing link and focus treatment; no new button style |

**Layout specification:**

- At `min-width: 1100px`, use five columns with `repeat(5, minmax(0, 1fr))`, roughly 20px gaps and 16px node padding. The existing 1120px wrapper accommodates compact nodes; allow long headings to wrap naturally.
- Below 1100px, use one column with each node optionally organized internally as icon + content. A single vertical sequence is clearer than a wrapped row with ambiguous arrows.
- At 560px and below, inherit the existing 64px section spacing, use 16px card padding, and keep device examples stacked. The entire section must fit at 320px without horizontal scrolling.
- Draw connectors using `.hive-node:not(:last-child)::after` as decorative CSS arrows: rightward in desktop gaps and downward in vertical gaps. Keep them outside text and remove them if insufficient room. The numbered list always carries the order.
- Do not use CSS `order`, absolute positioning for content, or fixed card heights. DOM order must match the visual sequence.
- All cards are informational: no `tabindex`, button cursor, hover lift, or click affordance. Existing subtle card-border hover is sufficient.
- Keep artwork static; respect the existing global `prefers-reduced-motion` rule if transitions are introduced later. Nothing requires a hover or animation to be understood.

## 7. Small inline SVG sprite ideas

Extend the existing bottom-of-body `.sprite` SVG, not a new icon delivery system. Reuse `#logo`, `#i-merge`, `#i-term`, and `#i-lock` where suitable. Confirm unique IDs before adding symbols.

Use 24×24 viewBoxes for interface icons, `fill="none"`, `stroke="currentColor"`, stroke width 1.75, and rounded caps/joins to match the current sprite. Give each referencing SVG an explicit size; hide redundant artwork from assistive technology with `aria-hidden="true"` and `focusable="false"`.

- `#i-bee`: simple oval body, two short body bands, two open wing loops, and tiny antenna strokes. Avoid eyes, facial expression, or intricate legs. Use at 18–24px; amber only on this small detail.
- `#i-hive`: outline of a rounded basket dome, three curved horizontal bands, and a small entrance arch. Recognizable silhouette at 24px, not a literal honey pot.
- `#i-human`: circle head plus shoulder arc. Reuse for both human stages if desired.
- `#i-signed-log`: rounded document outline, three short event lines, and a small check mark. Visible “SSH-signed” wording must explain the icon; a check alone is not a code-safety guarantee.
- `#i-laptop` and `#i-server` (optional): screen/base outline and two stacked rack rectangles. An existing terminal icon can represent the GPU workstation; no manufacturer logos.
- `#i-hive-comb`: decorative 160×100 symbol with a handful of separated hex paths, not a dense repeating texture. Example single-cell geometry: `M20 4 34 12 34 28 20 36 6 28 6 12Z`; translate copies with generous spacing. This decorative symbol is the exception to the 24×24 icon viewBox.

No raster generation is needed. Keep the sprite small and local; no external requests, embedded fonts, SVG scripts, or filter-heavy glows.

## 8. Implementation checklist

- [ ] Insert only `#the-hive` between How it works and Architecture; retain all existing anchors and heading levels.
- [ ] Use the five-stage English copy and preserve explicit human plan approval and human merge ownership.
- [ ] Label the illustration as the conceptual asynchronous workflow, not a network topology or mandatory multi-agent configuration.
- [ ] Keep blackboard events distinct from code branches/PRs; do not suggest the blackboard hosts code or automatically merges it.
- [ ] Add only necessary uniquely named sprite symbols and scoped `.hive-*` styles; reuse existing tokens and icons.
- [ ] Keep decorative bee/hex artwork sparse, hidden from screen readers, and noninteractive.
- [ ] Check 320px, 560px, 768px, 1100px, and wide desktop layouts, plus 200% zoom and longer wrapped text.
- [ ] Verify connector direction and spacing at the 1100px switch; stage 5 has no outgoing arrow.
- [ ] Check screen-reader list order and figure caption; ensure the link receives the existing visible focus ring.
- [ ] Verify essential text meets contrast requirements; reserve low-opacity treatments for decoration only.
- [ ] Test with reduced motion and with CSS/JavaScript disabled: the numbered workflow and explanatory copy remain readable.
- [ ] Confirm no extra network requests, dependencies, analytics, fake live statuses, or changes to terminal tabs and copy buttons.
- [ ] Review against the existing Architecture and Security language before publishing; signatures support provenance, not guaranteed correctness.
