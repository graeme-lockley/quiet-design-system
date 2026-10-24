/* ==========================================================================
   Alder — Style Explorer
   Four look-and-feel directions for a connected family of applications.
   Pure HTML/CSS/JS. No build step, no external assets.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Direction metadata — the part a design agent would read first.
   -------------------------------------------------------------------------- */
const THEMES = [
  {
    id: "quiet",
    num: "01",
    name: "Quiet",
    label: "Paper & ink",
    tagline: "Private-bank restraint, with Apple's typographic calm.",
    description:
      "Warm paper, near-black ink and a single deep green. Almost no elevation: structure comes from hairline rules, generous margins and exact alignment. The most direct descendant of the system running at localhost:8080, refined rather than replaced.",
    keywords: ["Restrained", "Light-first", "Hairline", "Typographic"],
    bestFor:
      "Client-facing accounts, statements, approvals — anywhere trust matters more than novelty.",
    watchOut:
      "Needs generous space and disciplined type; compress it and the confidence disappears.",
    recommended: true,
    notes: {
      density: "Comfortable",
      radius: "2 / 4 / 8 / 14 px",
      elevation: "None — hairlines do the work",
      motion: "140 ms · soft settle",
      navigation: "Two-level rail + sidebar",
      darkMode: "Yes — a graphite night mode, designed as part of the system",
      numerals: "SF Pro Text · tabular figures",
    },
  },
  {
    id: "nocturne",
    num: "02",
    name: "Nocturne",
    label: "Graphite & champagne",
    tagline: "The same confidence after hours. Light as an edge, not a shadow.",
    description:
      "Near-black graphite, warm champagne and floating panels whose depth comes from a single lit edge. Designed dark-first for long sessions and evening work. Pairs naturally with Quiet as its night mode.",
    keywords: ["Dark-first", "Material", "Champagne", "Spatial"],
    bestFor:
      "Focus workspaces, monitoring, reading, and the evening half of any client-facing product.",
    watchOut:
      "Dark-first makes dense tables harder; keep to fewer, better-lit elements per screen.",
    recommended: false,
    notes: {
      density: "Comfortable",
      radius: "3 / 8 / 16 / 22 px",
      elevation: "Lit edge + deep soft shadow",
      motion: "150–280 ms · rise and settle",
      navigation: "Floating rail + panel",
      darkMode: "Native — this is the dark-first expression",
      numerals: "SF Pro Text · tabular figures",
    },
  },
  {
    id: "folio",
    num: "03",
    name: "Folio",
    label: "Warm editorial",
    tagline: "A private library, not a dashboard. Type does the ornament.",
    description:
      "Bone paper, ink, a terracotta accent and a high-contrast serif at display sizes. Navigation moves to a masthead; rules replace cards; numbers are set like a printed statement. The most distinctive and most ownable of the four.",
    keywords: ["Editorial", "Serif", "Warm", "Rules"],
    bestFor:
      "A family with a strong identity: client portals, research, correspondence and records.",
    watchOut:
      "Serif display needs curation and air; it resists dense operational screens and dark mode.",
    recommended: false,
    notes: {
      density: "Airy",
      radius: "Square — 0 px",
      elevation: "Rules only",
      motion: "150 ms · quiet",
      navigation: "Top masthead",
      darkMode: "Not recommended — pair with Quiet or Nocturne for dark",
      numerals: "New York · lining figures",
    },
  },
  {
    id: "calibre",
    num: "04",
    name: "Calibre",
    label: "Precision instrument",
    tagline: "Cool light, graphite navigation, monospaced data. Built to be read fast.",
    description:
      "A white instrument panel with a dark navigation spine. Dense rows, tabular monospace figures, a persistent inspector and an electric-blue accent used only where action is required. The most operational of the four.",
    keywords: ["Dense", "Technical", "Mono", "Split-view"],
    bestFor:
      "Operations, reconciliations, admin consoles — anything with tables and consequential actions.",
    watchOut:
      "Can read cold or intimidating to clients; reserve it for back-office or expert surfaces.",
    recommended: false,
    notes: {
      density: "Compact",
      radius: "2 / 4 / 6 / 8 px",
      elevation: "Borders only, no shadows",
      motion: "120 ms · immediate",
      navigation: "Dark rail + sidebar + inspector",
      darkMode: "Plausible inversion; not designed in this exploration",
      numerals: "SF Mono · tabular figures",
    },
  },
];

const PALETTE = [
  ["--bg", "Canvas", "The page"],
  ["--surface", "Surface", "Raised panel"],
  ["--ink", "Ink", "Primary text"],
  ["--ink-2", "Ink 2", "Secondary text"],
  ["--ink-3", "Ink 3", "Tertiary text"],
  ["--line", "Line", "Hairline"],
  ["--accent", "Accent", "Action · focus · data"],
  ["--accent-soft", "Wash", "Selected / quiet fill"],
  ["--positive", "Positive", "Inflow · cleared"],
  ["--negative", "Negative", "Outflow · error"],
];

/* --------------------------------------------------------------------------
   Icons — 1.5px stroke, 24px grid, no external library.
   -------------------------------------------------------------------------- */
const ICONS = {
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.4"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10.5h18"/><path d="M16 14.5h2.5"/>',
  arrows: '<path d="M7.5 16.5 16.5 7.5"/><path d="M8.5 7.5h8v8"/>',
  file: '<path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5.5-5.5Z"/><path d="M13.5 3.5V9H19"/>',
  check: '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.2 2.4 2.4 4.6-5.1"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c.6-3.1 2.7-4.8 5.5-4.8s4.9 1.7 5.5 4.8"/><path d="M15.8 5.6a3.2 3.2 0 0 1 0 6.4"/><path d="M17.2 15.4c1.8.6 2.9 2.1 3.3 4.1"/>',
  shield: '<path d="M12 3.2 5.5 6v5.2c0 4.3 2.8 7.5 6.5 9.6 3.7-2.1 6.5-5.3 6.5-9.6V6L12 3.2Z"/>',
  sliders: '<path d="M4 7.5h9M17.5 7.5H20M4 16.5h3M11.5 16.5H20"/><circle cx="15.2" cy="7.5" r="2.1"/><circle cx="9.2" cy="16.5" r="2.1"/>',
  audit: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>',
  logout: '<path d="M9.5 4H6a1.8 1.8 0 0 0-1.8 1.8v12.4A1.8 1.8 0 0 0 6 20h3.5"/><path d="m15 8 4 4-4 4"/><path d="M19 12H9.5"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4.2 4.2"/>',
  bell: '<path d="M6.2 9a5.8 5.8 0 1 1 11.6 0c0 3.8 1.4 4.9 2 5.9H4.2c.6-1 2-2.1 2-5.9Z"/><path d="M10 18.8a2 2 0 0 0 4 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3.2v3.6M16 3.2v3.6"/>',
  filter: '<path d="M4 6.5h16M7 12h10M10 17.5h4"/>',
  download: '<path d="M12 4v11M8 11.5l4 4 4-4"/><path d="M4.5 19.5h15"/>',
  chevronRight: '<path d="m9.5 6 6 6-6 6"/>',
  chevronLeft: '<path d="m14.5 6-6 6 6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
  x: '<path d="m6.5 6.5 11 11M17.5 6.5l-11 11"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  checkSmall: '<path d="m4 12.5 5 5L20 6.5"/>',
  home: '<path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/>',
};

function icon(name, cls = "") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

/* --------------------------------------------------------------------------
   Demo content — deliberately fictional, deliberately ordinary.
   -------------------------------------------------------------------------- */
const NAV_GROUPS = [
  {
    label: "Workspace",
    items: [
      { icon: "grid", label: "Overview", active: true },
      { icon: "wallet", label: "Accounts" },
      { icon: "arrows", label: "Payments" },
      { icon: "file", label: "Statements" },
      { icon: "check", label: "Approvals", count: "3" },
      { icon: "users", label: "Team" },
    ],
  },
  {
    label: "Administration",
    items: [
      { icon: "shield", label: "Recipients" },
      { icon: "sliders", label: "Integrations" },
      { icon: "audit", label: "Audit log" },
    ],
  },
];

const KPIS = [
  {
    label: "Total balance",
    value: "R 4,286,410",
    cents: ".22",
    meta: '<span class="delta">+2.4%</span><span>vs September</span>',
    spark: "M1 18.5 8 16 15 17 22 11.5 29 13 36 7.5 43 10 50 4.5 57 6.5",
    color: "var(--accent)",
  },
  {
    label: "Available",
    value: "R 2,940,000",
    cents: ".00",
    meta: '<span class="delta neutral">3 accounts</span><span>Operations + trust</span>',
    spark: "M1 16 8 17 15 12 22 14 29 10 36 12.5 43 9 50 11 57 8",
    color: "var(--chart-muted)",
  },
  {
    label: "Awaiting approval",
    value: "3",
    cents: "",
    meta: "<span>R 118,400.00 in total</span>",
    spark: "M1 17 8 9 15 13 22 6 29 10 36 5 43 8 50 6 57 3",
    color: "var(--warn)",
  },
  {
    label: "Spent this month",
    value: "R 318,904",
    cents: ".10",
    meta: '<span class="delta neutral">−8.1%</span><span>vs September</span>',
    spark: "M1 6 8 9 15 8 22 13 29 11 36 15 43 13 50 17 57 16",
    color: "var(--accent)",
  },
];

const ATTENTION = [
  {
    initials: "SN",
    title: "Sipho Naidoo",
    sub: "Payment approval · awaiting you",
    amount: "R 48,200.00",
    action: "Approve",
    primary: true,
  },
  {
    initials: "MK",
    title: "Makro",
    sub: "Invoice #MK-8841 · due today",
    amount: "R 62,900.00",
    action: "Review",
    primary: false,
  },
  {
    initials: "LB",
    title: "L. Botha",
    sub: "New payee request",
    amount: "R 7,300.00",
    action: "Review",
    primary: false,
  },
];

const MOVEMENTS = [
  { date: "24 Oct", desc: "Woolworths Financial Services", acct: "Operations · 6204", cat: "Card", amount: "−R 3,842.18", status: "cleared" },
  { date: "23 Oct", desc: "Client settlement — Makro", acct: "Client trust · 8841", cat: "Transfer", amount: "+R 118,400.00", status: "cleared", pos: true },
  { date: "23 Oct", desc: "AWS EMEA", acct: "Operations · 6204", cat: "Software", amount: "−R 12,409.77", status: "pending" },
  { date: "22 Oct", desc: "Payroll — October", acct: "Operations · 6204", cat: "Salaries", amount: "−R 284,500.00", status: "scheduled" },
  { date: "21 Oct", desc: "Dividend — Naspers", acct: "Investments · 1180", cat: "Income", amount: "+R 42,180.00", status: "cleared", pos: true },
];

const FAMILY = [
  { letter: "S", name: "Studio", sub: "3 briefs need a decision", count: "3" },
  { letter: "A", name: "Atlas", sub: "Introduction: Makro & Co.", count: "1" },
  { letter: "G", name: "Signal", sub: "2 operational alerts", count: "2" },
];

/* --------------------------------------------------------------------------
   Markup
   -------------------------------------------------------------------------- */
function masthead() {
  return `
    <header class="masthead">
      <div class="mast-brand"><span class="mast-mark">A</span><span class="mast-word">Alder</span></div>
      <nav class="mast-nav" aria-label="Alder applications">
        <a href="#" class="is-active">Ledger</a>
        <a href="#">Studio</a>
        <a href="#">Atlas</a>
        <a href="#">Signal</a>
      </nav>
      <div class="mast-actions">
        <span class="mast-context">Private client · ZAR</span>
        <button class="icon-btn" aria-label="Search">${icon("search")}</button>
        <div class="avatar">GL</div>
      </div>
    </header>`;
}

function rail() {
  return `
    <aside class="rail" aria-label="Applications">
      <div class="brand-mark" aria-label="Alder">A</div>
      <div class="app-switch">
        <button class="app-dot is-active" title="Ledger" aria-label="Ledger">L</button>
        <button class="app-dot" title="Studio" aria-label="Studio">S</button>
        <button class="app-dot" title="Atlas" aria-label="Atlas">A</button>
        <button class="app-dot" title="Signal" aria-label="Signal">G</button>
      </div>
      <div class="rail-foot">
        <button class="app-dot" title="Help" aria-label="Help">?</button>
        <div class="avatar sm">GL</div>
      </div>
    </aside>`;
}

function sidebar() {
  return `
    <aside class="nav" aria-label="Ledger navigation">
      <div class="nav-head">
        <div class="nav-app">Ledger</div>
        <div class="nav-org">Alder Family Office</div>
      </div>
      ${NAV_GROUPS.map(
        (group) => `
        <div class="nav-group">
          <div class="nav-label">${group.label}</div>
          ${group.items
            .map(
              (item) => `
            <button class="nav-item${item.active ? " is-active" : ""}">
              ${icon(item.icon)}
              <span>${item.label}</span>
              ${item.count ? `<span class="nav-count">${item.count}</span>` : ""}
            </button>`
            )
            .join("")}
        </div>`
      ).join("")}
      <div class="nav-spacer"></div>
      <div class="nav-card">
        <div class="nav-card-title">Month-end close</div>
        <div class="nav-card-meta">2 days remaining</div>
        <div class="nav-progress"><i></i></div>
        <a class="nav-card-link" href="#">Open checklist ${icon("chevronRight")}</a>
      </div>
      <div class="nav-foot">
        <button class="nav-item">${icon("settings")}<span>Settings</span></button>
        <button class="nav-item">${icon("logout")}<span>Sign out</span></button>
      </div>
    </aside>`;
}

function topbar() {
  return `
    <div class="topbar">
      <div class="crumbs">
        <strong>Alder</strong><span class="sep">/</span>
        <span class="hide-sm">Ledger</span><span class="sep hide-sm">/</span>
        <span class="here">Overview</span>
      </div>
      <div class="topbar-tabs" role="tablist" aria-label="Ledger views">
        <button class="is-active" role="tab" aria-selected="true">Overview</button>
        <button role="tab" aria-selected="false">Activity</button>
        <button role="tab" aria-selected="false">Reports</button>
      </div>
      <div class="topbar-right">
        <button class="search-trigger" aria-label="Search or jump to">${icon("search")}<span>Search or jump to…</span><kbd>⌘K</kbd></button>
        <button class="icon-btn" aria-label="Notifications">${icon("bell")}<span class="dot"></span></button>
        <div class="avatar">GL</div>
      </div>
    </div>`;
}

function hero() {
  return `
    <section class="hero">
      <div>
        <div class="eyebrow">Saturday, 24 October · ZAR</div>
        <h1 class="hero-title">Good afternoon, <em>Graeme</em></h1>
        <p class="hero-sub">Three approvals are waiting. Everything else is settled.</p>
      </div>
      <div class="hero-actions">
        <button class="btn">${icon("calendar")}This month</button>
        <button class="btn btn-primary">${icon("plus")}New payment</button>
      </div>
    </section>`;
}

function kpis() {
  return `
    <section class="kpis" aria-label="Key figures">
      ${KPIS.map(
        (k) => `
        <article class="kpi">
          <div class="kpi-top">
            <div class="kpi-label">${k.label}</div>
            <svg class="spark" viewBox="0 0 58 22" fill="none" aria-hidden="true"><path d="${k.spark}" stroke="${k.color}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="kpi-value">${k.value}${k.cents ? `<span class="cents">${k.cents}</span>` : ""}</div>
          <div class="kpi-meta">${k.meta}</div>
        </article>`
      ).join("")}
    </section>`;
}

function chartCard() {
  return `
    <section class="card chart-card">
      <div class="card-head">
        <h2 class="card-title">Cash flow <span class="card-sub">Apr — Sep 2026</span></h2>
        <div class="card-tools">
          <div class="seg" role="group" aria-label="Chart range">
            <button>1M</button><button class="is-active">6M</button><button>1Y</button>
          </div>
        </div>
      </div>
      <div class="chart-summary">
        <div>
          <div class="stat-label">Net movement</div>
          <div class="stat-value"><span class="sign">+</span>R 412,806<span class="unit">.14</span></div>
        </div>
        <div>
          <div class="stat-label">Average month</div>
          <div class="stat-value">R 68,801<span class="unit">.02</span></div>
        </div>
      </div>
      <div class="chart-wrap">
        <svg class="chart-svg" viewBox="0 0 720 200" preserveAspectRatio="none" aria-hidden="true">
          <g class="chart-grid">
            <line x1="0" y1="24" x2="720" y2="24"/>
            <line x1="0" y1="68" x2="720" y2="68"/>
            <line x1="0" y1="112" x2="720" y2="112"/>
            <line x1="0" y1="156" x2="720" y2="156"/>
            <line x1="0" y1="200" x2="720" y2="200"/>
          </g>
          <path class="chart-area" d="M0 148 C48 132 88 120 128 126 C168 132 200 110 240 104 C280 98 312 108 352 96 C392 84 424 64 464 72 C504 80 536 58 576 52 C616 46 668 34 720 28 L720 200 L0 200 Z"/>
          <path class="chart-line-2" d="M0 168 C60 164 96 172 144 162 C192 152 232 164 280 152 C328 140 368 150 416 140 C464 130 504 142 552 132 C600 122 660 128 720 116"/>
          <path class="chart-line" d="M0 148 C48 132 88 120 128 126 C168 132 200 110 240 104 C280 98 312 108 352 96 C392 84 424 64 464 72 C504 80 536 58 576 52 C616 46 668 34 720 28"/>
        </svg>
        <span class="chart-end"></span>
      </div>
      <div class="chart-x">
        <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
      </div>
      <div class="card-foot">
        <div class="legend"><span><i></i>Inflow</span><span><i class="muted"></i>Outflow</span></div>
        <span>Updated 14:02</span>
      </div>
    </section>`;
}

function attentionCard() {
  return `
    <aside class="card attention">
      <div class="card-head">
        <h2 class="card-title">Needs your attention</h2>
        <span class="card-sub">3 waiting</span>
      </div>
      <div class="attention-list">
        ${ATTENTION.map(
          (item) => `
          <div class="attention-item">
            <div class="mini-avatar">${item.initials}</div>
            <div>
              <div class="att-title">${item.title}</div>
              <div class="att-sub">${item.sub}</div>
              <div class="att-amount">${item.amount}</div>
            </div>
            <div class="att-action">
              <button class="btn btn-xs${item.primary ? " btn-primary" : ""}">${item.action}</button>
            </div>
          </div>`
        ).join("")}
      </div>
      <div class="card-foot">
        <a class="link" href="#">All approvals ${icon("arrowUpRight")}</a>
        <span>Oldest 2 days</span>
      </div>
    </aside>`;
}

function tableCard() {
  return `
    <section class="card table-card">
      <div class="card-head">
        <h2 class="card-title">Recent activity <span class="card-sub">5 latest movements</span></h2>
        <div class="card-tools">
          <button class="icon-btn" aria-label="Filter">${icon("filter")}</button>
          <button class="icon-btn" aria-label="Download statement">${icon("download")}</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Description</th><th>Account</th><th>Category</th><th style="text-align:right">Amount</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${MOVEMENTS.map(
              (m) => `
              <tr>
                <td class="date">${m.date}</td>
                <td class="desc">${m.desc}</td>
                <td>${m.acct}</td>
                <td>${m.cat}</td>
                <td class="amount${m.pos ? " pos" : ""}">${m.amount}</td>
                <td><span class="pill ${m.status}">${m.status[0].toUpperCase() + m.status.slice(1)}</span></td>
              </tr>`
            ).join("")}
          </tbody>
        </table>
      </div>
    </section>`;
}

function familyCard() {
  return `
    <aside class="card family">
      <div class="card-head">
        <h2 class="card-title">Across Alder</h2>
        <span class="card-sub">Family</span>
      </div>
      <div class="family-list">
        ${FAMILY.map(
          (f) => `
          <button class="family-item">
            <span class="app-tile">${f.letter}</span>
            <span>
              <span class="family-title" style="display:block">${f.name}</span>
              <span class="family-sub" style="display:block">${f.sub}</span>
            </span>
            <span class="family-count">${f.count}</span>
          </button>`
        ).join("")}
      </div>
      <div class="card-foot">
        <a class="link" href="#">Open switcher ${icon("arrowUpRight")}</a>
        <span>⌘⇧A</span>
      </div>
    </aside>`;
}

function inspector() {
  return `
    <aside class="inspector" aria-label="Account details">
      <div class="insp-head"><span>Account</span><button class="icon-btn" style="width:24px;height:24px" aria-label="Close panel">${icon("x")}</button></div>
      <div class="insp-account">
        <div class="app-tile" style="width:32px;height:32px;font-size:10px">OP</div>
        <div>
          <div class="insp-name">Operations · 6204</div>
          <div class="insp-type">Cheque account · primary</div>
        </div>
      </div>
      <div class="insp-label">Balance</div>
      <div class="insp-balance">R 2,940,000.00</div>
      <div class="insp-note">Available now · R 2,806,118.40 cleared</div>
      <div class="insp-grid">
        <div class="insp-cell"><div class="insp-label">Cleared today</div><div class="insp-val">R 12,409.77</div></div>
        <div class="insp-cell"><div class="insp-label">Pending</div><div class="insp-val">R 3,842.18</div></div>
        <div class="insp-cell"><div class="insp-label">Daily limit</div><div class="insp-val">R 250,000</div></div>
        <div class="insp-cell"><div class="insp-label">Opened</div><div class="insp-val">2019-04-02</div></div>
      </div>
      <div class="insp-section">Permissions</div>
      <div class="person"><div class="avatar">GL</div><span class="person-name">Graeme Lockley</span><span class="person-role">Owner</span></div>
      <div class="person"><div class="avatar">LM</div><span class="person-name">Lindiwe Mokoena</span><span class="person-role">Approver</span></div>
      <div class="person"><div class="avatar">AI</div><span class="person-name">Aida · digital</span><span class="person-role">Read-only</span></div>
      <div class="insp-actions">
        <button class="btn btn-primary btn-full">Manage account</button>
        <button class="btn btn-full">${icon("download")}Statement</button>
      </div>
    </aside>`;
}

function appTemplate() {
  return `
    <div class="app">
      ${masthead()}
      <div class="shell">
        ${rail()}
        ${sidebar()}
        <main class="main">
          ${topbar()}
          <div class="main-body">
            <div class="content">
              ${hero()}
              ${kpis()}
              <div class="grid">
                ${chartCard()}
                ${attentionCard()}
                ${tableCard()}
                ${familyCard()}
              </div>
              <footer class="page-foot">
                <span>Alder Ledger</span><span class="dotline"></span>
                <span>Reconciled 14:02 SAST</span><span class="dotline"></span>
                <span>Illustrative data</span>
              </footer>
            </div>
            ${inspector()}
          </div>
        </main>
      </div>
    </div>`;
}

/* --------------------------------------------------------------------------
   Specimen page
   -------------------------------------------------------------------------- */
function specTemplate(theme) {
  const swatches = PALETTE.map(
    ([token, role, use]) => `
      <div class="swatch">
        <div class="chip" style="--sw: var(${token})"></div>
        <div class="meta">
          <div class="token">${token.replace("--", "")}</div>
          <div class="role">${role} · ${use}</div>
          <div class="val" data-token="${token}"></div>
        </div>
      </div>`
  ).join("");

  return `
    <div class="spec-root">
      <div class="spec-top">
        <button class="spec-back" data-act="view" data-view="app">${icon("chevronLeft")} Back to the app</button>
        <span>Style specimen</span>
        <span class="spacer"></span>
        <span>${theme.num} / 04 · ${theme.name}</span>
        <button class="spec-back" data-act="compare">Compare all four</button>
      </div>
      <div class="spec-wrap">
        <header class="spec-head">
          <div class="eyebrow">Direction ${theme.num} · ${theme.label}</div>
          <h1>${theme.name}<em>.</em></h1>
          <p class="spec-lede">${theme.description}</p>
          <div class="spec-keywords">${theme.keywords.map((k) => `<span>${k}</span>`).join("")}</div>
        </header>

        <section class="spec-block">
          <h2>Colour</h2>
          <p class="hint">Semantic roles, not a palette of pretty names. Any build maps these ten roles to its own mechanism — CSS variables, a theme object, a design-token file.</p>
          <div class="swatches">${swatches}</div>
        </section>

        <section class="spec-block">
          <h2>Type</h2>
          <p class="hint">${theme.id === "folio" ? "A high-contrast serif carries authority at display sizes; the interface itself stays quiet in a system sans." : theme.id === "calibre" ? "System sans for language, tabular monospace for anything a person might compare or audit." : "One family carries the hierarchy. Tracking tightens as size increases; labels open up."}</p>
          <div class="type-row">
            <div class="type-meta"><b>Display</b>display stack<br><span data-token="--fs-display"></span> / <span data-token="--track-display"></span></div>
            <div class="type-sample"><div class="u-display">Good afternoon, <em>Graeme</em></div></div>
          </div>
          <div class="type-row">
            <div class="type-meta"><b>Title</b>card &amp; section heads<br>22 px</div>
            <div class="type-sample"><div class="u-title">Cash flow and commitments</div></div>
          </div>
          <div class="type-row">
            <div class="type-meta"><b>Heading</b>block level<br>15 px</div>
            <div class="type-sample"><div class="u-h3">Needs your attention</div></div>
          </div>
          <div class="type-row">
            <div class="type-meta"><b>Body</b>reading size<br><span data-token="--fs-body"></span> / 1.55</div>
            <div class="type-sample"><p class="u-body">Three approvals are waiting. Everything else is settled, reconciled and ready for month-end close. Nothing here needs your attention twice.</p></div>
          </div>
          <div class="type-row">
            <div class="type-meta"><b>Label</b>eyebrows &amp; field labels<br><span data-token="--fs-label"></span></div>
            <div class="type-sample"><div class="u-label">Available balance · ZAR</div></div>
          </div>
          <div class="type-row">
            <div class="type-meta"><b>Numerals</b>tabular, aligned<br>${theme.notes.numerals}</div>
            <div class="type-sample"><div class="u-num">R 4,286,410.22</div></div>
          </div>
        </section>

        <section class="spec-block">
          <h2>Form &amp; measure</h2>
          <p class="hint">Rhythm and containment. The same tokens drive every application in the family, so density can flex without the language changing.</p>
          <div class="scale-grid">
            <div class="scale-item"><strong>Rhythm</strong>Gap between blocks<br><span data-token="--gap"></span></div>
            <div class="scale-item"><strong>Card padding</strong>Interior breathing room<br><span data-token="--card-pad"></span></div>
            <div class="scale-item"><strong>Content width</strong>Max readable measure<br><span data-token="--content-max"></span></div>
            <div class="scale-item"><strong>Control height</strong>Default action target<br><span data-token="--btn-h"></span></div>
          </div>
          <div class="radius-row" style="margin-top:10px">
            <div class="radius-chip" style="--rc: var(--r-xs)"><span data-token="--r-xs"></span></div>
            <div class="radius-chip" style="--rc: var(--r-s)"><span data-token="--r-s"></span></div>
            <div class="radius-chip" style="--rc: var(--r-m)"><span data-token="--r-m"></span></div>
            <div class="radius-chip" style="--rc: var(--r-l)"><span data-token="--r-l"></span></div>
          </div>
          <div class="scale-grid" style="margin-top:10px">
            <div class="scale-item"><strong>Elevation</strong>${theme.notes.elevation}</div>
            <div class="scale-item"><strong>Interaction</strong><span data-token="--dur-1"></span> · <span data-token="--ease"></span></div>
            <div class="scale-item"><strong>Navigation</strong>${theme.notes.navigation}</div>
            <div class="scale-item"><strong>Dark mode</strong>${theme.notes.darkMode}</div>
          </div>
        </section>

        <section class="spec-block">
          <h2>Components</h2>
          <p class="hint">A small proof set, rendered with the same tokens as the app screen. The full component contract is captured only for the chosen direction.</p>
          <div class="comp-row">
            <button class="btn btn-primary">${icon("plus")}New payment</button>
            <button class="btn">${icon("calendar")}This month</button>
            <button class="btn btn-ghost">Cancel</button>
            <button class="btn btn-danger">Delete</button>
          </div>
          <div class="comp-row">
            <div class="field"><label>Find a recipient</label><div class="input placeholder">${icon("search")}Search by name or account</div></div>
            <div class="field"><label>Pay from</label><div class="input">Operations · 6204 <span class="caret">▾</span></div></div>
            <div class="field" style="flex-direction:row;align-items:center;gap:10px;max-width:180px"><span class="toggle"></span><span class="u-label" style="letter-spacing:.02em;text-transform:none;font-size:11px;color:var(--ink-2)">Notify me</span></div>
            <div class="field" style="flex-direction:row;align-items:center;gap:8px;max-width:200px"><span class="check">${icon("checkSmall")}</span><span class="u-label" style="letter-spacing:.02em;text-transform:none;font-size:11px;color:var(--ink-2)">Remember this payee</span></div>
          </div>
          <div class="comp-row">
            <span class="pill cleared">Cleared</span>
            <span class="pill pending">Pending</span>
            <span class="pill scheduled">Scheduled</span>
            <span class="pill">Draft</span>
            <div class="seg" style="margin-left:8px"><button>1M</button><button class="is-active">6M</button><button>1Y</button></div>
            <div class="avatar">GL</div><div class="avatar">LM</div><div class="avatar">AI</div>
          </div>
        </section>

        <div class="spec-note">
          <h3>How this reads in a product</h3>
          <p><strong>Best for:</strong> ${theme.bestFor} <strong>Watch out:</strong> ${theme.watchOut}</p>
        </div>
      </div>
    </div>`;
}

/* --------------------------------------------------------------------------
   Explorer chrome
   -------------------------------------------------------------------------- */
const state = {
  style: "quiet",
  view: "app",
  chrome: true,
};

const THEME_IDS = THEMES.map((t) => t.id);
const getTheme = (id) => THEMES.find((t) => t.id === id) || THEMES[0];

function readState() {
  const params = new URLSearchParams(window.location.search);
  const style = params.get("style");
  state.style = THEME_IDS.includes(style) ? style : "quiet";
  state.view = params.get("view") === "spec" ? "spec" : "app";
  state.chrome = params.get("chrome") !== "0";
}

function syncURL() {
  const params = new URLSearchParams();
  params.set("style", state.style);
  params.set("view", state.view);
  if (!state.chrome) params.set("chrome", "0");
  try {
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  } catch (err) {
    /* file:// in some browsers refuses history; the explorer still works. */
  }
}

let lastView = null;

function applyState() {
  document.documentElement.dataset.theme = state.style;
  document.documentElement.dataset.view = state.view;
  document.body.classList.toggle("no-chrome", !state.chrome);

  if (state.view === "spec") {
    document.getElementById("root").innerHTML = specTemplate(getTheme(state.style));
    fillTokenValues();
    lastView = "spec";
  } else if (lastView !== "app") {
    document.getElementById("root").innerHTML = appTemplate();
    lastView = "app";
  }

  renderChrome();
  syncURL();
}

function fillTokenValues() {
  const rootStyle = getComputedStyle(document.documentElement);
  document.querySelectorAll("[data-token]").forEach((el) => {
    const token = el.dataset.token;
    const raw = rootStyle.getPropertyValue(token).trim();
    const value = raw.length > 44 ? `${raw.slice(0, 42)}…` : raw;
    el.textContent = value;
    el.title = raw;
  });
}

function renderChrome() {
  const theme = getTheme(state.style);
  document.getElementById("chrome").innerHTML = `
    <div class="chrome" role="toolbar" aria-label="Style exploration">
      <span class="chrome-tag">Archive</span>
      <button class="nav-arrow" data-act="prev" aria-label="Previous direction" title="Previous (←)">${icon("chevronLeft")}</button>
      <div class="current" aria-live="polite">
        <span class="idx">${theme.num} / 04</span>
        <span class="name">${theme.name}</span>
      </div>
      <button class="nav-arrow" data-act="next" aria-label="Next direction" title="Next (→)">${icon("chevronRight")}</button>
      <div class="dots" role="group" aria-label="Jump to direction">
        ${THEMES.map(
          (t) => `<button class="dot${t.id === state.style ? " is-active" : ""}" data-style="${t.id}" aria-label="${t.name}" title="${t.name}"></button>`
        ).join("")}
      </div>
      <div class="links">
        <button class="link-btn${state.view === "spec" ? " is-on" : ""}" data-act="view" data-view="${state.view === "spec" ? "app" : "spec"}">${state.view === "spec" ? "App" : "Specimen"}</button>
        <button class="link-btn" data-act="compare">Compare</button>
      </div>
    </div>`;
}

/* --------------------------------------------------------------------------
   Compare overlay
   -------------------------------------------------------------------------- */
function compareTemplate() {
  return `
    <div class="modal" id="compare" role="dialog" aria-modal="true" aria-label="Compare the four directions">
      <div class="modal-inner">
        <div class="modal-head">
          <div>
            <div class="modal-eyebrow">Alder · decision aid</div>
            <h2>Four look-and-feel directions</h2>
            <p class="modal-intro">The same product, the same information architecture, four different convictions about how a family of applications should feel. Open any direction to move through it at full size.</p>
          </div>
          <button class="modal-close" data-act="close-compare" aria-label="Close comparison">${icon("x")}</button>
        </div>
        <div class="compare-grid">
          ${THEMES.map(
            (t) => `
            <a class="compare-card" href="index.html?style=${t.id}&view=app" data-style="${t.id}">
              <img src="screens/${t.id}.png" alt="Preview of the ${t.name} direction" loading="lazy" />
              <div class="compare-body">
                <div class="compare-name"><span class="num">${t.num}</span>${t.name}${t.recommended ? '<span class="rec">Chosen</span>' : ""}</div>
                <div class="compare-tag">${t.tagline}</div>
                <div class="compare-foot">
                  <div class="compare-keywords">${t.keywords.map((k) => `<span>${k}</span>`).join("")}</div>
                  <span class="compare-open">Open ${icon("chevronRight")}</span>
                </div>
              </div>
            </a>`
          ).join("")}
        </div>
        <div class="modal-foot">
          <span><strong>Chosen:</strong> Quiet, captured with a designed night mode. The portable system lives in <a href="../../design-system/reference/index.html" style="text-decoration:underline">the design system</a>.</span>
          <span><kbd>←</kbd> <kbd>→</kbd> flip · <kbd>C</kbd> compare · <kbd>S</kbd> specimen</span>
        </div>
      </div>
    </div>`;
}

function openCompare() {
  let modal = document.getElementById("compare");
  if (!modal) {
    document.body.insertAdjacentHTML("beforeend", compareTemplate());
    modal = document.getElementById("compare");
  }
  modal.classList.add("is-open");
  modal.scrollTop = 0;
}

function closeCompare() {
  const modal = document.getElementById("compare");
  if (modal) modal.classList.remove("is-open");
}

/* --------------------------------------------------------------------------
   Actions
   -------------------------------------------------------------------------- */
function cycle(delta) {
  const i = THEME_IDS.indexOf(state.style);
  const next = (i + delta + THEME_IDS.length) % THEME_IDS.length;
  setStyle(THEME_IDS[next]);
}

function setStyle(id) {
  if (!THEME_IDS.includes(id)) return;
  const changed = id !== state.style;
  state.style = id;
  closeCompare();
  if (changed) {
    const root = document.getElementById("root");
    root.classList.add("switching");
    window.setTimeout(() => root.classList.remove("switching"), 240);
  }
  applyState();
  if (state.view === "spec") {
    window.scrollTo(0, 0);
  }
}

function setView(view) {
  state.view = view === "spec" ? "spec" : "app";
  applyState();
  window.scrollTo(0, 0);
}

document.addEventListener("click", (event) => {
  if (event.target.id === "compare") {
    closeCompare();
    return;
  }
  const styleTarget = event.target.closest("[data-style]");
  if (styleTarget) {
    event.preventDefault();
    setStyle(styleTarget.dataset.style);
    return;
  }
  const actionTarget = event.target.closest("[data-act]");
  if (!actionTarget) return;
  event.preventDefault();
  const act = actionTarget.dataset.act;
  if (act === "prev") cycle(-1);
  else if (act === "next") cycle(1);
  else if (act === "view") setView(actionTarget.dataset.view);
  else if (act === "compare") openCompare();
  else if (act === "close-compare") closeCompare();
});

document.addEventListener("keydown", (event) => {
  const tag = (event.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || event.target.isContentEditable) return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    cycle(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    cycle(1);
  } else if (event.key === "Escape") {
    closeCompare();
  } else if (event.key.toLowerCase() === "c" && !event.metaKey && !event.ctrlKey) {
    openCompare();
  } else if (event.key.toLowerCase() === "s" && !event.metaKey && !event.ctrlKey) {
    setView(state.view === "spec" ? "app" : "spec");
  }
});

window.addEventListener("popstate", () => {
  readState();
  lastView = null;
  applyState();
});

/* Boot */
readState();
applyState();
