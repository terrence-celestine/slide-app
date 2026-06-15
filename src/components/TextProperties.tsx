import { useSlideStore } from '../stores/slideStore'
import type { TextElement } from '../types/slide'

const TextProperties = ({ element }: { element: TextElement }) => {
  const updateElement = useSlideStore((state) => state.updateElement)
  const currentSlide = useSlideStore((state) => state.currentSlide)

  return (
    <div className="flex flex-col gap-3">
      {/* Font size */}
      <div>
        <label className="text-xs text-gray-500">Font Size</label>
        <input
          type="number"
          value={element.fontSize}
          onChange={(e) => updateElement(currentSlide, element.id, { 
            fontSize: Number(e.target.value) 
          })}
          className="w-full border rounded px-2 py-1 text-sm"
        />
      </div>

      {/* Font color */}
      <div>
        <label className="text-xs text-gray-500">Color</label>
        <input
          type="color"
          value={element.fontColor}
          onChange={(e) => updateElement(currentSlide, element.id, { 
            fontColor: e.target.value 
          })}
          className="w-full h-8 rounded cursor-pointer"
        />
      </div>

      {/* Bold */}
      <div>
        <label className="text-xs text-gray-500">Font Weight</label>
        <select
          value={element.fontWeight}
          onChange={(e) => updateElement(currentSlide, element.id, { 
            fontWeight: e.target.value 
          })}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </select>
      </div>

      {/* Font family */}
      <div>
        <label className="text-xs text-gray-500">Font</label>
        <select
          value={element.fontFamily}
          onChange={(e) => updateElement(currentSlide, element.id, { 
            fontFamily: e.target.value 
          })}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
    </div>
  )
}

export default TextProperties