import { SortableContext } from "@dnd-kit/sortable";
import { useSlideStore } from "../stores/slideStore";
import { createSlide } from "../utils/factories";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import SortableSlide from "./SortableSlide";
import { arrayMove } from '@dnd-kit/sortable'

const SlidePanel = () => {
  const slides = useSlideStore(state => state.slides);
  const addSlide = useSlideStore((state) => state.addSlide);
  const reorderSlides = useSlideStore((state) => state.reorderSlides);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = slides.findIndex(s => s.id === active.id)
    const newIndex = slides.findIndex(s => s.id === over.id)
    // then update the store with the reordered array
    const newSlides = arrayMove(slides, oldIndex, newIndex)
    reorderSlides(newSlides)
  }
  
    return (
      <div className="w-48 bg-gray-100 overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">
          <h2 className="text-lg font-bold text-slate-800">Slides</h2>
          <button onClick={() => addSlide(createSlide())} className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer">add slide</button>
          <div className="flex flex-col gap-2">
            <DndContext onDragEnd={handleDragEnd}>
              <SortableContext items={slides.map((slide) => slide.id)}>
                {slides.map((slide, index) => (
                  <SortableSlide key={slide.id} slide={slide} index={index} />
                ))}
            </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    );
  }

export default SlidePanel;