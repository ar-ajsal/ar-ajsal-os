"use client"

import { useState } from "react"
import { DesktopIcon } from "./desktop-icon"
import { Taskbar } from "./taskbar"
import { Window } from "./window"

const desktopIcons = [
  { id: "about", name: "About", icon: "📷", position: { x: 40, y: 50 } },
  { id: "experience", name: "Experience", icon: "🅱️", position: { x: 40, y: 140 } },
  { id: "contact", name: "Contact", icon: "📧", position: { x: 40, y: 230 } },
  { id: "resume", name: "Resume", icon: "📄", position: { x: 40, y: 320 } },
  { id: "credits", name: "Credits", icon: "⬛", position: { x: 40, y: 410 } },
  { id: "projects", name: "Projects", icon: "📊", position: { x: 40, y: 500 } },
]

export function Desktop() {
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)

  const openWindow = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id])
    }
    setActiveWindow(id)
  }

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w !== id))
    if (activeWindow === id) {
      setActiveWindow(openWindows.length > 1 ? openWindows[openWindows.length - 2] : null)
    }
  }

  const focusWindow = (id: string) => {
    setActiveWindow(id)
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            name={icon.name}
            icon={icon.icon}
            position={icon.position}
            onDoubleClick={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((windowId, index) => {
        const icon = desktopIcons.find((i) => i.id === windowId)
        return (
          <Window
            key={windowId}
            id={windowId}
            title={icon?.name || "Window"}
            isActive={activeWindow === windowId}
            zIndex={1000 + index + (activeWindow === windowId ? 100 : 0)}
            onClose={() => closeWindow(windowId)}
            onFocus={() => focusWindow(windowId)}
          />
        )
      })}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows.map((id) => ({
          id,
          name: desktopIcons.find((i) => i.id === id)?.name || "Window",
          icon: desktopIcons.find((i) => i.id === id)?.icon || "📁",
        }))}
        activeWindow={activeWindow}
        onWindowClick={focusWindow}
      />
    </div>
  )
}
