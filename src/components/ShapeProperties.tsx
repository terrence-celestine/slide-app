import { useSlideStore } from '../stores/slideStore'
import type { ShapeElement } from '../types/slide'

const label = "text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 block"
const input = "w-full bg-white border border-zinc-200 rounded px-2 py-1.5 text-xs text-zinc-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"

const ShapeProperties = ({ element }: { element: ShapeElement }) => {
  const updateElement = useSlideStore((state) => state.updateElement)
  const currentSlide = useSlideStore((state) => state.currentSlide)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Shape</p>

      <div>
        <label className={label}>Type</label>
        <select value={element.shape}
          onChange={(e) => updateElement(currentSlide, element.id, { shape: e.target.value as 'rectangle' | 'circle' | 'triangle' })}
          className={input}>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>

      <div>
        <label className={label}>Fill Color</label>
        <div className="flex items-center gap-2">
          <input type="color" value={element.shapeColor}
            onChange={(e) => updateElement(currentSlide, element.id, { shapeColor: e.target.value })}
            className="w-8 h-8 rounded border border-zinc-200 cursor-pointer p-0.5" />
          <span className="text-xs text-zinc-500 font-mono">{element.shapeColor}</span>
        </div>
      </div>
    </div>
  )
}

export default ShapeProperties