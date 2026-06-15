import type { ImageElement } from "../../types/slide";

const ImageElementComponent = ({ element, onImageChange }: { 
    element: ImageElement
    onImageChange: (url: string) => void 
  }) => {
    if (!element.image) {
      return (
        <div style={{ width: '100%', height: '100%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 12, color: '#6b7280' }}>Enter image URL</p>
          <input
            type="text"
            placeholder="https://..."
            onKeyDown={(e) => {
                e.stopPropagation()
              if (e.key === 'Enter') {
                onImageChange((e.target as HTMLInputElement).value)
              }
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 12, padding: '4px 8px', width: '80%', border: '1px solid #d1d5db', borderRadius: 4 }}
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

  export default ImageElementComponent;