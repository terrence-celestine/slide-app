import { useEffect } from 'react'
import { useSlideStore } from '../stores/slideStore'
import CanvasElement from './CanvasElement'

const SLIDE_WIDTH = 960
const SLIDE_HEIGHT = 540

const PresentationView = () => {
  const slides = useSlideStore((state) => state.slides)
  const currentSlide = useSlideStore((state) => state.currentSlide)
  const nextSlide = useSlideStore((state) => state.nextSlide)
  const previousSlide = useSlideStore((state) => state.previousSlide)
  const setPresentationMode = useSlideStore((state) => state.setPresentationMode)

  const activeSlide = slides[currentSlide]

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') previousSlide()
      if (e.key === 'Escape') {
        document.exitFullscreen()
        setPresentationMode(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Slide */}
      <div className="relative" style={{
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        background: activeSlide.background,
        transform: `scale(${window.innerWidth / SLIDE_WIDTH * 0.9})`,
        transformOrigin: 'center center'
      }}>
        {activeSlide.elements
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              canvasWidth={SLIDE_WIDTH}
              canvasHeight={SLIDE_HEIGHT}
              readonly={true}
            />
          ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 text-xs">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Exit hint */}
      <div className="absolute bottom-4 right-4 text-slate-400 text-xs">
        Press Esc to exit
      </div>
    </div>
  )
}

export default PresentationView