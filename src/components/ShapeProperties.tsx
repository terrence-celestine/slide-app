import { useSlideStore } from '../stores/slideStore'
import type { ShapeElement } from '../types/slide'

const ShapeProperties = ({ element }: { element: ShapeElement }) => {
  const updateElement = useSlideStore((state) => state.updateElement)
  const currentSlide = useSlideStore((state) => state.currentSlide)

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="text-xs text-gray-500">Shape</label>
        <select
          value={element.shape}
          onChange={(e) => updateElement(currentSlide, element.id, {
            shape: e.target.value as 'rectangle' | 'circle' | 'triangle'
          })}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>
      <div>
        <label className="text-xs text-gray-500">Color</label>
        <input
          type="color"
          value={element.shapeColor}
          onChange={(e) => updateElement(currentSlide, element.id, {
            shapeColor: e.target.value
          })}
          className="w-full h-8 rounded cursor-pointer"
        />
      </div>
    </div>
  )
}

export default ShapeProperties