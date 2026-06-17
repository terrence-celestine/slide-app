import { templates } from '../utils/templates'
import { useSlideStore } from '../stores/slideStore'
import { nanoid } from 'nanoid'
import { X } from 'lucide-react'

const TemplateModal = ({ onClose }: { onClose: () => void }) => {
  const addSlide = useSlideStore((state) => state.addSlide)

  const handleSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (!template) return
    const slideData = template.create()
    addSlide({
      id: nanoid(),
      name: template.name,
      background: slideData.background ?? '#ffffff',
      elements: slideData.elements ?? [],
      notes: ''
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[560px] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-800">Choose a template</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-zinc-100 text-zinc-400 cursor-pointer">
            <X size={14} />
          </button>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-3 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleSelect(template.id)}
              className="flex flex-col gap-2 p-2 rounded-lg border border-zinc-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer text-left group"
            >
              {/* Preview */}
              <div
                className="aspect-video w-full rounded"
                style={{ background: template.thumbnail }}
              />
              <span className="text-xs text-zinc-600 group-hover:text-blue-600 font-medium px-1">
                {template.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TemplateModal