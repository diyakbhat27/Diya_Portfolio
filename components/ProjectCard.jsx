'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export default function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ 
        y: -8,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="perspective-1000"
    >
      <div className="card card-hover p-6 h-full transform-style-preserve-3d group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          {project.image && (
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeTE9IjAiIHgyPSI0MDAiIHkyPSIyMDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRjNGNEY2Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRTVFN0VCIi8+PC9ncmFkaWVudD48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTA1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjE0cHgiIGZvbnQtZmFtaWx5PSJBcmlhbCI+UHJvamVjdCBJbWFnZTwvdGV4dD48L3N2Zz4='
                }}
              />
            </div>
          )}

          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-3">
              {project.type}
            </span>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
              {project.title}
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-4">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech?.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            {project.repo && (
              <motion.a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {project.repo.includes('github') ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                {project.repo.includes('github') ? 'Code' : 'View'}
              </motion.a>
            )}
            
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                Live Demo
              </motion.a>
            )}
            
            {!project.repo && !project.live && (
              <span className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-500">
                <Eye className="w-4 h-4" />
                Case Study
              </span>
            )}
          </div>
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  )
}
