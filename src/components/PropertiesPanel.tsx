import { useSlideStore } from "../stores/slideStore"
import ElementProperties from "./ElementProperties"
import SlideProperties from "./SlideProperties"

const PropertiesPanel = () => {
  const selectedElementId = useSlideStore((state) => state.selectedElementId)
  const currentSlide = useSlideStore((state) => state.currentSlide)
  const slides = useSlideStore((state) => state.slides)
  
  const activeSlide = slides[currentSlide]
  const selectedElement = activeSlide?.elements.find(e => e.id === selectedElementId)

  return (
    <div className="w-64 bg-white border-l border-zinc-200 flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="px-3 py-2 border-b border-zinc-200">
        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
          {selectedElement ? selectedElement.type : 'Slide'}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 pr-4 flex flex-col gap-4">
        {selectedElement ? (
          <ElementProperties element={selectedElement} />
        ) : (
          <SlideProperties slide={activeSlide} />
        )}
      </div>
    </div>
  )
}

export default PropertiesPanel