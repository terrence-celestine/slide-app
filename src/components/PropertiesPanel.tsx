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
    <div className="w-64 bg-gray-100 overflow-y-auto p-4">
      {selectedElement ? (
        <ElementProperties element={selectedElement} />
      ) : (
        <SlideProperties slide={activeSlide} />
      )}
    </div>
  )
}

export default PropertiesPanel;