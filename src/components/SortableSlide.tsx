import { Copy, Trash2 } from "lucide-react"
import { useSlideStore } from "../stores/slideStore"
import type { Slide } from "../types/slide"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from "react"
import SlideThumbnail from "./SlideThumbnail"

const SortableSlide = ({ slide, index }: { slide: Slide, index: number }) => {
  const currentSlide = useSlideStore((state) => state.currentSlide)
  const setCurrentSlide = useSlideStore((state) => state.setCurrentSlide)
  const removeSlide = useSlideStore((state) => state.removeSlide)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: slide.id })
  const [editing, setEditing] = useState(false)
  const isActive = index === currentSlide
  const updateSlide = useSlideStore((state) => state.updateSlide)
  const duplicateSlide = useSlideStore((state) => state.duplicateSlide)

  const handleUpdateSlideName = (index: number, name: string) => {
    if (name.trim() === '') {
      alert('Slide name cannot be empty')
      return
    }
    updateSlide(index, { ...slide, name })
    setEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition}}
      onClick={() => {
        setCurrentSlide(index)
      }}
      className={`group relative rounded-md cursor-pointer transition-all ${
        isActive
          ? 'ring-2 ring-blue-500 shadow-sm'
          : 'ring-1 ring-zinc-200 hover:ring-zinc-300 hover:shadow-sm'
      }`}
    >
      {/* Thumbnail */}
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
      <SlideThumbnail slide={slide} />
      </div>

      {/* Footer */}
      <div onClick={() => setCurrentSlide(index)} className={`flex items-center px-1.5 py-1 rounded-b-md ${isActive ? 'bg-blue-50' : 'bg-zinc-50'}`}>
        {editing ? (
          <input
            autoFocus
            defaultValue={slide.name}
            onBlur={(e) => {
              handleUpdateSlideName(index, e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
              e.stopPropagation()
            }}
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] w-full bg-white border border-blue-400 rounded px-1 outline-none text-zinc-800"
          />
        ) : (
          <span
            onDoubleClick={(e) => { e.stopPropagation(); setEditing(true) }}
            className={`text-[10px] font-medium truncate ${isActive ? 'text-blue-600' : 'text-zinc-400'}`}
          >
            {slide.name}
          </span>
        )}
      </div>

      {/* Delete on hover */}
      <button
        onClick={(e) => { e.stopPropagation(); removeSlide(index) }}
        className="absolute top-1 right-1 p-0.5 rounded bg-white/80 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-red-500 cursor-pointer"
      >
        <Trash2 size={10} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); duplicateSlide(index) }}
        className="absolute top-1 left-1 p-0.5 rounded bg-white/80 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-blue-500 cursor-pointer"
      >
        <Copy size={10} />
      </button>
    </div>
  )
}

export default SortableSlide