# SlideSync

A fast, local-first slide editor built with React and Vite. Create, design, and present slides entirely in the browser — no account, no backend, no friction.

🔗 **[Live Demo](https://slide-odw1y116n-terrence-celestines-projects.vercel.app/)**

---

## Features

### Editor

- **3-panel layout** — slide panel, canvas, and properties panel
- **Slide management** — add, rename, duplicate, reorder, and delete slides
- **Drag-to-reorder** slides via drag and drop
- **Slide templates** — Blank, Title Slide, Two Column, Section Header
- **Slide transitions** — None, Fade, Slide

### Canvas

- **16:9 canvas** — scales dynamically to any viewport size
- **Drag & resize** elements freely with handles
- **Snap to grid** — toggle grid overlay with configurable grid size
- **Z-order controls** — bring forward, send backward, bring to front, send to back
- **Element locking** — lock elements to prevent accidental edits
- **Selection outline** — blue border on selected elements, hover indicator on hover
- **Arrow key nudging** — nudge elements 1% at a time, 5% with Shift

### Elements

- **Text** — font size, family, weight, style (normal/italic/oblique), color, alignment
- **Image** — file upload or URL input
- **Shape** — rectangle, circle, triangle with fill color picker

### Properties Panel

- Live formatting controls for selected element
- Position and size readout
- Opacity slider
- Layer controls
- Element locking
- Slide background color picker

### History & Shortcuts

- **Undo/Redo** — full history via Zustand temporal middleware
- **Keyboard shortcuts:**

| Key                    | Action                                |
| ---------------------- | ------------------------------------- |
| `Double click`         | Edit text element                     |
| `Enter`                | Enter text edit mode                  |
| `Delete` / `Backspace` | Delete selected element               |
| `Escape`               | Deselect element                      |
| `Ctrl+Z`               | Undo                                  |
| `Ctrl+Y`               | Redo                                  |
| `Arrow keys`           | Nudge element (1%) or navigate slides |
| `Shift+Arrow`          | Nudge element (5%)                    |

### Presentation Mode

- Fullscreen presentation via Fullscreen API
- Arrow key navigation between slides
- Slide counter
- Press `Escape` to exit

### Persistence & Export

- **Auto-save** to localStorage (debounced 1s)
- **Load from localStorage** on app start
- **Export as JSON** — save your presentation for later
- **Load from JSON** — restore a previously exported presentation
- **Export as PDF** — high quality canvas-based PDF export

### UI

- Clean light mode design
- SlideSync logo with lucide-react icons
- Right-click context menu on elements
- Live slide thumbnails in panel
- Speaker notes per slide
- Presentation name editing

---

## Tech Stack

| Layer         | Technology                    |
| ------------- | ----------------------------- |
| Framework     | React 18 + TypeScript         |
| Build tool    | Vite 5                        |
| Styling       | Tailwind CSS v4               |
| State         | Zustand 4 + zundo (undo/redo) |
| Drag & resize | react-rnd                     |
| Slide reorder | @dnd-kit                      |
| Icons         | lucide-react                  |
| PDF export    | jsPDF                         |
| Deployment    | Vercel                        |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/terrence-celestine/slidesync.git
cd slidesync

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── Canvas.tsx               # 16:9 slide workspace with transitions
│   ├── CanvasElement.tsx        # Drag/resize/select wrapper
│   ├── SlidePanel.tsx           # Left sidebar with live thumbnails
│   ├── SortableSlide.tsx        # Draggable slide thumbnail
│   ├── SlideThumbnail.tsx       # Mini slide preview renderer
│   ├── PropertiesPanel.tsx      # Right sidebar
│   ├── Toolbar.tsx              # Top bar with actions
│   ├── SlideNotes.tsx           # Speaker notes panel
│   ├── PresentationView.tsx     # Fullscreen presentation mode
│   ├── ContextMenu.tsx          # Right-click context menu
│   ├── TemplateModal.tsx        # Template picker modal
│   ├── ExportMenu.tsx           # Export dropdown (JSON / PDF)
│   ├── elements/
│   │   ├── TextElement.tsx
│   │   ├── ImageElement.tsx
│   │   └── ShapeElement.tsx
│   └── properties/
│       ├── ElementProperties.tsx
│       ├── TextProperties.tsx
│       ├── ShapeProperties.tsx
│       └── SlideProperties.tsx
├── store/
│   └── slideStore.ts            # Zustand store — all state + actions
├── types/
│   └── slide.ts                 # TypeScript types
├── hooks/
│   ├── useAutoSave.ts           # Debounced localStorage save
│   ├── useKeyboard.ts           # Global keyboard shortcuts
│   └── useContainerScale.ts     # Canvas scaling via ResizeObserver
└── utils/
    ├── factories.ts             # createSlide, createTextElement, etc.
    └── templates.ts             # Slide template definitions
```

---

## Roadmap

### v2 — Cloud & Collaboration

- [ ] Auth (Google sign-in)
- [ ] Cloud save via Supabase
- [ ] Presentations dashboard
- [ ] Share link (view only)
- [ ] Real-time collaboration

### v3 — Export & Integrations

- [ ] Export to PPTX
- [ ] Import from Google Slides
- [ ] Embed via iframe

---

## License

MIT
