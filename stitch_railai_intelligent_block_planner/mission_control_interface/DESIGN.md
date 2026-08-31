---
name: Mission Control Interface
colors:
  surface: '#0e150e'
  surface-dim: '#0e150e'
  surface-bright: '#333b33'
  surface-container-lowest: '#091009'
  surface-container-low: '#161d16'
  surface-container: '#1a221a'
  surface-container-high: '#242c24'
  surface-container-highest: '#2f372e'
  on-surface: '#dce5d9'
  on-surface-variant: '#bccbb9'
  inverse-surface: '#dce5d9'
  inverse-on-surface: '#2a322a'
  outline: '#869585'
  outline-variant: '#3d4a3d'
  surface-tint: '#4ae176'
  primary: '#4be277'
  on-primary: '#003915'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#006e2f'
  secondary: '#b5c4ff'
  on-secondary: '#00287d'
  secondary-container: '#153ea3'
  on-secondary-container: '#9db2ff'
  tertiary: '#bfc6e0'
  on-tertiary: '#283044'
  tertiary-container: '#a4abc4'
  on-tertiary-container: '#383f54'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b5c4ff'
  on-secondary-fixed: '#00164e'
  on-secondary-fixed-variant: '#153ea3'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#0e150e'
  on-background: '#dce5d9'
  surface-variant: '#2f372e'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  data-primary:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0em
  data-compact:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 16px
  margin-edge: 24px
  stack-compact: 8px
  stack-loose: 24px
  grid-columns: '12'
---

## Brand & Style

The design system is engineered for the high-stakes environment of national railway infrastructure management. It adopts a **Futuristic HUD (Heads-Up Display)** aesthetic, prioritizing information density, rapid scanning, and absolute technical precision.

The visual narrative is "System-Level Authority." By utilizing a strict dark mode, sharp geometries, and monospace data points, the interface transforms raw AI computation into actionable situational awareness. The style leans into **Experimental Brutalism**, removing decorative flourishes in favor of structural clarity, high-contrast indicators, and a technical atmosphere that reflects the real-time nature of railway operations.

## Colors

The palette is anchored in a deep-space **Navy (#0F172A)** to reduce eye strain during long shifts. The **Signal Green (#22C55E)** seed color serves as the primary action and "System Healthy" state, cutting through the dark background with high luminosity.

- **Primary Action:** Signal Green is used for execution, confirmation, and active "Clear" track statuses.
- **Infrastructure Blue:** Used for organizational elements, secondary navigation, and established rail assets.
- **Alert Tiers:** Warning Orange and Emergency Red are reserved strictly for system anomalies and blocked sections to ensure immediate visual triage.
- **Surfacing:** Neutral Slates provide tiered elevation without the use of shadows, maintaining a flat, technical profile.

## Typography

This design system employs a dual-type strategy to balance command-level visibility with granular data accuracy:

1.  **Space Grotesk (Headlines):** A geometric, futuristic sans-serif used for high-level summaries and section titles. Its tech-forward character reinforces the AI-driven nature of the system.
2.  **JetBrains Mono (Data & Body):** Every coordinate (KM marker), timestamp, asset ID, and AI reasoning string is rendered in monospace. This ensures that columns of numbers align perfectly, allowing operators to spot deviations in data patterns instantly.

**Scale Strategy:** All data-heavy views utilize `data-compact` to maximize information density. `label-caps` is used for non-interactive table headers and metadata descriptors.

## Layout & Spacing

The layout follows a **Rigid Technical Grid**. Unlike consumer apps, this system avoids excessive whitespace to keep as much critical information "above the fold" as possible.

- **Grid Model:** A 12-column fluid grid for dashboard views. Components should snap to the grid with 16px gutters.
- **Rhythm:** A 4px base unit controls all internal component padding.
- **Density:** Table rows are capped at 32px height to allow for massive data sets.
- **Responsive Behavior:** On smaller viewports, sidebars collapse into icon-only rails. Data tables horizontally scroll rather than reflowing, as column-position consistency is vital for operator muscle memory.

## Elevation & Depth

To maintain a "Mission Control" feel, this design system eschews traditional soft shadows. Depth is communicated through **Tonal Layering** and **Technical Outlines**:

- **Level 0 (Floor):** Deep Navy (#0F172A). Used for the overall application background.
- **Level 1 (Panels):** Slate Gray (#1E293B). Used for secondary sidebar and main content areas.
- **Level 2 (Cards/Widgets):** Slate Gray (#334155). Used for individual modules and explainable AI cards.
- **Borders:** Active elements are highlighted with a 1px solid border in Signal Green or Infrastructure Blue.
- **Overlays:** Modals and temporary technical readouts use a subtle backdrop blur (10px) to provide focus without losing the context of the underlying map or data stream.

## Shapes

The shape language is **Strictly Orthogonal (0px Roundedness)**. 

Sharp corners reinforce the "industrial" and "institutional" nature of the Indian Railways infrastructure. Every button, card, input field, and status badge must utilize 90-degree angles. This facilitates the "HUD" aesthetic and allows components to be packed tightly together without the visual gaps created by rounded corners.

## Components

### Buttons
- **Primary:** Solid Signal Green background, black text, sharp corners.
- **Secondary:** Ghost style with a 1px Infrastructure Blue border and Blue text.
- **Ghost:** Monospace text only, underlined on hover.

### Status Badges (Technical Indicators)
- Square-edged boxes with a left-side 4px vertical "status bar." 
- **Operational:** Green bar + "OPR" label.
- **Warning:** Orange bar + "WNG" label.
- **Blocked:** Red bar + "BLK" label.

### High-Density Data Tables
- Header background: `#1E293B`.
- Row border-bottom: 1px solid `#334155`.
- All numeric data right-aligned in JetBrains Mono.
- Zebra striping is not used; instead, use hover-state highlights in a subtle `#2D3748`.

### Gantt / Block Planning Elements
- Blocks are represented as solid rectangles. 
- Overlapping maintenance windows are indicated by a diagonal "hazard" stripe pattern in Warning Orange.
- Current time-marker is a 1px Signal Green vertical line spanning the entire height of the view.

### Explainable AI (XAI) Cards
- Framed in a thin Infrastructure Blue border.
- Includes a "Confidence Score" gauge (linear progress bar).
- Monospace text describes the logic: `IF [ASSET_ID_402] > THRESHOLD THEN TRIGGER BLOCK`.

### Map Markers
- Square icons with 1px white borders.
- Markers pulse in Red if an asset within that sector reports a critical failure.