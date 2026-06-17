import type { SlideElement } from "../types/slide";
import TextElementComponent from "./elements/TextElement";
import ImageElementComponent from "./elements/ImageElement";
import ShapeElementComponent from "./elements/ShapeElement";
import { Rnd } from "react-rnd";
import { useSlideStore } from "../stores/slideStore";

const CanvasElement = ({element, canvasWidth, canvasHeight, readonly = false}: {element: SlideElement, canvasWidth: number, canvasHeight: number, readonly?: boolean}) => {
    const updateElement = useSlideStore((state) => state.updateElement);
    const activeSlideId = useSlideStore((state) => state.currentSlide);
    const setSelectedElementId = useSlideStore((state) => state.setSelectedElementId)
    const selectedElementId = useSlideStore((state) => state.selectedElementId)  
    const editingElementId = useSlideStore((state) => state.editingElementId)
    const setEditingElementId = useSlideStore((state) => state.setEditingElementId)
    const isEditing = editingElementId === element.id
    const setContextMenu = useSlideStore((state) => state.setContextMenu)

    return (
        <Rnd
        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault()
            e.stopPropagation()
            setContextMenu({ x: e.clientX, y: e.clientY, elementId: element.id })
            setSelectedElementId(element.id)
        }}
        style={{ height: "100%", overflow: "hidden", opacity: element.opacity }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            setSelectedElementId(element.id)
        }}
        disableDragging={isEditing || readonly}
        enableResizing={readonly ? false : undefined }
        onDoubleClick={() => setEditingElementId(element.id)}
        onResizeStop={(_e, _direction, ref, _delta, position) => {
            updateElement(activeSlideId, element.id, {
              x: (position.x / canvasWidth) * 100,
              y: (position.y / canvasHeight) * 100,
              width: (ref.offsetWidth / canvasWidth) * 100,
              height: (ref.offsetHeight / canvasHeight) * 100,
            })
          }}
        position={{
          x: (element.x / 100) * canvasWidth,
          y: (element.y / 100) * canvasHeight,
        }}
        size={{
          width: (element.width / 100) * canvasWidth,
          height: (element.height / 100) * canvasHeight,
        }}
        onDragStop={(_, data) => {
          updateElement(activeSlideId, element.id, {
            x: (data.x / canvasWidth) * 100,
            y: (data.y / canvasHeight) * 100,
          })
        }}
        bounds="parent"
      >
        <div style={{ width: '100%', height: '100%' }}
              className={`border-2 rounded-md ${
                selectedElementId === element.id 
                  ? 'border-blue-500' 
                  : 'border-transparent hover:border-blue-300'
              }`}
            >
            {element.type === 'text' && <TextElementComponent element={element} isEditing={isEditing} onTextChange={(text) => { updateElement(activeSlideId, element.id, { text }); setEditingElementId(null);}}/>}
            {element.type === 'image' && <ImageElementComponent element={element} onImageChange={(url) => updateElement(activeSlideId, element.id, { image: url })} />}
            {element.type === 'shape' && <ShapeElementComponent element={element} />}
        </div>
        </Rnd>
    )
}

export default CanvasElement;