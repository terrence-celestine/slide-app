import './index.css'
import Toolbar from './components/Toolbar'
import SlidePanel from './components/SlidePanel'
import Canvas from './components/Canvas'
import PropertiesPanel from './components/PropertiesPanel'
import useKeyboard from './hooks/useKeyboard'
import useAutoSave from './hooks/useAutoSave'
import { useSlideStore } from './stores/slideStore'
import { useEffect } from 'react'
import PresentationView from './components/PresentationView'

const App = () => {
    const loadFromLocalStorage = useSlideStore((state) => state.loadFromLocalStorage)
    const presentationMode = useSlideStore((state) => state.presentationMode)
    
  useEffect(() => {
    loadFromLocalStorage()
  }, [])
  
  useKeyboard()
  useAutoSave()

  if (presentationMode) {
    return <PresentationView />
  }
    return (
      <div className="h-screen w-screen flex flex-col bg-[#1a1a2e] text-gray-200">
        <Toolbar />
        <div className="flex flex-1 overflow-hidden justify-between">
          <SlidePanel />   
          <Canvas /> 
          <PropertiesPanel />
        </div>
      </div>
    )
}

export default App