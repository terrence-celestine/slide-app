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
  const snapToGrid = useSlideStore((state) => state.snapToGrid)
const gridSize = useSlideStore((state) => state.gridSize)
  const activeSlide = slides[currentSlide];
  const SLIDE_WIDTH = 960
  const SLIDE_HEIGHT = 540

  const { containerRef, scale } = useContainerScale(SLIDE_WIDTH, SLIDE_HEIGHT);
  const canvasRef = useRef<HTMLDivElement>(null)

  const [displaySlide, setDisplaySlide] = useState(activeSlide)
  const [animating, setAnimating] = useState(false)

  // single effect — handles both content sync and transitions
useEffect(() => {
  if (!activeSlide) return
  
  if (transitionType === 'none') {
    setDisplaySlide(activeSlide)
    return
  }

  // only animate when switching slides, not when content changes
  setAnimating(true)
  const timer = setTimeout(() => {
    setDisplaySlide(activeSlide)
    setAnimating(false)
  }, 150)
  return () => clearTimeout(timer)
}, [currentSlide]) // only fires on slide switch

// separate effect just for content updates (no animation)
useEffect(() => {
  if (!animating && activeSlide) {
    setDisplaySlide(activeSlide)
  }
}, [activeSlide, animating])

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
          className={`border-2 border-gray-300 transition-all duration-150 slide-canvas ${animationClass()}`}
        >
          {snapToGrid && (
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              <defs>
                <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                  <circle cx={gridSize / 2} cy={gridSize / 2} r={1} fill="#d1d5db" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          )}
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