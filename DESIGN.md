---
name: Rythamo Hospitals Design System
description: A solid-color, high-contrast visual system for exclusive Interventional Radiology care.
colors:
  primary: "#2A9D8F"
  accent: "#E76F51"
  neutral-bg: "#0A1413"
  neutral-surface: "#112120"
  neutral-border: "#203432"
  text-light: "#F4F7F7"
  text-muted: "#A3B7B5"
typography:
  display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.01em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#F48C72"
  button-secondary:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
---

# Design System: Rythamo Hospitals

## 1. Overview

**Creative North Star: "The Solid Vascular Pathway"**

This system represents a high-contrast, flat clinical aesthetic built on **solid colors only**. It explicitly rejects the common SaaS gradients, blurry glassmorphisms, and neon glow backdrops in favor of a clean, highly structured, tactile, and mathematically precise interface. Grounded in a deep, organic slate-teal with sharp terracotta-coral highlights, the system leverages letter-spacing micro-craft and shadow hierarchy to guide the user's eye effortlessly.

**Key Characteristics:**
* **Gradients Ban:** Absolute commitment to flat solid color panels. Depth is created via spacing, borders, and color layering, never gradients.
* **Topography Craft:** Highly customized letter spacing across four distinct semantic levels to indicate text priority natively.
* **Tactile Interactions:** Micro-motion, lift transitions, and shadow offsets that verify control and system responsiveness.

---

## 2. Colors

Rythamo Hospitals uses a strict, committed color strategy leveraging our two custom solid anchors.

### Primary
* **Vascular Teal** (`#2A9D8F` / `oklch(62% 0.14 173)`): The primary brand identifier. Represents diagnostic imaging, vessel systems, and clinical safety. Used for headings, active tabs, inline paths, and primary icons.

### Secondary
* **Terracotta Coral** (`#E76F51` / `oklch(61% 0.17 12)`): Our sharp accent color. Represents life, active flow, and critical actions. Used strictly for high-conversion scheduling buttons and focused indicators.

### Neutral
* **Teal Obsidian** (`#0A1413` / `oklch(12% 0.015 173)`): The dark base background. Tinted with our brand hue for comfort and organic elegance.
* **Intake Surface** (`#112120` / `oklch(18% 0.02 173)`): Solid, flat container backgrounds for cards, forms, and headers.
* **Pinhole Border** (`#203432` / `oklch(28% 0.02 173)`): 1px borders providing structure and definition between regions.
* **Soft Silk White** (`#F4F7F7` / `oklch(96% 0.005 173)`): High-readability white body text.
* **Muted Clay** (`#A3B7B5` / `oklch(74% 0.015 173)`): Descriptions, metadata, and supporting text.

### Named Rules
**The Solid-Only Rule.** Gradients of any kind are completely prohibited. Transitions between regions must use solid fills and clear 1px borders to maintain clinical order.
**The Accent Isolation Rule.** Terracotta Coral must represent ≤10% of any visible viewport, focusing exclusively on active scheduling points.

---

## 3. Typography

**Display Font:** `Outfit` (with system-ui sans-serif fallback)
**Body Font:** `Inter` (with system-ui sans-serif fallback)

### Spacing Craft (Topography)
Hierarchy is established using letter-spacing signals that denote the nature of the copy instantly:
1. **Hero Headings:** `-0.01em` (Tight spacing) – Pulls display letters together for a dense, authoritative, and confident appearance.
2. **Body Paragraphs:** `0.01em` (Barely open) – Provides breathing room, making clinical text effortless to read.
3. **Action Labels:** `0.04em` (Open) – Allows badges, button copy, and interactive titles to stand out distinctly.
4. **Uppercase Tags:** `0.08em` (Wide spacing) – Stretches categories and department labels out, indicating a visual metadata tag.

### Hierarchy
* **Display** (Outfit, Bold (700), clamp(2.5rem, 5vw, 4rem), 1.15, `-0.01em` letter spacing): Hero text.
* **Headline** (Outfit, Semibold (600), 2rem, 1.25, `-0.005em` letter spacing): Major section titles.
* **Title** (Outfit, Medium (500), 1.25rem, 1.3, `0.02em` letter spacing): Card headers and procedure titles.
* **Body** (Inter, Regular (400), 1rem, 1.6, `0.01em` letter spacing): Standard descriptions. Maximum line length: **65ch**.
* **Label** (Inter, Semibold (600), 0.75rem, `0.08em` letter spacing, uppercase): Tags and metadata labels.

---

## 4. Elevation

We reject decorative, blurry shadows that add visual mud. Depth is conveyed using structured flat boundaries and a strict state-based shadow hierarchy.

### Shadow Hierarchy
* **Resting State:** Elements sit flat on the `Teal Obsidian` background with 1px `Pinhole Borders`. Zero shadow.
* **Hover State:** Interactive cards lift slightly (`translateY(-2px)`) and acquire a subtle, sharp, single-layer border accent.
* **Intake Focus (Active):** The primary form field or active booking element acquires a sharp, solid outline offset to signal system attention.

---

## 5. Components

### Navigation
* **Shape:** Soft rounded corners (8px / `rounded.sm`).
* **Design:** A solid Intake Surface bar bordered by a 1px Pinhole Stroke. Links leverage the typography spacing rules.

### Buttons
* **Shape:** Confident rounded edges (8px / `rounded.sm`).
* **Primary (CTA):** Solid Terracotta Coral fill with dark Teal Obsidian text. On hover, it lifts slightly with a clean outline response. No gradients.
* **Secondary:** Solid Intake Surface fill with a 1px Pinhole Border.

### Cards
* **Corner Style:** Rounded (16px / `rounded.md`).
* **Background:** Solid Intake Surface.
* **Borders:** 1px Pinhole Border. No glow.

### Form Fields
* **Style:** Deep Teal Obsidian background, Pinhole Border, and Soft Silk White text.
* **Focus:** Clinical Teal outline border with a 4px offset.

---

## 6. Do's and Don'ts

### Do:
* **Do** enforce exact letter-spacing variables: `-0.01em` on hero headings, `0.01em` on body text, `0.04em` on action labels, and `0.08em` on uppercase tags.
* **Do** use flat, solid fills for backgrounds, panels, and borders.
* **Do** cap paragraph line lengths strictly at **65ch** for optimal readability.

### Don't:
* **Don't** use gradients (`bg-gradient-to-...` or `background-clip: text`) anywhere in the application.
* **Don't** use ambient glowing radial circles, backdrop blurs, or glassmorphic opacity styles.
* **Don't** apply uniform shadows; elements are flat at rest and only lift on explicit user hover.
* **Don't** use side-stripe color bars as highlights on cards.
