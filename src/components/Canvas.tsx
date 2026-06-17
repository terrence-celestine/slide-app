import { useSlideStore } from "../stores/slideStore";
import useContainerScale from "../hooks/useContainerScale";
import CanvasElement from "./CanvasElement";
import { useRef, useEffect, useState } from "react";
import SlideNotes from "./SlideNotes";

const Canvas = () => {
  const currentSlide = useSlideStore((state) => state.currentSlide);
  const slides = useSlideStore((state) => state.slides);
  const setSelectedElementId = useSlideStore((state) => state.setSelectedElementId)
  const transitionType = useSlideStore((state) => state.transitionType)
  const activeSlide = slides[currentSlide];
  const SLIDE_WIDTH = 960
  const SLIDE_HEIGHT = 540

  const { containerRef, scale } = useContainerScale(SLIDE_WIDTH, SLIDE_HEIGHT);
  const canvasRef = useRef<HTMLDivElement>(null)

  const [displaySlide, setDisplaySlide] = useState(activeSlide)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (!activeSlide) return
    if (transitionType === 'none' || true) {
      setDisplaySlide(activeSlide)
      return
    }
  }, [activeSlide]) // keep content in sync without animation
  
  useEffect(() => {
    if (!activeSlide) return
    if (transitionType === 'none') {
      setDisplaySlide(activeSlide)
      return
    }
    setAnimating(true)
    const timer = setTimeout(() => {
      setDisplaySlide(activeSlide)
      setAnimating(false)
    }, 150)
    return () => clearTimeout(timer)
  }, [currentSlide]) // only animate on slide change

  const animationClass = () => {
    if (transitionType === 'none') return ''
    if (transitionType === 'fade') return animating ? 'opacity-0' : 'opacity-100'
    if (transitionType === 'slide') return animating ? '-translate-x-4 opacity-0' : 'translate-x-0 opacity-100'
    return ''
  }

  if (!displaySlide) return <div className="flex-1 flex items-center justify-center">No slides</div>

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
            background: displaySlide.background
          }}
          className={`border-2 border-gray-300 transition-all duration-150 ${animationClass()}`}
        >
          {[...displaySlide.elements]
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((element) => (
              <CanvasElement key={element.id} element={element} canvasWidth={SLIDE_WIDTH} canvasHeight={SLIDE_HEIGHT} />
            ))}
        </div>
      </div>
      <SlideNotes />
    </div>
  )
}

export default Canvas;