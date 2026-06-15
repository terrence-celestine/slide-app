import { useSlideStore } from "../stores/slideStore";
import type { Slide } from "../types/slide";
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SortableSlide = ({slide, index}: {slide: Slide, index: number}) => {
    const currentSlide = useSlideStore((state) => state.currentSlide);
    const setCurrentSlide = useSlideStore((state) => state.setCurrentSlide);
    const removeSlide = useSlideStore((state) => state.removeSlide);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: slide.id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} key={slide.id} className={`flex items-center flex-col gap-2 border-b-2 border-slate-200 py-8`}>
                    <div 
                    {...listeners}
                      className={`aspect-video w-full ${index === currentSlide ? 'border-2 border-blue-500 border-radius-md cursor-pointer rounded-md' : 'hover:cursor-pointer'}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                    <span className="text-sm text-slate-800">
                      Slide {index + 1}
                    </span>
                    <button onClick={() => removeSlide(index)} className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer">
                      Delete Slide
                    </button>
        </div>
    )
}

export default SortableSlide;