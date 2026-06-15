import { useStore } from "zustand";
import { useSlideStore } from "../stores/slideStore";
import { createTextElement, createImageElement, createShapeElement } from "../utils/factories";

const Toolbar = () => {
    const addElement = useSlideStore((state) => state.addElement)
    const currentSlide = useSlideStore((state) => state.currentSlide)
    const undo = useStore(useSlideStore.temporal).undo;
    const redo = useStore(useSlideStore.temporal).redo;
    const slides = useSlideStore((state) => state.slides)

    const exportJSON = () => {
      const json = JSON.stringify(slides, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'presentation.json'
      a.click()
      URL.revokeObjectURL(url)
    }

    return (
      <div className="h-12 bg-white border-b flex items-center px-4">
       <button onClick={() => addElement(currentSlide, createTextElement())} style={{ cursor: 'pointer' }}>
        Add Text
      </button>
      <button onClick={() => addElement(currentSlide, createImageElement())} style={{ cursor: 'pointer' }}>
        Add Image
      </button>
      <button onClick={() => addElement(currentSlide, createShapeElement())} style={{ cursor: 'pointer' }}>
        Add Shape
      </button>
      <button onClick={() => undo()} style={{ cursor: 'pointer' }}>
        Undo
      </button>
      <button onClick={() => redo()} style={{ cursor: 'pointer' }}>
        Redo
      </button>
      <button onClick={exportJSON}>
        Export JSON
      </button>
      </div>
    )
  }

export default Toolbar;