import { createTextElement } from './factories'
import type { Slide } from '../types/slide'

export type Template = {
  id: string
  name: string
  thumbnail: string // background color for preview
  create: () => Partial<Slide>
}

export const templates: Template[] = [
    {
      id: 'blank',
      name: 'Blank',
      thumbnail: '#ffffff',
      create: () => ({
        background: '#ffffff',
        elements: []
      })
    },
    {
      id: 'title',
      name: 'Title Slide',
      thumbnail: '#1e3a5f',
      create: () => ({
        background: '#1e3a5f',
        elements: [
          { ...createTextElement(), x: 10, y: 30, width: 80, height: 15, text: 'Presentation Title', fontSize: 48, fontWeight: 'bold', fontColor: '#ffffff', textAlign: 'center' as const },
          { ...createTextElement(), x: 20, y: 52, width: 60, height: 10, text: 'Your subtitle here', fontSize: 24, fontColor: '#93c5fd', textAlign: 'center' as const },
        ]
      })
    },
    {
      id: 'two-column',
      name: 'Two Column',
      thumbnail: '#f8fafc',
      create: () => ({
        background: '#f8fafc',
        elements: [
          { ...createTextElement(), x: 5, y: 5, width: 90, height: 15, text: 'Section Title', fontSize: 36, fontWeight: 'bold', fontColor: '#1e293b', textAlign: 'left' as const },
          { ...createTextElement(), x: 5, y: 25, width: 43, height: 60, text: 'Left column content', fontSize: 18, fontColor: '#475569', textAlign: 'left' as const },
          { ...createTextElement(), x: 52, y: 25, width: 43, height: 60, text: 'Right column content', fontSize: 18, fontColor: '#475569', textAlign: 'left' as const },
        ]
      })
    },
    {
      id: 'section-header',
      name: 'Section Header',
      thumbnail: '#7c3aed',
      create: () => ({
        background: '#7c3aed',
        elements: [
          { ...createTextElement(), x: 10, y: 38, width: 80, height: 15, text: 'Section Title', fontSize: 48, fontWeight: 'bold', fontColor: '#ffffff', textAlign: 'center' as const },
        ]
      })
    },
  ]