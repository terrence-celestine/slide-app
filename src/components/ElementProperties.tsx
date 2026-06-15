import { useSlideStore } from "../stores/slideStore";
import type { SlideElement } from "../types/slide"
import ShapeProperties from "./ShapeProperties";
import TextProperties from "./TextProperties";

const ElementProperties = ({ element }: { element: SlideElement }) => {
    const updateElementZIndex = useSlideStore((state) => state.updateElementZIndex)
    const deleteElement = useSlideStore((state) => state.deleteElement)
    const currentSlide = useSlideStore((state) => state.currentSlide)
    return (
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-sm">Element</h2>
        <p className="text-xs text-gray-500 capitalize">{element.type}</p>
        {element.type === 'text' && <TextProperties element={element} />}
        {element.type === 'shape' && <ShapeProperties element={element} />}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Z-Order</label>
          <div className="flex gap-2">
            <button onClick={() => updateElementZIndex(currentSlide, element.id, 'forward')}
              className="text-xs bg-gray-200 px-2 py-1 rounded">
              Forward
            </button>
            <button onClick={() => updateElementZIndex(currentSlide, element.id, 'backward')}
              className="text-xs bg-gray-200 px-2 py-1 rounded">
              Backward
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => updateElementZIndex(currentSlide, element.id, 'front')}
              className="text-xs bg-gray-200 px-2 py-1 rounded">
              Front
            </button>
            <button onClick={() => updateElementZIndex(currentSlide, element.id, 'back')}
              className="text-xs bg-gray-200 px-2 py-1 rounded">
              Back
            </button>
          </div>
          <button onClick={() => deleteElement(currentSlide, element.id)}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    )
  }

  export default ElementProperties;