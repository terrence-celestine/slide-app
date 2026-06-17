import { useEffect } from 'react'
import { useStore } from 'zustand'
import { useSlideStore } from '../stores/slideStore'

const useKeyboard = () => {
  const deleteElement = useSlideStore((state) => state.deleteElement)
  const selectedElementId = useSlideStore((state) => state.selectedElementId)
  const setSelectedElementId = useSlideStore((state) => state.setSelectedElementId)
  const currentSlide = useSlideStore((state) => state.currentSlide)
  const { undo, redo } = useStore(useSlideStore.temporal)
  const previousSlide = useSlideStore((state) => state.previousSlide)
  const updateElement = useSlideStore((state) => state.updateElement)
  const nextSlide = useSlideStore((state) => state.nextSlide)
  const slides = useSlideStore((state) => state.slides)
  const setEditingElementId = useSlideStore((state) => state.setEditingElementId)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      // don't fire shortcuts while typing
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return

      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        deleteElement(currentSlide, selectedElementId)
      }

      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        undo()
      }

      if (e.key === 'y' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        redo()
      }

      if (e.key === 'Escape') {
        setSelectedElementId(null)
      }

      if (e.key === 'Enter' && selectedElementId) {
        const activeSlide = slides[currentSlide]
        const el = activeSlide?.elements.find(el => el.id === selectedElementId)
        if (el?.type === 'text') {
          e.preventDefault()
          setEditingElementId(selectedElementId)
        }
      }
      
      // if element selected — nudge it, otherwise navigate slides
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
        if (selectedElementId) {
          const activeSlide = slides[currentSlide]
          const currentElement = activeSlide?.elements.find(el => el.id === selectedElementId)
          if (!currentElement) return
          const nudge = e.shiftKey ? 5 : 1
          if (e.key === 'ArrowLeft') updateElement(currentSlide, selectedElementId, { x: Math.max(0, currentElement.x - nudge) })
          if (e.key === 'ArrowRight') updateElement(currentSlide, selectedElementId, { x: Math.min(100, currentElement.x + nudge) })
          if (e.key === 'ArrowUp') updateElement(currentSlide, selectedElementId, { y: Math.max(0, currentElement.y - nudge) })
          if (e.key === 'ArrowDown') updateElement(currentSlide, selectedElementId, { y: Math.min(100, currentElement.y + nudge) })
        } else {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') previousSlide()
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide()
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedElementId, currentSlide, slides, deleteElement, setSelectedElementId, updateElement, undo, redo])
}

export default useKeyboard