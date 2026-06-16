import { useEffect, useRef } from "react";
import type { TextElement } from "../../types/slide";

const TextElementComponent = ({element, isEditing, onTextChange}: {element: TextElement, isEditing: boolean, onTextChange: (text: string) => void}) => {
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isEditing && divRef.current) {
            divRef.current.focus()
        }
    }, [isEditing])
    
    return (
        <div
  contentEditable={isEditing}
  suppressContentEditableWarning
  style={{
    fontSize: `${element.fontSize}px`,
    color: element.fontColor,
    fontFamily: element.fontFamily,
    fontWeight: element.fontWeight,
    width: '100%',
    height: '100%',
    cursor: isEditing ? 'text' : 'default'
  }}
  ref={divRef}
  onBlur={(e) => onTextChange(e.currentTarget.innerText)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        divRef.current?.blur()
    }
  }}
>
        {element.text}
</div>
    )
}

export default TextElementComponent;