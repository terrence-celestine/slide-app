import { nanoid } from "nanoid"
import type { ImageElement, ShapeElement, Slide, TextElement } from "../types/slide"

const randomOffset = () => Math.floor(Math.random() * 10)

const createSlide = (): Slide => {
    return {
        id: nanoid(),
        elements: [],
        background: '#FFFFFF',
        name: 'Untitled Slide'
    }
}

const createTextElement = (): TextElement => {
    return {
        id: nanoid(),
        x: 25 + randomOffset(),
        y: 25 + randomOffset(),
        width: 30,
        height: 10,
        zIndex: 0,
        opacity: 1,
        type: 'text',
        text: 'Hello, world!',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontColor: '#000000',
        textAlign: 'left',
        fontStyle: 'normal',
        locked: false
    }
}

const createImageElement = (): ImageElement => {
    return {
        id: nanoid(),
        x: 25 + randomOffset(),
        y: 25 + randomOffset(),
        width: 40,
        height: 40,
        zIndex: 0,
        opacity: 1,
        type: 'image',
        image: '',
        locked: false
    }
}

const createShapeElement = (): ShapeElement => {
    return {
        id: nanoid(),
        x: 25 + randomOffset(),
        y: 25 + randomOffset(),
        width: 20,
        height: 20,
        zIndex: 0,
        opacity: 1,
        type: 'shape',
        shape: 'rectangle',
        shapeColor: '#000000',
        locked: false
    }
}

export { createSlide, createTextElement, createImageElement, createShapeElement };