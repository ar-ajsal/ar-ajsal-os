"use client"

import { useState } from "react"

interface DesktopIconProps {
  id: string
  name: string
  icon: string
  position: { x: number; y: number }
  onDoubleClick: () => void
}

export function DesktopIcon({ id, name, icon, position, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div
      className={`absolute flex flex-col items-center cursor-pointer select-none group ${
        isSelected ? "bg-primary/20 rounded-lg" : ""
      }`}
      style={{ left: position.x, top: position.y }}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
    >
      <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-xs text-foreground/80 text-center max-w-16 leading-tight">{name}</span>
    </div>
  )
}
