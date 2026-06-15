import { useEffect } from 'react'
import { useSlideStore } from '../stores/slideStore'

const useAutoSave = () => {
  const slides = useSlideStore((state) => state.slides)

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('slideforge_slides', JSON.stringify(slides))
    }, 1000)

    return () => clearTimeout(timer)
  }, [slides])
}

export default useAutoSave