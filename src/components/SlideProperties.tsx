import { useSlideStore } from "../stores/slideStore";
import type { Slide } from "../types/slide";

const SlideProperties = ({ slide }: { slide: Slide }) => {
    const updateSlideBackground = useSlideStore((state) => state.updateSlideBackground)
    const currentSlide = useSlideStore((state) => state.currentSlide)
    return (
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-sm">Slide</h2>
        <div>
          <label className="text-xs text-gray-500">Background</label>
          <p className="text-sm">{slide?.background}</p>
        <input
          type="color"
          value={slide?.background}
          onChange={(e) => updateSlideBackground(currentSlide, e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        />
        </div>
      </div>
    )
  }

  export default SlideProperties;