import { useSlideStore } from "../stores/slideStore"
import type { Slide } from "../types/slide"

const label = "text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 block"

const SlideProperties = ({ slide }: { slide: Slide }) => {
  const updateSlideBackground = useSlideStore((state) => state.updateSlideBackground)
  const currentSlide = useSlideStore((state) => state.currentSlide)

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Background</p>
      <div>
        <label className={label}>Color</label>
        <div className="flex items-center gap-2">
          <input type="color" value={slide?.background}
            onChange={(e) => updateSlideBackground(currentSlide, e.target.value)}
            className="w-8 h-8 rounded border border-zinc-200 cursor-pointer p-0.5" />
          <span className="text-xs text-zinc-500 font-mono">{slide?.background}</span>
        </div>
      </div>
    </div>
  )
}

export default SlideProperties