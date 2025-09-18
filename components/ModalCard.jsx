'use client'

import { motion } from 'framer-motion'
import { Award, Calendar, ExternalLink, Building, User } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export default function ModalCard({ item, type, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'certification':
        return <Award className="w-6 h-6 text-accent-400" />
      case 'education':
        return <Building className="w-6 h-6 text-primary-400" />
      case 'extracurricular':
        return <User className="w-6 h-6 text-primary-400" />
      default:
        return <Calendar className="w-6 h-6 text-primary-400" />
    }
  }

  const renderEducation = () => (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        {getIcon()}
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{item.degree}</h3>
          <p className="text-primary-400 font-medium mb-2">{item.institute}</p>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {item.year}
            </span>
            {item.details && (
              <span className="font-medium text-primary-400">
                {item.details}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderCertification = () => (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        {getIcon()}
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
          <p className="text-primary-400 font-medium mb-2">{item.issuer}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>{item.year}</span>
            </div>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors duration-200"
              >
                View Certificate →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPublication = () => (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        <ExternalLink className="w-6 h-6 text-neural-400" />
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
          <p className="text-neural-400 font-medium mb-2">{item.publisher}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>{item.date}</span>
            </div>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neural-400 hover:text-neural-300 transition-colors duration-200"
              >
                View Publication →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderExtracurricular = () => (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        {getIcon()}
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{item.role}</h3>
          <p className="text-primary-400 font-medium">{item.activity}</p>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (type) {
      case 'education':
        return renderEducation()
      case 'certification':
        return renderCertification()
      case 'publication':
        return renderPublication()
      case 'extracurricular':
        return renderExtracurricular()
      default:
        return null
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="card p-6 h-full group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {renderContent()}
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
      </div>
    </motion.div>
  )
}
