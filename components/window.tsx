"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { X, Minus, Square } from "lucide-react"

interface WindowProps {
  id: string
  title: string
  isActive: boolean
  zIndex: number
  onClose: () => void
  onFocus: () => void
}

export function Window({ id, title, isActive, zIndex, onClose, onFocus }: WindowProps) {
  const [position, setPosition] = useState({ x: 200 + Math.random() * 300, y: 100 + Math.random() * 200 })
  const [size, setSize] = useState({ width: 600, height: 400 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("window-header")) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
      onFocus()
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
          y: Math.max(0, Math.min(window.innerHeight - size.height - 60, e.clientY - dragOffset.y)),
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, size])

  const getWindowContent = () => {
    switch (id) {
      case "about":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">About Joan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Joan OS - a retro-futuristic desktop experience that brings together classic computing
              aesthetics with modern web technologies. This interface showcases my work and projects in an interactive,
              nostalgic environment.
            </p>
          </div>
        )
      case "experience":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold">Senior Developer</h3>
                <p className="text-sm text-muted-foreground">2022 - Present</p>
                <p className="text-sm">Building modern web applications with React and Next.js</p>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-semibold">Full Stack Developer</h3>
                <p className="text-sm text-muted-foreground">2020 - 2022</p>
                <p className="text-sm">Developed scalable backend systems and user interfaces</p>
              </div>
            </div>
          </div>
        )
      case "contact":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-lg">📧</span>
                <span>joan@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">🐙</span>
                <span>github.com/joan</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">💼</span>
                <span>linkedin.com/in/joan</span>
              </div>
            </div>
          </div>
        )
      case "resume":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Resume</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-center text-muted-foreground">📄 Resume.pdf</p>
              <Button className="w-full mt-4 bg-transparent" variant="outline">
                Download Resume
              </Button>
            </div>
          </div>
        )
      case "credits":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Credits</h2>
            <p className="text-muted-foreground leading-relaxed">
              This retro desktop interface was built with Next.js, Tailwind CSS, and lots of nostalgia for classic
              operating systems. Special thanks to the open source community for making this possible.
            </p>
          </div>
        )
      case "projects":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Project Alpha</h3>
                <p className="text-sm text-muted-foreground">A modern web application</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Project Beta</h3>
                <p className="text-sm text-muted-foreground">Mobile-first design system</p>
              </div>
            </div>
          </div>
        )
      default:
        return <div className="p-6">Window content for {title}</div>
    }
  }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-card border border-border rounded-lg shadow-lg overflow-hidden ${
        isActive ? "ring-2 ring-primary/50" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      {/* Window Header */}
      <div
        className="window-header bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="font-medium">{title}</span>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-primary-foreground/20">
            <Minus className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-primary-foreground/20">
            <Square className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      <div className="bg-card text-card-foreground h-full overflow-auto">{getWindowContent()}</div>
    </div>
  )
}
