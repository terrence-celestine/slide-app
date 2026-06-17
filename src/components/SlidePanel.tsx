import { Plus } from "lucide-react"
import { useSlideStore } from "../stores/slideStore"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableSlide from "./SortableSlide"
import TemplateModal from "./TemplateModal"
import { useState } from "react"

const SlidePanel = () => {
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const slides = useSlideStore(state => state.slides)
  const reorderSlides = useSlideStore((state) => state.reorderSlides)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = slides.findIndex(s => s.id === active.id)
    const newIndex = slides.findIndex(s => s.id === over.id)
    reorderSlides(arrayMove(slides, oldIndex, newIndex))
  }

  return (
    <div className="w-44 bg-white border-r border-zinc-200 flex flex-col h-full shrink-0">
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200">
        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Slides</span>
        <button
         onClick={() => setShowTemplateModal(true)}
          className="p-1 rounded hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
          title="Add slide"
        >
          <Plus size={13} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-2 flex flex-col gap-1.5">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={slides.map(s => s.id)} strategy={verticalListSortingStrategy}>
            {slides.map((slide, index) => (
              <SortableSlide key={slide.id} slide={slide} index={index} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      {showTemplateModal && <TemplateModal onClose={() => setShowTemplateModal(false)} />}
    </div>
  )
}

export default SlidePanel