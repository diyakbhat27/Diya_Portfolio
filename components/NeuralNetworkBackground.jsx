'use client'

import { useEffect, useRef } from 'react'

export default function NeuralNetworkBackground() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Create animated data packets
    const createDataPacket = (pathId, duration, delay = 0) => {
      const path = svg.querySelector(`#${pathId}`)
      if (!path) return

      const pathLength = path.getTotalLength()
      path.style.strokeDasharray = `${pathLength}`
      path.style.strokeDashoffset = `${pathLength}`

      // Animate the path drawing
      path.style.animation = `drawPath ${duration}s ease-in-out ${delay}s infinite`
      
      // Create a moving dot along the path
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      dot.setAttribute('r', '3')
      dot.setAttribute('fill', '#3b82f6')
      dot.setAttribute('opacity', '0.8')
      dot.style.animation = `moveAlongPath${pathId} ${duration}s ease-in-out ${delay}s infinite`
      
      svg.appendChild(dot)
    }

    // Initialize data packet animations for different paths
    createDataPacket('path1', 4, 0)
    createDataPacket('path2', 5, 1)
    createDataPacket('path3', 6, 2)
    createDataPacket('path4', 4.5, 0.5)

    return () => {
      // Cleanup
    }
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes drawPath {
          0% { stroke-dashoffset: var(--path-length); opacity: 0.3; }
          50% { stroke-dashoffset: 0; opacity: 0.8; }
          100% { stroke-dashoffset: calc(var(--path-length) * -1); opacity: 0.3; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }

        @keyframes neuralPulse {
          0%, 100% { opacity: 0.5; }
          25% { opacity: 0.9; }
          50% { opacity: 0.6; }
          75% { opacity: 0.8; }
        }

        @keyframes dataFlow1 {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes dataFlow2 {
          0% { opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .neural-node {
          animation: pulse 3s ease-in-out infinite;
        }

        .neural-node:nth-child(2n) {
          animation-delay: 0.5s;
        }

        .neural-node:nth-child(3n) {
          animation-delay: 1s;
        }

        .neural-connection {
          animation: neuralPulse 4s ease-in-out infinite;
        }

        .neural-connection:nth-child(2n) {
          animation-delay: 1s;
        }

        .neural-connection:nth-child(3n) {
          animation-delay: 2s;
        }

        .data-flow-1 {
          animation: dataFlow1 8s ease-in-out infinite;
        }

        .data-flow-2 {
          animation: dataFlow2 10s ease-in-out infinite 2s;
        }

        .rotating-element {
          animation: rotate 60s linear infinite;
          transform-origin: center;
        }
      `}</style>
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full h-full opacity-40"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.4" />
            </linearGradient>
            
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
            </radialGradient>

            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Neural Network Layer 1 - Input Layer */}
          <g className="neural-layer" opacity="0.6">
            <circle className="neural-node" cx="200" cy="300" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="200" cy="400" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="200" cy="500" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="200" cy="600" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="200" cy="700" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
          </g>

          {/* Neural Network Layer 2 - Hidden Layer 1 */}
          <g className="neural-layer" opacity="0.7">
            <circle className="neural-node" cx="500" cy="250" r="10" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="500" cy="350" r="10" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="500" cy="450" r="10" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="500" cy="550" r="10" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="500" cy="650" r="10" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="500" cy="750" r="10" fill="url(#nodeGradient)" filter="url(#glow)" />
          </g>

          {/* Neural Network Layer 3 - Hidden Layer 2 */}
          <g className="neural-layer" opacity="0.8">
            <circle className="neural-node" cx="800" cy="200" r="12" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="800" cy="300" r="12" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="800" cy="400" r="12" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="800" cy="500" r="12" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="800" cy="600" r="12" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="800" cy="700" r="12" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="800" cy="800" r="12" fill="url(#nodeGradient)" filter="url(#glow)" />
          </g>

          {/* Neural Network Layer 4 - Output Layer */}
          <g className="neural-layer" opacity="0.9">
            <circle className="neural-node" cx="1100" cy="400" r="14" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="1100" cy="500" r="14" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="1100" cy="600" r="14" fill="url(#nodeGradient)" filter="url(#glow)" />
          </g>

          {/* Neural Connections - Layer 1 to 2 */}
          <g className="neural-connections">
            <path className="neural-connection data-flow-1" d="M 200 300 Q 350 275 500 250" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" id="path1" />
            <path className="neural-connection data-flow-2" d="M 200 400 Q 350 375 500 350" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" id="path2" />
            <path className="neural-connection data-flow-1" d="M 200 500 Q 350 475 500 450" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" id="path3" />
            <path className="neural-connection data-flow-2" d="M 200 600 Q 350 575 500 550" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" id="path4" />
            
            {/* Cross connections for complexity */}
            <path className="neural-connection" d="M 200 300 Q 350 425 500 450" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.4" />
            <path className="neural-connection" d="M 200 500 Q 350 325 500 350" stroke="url(#connectionGradient)" strokeWidth="1" fill="none" opacity="0.4" />
          </g>

          {/* Neural Connections - Layer 2 to 3 */}
          <g className="neural-connections">
            <path className="neural-connection data-flow-1" d="M 500 250 Q 650 225 800 200" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
            <path className="neural-connection data-flow-2" d="M 500 350 Q 650 325 800 300" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
            <path className="neural-connection data-flow-1" d="M 500 450 Q 650 425 800 400" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
            <path className="neural-connection data-flow-2" d="M 500 550 Q 650 525 800 500" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
            <path className="neural-connection data-flow-1" d="M 500 650 Q 650 625 800 600" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
            <path className="neural-connection data-flow-2" d="M 500 750 Q 650 725 800 700" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
          </g>

          {/* Neural Connections - Layer 3 to 4 */}
          <g className="neural-connections">
            <path className="neural-connection data-flow-1" d="M 800 300 Q 950 350 1100 400" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
            <path className="neural-connection data-flow-2" d="M 800 500 Q 950 500 1100 500" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
            <path className="neural-connection data-flow-1" d="M 800 700 Q 950 650 1100 600" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
          </g>

          {/* Right side neural network (mirrored and scaled) */}
          <g transform="translate(1920, 0) scale(-0.8, 0.8)" opacity="0.3">
            <circle className="neural-node" cx="200" cy="300" r="6" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="200" cy="400" r="6" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="200" cy="500" r="6" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="200" cy="600" r="6" fill="url(#nodeGradient)" filter="url(#glow)" />
            
            <circle className="neural-node" cx="400" cy="250" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="400" cy="350" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="400" cy="450" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="400" cy="550" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle className="neural-node" cx="400" cy="650" r="8" fill="url(#nodeGradient)" filter="url(#glow)" />
            
            <path className="neural-connection" d="M 200 300 Q 300 275 400 250" stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none" />
            <path className="neural-connection" d="M 200 400 Q 300 375 400 350" stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none" />
            <path className="neural-connection" d="M 200 500 Q 300 475 400 450" stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none" />
          </g>

          {/* Floating data packets */}
          <g className="floating-elements">
            <circle className="data-flow-1" cx="300" cy="100" r="4" fill="#3b82f6" opacity="0.6">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0,0; 50,30; 100,0; 50,-30; 0,0"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
            
            <circle className="data-flow-2" cx="700" cy="150" r="3" fill="#60a5fa" opacity="0.7">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0,0; -30,50; -60,0; -30,-50; 0,0"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            
            <circle className="data-flow-1" cx="1200" cy="200" r="5" fill="#1d4ed8" opacity="0.5">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0,0; 40,-20; 80,0; 40,20; 0,0"
                dur="12s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Geometric AI patterns in corners */}
          <g className="rotating-element" transform-origin="100 100">
            <polygon points="80,80 120,80 120,120 80,120" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
            <polygon points="85,85 115,85 115,115 85,115" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
            <circle cx="100" cy="100" r="5" fill="#3b82f6" opacity="0.5" />
          </g>

          <g className="rotating-element" transform-origin="1820 980" style={{animationDirection: 'reverse'}}>
            <polygon points="1800,960 1840,960 1840,1000 1800,1000" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
            <polygon points="1805,965 1835,965 1835,995 1805,995" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
            <circle cx="1820" cy="980" r="5" fill="#3b82f6" opacity="0.5" />
          </g>

          {/* Background grid pattern */}
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </>
  )
}
