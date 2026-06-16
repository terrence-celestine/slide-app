import { MonitorPlay } from "lucide-react"

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-blue-500 p-1.5 rounded-md">
        <MonitorPlay size={16} className="text-white" />
      </div>
      <span className="font-semibold text-gray-800 tracking-tight">
        Slide<span className="text-blue-500">Sync</span>
      </span>
    </div>
  )
}

export default Logo