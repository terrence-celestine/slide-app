import { create } from 'zustand';
import type { Slide, SlideElement } from '../types/slide';
import { createSlide } from '../utils/factories';
import { temporal } from 'zundo'

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
}

export const useSlideStore = create(temporal<SlideStore>((set) => ({
    slides: [createSlide()],
    currentSlide:0,
    addSlide: (slide: Slide) => set((state) => ({ slides: [...state.slides, slide]})),
    removeSlide: (index: number) => set((state) => {
        if (state.slides.length <= 1) return state;
        if (index >= 0 && index < state.slides.length) {
            return { slides: state.slides.filter((_, i) => i !== index)}
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
        if (state.currentSlide >= state.slides.length) return state;
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
      setSelectedElementId: (id) => set({ selectedElementId: id }),
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
            return { slides }
          } catch (e) {
            console.error('failed to load from localStorage', e)
            return {}
          }
        }),
        loadPresentation: (slides: Slide[]) => set({ slides }),
        presentationName: 'Untitled Presentation',
        setPresentationName: (name: string) => set({ presentationName: name })
}), {
  partialize: (state) => ({ slides: state.slides }) as unknown as SlideStore
}))