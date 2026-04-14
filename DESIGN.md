# CrowdSense Design System

## Typography
- **Headline Font:** SPACE_GROTESK
- **Body Font:** MANROPE
- **Label Font:** MANROPE

## Color Palette (Dark Mode)
- **Background:** `#0a0e14`
- **Surface:** `#0a0e14` (Container High: `#1b2028`, Highest: `#20262f`)
- **Primary:** `#81ecff` (Container: `#00e3fd`)
- **Secondary:** `#2ff801` (Container: `#106e00`)
- **Tertiary:** `#ff7350` (Container: `#fc3c00`)
- **Error:** `#ff716c`
- **Custom System Color:** `#00E5FF`

---

# Design System Strategy: The Kinetic Pulse

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **"The Kinetic Pulse."** 

In a high-energy stadium environment, users are distracted, moving, and often under harsh lighting. This design system rejects the "static document" feel of traditional apps in favor of a living, breathing interface that mimics the stadium's own energy. We achieve a premium, technical aesthetic by balancing **deep cinematic immersion** (dark mode by default) with **precision-engineered data.** 

The layout breaks the "standard grid" through **intentional asymmetry**: large, technical display type is offset against compact, functional data clusters. We use overlapping translucent layers to create a sense of physical space—as if the interface is a heads-up display (HUD) floating between the user and the pitch.

---

## 2. Color Architecture
Our palette is designed for maximum "pop" against the `surface` (`#0a0e14`). We prioritize luminous, neon-inspired accents that function as light sources within a dark environment.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning content. To define boundaries, you must use background shifts. 
*   *Example:* Place a `surface-container-high` card atop a `surface` background. The shift in tonal depth is the divider.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested glass panels. 
*   **Base:** `surface` (`#0a0e14`) – The stadium floor.
*   **Sub-sections:** `surface-container-low` – Subtle grouping.
*   **Primary Interaction Cards:** `surface-container-highest` – The "closest" layer to the user.
*   **The "Glass & Gradient" Rule:** Main CTAs and high-priority data visualizations must utilize a linear gradient from `primary` (`#81ecff`) to `primary-container` (`#00e3fd`) at a 135-degree angle. This adds a "lithographic glow" that flat fills lack.

---

## 3. Typography: Technical Authority
We pair **Space Grotesk** (Display/Headlines) with **Manrope** (Body/Labels) to balance futuristic character with extreme legibility.

*   **Display (Space Grotesk):** Set with tight letter-spacing (-0.02em). Use `display-lg` for environmental stats (e.g., "SECTION 204") to create an editorial, high-impact feel.
*   **Body (Manrope):** Set with generous line-height (1.5) to ensure readability while walking. Use `body-lg` for critical instructions.
*   **The Signature Scale:** Use `label-md` in all-caps with 0.1em letter-spacing for "Technical Metadata" (e.g., timestamps, gate numbers). This evokes a "blueprint" or "command center" aesthetic.

---

## 4. Elevation & Depth
In this design system, light is the primary architect. We move away from traditional shadows toward **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` module nested inside a `surface-container-high` section creates an "etched" look, signifying a data input area.
*   **Ambient Glows:** Floating elements (like FABs or Tooltips) do not use black shadows. They use an `on-surface` tint (4-8% opacity) with a 40px blur to mimic light reflecting off a dark surface.
*   **Glassmorphism:** For overlays, use `surface-variant` at 60% opacity with a `backdrop-filter: blur(20px)`. This keeps the stadium's "energy" visible behind the UI while maintaining text contrast.
*   **The Ghost Border:** If accessibility requires a stroke, use `outline-variant` at 15% opacity. It should feel like a suggestion of an edge, not a hard cage.

---

## 5. Components

### Buttons & CTAs
*   **Primary:** Solid `primary` gradient with `on-primary` text. No border. `xl` roundedness (`0.75rem`).
*   **Status Buttons:** Use `secondary` (`#2ff801`) for "Go/Available" and `tertiary` (`#ff7350`) for "Congested/Warning."
*   **Interaction:** On tap, the button should "pulse"—a brief expansion of a 20% opacity glow.

### Data Visualization (The Pulse)
*   **Congestion Gauges:** Use `secondary_dim` for low traffic, transitioning to `tertiary` for moderate, and `error` (`#ff716c`) for high congestion.
*   **Glow Indicators:** Use a 4px circular `secondary` dot with a 12px `secondary_container` outer glow to represent "Live" status.

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Execution:** Use `0.75rem` vertical spacing (from the `xl` roundedness logic) and color-blocking. A "Gate Information" card should be a single `surface-container-highest` block; internal rows are separated by a 4px gap and a `surface-container-low` background shift.

### The Stadium Map Component (Custom)
*   The map should be monochromatic (`surface-variant`) with "Points of Interest" rendered as high-contrast `primary` glowing nodes. This ensures the data is the hero, not the map tiles.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Large Tap Targets:** Ensure all interactive elements are at least 48x48dp for outdoor mobile use.
*   **Prioritize Contrast:** Ensure `on-surface` text on `surface` backgrounds meets WCAG AAA standards for stadium visibility.
*   **Embrace Negative Space:** Use wide margins (24px+) to let the "Technical Display" breathe.

### Don’t:
*   **Don't use "Default" Shadows:** Never use high-opacity, small-radius shadows; they look "cheap" and dated.
*   **Don't use 100% White:** Use `on-background` (`#f1f3fc`) for text. It’s softer on the eyes in dark environments while maintaining high visibility.
*   **Don't use Divider Lines:** If you feel the need to draw a line, use a background color shift instead.

---

## 7. Signature Tokens Reference

| Token | Value | Role |
| :--- | :--- | :--- |
| **Surface Base** | `#0a0e14` | The primary background canvas. |
| **Active Glow** | `#81ecff` | Primary interaction and data focus. |
| **Safety/Available**| `#2ff801` | "Clear" status and success states. |
| **Alert/Congested** | `#ff716c` | Critical warnings and heavy traffic. |
| **Radius-LG** | `0.5rem` | Standard for all data containers. |
| **Radius-XL** | `0.75rem`| Standard for primary interaction buttons. |
