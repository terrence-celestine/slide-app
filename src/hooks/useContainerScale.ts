import { useEffect, useRef, useState } from "react"

const useContainerScale = (slideWidth: number, slideHeight: number) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)
  
    useEffect(() => {
      const observer = new ResizeObserver(entries => {
        const { width, height } = entries[0].contentRect
        const scaleX = width / slideWidth
        const scaleY = height / slideHeight
        setScale(Math.min(scaleX, scaleY) * 0.9)
      })
  
      if (containerRef.current) observer.observe(containerRef.current)
      return () => observer.disconnect()
    }, [slideWidth, slideHeight])
  
    return { containerRef, scale }
  }

  export default useContainerScale;