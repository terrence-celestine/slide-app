type BaseElement = {
    id: string
    x: number
    y: number
    width: number
    height: number
    zIndex: number
    opacity: number
  }

type TextElement = BaseElement & {
    type: 'text';
    text: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: number | string;
    fontColor: string;
}
type ImageElement = BaseElement & {
    type: 'image';
    image: string;
}
type ShapeElement = BaseElement & {
    type: 'shape';
    shape: 'rectangle' | 'circle' | 'triangle';
    shapeColor: string;
}
type Slide = {
    id: string;
    elements: SlideElement[];
    background: string;
    name: string;
    notes?: string;
}
type Presentation = {
    id: string;
    title: string;
    slides: Slide[];
}
type SlideElement = TextElement | ImageElement | ShapeElement;

export type { Slide, Presentation, SlideElement, TextElement, ImageElement, ShapeElement };