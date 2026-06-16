import type { SlideElement } from "../types/slide";
import TextElementComponent from "./elements/TextElement";
import ImageElementComponent from "./elements/ImageElement";
import ShapeElementComponent from "./elements/ShapeElement";
import { Rnd } from "react-rnd";
import { useSlideStore } from "../stores/slideStore";
import { useState } from "react";

const CanvasElement = ({element, canvasWidth, canvasHeight}: {element: SlideElement, canvasWidth: number, canvasHeight: number}) => {
    const updateElement = useSlideStore((state) => state.updateElement);
    const activeSlideId = useSlideStore((state) => state.currentSlide);
    const [isEditing, setIsEditing] = useState(false);
    const [_, setIsSelected] = useState(false);
    const setSelectedElementId = useSlideStore((state) => state.setSelectedElementId)

    return (
        <Rnd
        style={{ height: "100%", overflow: "hidden" }}
        onClick={() => {
            setIsSelected(true)
            setSelectedElementId(element.id)
        }}
        onDoubleClick={() => setIsEditing(true)}
        disableDragging={isEditing}
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
        <div style={{ width: '100%', height: '100%' }}>
            {element.type === 'text' && <TextElementComponent element={element} isEditing={isEditing} onTextChange={(text) => {updateElement(activeSlideId, element.id, { text }); setIsEditing(false)}} />}
            {element.type === 'image' && <ImageElementComponent element={element} onImageChange={(url) => updateElement(activeSlideId, element.id, { image: url })} />}
            {element.type === 'shape' && <ShapeElementComponent element={element} />}
            </div>
        </Rnd>
    )
}

export default CanvasElement;