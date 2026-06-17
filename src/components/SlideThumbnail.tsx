import type { Slide } from '../types/slide'
import TextElementComponent from './elements/TextElement'
import ImageElementComponent from './elements/ImageElement'
import ShapeElementComponent from './elements/ShapeElement'

const SLIDE_WIDTH = 960
const SLIDE_HEIGHT = 540
const THUMBNAIL_WIDTH = 160
const SCALE = THUMBNAIL_WIDTH / SLIDE_WIDTH

const SlideThumbnail = ({ slide }: { slide: Slide }) => {
  return (
    <div style={{ 
      width: THUMBNAIL_WIDTH, 
      height: THUMBNAIL_WIDTH * (9/16),
      overflow: 'hidden',
      position: 'relative',
      borderRadius: 4,
    }}>
      {/* Full size slide scaled down */}
      <div style={{
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        background: slide.background,
        transform: `scale(${SCALE})`,
        transformOrigin: 'top left',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}>
        {[...slide.elements]
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((element) => (
            <div
              key={element.id}
              style={{
                position: 'absolute',
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.width}%`,
                height: `${element.height}%`,
                opacity: element.opacity,
                zIndex: element.zIndex,
              }}
            >
              {element.type === 'text' && (
                <TextElementComponent
                  element={element}
                  isEditing={false}
                  onTextChange={() => {}}
                />
              )}
              {element.type === 'image' && (
                <ImageElementComponent
                  element={element}
                  onImageChange={() => {}}
                />
              )}
              {element.type === 'shape' && (
                <ShapeElementComponent element={element} />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default SlideThumbnail