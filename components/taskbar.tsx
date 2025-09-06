"use client"

import { Button } from "./ui/button"
import { Calendar, Wifi, Volume2 } from "lucide-react"

interface TaskbarProps {
  openWindows: Array<{ id: string; name: string; icon: string }>
  activeWindow: string | null
  onWindowClick: (id: string) => void
}

export function Taskbar({ openWindows, activeWindow, onWindowClick }: TaskbarProps) {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 border-t border-gray-600 flex items-center px-2 z-50">
      {/* Start Button */}
      <Button variant="ghost" size="sm" className="h-8 px-3 text-white hover:bg-gray-700 mr-2">
        <div className="w-4 h-4 bg-primary rounded-sm mr-2" />
        Start
      </Button>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center gap-1">
        {openWindows.map((window) => (
          <Button
            key={window.id}
            variant="ghost"
            size="sm"
            className={`h-8 px-3 text-white hover:bg-gray-700 ${activeWindow === window.id ? "bg-gray-600" : ""}`}
            onClick={() => onWindowClick(window.id)}
          >
            <span className="mr-2">{window.icon}</span>
            <span className="max-w-32 truncate">{window.name}</span>
          </Button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 text-white">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-gray-700">
          <Volume2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-gray-700">
          <Wifi className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-gray-700">
          <Calendar className="h-4 w-4" />
        </Button>
        <div className="text-sm font-mono ml-2">
          <div>{currentTime}</div>
          <div className="text-xs text-gray-300">{currentDate}</div>
        </div>
      </div>
    </div>
  )
}
