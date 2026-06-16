import type { ImageElement } from "../../types/slide";

const ImageElementComponent = ({ element, onImageChange }: { 
    element: ImageElement
    onImageChange: (url: string) => void 
  }) => {
    if (!element.image) {
      return (
        <div style={{ width: '100%', height: '100%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, border: '1px dashed #d1d5db', borderRadius: 4 }}>
          <input
            type="text"
            placeholder="Enter image URL"
            onKeyDown={(e) => {
                e.stopPropagation()
              if (e.key === 'Enter') {
                onImageChange((e.target as HTMLInputElement).value)
              }
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 12, padding: '4px 8px', width: '80%', border: '1px solid #d1d5db', borderRadius: 4, color: "#000" }}
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