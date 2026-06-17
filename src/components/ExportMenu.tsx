import { useState, useRef, useEffect } from 'react'
import { Download, FileJson, FileText, ChevronDown } from 'lucide-react'
import { useSlideStore } from '../stores/slideStore'
import jsPDF from 'jspdf'

const ExportMenu = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const slides = useSlideStore((state) => state.slides)
  const presentationName = useSlideStore((state) => state.presentationName)

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) window.addEventListener('mousedown', handler)
    return () => window.removeEventListener('mousedown', handler)
  }, [open])

  const exportJSON = () => {
    const json = JSON.stringify(slides, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${presentationName}.json`
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  const exportPDF = async () => {
    setOpen(false)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [960, 540]
    })
  
    const SCALE = 3
  
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i]
      const canvas = document.createElement('canvas')
      canvas.width = 960 * SCALE
      canvas.height = 540 * SCALE
      const ctx = canvas.getContext('2d')!
      ctx.scale(SCALE, SCALE)
  
      // draw background
      ctx.fillStyle = slide.background
      ctx.fillRect(0, 0, 960, 540)
  
      // draw elements sorted by zIndex
      const sorted = [...slide.elements].sort((a, b) => a.zIndex - b.zIndex)
  
      for (const el of sorted) {
        const x = (el.x / 100) * 960
        const y = (el.y / 100) * 540
        const w = (el.width / 100) * 960
        const h = (el.height / 100) * 540
  
        ctx.globalAlpha = el.opacity
  
        if (el.type === 'shape') {
          ctx.fillStyle = el.shapeColor
          if (el.shape === 'circle') {
            ctx.beginPath()
            ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2)
            ctx.fill()
          } else if (el.shape === 'triangle') {
            ctx.beginPath()
            ctx.moveTo(x + w / 2, y)
            ctx.lineTo(x + w, y + h)
            ctx.lineTo(x, y + h)
            ctx.closePath()
            ctx.fill()
          } else {
            ctx.fillRect(x, y, w, h)
          }
        }
  
        if (el.type === 'text') {
          ctx.fillStyle = el.fontColor
          ctx.font = `${el.fontStyle} ${el.fontWeight} ${el.fontSize}px ${el.fontFamily}`
          ctx.textAlign = el.textAlign as CanvasTextAlign
          ctx.textBaseline = 'top'
          const textX = el.textAlign === 'center'
            ? x + w / 2
            : el.textAlign === 'right'
              ? x + w
              : x
          const lines = el.text.split('\n')
          lines.forEach((line, index) => {
            ctx.fillText(line, textX, y + index * el.fontSize * 1.2)
          })
        }
  
        if (el.type === 'image' && el.image) {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          await new Promise<void>((resolve) => {
            img.onload = () => {
              ctx.drawImage(img, x, y, w, h)
              resolve()
            }
            img.onerror = () => resolve()
            img.src = el.image
          })
        }
  
        ctx.globalAlpha = 1
      }
  
      const imgData = canvas.toDataURL('image/png')
      if (i > 0) pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, 0, 960, 540)
    }
  
    const blob = pdf.output('blob')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${presentationName}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors cursor-pointer"
      >
        <Download size={13} />
        Export
        <ChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute right-0 top-9 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 w-44 z-50">
          <button
            onClick={exportJSON}
            className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 w-full text-left cursor-pointer"
          >
            <FileJson size={13} className="text-blue-500" />
            Export as JSON
          </button>
          <div className="border-t border-zinc-100 my-1" />
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 w-full text-left cursor-pointer"
          >
            <FileText size={13} className="text-red-500" />
            Export as PDF
          </button>
        </div>
      )}
    </div>
  )
}

export default ExportMenu