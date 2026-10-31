# Taskflow

A minimalist task and workflow manager built with Vue 3 and Tailwind CSS v4.

## Quick Start

```bash
npm install
npm run dev
```

> **Instant Preview:** Double-click `index-standalone.html` to open and test the app directly in your browser with zero install.

## Features

- **Board & List Views:** Switch between a 3-column Kanban board (with drag-and-drop) and a clean list view.
- **Task Management:** Create, edit, and delete tasks with priority tags (Low, Med, High) and due dates.
- **Search & Filter:** Find tasks instantly by title or priority.
- **Dark Mode:** Light and dark theme toggle (saved to local storage).
- **Persistent:** All data is saved automatically in `localStorage`.

## Project Structure

```
├── index-standalone.html      # Instant 1-click preview (no install needed)
├── index.html                 # Vite HTML entry
├── package.json               # Dependencies
├── vite.config.js             # Vite + Tailwind v4 config
└── src/
    ├── main.js                # App entry point
    ├── App.vue                # Main layout and theme handler
    ├── style.css              # Tailwind v4 import & dark mode setup
    ├── stores/
    │   └── taskStore.js       # Pinia store for tasks, filters & localStorage
    └── components/
        ├── Navbar.vue         # Header, search, view toggle & add button
        ├── KanbanBoard.vue    # 3-column drag-and-drop board
        ├── ListView.vue       # List view alternative
        └── TaskModal.vue      # Create & edit task dialog
```

## Tech Stack

- **Vue 3** (`<script setup>` + Composition API)
- **Pinia** (State management)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Vite** (Build tool)

## License

MIT
