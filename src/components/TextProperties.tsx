import { useSlideStore } from '../stores/slideStore'
import type { TextElement } from '../types/slide'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

const label = "text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 block"
const input = "w-full bg-white border border-zinc-200 rounded px-2 py-1.5 text-xs text-zinc-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"

const TextProperties = ({ element }: { element: TextElement }) => {
  const updateElement = useSlideStore((state) => state.updateElement)
  const currentSlide = useSlideStore((state) => state.currentSlide)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Typography</p>

      <div>
        <label className={label}>Font Size</label>
        <input type="number" value={element.fontSize}
          onChange={(e) => updateElement(currentSlide, element.id, { fontSize: Number(e.target.value) })}
          className={input} />
      </div>

      <div>
        <label className={label}>Font Family</label>
        <select value={element.fontFamily}
          onChange={(e) => updateElement(currentSlide, element.id, { fontFamily: e.target.value })}
          className={input}>
          <option value="Inter">Inter</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      <div>
  <label className={label}>Font Style</label>
  <div className="flex gap-1">
    {[
      { label: 'Normal', value: 'normal' },
      { label: <em>Italic</em>, value: 'italic' },
      { label: <span style={{ fontStyle: 'oblique' }}>Oblique</span>, value: 'oblique' },
    ].map(({ label, value }) => (
      <button
        key={value}
        onClick={() => updateElement(currentSlide, element.id, { fontStyle: value as 'normal' | 'italic' | 'oblique' })}
        className={`flex-1 flex items-center justify-center py-1.5 rounded border text-xs cursor-pointer transition-colors ${
          element.fontStyle === value
            ? 'bg-blue-50 border-blue-400 text-blue-600'
            : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
</div>
      <div>
        <label className={label}>Font Weight</label>
        <select value={element.fontWeight}
          onChange={(e) => updateElement(currentSlide, element.id, { fontWeight: e.target.value })}
          className={input}>
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </select>
      </div>

      <div>
        <label className={label}>Color</label>
        <div className="flex items-center gap-2">
          <input type="color" value={element.fontColor}
            onChange={(e) => updateElement(currentSlide, element.id, { fontColor: e.target.value })}
            className="w-8 h-8 rounded border border-zinc-200 cursor-pointer p-0.5" />
          <span className="text-xs text-zinc-500 font-mono">{element.fontColor}</span>
        </div>
      </div>
      <div>
  <label className={label}>Alignment</label>
  <div className="flex gap-1">
    {[
      { icon: <AlignLeft size={13} />, value: 'left' },
      { icon: <AlignCenter size={13} />, value: 'center' },
      { icon: <AlignRight size={13} />, value: 'right' },
    ].map(({ icon, value }) => (
      <button
        key={value}
        onClick={() => updateElement(currentSlide, element.id, { textAlign: value as 'left' | 'center' | 'right' })}
        className={`flex-1 flex items-center justify-center py-1.5 rounded border text-xs transition-colors cursor-pointer
          ${element.textAlign === value
            ? 'bg-blue-50 border-blue-400 text-blue-600'
            : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50'
          }`}
      >
        {icon}
      </button>
    ))}
  </div>
</div>
    </div>
  )
}

export default TextProperties