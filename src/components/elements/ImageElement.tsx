import { useRef } from 'react'
import type { ImageElement } from '../../types/slide'

const ImageElementComponent = ({ element, onImageChange }: {
  element: ImageElement
  onImageChange: (url: string) => void
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      onImageChange(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  if (!element.image) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          onMouseDown={(e) => e.stopPropagation()}
          style={{ fontSize: 11, padding: '6px 12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Upload Image
        </button>

        <span style={{ fontSize: 10, color: '#a1a1aa' }}>or</span>

        {/* URL input */}
        <input
          type="text"
          placeholder="Paste image URL..."
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation()
            if (e.key === 'Enter') {
              onImageChange((e.target as HTMLInputElement).value)
            }
          }}
          style={{ fontSize: 11, padding: '4px 8px', width: '80%', border: '1px solid #e4e4e7', borderRadius: 4 }}
        />
      </div>
    )
  }

  return (
    <img
      src={element.image}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}

export default ImageElementComponent