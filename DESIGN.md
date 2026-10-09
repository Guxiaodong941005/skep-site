# Skep Website Design Specification

- **Target Domain:** `skepagent.com`
- **Package:** `@skepagent/skep` (v0.1.1)
- **Status:** v0.1.x MVP / Prerelease
- **Target Audience:** AI agent developers, autonomous coding engineers, systems architects

---

## 1. Brand Positioning

### One-Liner
> **Decentralized, cross-device collaboration for AI coding agents over a signed git blackboard.**

### Short Pitch
Skep enables autonomous coding agents running across laptops, workstations, and remote dev servers to coordinate seamlessly without relying on centralized coordination servers or leaking LLM provider keys. Agents share state through a cryptographically signed git blackboard and live peer sessions—turning git repos into verifiable multi-agent workspaces.

### Core Value Pillars
1. **Git as the Shared Memory (Blackboard):** Every state change, task handoff, and decision is written as a structured, inspectable, and auditable git commit.
2. **Dual Collaboration Modes:** 
   - *Async Blackboard Mode:* Cross-device coordination via git remotes with `skepd`.
   - *Live Session Mode:* In-memory TUI pairing via `skep session start/join`.
3. **Zero Credential Sync (D19 Architecture):** Each device keeps its own LLM API keys locally. No tokens cross the wire.
4. **SSH-Signed Integrity:** Every agent message and state transition is signed with native SSH keys.

---

## 2. Site Map

A single-page responsive marketing site optimized for instant comprehension and immediate CLI adoption.

```
/ (Index Page)
├── [Header / Nav]
│   ├── Logo: Skep (monospaced badge: v0.1.1)
│   ├── Links: How It Works, Architecture, Features, Security, Quickstart
│   └── CTA: GitHub (Stars / Repo) + Copy Install
│
├── [Hero Section]
│   ├── Eyebrow: "v0.1.1 Early Access"
│   ├── Headline + Subheadline
│   ├── Primary CTAs: Copy `npm i -g @skepagent/skep` + GitHub Link
│   └── Visual: Animated/Tabbed Terminal Preview (TUI + Blackboard)
│
├── [How It Works] (3-step workflow diagram + copy)
├── [Core Architecture & Features] (Grid of 6 modular capability cards)
├── [Security & The D19 Guarantee] (Credential isolation + SSH signing)
├── [Quickstart / Installation] (Interactive command tabs: Global, Daemon, Session)
├── [Bottom CTA / Community] (Join GitHub Discussions, npm package badge)
└── [Footer]
    ├── Copyright & License (MIT)
    ├── Links: GitHub, npm, Issue Tracker, Documentation (README anchor)
    └── Cloudflare Privacy Badge (Cookie-free)
```

---

## 3. Visual Direction

### Theme & Atmosphere
Modern, technical, high-density developer aesthetic. Dark-first, high contrast, clean monospace accents. Inspired by Warp, Linear, and Git internals.

### Typography
- **Headings & Body:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif (clean readability).
- **Code & CLI:** `Geist Mono`, `JetBrains Mono`, `Fira Code`, monospace (for terminal, commands, and JSON payloads).

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#080A0E` | Deep obsidian background |
| `--bg-surface` | `#0F131A` | Card, container, and terminal frame background |
| `--bg-surface-elevated` | `#161B24` | Hover states, tab active states, dropdowns |
| `--border-subtle` | `#1F2633` | 1px borders, separators |
| `--border-active` | `#334155` | Active inputs, selected tabs |
| `--text-primary` | `#F8FAFC` | Main headings and active text |
| `--text-secondary` | `#94A3B8` | Body copy, explanations, secondary descriptions |
| `--text-muted` | `#64748B` | Footnotes, inactive tabs, syntax comments |
| `--accent-cyan` | `#06B6D4` | Primary brand accent, commit hashes, active prompts |
| `--accent-emerald` | `#10B981` | Verification checks, SSH signed tags, status indicators |
| `--accent-amber` | `#F59E0B` | Prerelease badge, warnings |

### Layout & Component Styling
- **Borders:** Crisp `1px solid var(--border-subtle)` with slight corner radii (`rounded-lg` / 8px).
- **Terminal Window:** Framed box with traffic-light dots (`#EF4444`, `#F59E0B`, `#10B981`), monospace text, and instant one-click copy buttons.
- **Micro-effects:** Subtle 1px grid background with radial gradient mask (`radial-gradient(ellipse at top, #06b6d415, transparent 70%)`). No heavy WebGL or bloated animations.

---

## 4. Section Copy Outlines

### 4.1 Header / Navigation
- **Brand:** `skep` `[v0.1.1]`
- **Nav items:**
  - `How It Works` (`#how-it-works`)
  - `Architecture` (`#architecture`)
  - `Features` (`#features`)
  - `Security` (`#security`)
  - `Quickstart` (`#quickstart`)
- **Right Action:** GitHub button with star counter badge.

---

### 4.2 Hero Section
- **Badge:** `PRERELEASE v0.1.1 · OPEN SOURCE MIT`
- **Headline (H1):**  
  *Multi-Agent Coding Across Devices.*  
  *Coordinated Over Signed Git.*
- **Subheadline:**  
  Run local AI agents on your laptop, GPU rig, and cloud VM simultaneously. Skep provides an SSH-signed git blackboard for asynchronous handoffs and an in-memory TUI for real-time paired sessions—without exposing provider credentials.
- **Primary Actions:**
  - Code Pill: `npm i -g @skepagent/skep` (with instant copy button and toast feedback: "Copied to clipboard").
  - Secondary Button: `View on GitHub →`
- **Hero Graphic (Interactive Terminal Mockup):**
  - Switchable tabs: `1. Local Agent (skep)` | `2. Multi-Device Session` | `3. Git Blackboard`
  - *Tab 1 Mock:* Running `skep` launches interactive local agent TUI.
  - *Tab 2 Mock:* `skep session start --name refactor-auth` generates join ticket; second machine runs `skep session join <ticket>`.
  - *Tab 3 Mock:* `skepd` commits signed JSON action entries to `refs/skep/blackboard` via SSH.

---

### 4.3 How It Works (The 3-Step Lifecycle)
- **Step 1: Install & Launch**  
  *Zero infrastructure needed.*  
  Install `@skepagent/skep` via npm. Run `skep` in any git repository to start a local coding session, or initialize a shared daemon with `skepd`.
- **Step 2: Decentralized Git Blackboard**  
  *State lives where code lives.*  
  Agents communicate by appending cryptographically signed event records directly to git references. Any machine with git push/pull access can participate—no central broker required.
- **Step 3: Real-Time & Asynchronous Pairing**  
  *Work locally, hand off globally.*  
  Use `skep session start` and `skep session join` for low-latency in-memory multi-device pairing, or rely on `skepd` for background task queues across remote workers.

---

### 4.4 Core Features Grid
1. **Signed Git Blackboard**  
   Commits as event logs. Every agent decision, proposal, and file modification is stored as an immutable, SSH-signed git event.
2. **Dual-Mode Execution**  
   Run standalone interactive agent sessions with bare `skep`, or run persistent multi-agent pipelines with the `skepd` daemon.
3. **In-Memory Session TUI**  
   Spur-of-the-moment collaboration. Start a live session on your workstation and join it from your laptop terminal in seconds.
4. **D19 Credential Isolation**  
   Zero secret sharing. Remote agents execute tasks using their local API keys. Keys and credentials never touch git or the peer wire.
5. **Conflict-Free Task Resolution**  
   Designed for distributed workers. Event CRDT-style task locks prevent agents from clobbering each other's edits.
6. **Native CLI Tooling**  
   Pure Node.js + TypeScript CLI. Lightweight dependencies (`commander`, `zod`, `smol-toml`, `yaml`). Fast startup, low overhead.

---

### 4.5 Security & The D19 Decision
- **Header:** Security by Architecture, Not Policy.
- **Key Callouts:**
  - **SSH-Signed Event Chain:** Every blackboard message requires a valid SSH signature matching the authorized team keylist.
  - **Strict No-Credential Sync (Decision D19):** Other agent tools sync config files and API keys across devices. Skep explicitly forbids this. Machine A uses its Anthropic key; Machine B uses its OpenAI or local Ollama endpoint.
  - **Auditable History:** If an agent hallucinates or makes a mistake, `git log refs/skep/*` shows exactly which machine, key, and agent committed the step.

---

### 4.6 Quickstart & Installation
- **Section Title:** Up and running in 60 seconds.
- **Interactive Code Blocks:**

```bash
# 1. Install globally
npm install -g @skepagent/skep

# 2. Launch interactive local agent
skep

# 3. Start a multi-device live session
skep session start --topic "migrate-to-v2"

# 4. Join from a second device
skep session join <session-token>

# 5. Run the background collaboration daemon
skepd --repo .
```

---

### 4.7 CTA & Footer
- **Bottom Banner:** Ready to coordinate your AI coding swarm?
- **Actions:**
  - `Install via npm (@skepagent/skep)`
  - `Read the Documentation on GitHub`
- **Footer:**
  - `© 2025 Skep Contributors. Open source under MIT License.`
  - Links: `npm` · `GitHub Repository` · `Issues` · `Releases`

---

## 5. Cloudflare Tech Recommendation

### Decision: Cloudflare Pages + Astro (Static Output)

#### Why Astro + Cloudflare Pages:
1. **Zero Runtime Overhead:** Compiles to 100% static HTML, CSS, and minimal vanilla JS. Perfect for Cloudflare's edge cache (TTFB < 50ms worldwide).
2. **Fastest Time-to-Ship:** No custom server setup, no node runtime overhead, zero API latency.
3. **Markdown/Content Native:** Documentation snippets, release logs, and config tables are easily maintained in Markdown or Astro components.
4. **Single-Command Deploy:** `npx wrangler pages deploy dist --project-name skep-site`.

#### Fallback Alternative:
- Pure single-file `index.html` + Tailwind CDN / CSS file, deployed directly via `wrangler pages deploy .`. 
- **Recommendation:** Use static Astro if multiple components/markdown are preferred, or a single standalone `index.html` file if immediate zero-build shipping is desired today.

#### Wrangler Configuration (`wrangler.json` or `wrangler.toml`):
```toml
name = "skep-site"
compatibility_date = "2025-01-01"
pages_build_output_dir = "dist"
```

---

## 6. Wireframe-Level Structure

```
+-------------------------------------------------------------------------+
| [skep v0.1.1]       How it Works   Architecture   Security   Quickstart  [★ GitHub] |
+-------------------------------------------------------------------------+
|                                                                         |
|        [PRERELEASE v0.1.1 · MIT OPEN SOURCE]                            |
|                                                                         |
|        Multi-Agent Coding Across Devices.                               |
|        Coordinated Over Signed Git.                                     |
|                                                                         |
|        Decentralized blackboard state. Dual interactive TUI & daemon.   |
|        SSH-signed events. Zero LLM credential sync across machines.     |
|                                                                         |
|        [ npm i -g @skepagent/skep  (copy) ]   [ View on GitHub -> ]     |
|                                                                         |
|   +-----------------------------------------------------------------+   |
|   | [Local TUI (skep)]  [Live Session]  [Git Blackboard (skepd)]    |   |
|   +-----------------------------------------------------------------+   |
|   | $ skep session start --topic "auth-migration"                   |   |
|   |  * Session started: ses_9f82d1                                 |   |
|   |  * Peer link: ssh://git@github.com/team/repo#ses_9f82d1         |   |
|   |  * SSH Signature: SHA256:7uK... (ED25519)                      |   |
|   |  * Agent [MacBook-M3] connected (Claude 3.5 Sonnet)            |   |
|   |  * Agent [DevBox-RTX] joined (DeepSeek-Coder local)            |   |
|   |  > Generating diff for src/auth.ts ...                          |   |
|   +-----------------------------------------------------------------+   |
|                                                                         |
+-------------------------------------------------------------------------+
| HOW IT WORKS (3 Columns)                                                |
| [ 1. Local or Daemon ]    [ 2. Signed Git Events ]  [ 3. Cross-Device ] |
| skep interactive TUI      refs/skep/blackboard      MacBook + Cloud VM  |
+-------------------------------------------------------------------------+
| CORE CAPABILITIES (3x2 Grid)                                            |
| [ Git Blackboard ]        [ SSH Event Signatures ]  [ Zero Key Sync ]   |
| [ Live Session TUI ]      [ CLI & Daemon Pair ]     [ CRDT Resolution ] |
+-------------------------------------------------------------------------+
| SECURITY SPOTLIGHT: THE D19 ARCHITECTURAL DECISION                      |
| +---------------------------------------------------------------------+ |
| | "Never sync LLM credentials across the wire."                       | |
| | - Each machine uses its own local environment variables             | |
| | - State is signed with SSH keys, not shared bearer tokens           | |
| +---------------------------------------------------------------------+ |
+-------------------------------------------------------------------------+
| QUICKSTART TERMINAL                                                     |
| [Install] [Local Run] [Session Mode] [Daemon]                           |
| $ npm install -g @skepagent/skep                                        |
+-------------------------------------------------------------------------+
| FOOTER: Links, MIT License, GitHub Repo, npm @skepagent/skep            |
+-------------------------------------------------------------------------+
```

---

## 7. SEO & Metadata Specification

- **Page Title:**  
  `Skep — Decentralized Multi-Agent Coding over Signed Git`
- **Meta Description:**  
  `Coordinate AI coding agents across devices using an SSH-signed git blackboard and real-time TUI sessions. Open source CLI and daemon (@skepagent/skep).`
- **Canonical URL:**  
  `https://skepagent.com/`
- **Keywords:**  
  `ai agents, coding agent, git blackboard, multi-agent collaboration, skep, skepd, ssh-signed, autonomous coding`
- **Open Graph (OG):**
  - `og:title`: `Skep — Multi-Device AI Coding Agent Collaboration`
  - `og:description`: `Decentralized AI agent collaboration over signed git blackboards. Local API keys stay local.`
  - `og:url`: `https://skepagent.com/`
  - `og:type`: `website`
  - `og:image`: `https://skepagent.com/og-image.png` (1200x630, dark card with terminal snippet and neon cyan accents)
- **Twitter Card:**
  - `twitter:card`: `summary_large_image`
  - `twitter:title`: `Skep — Multi-Device AI Coding Agent Collaboration`
  - `twitter:description`: `Decentralized AI agent collaboration over signed git blackboards.`
  - `twitter:image`: `https://skepagent.com/og-image.png`

---

## 8. Out of Scope for v1

To ensure rapid shipping and zero maintenance overhead, the following items are strictly out of scope for the initial release:

1. **User Authentication & Accounts:** No user login, OAuth, or hosted profile system.
2. **Hosted SaaS / Cloud Backend:** No centralized server; Skep runs locally and uses user-provided git remotes.
3. **Billing & Paywalls:** Completely free and open-source (MIT); no Stripe integration or tiered plans.
4. **Complex Docs Engine:** Documentation links directly to GitHub README / repository docs rather than a hosted Docusaurus/Starlight engine.
5. **Blog / CMS:** No marketing blog or external content management system.
6. **Third-Party Tracking Scripts:** Zero tracking pixels, Google Analytics, or invasive cookie banners. Cloudflare Web Analytics (privacy-preserving) only.
