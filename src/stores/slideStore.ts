import { create } from 'zustand';
import type { Slide, SlideElement } from '../types/slide';
import { createSlide } from '../utils/factories';
import { temporal } from 'zundo'
import { nanoid } from 'nanoid';

type SlideStore = {
    slides: Slide[];
    currentSlide: number;
    addSlide: (slide: Slide) => void;
    removeSlide: (index: number) => void;
    updateSlide: (index: number, slide: Slide) => void;
    setCurrentSlide: (index: number) => void;
    nextSlide: () => void;
    previousSlide: () => void;
    reset: () => void;
    reorderSlides: (newSlides: Slide[]) => void;
    updateElement: (slideIndex: number, elementId: string, patch: Partial<SlideElement>) => void;
    addElement: (slideIndex: number, element: SlideElement) => void;
    selectedElementId: string | null;
    setSelectedElementId: (elementId: string | null) => void;
    updateSlideBackground: (slideIndex: number, background: string) => void;
    deleteElement: (slideIndex: number, elementId: string) => void;
    updateElementZIndex: (slideIndex: number, elementId: string, direction: 'forward' | 'backward' | 'front' | 'back') => void;
    loadFromLocalStorage: () => void;
    loadPresentation: (slides: Slide[]) => void;
    presentationName: string
    setPresentationName: (name: string) => void;
    updateSlideNotes: (slideIndex: number, notes: string) => void;
    presentationMode: boolean;
    setPresentationMode: (mode: boolean) => void;
    duplicateSlide: (slideIndex: number) => void;
    duplicateElement: (slideIndex: number, elementId: string) => void;
    editingElementId: string | null;
    setEditingElementId: (id: string | null) => void;
    contextMenu: { x: number; y: number; elementId: string } | null
    setContextMenu: (menu: { x: number; y: number; elementId: string } | null) => void
    transitionType: 'none' | 'fade' | 'slide'
    setTransitionType: (type: 'none' | 'fade' | 'slide') => void
    snapToGrid: boolean
    gridSize: number
    setSnapToGrid: (v: boolean) => void
    setGridSize: (size: number) => void
}

export const useSlideStore = create(temporal<SlideStore>((set) => ({
    slides: [createSlide()],
    currentSlide:0,
    addSlide: (slide: Slide) => set((state) => ({ slides: [...state.slides, slide]})),
    removeSlide: (index: number) => set((state) => {
      if (state.slides.length <= 1) return state;
      if (index >= 0 && index < state.slides.length) {
        const slides = state.slides.filter((_, i) => i !== index)
        const currentSlide = index >= slides.length ? slides.length - 1 : index
        return { slides, currentSlide }
      }
      return state;
    }),
    updateSlide: (index: number, slide: Slide) => set((state) => {
        if (index >= 0 && index < state.slides.length) {
            return { slides: state.slides.map((s, i) => i === index ? slide : s)}
        }
        return state;
    }),
    setCurrentSlide: (index: number) => set({ currentSlide: index}),
    nextSlide: () => set((state) => {
        if (state.currentSlide >= state.slides.length - 1) return state;
        return { currentSlide: state.currentSlide + 1}        
    }),
    previousSlide: () => set((state) => {
        if (state.currentSlide <= 0) return state;
        return { currentSlide: state.currentSlide - 1};
    }),
    reorderSlides: (newSlides: Slide[]) => set({ slides: newSlides}),
    reset: () => set({ slides: [], currentSlide: 0}),
    updateElement: (slideIndex, elementId, patch) => set((state) => {
        if (slideIndex < 0 || slideIndex >= state.slides.length) return state
        const slide = state.slides[slideIndex]
        const updatedElements = slide.elements.map((el) =>
          el.id === elementId ? { ...el, ...patch } : el
        )
        const updatedSlides = state.slides.map((s, i) =>
          i === slideIndex ? { ...s, elements: updatedElements } : s
        )
        return { slides: updatedSlides as Slide[] }
      }),
      addElement: (slideIndex, element) => set((state) => {
        if (slideIndex < 0 || slideIndex >= state.slides.length) return state
        const updatedSlides = state.slides.map((s, i) =>
          i === slideIndex ? { ...s, elements: [...s.elements, element] } : s
        )
        return { slides: updatedSlides }
      }),
      selectedElementId: null,
      setSelectedElementId: (id) => {
        set({ selectedElementId: id })
      },
      updateSlideBackground: (slideIndex, background) => set((state) => {
        if (slideIndex < 0 || slideIndex >= state.slides.length) return state
        const updatedSlides = state.slides.map((s, i) =>
          i === slideIndex ? { ...s, background } : s
        )
        return { slides: updatedSlides }
      }),
      deleteElement: (slideIndex, elementId) => set((state) => {
        const updatedSlides = state.slides.map((s, i) =>
          i === slideIndex ? { ...s, elements: s.elements.filter(el => el.id !== elementId) } : s
        )
        return { slides: updatedSlides, selectedElementId: null }
      }),
      updateElementZIndex: (slideIndex, elementId, direction) => set((state) => {
        const updatedSlides = state.slides.map((s, i) => {
          if (i !== slideIndex) return s
          const elements = s.elements.map((el) => {
            if (el.id !== elementId) return el
            if (direction === 'forward') return { ...el, zIndex: el.zIndex + 1 }
            if (direction === 'backward') return { ...el, zIndex: Math.max(0, el.zIndex - 1) }
            if (direction === 'front') return { ...el, zIndex: 999 }
            if (direction === 'back') return { ...el, zIndex: 0 }
            return el
          })
          return { ...s, elements }
        })
        return { slides: updatedSlides }
      }),
      loadFromLocalStorage: () => set(() => {
        try {
          const raw = localStorage.getItem('slideforge_slides')
          if (!raw) return {}
          const slides = JSON.parse(raw)
          if (!Array.isArray(slides) || slides.length === 0) return {}
          return { slides, currentSlide: 0 }  // add this
        } catch (e) {
          console.error('failed to load from localStorage', e)
          return {}
        }
      }),
        loadPresentation: (slides: Slide[]) => set({ slides }),
        presentationName: 'Untitled Presentation',
        setPresentationName: (name: string) => set({ presentationName: name }),
        updateSlideNotes: (slideIndex, notes) => set((state) => {
          if (slideIndex < 0 || slideIndex >= state.slides.length) return state
          const updatedSlides = state.slides.map((s, i) =>
            i === slideIndex ? { ...s, notes } : s
          )
          return { slides: updatedSlides }
        }),
        presentationMode: false,
        setPresentationMode: (mode: boolean) => set({ presentationMode: mode }),
        duplicateSlide: (index) => set((state) => {
          if (index < 0 || index >= state.slides.length) return state
          const original = state.slides[index]
          const copy = {
            ...original,
            id: nanoid(),
            name: `${original.name} (copy)`,
            elements: original.elements.map((el) => ({ ...el, id: nanoid() }))
          }
          const slides = [
            ...state.slides.slice(0, index + 1),
            copy,
            ...state.slides.slice(index + 1)
          ]
          return { slides, currentSlide: index + 1 }
        }),
        duplicateElement: (slideIndex, elementId) => set((state) => {
          const slide = state.slides[slideIndex]
          if (!slide) return state
          const element = slide.elements.find(el => el.id === elementId)
          if (!element) return state
          const copy = {
            ...element,
            id: nanoid(),
            x: element.x + 3,
            y: element.y + 3,
          }
          const updatedSlides = state.slides.map((s, i) =>
            i === slideIndex ? { ...s, elements: [...s.elements, copy] } : s
          )
          return { slides: updatedSlides, selectedElementId: copy.id }
        }),
        editingElementId: null,
        setEditingElementId: (id) => set({ editingElementId: id }),
        contextMenu: null,
        setContextMenu: (menu) => set({ contextMenu: menu }),
        transitionType: 'fade',
        setTransitionType: (type) => set({ transitionType: type }),
        snapToGrid: false,
        gridSize: 10,
        setSnapToGrid: (v) => set({ snapToGrid: v }),
        setGridSize: (size) => set({ gridSize: size }),
}), {
  partialize: (state) => ({ slides: state.slides }) as unknown as SlideStore
}))