import { useSlideStore } from "../stores/slideStore"
import type { SlideElement } from "../types/slide"
import TextProperties from "./TextProperties"
import ShapeProperties from "./ShapeProperties"
import { Trash2, BringToFront, SendToBack, MoveUp, MoveDown, Copy, Lock } from "lucide-react"

const ElementProperties = ({ element }: { element: SlideElement }) => {
  const updateElementZIndex = useSlideStore((state) => state.updateElementZIndex)
  const deleteElement = useSlideStore((state) => state.deleteElement)
  const currentSlide = useSlideStore((state) => state.currentSlide)
  const duplicateElement = useSlideStore((state) => state.duplicateElement)
  const updateElement = useSlideStore((state) => state.updateElement)
  
  return (
    <div className="flex flex-col gap-4">

      {/* Type-specific properties */}
      {element.type === 'text' && <TextProperties element={element} />}
      {element.type === 'shape' && <ShapeProperties element={element} />}

      {/* Position & Size — read only for now */}
      <div>
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Position</p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: 'X', value: element.x.toFixed(1) + '%' },
            { label: 'Y', value: element.y.toFixed(1) + '%' },
            { label: 'W', value: element.width.toFixed(1) + '%' },
            { label: 'H', value: element.height.toFixed(1) + '%' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-zinc-50 border border-zinc-200 rounded px-2 py-1">
              <p className="text-[9px] text-zinc-400 uppercase">{label}</p>
              <p className="text-xs text-zinc-700 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Z-Order */}
      <div>
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Layer</p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: 'Forward', icon: <MoveUp size={12} />, action: 'forward' },
            { label: 'Backward', icon: <MoveDown size={12} />, action: 'backward' },
            { label: 'Front', icon: <BringToFront size={12} />, action: 'front' },
            { label: 'Back', icon: <SendToBack size={12} />, action: 'back' },
          ].map(({ label, icon, action }) => (
            <button
              key={label}
              onClick={() => updateElementZIndex(currentSlide, element.id, action as 'forward' | 'backward' | 'front' | 'back')}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 text-xs transition-colors cursor-pointer"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Opacity — {Math.round(element.opacity * 100)}%</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={element.opacity}
          onChange={(e) => updateElement(currentSlide, element.id, { opacity: Number(e.target.value) })}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>
      <button
        onClick={() => duplicateElement(currentSlide, element.id)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50 text-xs transition-colors cursor-pointer w-full justify-center"
      >
        <Copy size={12} />
        Duplicate element
      </button>
      {/* Delete */}
      <div className="pt-1 border-t border-zinc-100">
        <button
          onClick={() => deleteElement(currentSlide, element.id)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-red-200 text-red-500 hover:bg-red-50 text-xs transition-colors cursor-pointer w-full justify-center"
        >
          <Trash2 size={12} />
          Delete element
        </button>
        <button
          onClick={() => updateElement(currentSlide, element.id, { locked: !element.locked })}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50 text-xs transition-colors cursor-pointer w-full justify-center"
        >
          <Lock size={12} />
          {element.locked ? 'Unlock element' : 'Lock element'}
        </button>
      </div>
    </div>
  )
}

export default ElementProperties