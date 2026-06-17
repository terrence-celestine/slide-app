import { useSlideStore } from '../stores/slideStore'
import { Copy, Trash2, BringToFront, SendToBack, MoveUp, MoveDown, Lock, LockOpen } from 'lucide-react'
import { useEffect, useRef } from 'react'

const ContextMenu = () => {
  const contextMenu = useSlideStore((state) => state.contextMenu)
  const setContextMenu = useSlideStore((state) => state.setContextMenu)
  const deleteElement = useSlideStore((state) => state.deleteElement)
  const duplicateElement = useSlideStore((state) => state.duplicateElement)
  const updateElementZIndex = useSlideStore((state) => state.updateElementZIndex)
  const currentSlide = useSlideStore((state) => state.currentSlide)
  const menuRef = useRef<HTMLDivElement>(null)
  const updateElement = useSlideStore((state) => state.updateElement)
const slides = useSlideStore((state) => state.slides)
const currentSlideIndex = useSlideStore((state) => state.currentSlide)

  // close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null)
      }
    }
    if (contextMenu) window.addEventListener('mousedown', handler)
    return () => window.removeEventListener('mousedown', handler)
  }, [contextMenu])

  if (!contextMenu) return null

  const { x, y, elementId } = contextMenu

  
  const activeSlide = slides[currentSlideIndex]
  const element = activeSlide?.elements.find(el => el.id === elementId)

  const action = (fn: () => void) => {
    fn()
    setContextMenu(null)
  }

  return (
    <div
      ref={menuRef}
      style={{ position: 'fixed', top: y, left: x, zIndex: 9999 }}
      className="bg-white border border-zinc-200 rounded-lg shadow-lg py-1 w-48 animate-in"
    >
      {/* Duplicate */}
      <button
        onClick={() => action(() => duplicateElement(currentSlide, elementId))}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50 w-full text-left cursor-pointer"
      >
        <Copy size={12} />
        Duplicate
      </button>

      <div className="border-t border-zinc-100 my-1" />

      {/* Layer controls */}
      {[
        { label: 'Bring Forward', icon: <MoveUp size={12} />, action: 'forward' },
        { label: 'Send Backward', icon: <MoveDown size={12} />, action: 'backward' },
        { label: 'Bring to Front', icon: <BringToFront size={12} />, action: 'front' },
        { label: 'Send to Back', icon: <SendToBack size={12} />, action: 'back' },
      ].map(({ label, icon, action: direction }) => (
        <button
          key={label}
          onClick={() => action(() => updateElementZIndex(currentSlide, elementId, direction as 'forward' | 'backward' | 'front' | 'back'))}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50 w-full text-left cursor-pointer"
        >
          {icon}
          {label}
        </button>
      ))}

      <div className="border-t border-zinc-100 my-1" />

      {/* Delete */}
      <button
        onClick={() => action(() => deleteElement(currentSlide, elementId))}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 w-full text-left cursor-pointer"
      >
        <Trash2 size={12} />
        Delete
      </button>
      <button
        onClick={() => action(() => updateElement(currentSlide, elementId, { locked: !element?.locked }))}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50 w-full text-left cursor-pointer"
        >
        {element?.locked ? <LockOpen size={12} /> : <Lock size={12} />}
        {element?.locked ? 'Unlock' : 'Lock'}
        </button>
    </div>
  )
}

export default ContextMenu