'use client'

import { useEffect, useRef } from 'react'

export default function ParticlesBackground() {
  const particlesRef = useRef(null)

  useEffect(() => {
    // Dynamically load particles.js
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.async = true
    
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { 
              value: 120, 
              density: { enable: true, value_area: 800 } 
            },
            color: { 
              value: ["#3399ff", "#00ccff", "#0066cc", "#4da6ff"] // Multiple blue shades for variety
            },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" }
            },
            opacity: { 
              value: 0.7, 
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.3,
                sync: false
              }
            },
            size: { 
              value: 4, 
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#3399ff",
              opacity: 0.6,
              width: 1.2
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "bounce",
              bounce: true,
              attract: { 
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "grab" },
              onclick: { enable: true, mode: "push" },
              resize: true
            },
            modes: {
              grab: { 
                distance: 200, 
                line_linked: { opacity: 1 } 
              },
              push: { 
                particles_nb: 4 
              },
              repulse: {
                distance: 100,
                duration: 0.4
              }
            }
          },
          retina_detect: true
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // Clear particles if they exist
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS()
        window.pJSDom = []
      }
    }
  }, [])

  return (
    <div 
      id="particles-js" 
      ref={particlesRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        width: '100%',
        height: '100%'
      }}
    />
  )
}
