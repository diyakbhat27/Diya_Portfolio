'use client'

import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded:', container)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="fixed inset-0 pointer-events-none z-0"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: {
              enable: true
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#3b82f6", "#60a5fa", "#2563eb", "#1d4ed8"],
          },
          links: {
            color: "#3b82f6",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              width: 1920,
              height: 1080
            },
            value: 100,
          },
          opacity: {
            value: {
              min: 0.3,
              max: 0.8
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false
            }
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 1,
              max: 4
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false
            }
          },
        },
        detectRetina: true,
      }}
    />
  )
}
