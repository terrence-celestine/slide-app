import type { ShapeElement } from "../../types/slide";

const ShapeElementComponent = ({element}: {element: ShapeElement}) => {
    
        if (element.shape === 'rectangle') {
            return (
                <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: element.shapeColor,
                    borderRadius: 4
                }} />
            )
        } else if (element.shape === 'circle') {
            return (
                <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: element.shapeColor,
                    borderRadius: '50%'
                }} />
            )
        } else if (element.shape === 'triangle') {
            return (
                <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    background: element.shapeColor,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                }} />
            )
        }
        return null
}

export default ShapeElementComponent;