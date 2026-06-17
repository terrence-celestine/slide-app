import { useStore } from "zustand";
import { useSlideStore } from "../stores/slideStore";
import { createTextElement, createImageElement, createShapeElement } from "../utils/factories";
import { Type, Image, Shapes, Undo2, Redo2, MonitorPlay, Play } from "lucide-react";
import { useRef } from "react"
import { Upload } from "lucide-react"
import ExportMenu from "./ExportMenu";

const Toolbar = () => {
    const addElement = useSlideStore((state) => state.addElement)
    const currentSlide = useSlideStore((state) => state.currentSlide)
    const undo = useStore(useSlideStore.temporal).undo;
    const redo = useStore(useSlideStore.temporal).redo;
    const slides = useSlideStore((state) => state.slides)
    const loadPresentation = useSlideStore((state) => state.loadPresentation)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const presentationName = useSlideStore((state) => state.presentationName)
    const setPresentationName = useSlideStore((state) => state.setPresentationName)
    const setPresentationMode = useSlideStore((state) => state.setPresentationMode)
    const transitionType = useSlideStore((state) => state.transitionType)
    const setTransitionType = useSlideStore((state) => state.setTransitionType)

    const loadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const slides = JSON.parse(event.target?.result as string)
          loadPresentation(slides)
        } catch (err) {
          console.error('Invalid JSON file', err)
        }
      }
      reader.readAsText(file)
      // reset input so the same file can be loaded again
      e.target.value = ''
    }


  const handlePresentationMode = () => {
    setPresentationMode(true)
  }

    return (
      <div className="h-11 bg-white border-b border-zinc-200 flex items-center px-3 gap-2 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-1.5 pr-3 border-r border-zinc-200">
          <div className="bg-blue-600 p-1 rounded">
            <MonitorPlay size={13} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-zinc-800 tracking-tight">
            Slide<span className="text-blue-600">Sync</span>
          </span>
        </div>

        {/* Insert tools */}
        <div className="flex items-center gap-0.5">
          {[
            { icon: <Type size={14} />, label: 'Text', action: () => addElement(currentSlide, createTextElement()) },
            { icon: <Image size={14} />, label: 'Image', action: () => addElement(currentSlide, createImageElement()) },
            { icon: <Shapes size={14} />, label: 'Shape', action: () => addElement(currentSlide, createShapeElement()) },
          ].map(({ icon, label, action }) => (
            <button
              key={label}
              onClick={action}
              title={label}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer text-xs"
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-zinc-200 mx-1" />

        {/* History */}
        <div className="flex items-center gap-0.5">
          <button onClick={() => undo()} title="Undo"
            className="p-1.5 rounded text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer">
            <Undo2 size={14} />
          </button>
          <button onClick={() => redo()} title="Redo"
            className="p-1.5 rounded text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer">
            <Redo2 size={14} />
          </button>
          <div className="w-px h-5 bg-zinc-200 mx-1" />

          <select
            value={transitionType}
            onChange={(e) => setTransitionType(e.target.value as 'none' | 'fade' | 'slide')}
            className="text-xs border border-zinc-200 rounded px-2 py-1 text-zinc-600 focus:outline-none cursor-pointer"
          >
            <option value="none">No transition</option>
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
          </select>

          <input
            type="text"
            value={presentationName}
            onChange={(e) => setPresentationName(e.target.value)}
            className="text-xs text-zinc-700 font-medium bg-transparent border border-transparent hover:border-zinc-200 focus:border-blue-400 focus:outline-none rounded px-2 py-1 w-48 transition-colors"
            placeholder="Untitled Presentation"
          />
        </div>
        <div className="ml-auto">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={loadJSON}
          className="hidden"
        />
        <div className="flex items-center gap-1.5">
        <button onClick={handlePresentationMode} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors cursor-pointer">
          <Play size={13} />
          Presentation Mode
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-xs font-medium transition-colors cursor-pointer"
        >
          <Upload size={13} />
          Load
        </button>
        <ExportMenu />
          </div>
        </div>
      </div>
    )
}

export default Toolbar;