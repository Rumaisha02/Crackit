---
name: "neo-brutalism-design-system"
description: "Neo-Brutalist design system guidelines for building Career Tracker React components"
---
# DESIGN.md - Career Tracker UI/UX Design System & Specification

> **Design Theme:** Neo-Brutalism  
> **Target Architecture:** React.js + Bootstrap/Custom CSS + Context API  
> **Target Platform:** Desktop & Mobile (Responsive Full-stack Web Application)

---

## 1. Design System Overview & Neo-Brutalist Foundations

Neo-Brutalism is a high-contrast, playful, and functional visual style characterized by solid, unsoftened borders, vibrant solid fill colors, hard drop shadows (no blur), distinct typography, and exposed grid layouts. 

### Core Design Rules
* **High Contrast Borders:** Solid, 2px to 4px black borders (`#000000` / `#0F172A`) on almost all structural elements (cards, inputs, buttons, containers).
* **Hard/Offset Shadows:** Drop shadows are non-blurred, sharp block shadows offset by `3px` to `6px` (`box-shadow: 4px 4px 0px #000000`).
* **Vibrant Accent Palette:** A mixture of crisp pastel grounds with striking high-saturation functional accents (Electric Yellow, Coral Red, Mint Green, Cyber Blue).
* **Zero Soft Gradients:** Avoid smooth CSS multi-color gradients. Use solid colors or harsh 45° stripe patterns if textured background accents are needed.
* **Sharp/Minimal Border Radius:** Keep border-radius strictly predictable — either sharp square corners (`0px`) or slightly rounded uniform corners (`4px` / `8px`).

---

## 2. Color Palette & Typography Guidelines

### Color Tokens

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `--bg-canvas` | `#FFFDF7` | Main Application Light Background (Off-white / Cream) |
| `--border-dark` | `#000000` | Primary outline & text color across all cards & components |
| `--surface-white` | `#FFFFFF` | Background for input fields, main content blocks, table rows |
| `--primary-yellow`| `#FFE600` | Primary action buttons, key highlighted badges |
| `--accent-pink` | `#FF6B8B` | Secondary highlights, rejected status, key alert badges |
| `--accent-blue` | `#38BDF8` | Informational cards, active navigation, link hovers |
| `--accent-green` | `#4ADE80` | Success badges, "Selected" job status, completed items |
| `--accent-purple` | `#C084FC` | Interview preparation cards, specialized tag chips |
| `--shadow-color` | `#000000` | Fixed shadow color for all offset shadows |

### Typography Architecture
* **Primary Sans Font:** `Space Grotesk`, `Plus Jakarta Sans`, or system stack `system-ui, -apple-system, BlinkMacSystemFont`.
* **Monospace Font (Data/Code/Dates):** `Space Mono`, `Fira Code`, or `Courier New`.

```css
/* Core Typography Scales */
--fs-h1: 2rem (32px) / Bold 800
--fs-h2: 1.5rem (24px) / Bold 700
--fs-h3: 1.25rem (20px) / Semi-Bold 700
--fs-body: 1rem (16px) / Medium 500
--fs-small: 0.875rem (14px) / Medium 500
--fs-mono: 0.85rem (13.6px) / Monospace Regular
```
/* Dark Mode Tokens — add alongside existing :root block */
[data-theme="dark"] {
  --bg-canvas: #121218;
  --surface-white: #1E1E26;
  --border-dark: #020202;       /* structural borders: cards, inputs, containers */
  --border-badge: #000000;      /* badges keep black border in both modes */
  --shadow-color: #F5F5F0;      /* hard shadows flip to light so they're visible */
  --text-primary: #F5F5F0;

  /* Accent colors stay the same — vibrant neon reads great on dark */
  --primary-yellow: #f8eb74;
  --accent-pink: #ff8da5;
  --accent-blue: #a8def5;
  --accent-green: #b8f5ce;
  --accent-purple: #cfb1ec;
}
---

## 3. Global Styling & Neo-Brutalist CSS Utility Library

Include these base utilities in your root `src/index.css` or `src/App.css` to ensure universal consistency across all React components.

```css
/* Base CSS Variables & Resets */
:root {
  --bg-canvas: #FFFDF7;
  --border-dark: #000000;
  --surface-white: #FFFFFF;
  --primary-yellow: #FFE600;
  --accent-pink: #FF6B8B;
  --accent-blue: #38BDF8;
  --accent-green: #4ADE80;
  --accent-purple: #C084FC;
  --shadow-color: #000000;
  
  --border-width: 3px;
  --shadow-offset: 4px;
  --radius-standard: 6px;
}

body {
  background-color: var(--bg-canvas);
  color: var(--border-dark);
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

/* Neo-Brutalist Box Utilities */
.nb-card {
  background-color: var(--surface-white);
  border: var(--border-width) solid var(--border-dark);
  border-radius: var(--radius-standard);
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0px var(--shadow-color);
  padding: 1.25rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.nb-card-hover:hover {
  transform: translate(-2px, -2px);
  box-shadow: calc(var(--shadow-offset) + 2px) calc(var(--shadow-offset) + 2px) 0px var(--shadow-color);
}

/* Neo-Brutalist Buttons */
.nb-btn {
  font-weight: 700;
  border: var(--border-width) solid var(--border-dark);
  border-radius: var(--radius-standard);
  padding: 0.6rem 1.25rem;
  box-shadow: 3px 3px 0px var(--shadow-color);
  cursor: pointer;
  transition: all 0.1s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
}

.nb-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px var(--shadow-color);
}

.nb-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px var(--shadow-color);
}

.nb-btn-primary { background-color: var(--primary-yellow); color: var(--border-dark); }
.nb-btn-secondary { background-color: var(--accent-blue); color: var(--border-dark); }
.nb-btn-danger { background-color: var(--accent-pink); color: var(--border-dark); }
.nb-btn-success { background-color: var(--accent-green); color: var(--border-dark); }

/* Neo-Brutalist Form Inputs */
.nb-input, .nb-select, .nb-textarea {
  width: 100%;
  border: var(--border-width) solid var(--border-dark);
  border-radius: var(--radius-standard);
  padding: 0.65rem 0.85rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: var(--surface-white);
  box-shadow: 2px 2px 0px var(--shadow-color);
  outline: none;
}

.nb-input:focus, .nb-select:focus, .nb-textarea:focus {
  background-color: #FFFFEE;
  box-shadow: 4px 4px 0px var(--shadow-color);
}

/* Badges & Pills */
.nb-badge {
  display: inline-block;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border: 2px solid var(--border-dark);
  border-radius: 4px;
  box-shadow: 1px 1px 0px var(--border-dark);
}
```

---

## 4. Layout Architecture & Navigational Wireframe

```
+-----------------------------------------------------------------------------------+
|  [NAVBAR] ⚡ CAREER TRACKER                    [Search...]   [User Profile Dropdown] |
+-----------------+-----------------------------------------------------------------+
| [SIDEBAR]       | [MAIN CONTENT AREA]                                             |
|                 |                                                                 |
| 📊 Dashboard    |   +---------------------------------------------------------+   |
| 💡 Skills       |   | Header Banner: "Welcome back, Developer! 🚀"            |   |
| 💻 Projects     |   +---------------------------------------------------------+   |
| 💼 Job Tracker  |                                                                 |
| 🎓 Internships  |   [ Stat Card 1 ] [ Stat Card 2 ] [ Stat Card 3 ] [ Stat Card 4 ] |
| 📝 Interview    |   (Yellow)        (Blue)          (Green)         (Purple)      |
| 📄 Resume       |                                                                 |
|                 |   +--------------------------+ +----------------------------+   |
|                 |   | Quick Actions & Tracker  | | Recent Application Table   |   |
| ⚙️ Settings     |   | Progress                 | |                            |   |
| 🚪 Logout       |   +--------------------------+ +----------------------------+   |
+-----------------+-----------------------------------------------------------------+
```

---

## 5. Screen-by-Screen UI Components Specification

### 5.1. Authentication Pages (Login & Register)
* **Layout:** Centered split container or single elevated brutalist modal box (`max-width: 450px`).
* **Visual Elements:**
  * Clean bold header: `CAREER TRACKER ⚡` in `nb-badge` style.
  * Inputs with thick black outlines and offset focus states.
  * High-visibility CTA button (`nb-btn-primary`) spanning full width.
  * Context error alert: High-contrast red/pink box with black border (`--accent-pink`).

---

### 5.2. Overview Dashboard
* **Metrics Banner Cards:**
  1. **Total Skills:** `--primary-yellow` fill, large bold number + progress badge.
  2. **Active Projects:** `--accent-blue` fill, total count + live link indicator.
  3. **Job Applications:** `--accent-green` fill, breakdown by status pill.
  4. **Interview Prep:** `--accent-purple` fill, completed topic percentage bar.
* **Progress Bar Component:**
  ```html
  <div class="nb-progress-container" style="border: 3px solid #000; background: #fff; height: 24px; border-radius: 6px;">
    <div class="nb-progress-bar" style="width: 65%; background: var(--accent-green); height: 100%; border-right: 3px solid #000;"></div>
  </div>
  ```

---

### 5.3. Skills Management Module
* **View Structure:** Grid of Skill Cards (`minmax(220px, 1fr)`).
* **Skill Card Details:**
  * Skill Name (Bold H3)
  * Level Pill:
    * `Beginner`: `--accent-blue`
    * `Intermediate`: `--primary-yellow`
    * `Advanced`: `--accent-green`
  * Action Buttons: Minimal icon buttons (Edit, Delete) with standard 2px black border.
* **Add Skill Modal:** Popup box elevated with `box-shadow: 8px 8px 0px #000`.

---

### 5.4. Projects Tracker Module
* **View Structure:** 2-Column Responsive Card Grid.
* **Project Card Layout:**
  * Title & Status Tag (e.g., `In Progress` / `Completed`).
  * Description block with clean line clamp.
  * Tech Stack Chips: Inline tags with solid background fills and thin borders.
  * Link Group: GitHub & Live Demo styled as mini action buttons (`nb-btn-secondary`).

---

### 5.5. Job & Internship Application Trackers
* **View Structure:** Switchable Layout (Table View & Kanban Kanban Board View).
* **Status Badges Styling:**
  * `Applied`: Blue background (`--accent-blue`)
  * `Interview`: Yellow background (`--primary-yellow`)
  * `Selected`: Green background (`--accent-green`)
  * `Rejected`: Pink/Red background (`--accent-pink`)
* **Interactive Table Structure:**
  * `<thead>`: Solid black background (`#000000`) with white bold text (`#FFFFFF`).
  * `<tbody>`: White rows with `border-bottom: 2px solid #000`. Hover state triggers background shift to `#FFFFEE`.

---

### 5.6. Interview Preparation & Resume Section
* **Interview Topics Accordion/Cards:** Accordion item header with thick border and toggling arrow. Question text highlighted in bold with hidden/expandable answer box.
* **Resume Detail Cards:** Multi-section layout (Education, Experience, Key Summary) using structured brutalist section cards with custom section tag headers.

---

## 6. Frontend Code Integration Guidelines for AI Agent

When instructing your AI Agent to build frontend components, prompt it to apply these classes and structure rules:

1. **Never use default rounded bootstrap components or soft shadows (`shadow-sm`, `shadow-lg`).**
2. Override default Bootstrap styling by attaching custom Neo-Brutalist CSS classes (`nb-card`, `nb-btn`, `nb-input`).
3. Maintain distinct active and hover states across all interactive elements (`transform: translate(-2px, -2px)` on hover).
4. For notifications/toasts: Use hard-bordered toast containers with `--primary-yellow` or `--accent-green` backgrounds.
5. All modals must have a backdrop with `background: rgba(0,0,0,0.6)` and explicit thick black borders.

---

## 7. Component Map & React File Structure Mapping

```
frontend/src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Header with title & profile pill
│   │   ├── Sidebar.jsx         # Vertical navigation with active tab styling
│   │   └── Layout.jsx          # Main container wrapper
│   ├── ui/
│   │   ├── StatCard.jsx        # Neo-brutalist metric widget
│   │   ├── ProgressBar.jsx     # Solid progress bar component
│   │   ├── StatusBadge.jsx     # Hard-bordered status indicator
│   │   ├── Modal.jsx           # Elevated popup wrapper
│   │   └── Table.jsx           # High-contrast data table
│   ├── skills/
│   │   └── SkillCard.jsx
│   ├── projects/
│   │   └── ProjectCard.jsx
│   └── jobs/
│       └── JobRow.jsx
```
