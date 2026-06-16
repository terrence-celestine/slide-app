# SlideSync

A fast, local-first slide editor built with React and Vite. Create, design, and present slides entirely in the browser — no account, no backend, no friction.

![SlideSync](https://slide-odw1y116n-terrence-celestines-projects.vercel.app/)

## Features

- **Slide editor** — create, rename, reorder, and delete slides with a drag-and-drop panel
- **Canvas elements** — add text, images, and shapes to a 16:9 canvas
- **Drag & resize** — move and resize elements freely with handles
- **Text editing** — double-click any text element to edit in place
- **Formatting controls** — font size, family, weight, color, and shape fill via a properties panel
- **Z-order controls** — bring elements forward, send them back, or jump to front/back
- **Undo/redo** — full history with Ctrl+Z / Ctrl+Y
- **Keyboard shortcuts** — Delete to remove, Escape to deselect, arrow keys to navigate
- **Auto-save** — presentations save to localStorage automatically
- **Export/Import** — save your presentation as JSON and load it back anytime
- **Presentation mode** — fullscreen view with arrow key navigation and a slide counter
- **Speaker notes** — add per-slide notes visible in the editor

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
| Deployment    | Vercel                        |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/slidesync.git
cd slidesync

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Keyboard Shortcuts

| Key                    | Action                              |
| ---------------------- | ----------------------------------- |
| `Double click`         | Edit text element                   |
| `Delete` / `Backspace` | Delete selected element             |
| `Escape`               | Deselect element                    |
| `Ctrl+Z`               | Undo                                |
| `Ctrl+Y`               | Redo                                |
| `Arrow keys`           | Navigate slides (presentation mode) |

## Project Structure

```
src/
├── components/
│   ├── editor/
│   │   ├── Canvas.tsx           # 16:9 slide workspace
│   │   ├── CanvasElement.tsx    # Drag/resize wrapper for elements
│   │   ├── SlidePanel.tsx       # Left sidebar slide thumbnails
│   │   ├── PropertiesPanel.tsx  # Right sidebar element/slide props
│   │   ├── Toolbar.tsx          # Top bar with actions
│   │   ├── SlideNotes.tsx       # Speaker notes panel
│   │   └── PresentationView.tsx # Fullscreen presentation mode
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
    └── factories.ts             # createSlide, createTextElement, etc.
```

## Roadmap

### v2 — Polish

- [ ] Live slide thumbnails
- [ ] Right-click context menu
- [ ] Snap to grid / alignment guides
- [ ] Multi-select elements
- [ ] Text alignment controls
- [ ] Image file upload
- [ ] Duplicate slide

### v3 — Cloud

- [ ] Auth (Google sign-in)
- [ ] Cloud save via Supabase
- [ ] Presentations dashboard
- [ ] Share link (view only)
- [ ] Real-time collaboration

### v4 — Export

- [ ] Export to PDF
- [ ] Export to PPTX

## License

MIT
