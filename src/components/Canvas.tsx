import { useSlideStore } from "../stores/slideStore";
import useContainerScale from "../hooks/useContainerScale";
import CanvasElement from "./CanvasElement";
import { useRef } from "react";
import SlideNotes from "./SlideNotes";

const Canvas = () => {
  const currentSlide = useSlideStore((state) => state.currentSlide);
  const slides = useSlideStore((state) => state.slides);
  const setSelectedElementId = useSlideStore((state) => state.setSelectedElementId)
  const activeSlide = slides[currentSlide];
  const SLIDE_WIDTH = 960
  const SLIDE_HEIGHT = 540

  const { containerRef, scale } = useContainerScale(SLIDE_WIDTH, SLIDE_HEIGHT);

  const canvasRef = useRef<HTMLDivElement>(null)

  if (!activeSlide) return <div className="flex-1 flex items-center justify-center">No slides</div>

    return (
      <div className="flex flex-col flex-1">
      <div ref={containerRef} className="flex-1 flex items-center justify-center bg-zinc-100" onClick={() => setSelectedElementId(null)}>
        <div 
        ref={canvasRef}
        style={{
          position: 'relative',
                  width: SLIDE_WIDTH,
                  height: SLIDE_HEIGHT,
                  transform: `scale(${scale})`,
                  transformOrigin: 'center center',
                  background: activeSlide.background
                }} className="border-2 border-gray-300">
                {[...activeSlide.elements].sort((a, b) => a.zIndex - b.zIndex).map((element) => (
                  <CanvasElement key={element.id} element={element} canvasWidth={SLIDE_WIDTH} canvasHeight={SLIDE_HEIGHT} />
                ))}
          </div>
      </div>
      <SlideNotes />
      </div>
    )
  }

export default Canvas;