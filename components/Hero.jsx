'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Download, Mail, Github, Linkedin } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import TypewriterEffect from './TypewriterEffect'

export default function Hero({ profile }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-24" style={{background: 'transparent'}}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 via-transparent to-accent-900/5" />

      <motion.div 
        ref={ref}
        className="container text-center z-10 px-4 relative"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Minimal backdrop for better text readability */}
        <div className="absolute inset-0 bg-dark-400/10 backdrop-blur-sm rounded-3xl" />
        
        <motion.div variants={itemVariants} className="mb-8 relative z-10">
          {profile?.avatar && (
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-gray-300 dark:border-gray-600">
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iOTYiIGN5PSI5NiIgcj0iOTYiIGZpbGw9IiMxRjI5MzciLz48Y2lyY2xlIGN4PSI5NiIgY3k9Ijc2IiByPSIzMiIgZmlsbD0iIzEwQjk4MSIvPjxwYXRoIGQ9Ik00MCA1MmMwLTMxIDI1LTU2IDU2LTU2czU2IDI1IDU2IDU2djQwSDQwVjE1MloiIGZpbGw9IiMxMEI5ODEiLz48L3N2Zz4='
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 text-shadow relative z-10"
        >
          Hi, I'm <span className="text-white">{profile?.fullName || 'Your Name'}</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed font-medium relative z-10"
        >
          <TypewriterEffect />
        </motion.p>

        <motion.p 
          variants={itemVariants}
          className="text-lg mb-12 max-w-2xl mx-auto text-gray-400 relative z-10"
        >
          {profile?.shortBio || 'Your short bio description'}
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12 relative z-10"
        >
          <a
            href={profile?.resumeFile}
            className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            download
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
          
          <a
            href={`mailto:${profile?.email}`}
            className="btn-outline flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Contact Me
          </a>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-6 mb-16 relative z-10"
        >
          {profile?.social?.github && (
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          
          {profile?.social?.linkedin && (
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <Mail className="w-6 h-6" />
            </a>
          )}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="animate-bounce relative z-10"
        >
          <ChevronDown className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
