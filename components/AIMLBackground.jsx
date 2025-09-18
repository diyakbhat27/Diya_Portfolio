'use client'

import { useEffect, useRef } from 'react'

export default function AIMLBackground() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const nodesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createNodes = () => {
      const nodes = []
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000)
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        })
      }
      return nodes
    }

    const drawNode = (node) => {
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(34, 197, 94, ${node.opacity})`
      ctx.fill()
      
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3)
      gradient.addColorStop(0, `rgba(34, 197, 94, ${node.opacity * 0.3})`)
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawConnection = (node1, node2, distance, maxDistance) => {
      const opacity = 1 - (distance / maxDistance)
      ctx.beginPath()
      ctx.moveTo(node1.x, node1.y)
      ctx.lineTo(node2.x, node2.y)
      ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    const updateNode = (node) => {
      node.x += node.vx
      node.y += node.vy

      if (node.x < 0 || node.x > canvas.width) node.vx *= -1
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1

      const mouseDistance = Math.sqrt(
        Math.pow(node.x - mouseRef.current.x, 2) + 
        Math.pow(node.y - mouseRef.current.y, 2)
      )
      
      if (mouseDistance < 100) {
        const force = (100 - mouseDistance) / 100
        node.vx += (node.x - mouseRef.current.x) * force * 0.001
        node.vy += (node.y - mouseRef.current.y) * force * 0.001
      }

      node.vx *= 0.99
      node.vy *= 0.99
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const nodes = nodesRef.current
      const maxDistance = 120
      
      for (let i = 0; i < nodes.length; i++) {
        updateNode(nodes[i])
        drawNode(nodes[i])
        
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes[i].x - nodes[j].x, 2) + 
            Math.pow(nodes[i].y - nodes[j].y, 2)
          )
          
          if (distance < maxDistance) {
            drawConnection(nodes[i], nodes[j], distance, maxDistance)
          }
        }
      }
      
      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      resizeCanvas()
      nodesRef.current = createNodes()
    }

    resizeCanvas()
    nodesRef.current = createNodes()
    animate()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
