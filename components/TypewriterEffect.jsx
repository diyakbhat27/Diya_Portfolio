'use client'

import { useState, useEffect } from 'react'

export default function TypewriterEffect({ 
  texts = ["AI & ML Engineer", "Data science enthusiast", "Data-Driven Innovator", "Cloud computing", "Computer Vision"],
  speed = 150,
  deleteSpeed = 100,
  delay = 2000,
  className = ""
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    let timeout

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, delay)
    } else if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1))
        }, deleteSpeed)
      }
    } else {
      if (currentText === texts[currentTextIndex]) {
        setIsWaiting(true)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(texts[currentTextIndex].slice(0, currentText.length + 1))
        }, speed)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, isWaiting, texts, speed, deleteSpeed, delay])

  return (
    <span className={`${className}`}>
      {currentText}
      <span className="animate-pulse text-cyan-400 ml-1">|</span>
    </span>
  )
}
