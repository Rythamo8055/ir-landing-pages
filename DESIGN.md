---
name: Rythamo Hospitals Design System
description: A premium, solid-color light-theme visual system for exclusive Interventional Radiology care.
colors:
  primary: "#2A9D8F"
  accent: "#E76F51"
  neutral-bg: "#FAF8F5"
  neutral-surface: "#FFFFFF"
  neutral-border: "#E1ECEB"
  text-light: "#172A28"
  text-muted: "#4E6562"
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

**Creative North Star: "The Organic Stationery Sanctuary"**

This system represents a warm, premium, and highly comforting **light-theme clinical aesthetic** built on **solid colors only**. Moving away from sterile, bright-white hospital tiles and clinical blue boxes, it draws inspiration from premium textured stationery, organic sand tones, and biological paths. The typography spacing craft remains tightly calibrated, and the visual hierarchy is anchored by deep teal-charcoal text laid over soft warm sand backdrops.

**Key Characteristics:**
* **Warm Sand Light Mode:** Soft warm sand bases instead of blinding cool white, offering a soothing, luxurious clinic environment.
* **Gradients Ban:** Pure solid background surfaces and clear 1px borders, avoiding the chaotic visual clutter of neon glows.
* **Clinical Contrast:** Deep, high-contrast teal-charcoal primary text ensuring perfect readability (WCAG AA) for all patients.

---

## 2. Colors

The Rythamo Hospitals light theme uses a highly committed color strategy anchored by our warm base and sharp dual accents.

### Primary
* **Vascular Teal** (`#2A9D8F` / `oklch(62% 0.14 173)`): Reassuring clinical color representing image-guided precision. Used for headers, active text tabs, and core vascular highlights.

### Secondary
* **Terracotta Coral** (`#E76F51` / `oklch(61% 0.17 12)`): Active urgency accent color. Used for booking CTAs and primary action highlights.

### Neutral
* **Warm Sand** (`#FAF8F5` / `oklch(98% 0.005 36)`): The core light backdrop. Inviting, comforting, and organic.
* **Silk White** (`#FFFFFF` / `oklch(100% 0 0)`): Card backgrounds and structural panel surfaces.
* **Pinhole Border** (`#E1ECEB` / `oklch(93% 0.01 173)`): Thin, crisp outlines separating visual modules.
* **Teal Charcoal** (`#172A28` / `oklch(22% 0.02 173)`): The main high-contrast text color, replacing black. Extremely readable and soft on the eyes.
* **Teal Slate** (`#4E6562` / `oklch(45% 0.02 173)`): Supporting descriptions and labels.

### Named Rules
**The Surgical HUD Dark Containment Rule.** While the overall page is light theme, the simulated clinical fluoroscopy HUD in the hero section remains a deep dark medical monitor (`#0A1413`) to mirror real cath lab imaging monitors accurately.
**The Warm Contrast Rule.** Blinding white backgrounds are forbidden. Backdrops must always be tinted with our organic warm sand hues.

---

## 3. Typography

**Display Font:** `Outfit` (with system-ui sans-serif fallback)
**Body Font:** `Inter` (with system-ui sans-serif fallback)

### Spacing Craft (Topography)
1. **Hero Headings:** `-0.01em` (Tight spacing) – Creates a dense, confident clinical authority.
2. **Body Paragraphs:** `0.01em` (Barely open) – Ensures clinical information is highly legible.
3. **Action Labels:** `0.04em` (Open) – Emphasizes active buttons, metrics, and tags.
4. **Uppercase Tags:** `0.08em` (Wide spacing) – Clean, airy category markers.

---

## 4. Elevation

We use a flat elevation system where depth is created strictly by solid color shifts (warm sand to white surfaces) and 1px pinhole border outlines.

### Shadow Hierarchy
* **Resting State:** Flat cards sit directly on the `Warm Sand` background with a `1px` border outline. Zero shadow.
* **Hover State:** Cards lift slightly (`translateY(-2px)`) with a clean Clinical Teal border response.
* **Focus State:** Forms and inputs focus via high-contrast Teal Charcoal outline rings with a `4px` offset.

---

## 5. Components

### Navigation
* **Shape:** Soft rounded corners (8px / `rounded.sm`).
* **Design:** Flat Silk White container bordered by a 1px Pinhole Stroke. Links leverage the typography spacing rules.

### Buttons
* **Shape:** Soft rounded corners (8px / `rounded.sm`).
* **Primary (CTA):** Solid Terracotta Coral fill with warm sand text. On hover, it shifts slightly with a crisp outer border outline.
* **Secondary:** Solid Silk White fill with 1px border.

---

## 6. Do's and Don'ts

### Do:
* **Do** tint all dark texts toward Teal Charcoal to maintain brand cohesion.
* **Do** enforce a strict warm sand tint on the base body background to prevent visual glare.
* **Do** keep paragraph line lengths capped at 65ch for effortless reading.

### Don't:
* **Don't** use pure black (`#000000`) or blinding white (`#FFFFFF` on body backgrounds) under any circumstances.
* **Don't** use gradients, glowing ambient backdrops, or glass blurs.
* **Don't** let clinical overlays drop below the 4.5:1 contrast ratio.
