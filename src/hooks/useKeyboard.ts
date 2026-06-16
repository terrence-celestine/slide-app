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

  const nextSlide = useSlideStore((state) => state.nextSlide)

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

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        previousSlide()
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        nextSlide()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedElementId, currentSlide, deleteElement, setSelectedElementId, undo, redo])
}

export default useKeyboard