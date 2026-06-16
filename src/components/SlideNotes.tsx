import { useSlideStore } from "../stores/slideStore"
import { NotebookPen } from "lucide-react"

const SlideNotes = () => {
    const updateSlideNotes = useSlideStore((state) => state.updateSlideNotes)
    const currentSlide = useSlideStore((state) => state.currentSlide)
    const notes = useSlideStore((state) => state.slides[currentSlide]?.notes ?? '')

    return (
        <div className="bg-white border-t border-zinc-200 flex flex-col" style={{ height: '160px' }}>
            {/* Header */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-zinc-100 shrink-0">
                <NotebookPen size={11} className="text-zinc-400" />
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                    Speaker Notes
                </span>
                {notes.length > 0 && (
                    <span className="ml-auto text-[9px] text-zinc-900">
                        {notes.length} chars
                    </span>
                )}
            </div>

            {/* Textarea */}
            <textarea
                value={notes}
                onChange={(e) => updateSlideNotes(currentSlide, e.target.value)}
                className="flex-1 w-full px-3 py-2 resize-none outline-none text-xs text-zinc-600 leading-relaxed placeholder:text-zinc-300 bg-white"
                placeholder="Add speaker notes for this slide..."
            />
        </div>
    )
}

export default SlideNotes