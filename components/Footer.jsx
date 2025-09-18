'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-100/50 border-t border-primary-900/30 relative z-10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">
                {profile?.fullName || 'Your Name'}
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                {profile?.shortBio || 'Your short bio description goes here.'}
              </p>
            </motion.div>

            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {profile?.social?.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-dark-50/60 border border-primary-600/30 hover:bg-dark-50/80 hover:border-primary-400 transition-colors duration-200 group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              )}
              
              {profile?.social?.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-dark-50/60 border border-primary-600/30 hover:bg-dark-50/80 hover:border-accent-400 transition-colors duration-200 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              )}
              
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-3 rounded-full bg-dark-50/60 border border-primary-600/30 hover:bg-dark-50/80 hover:border-primary-400 transition-colors duration-200 group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              )}
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-bold text-lg mb-6 text-gray-100">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Education & Certifications', href: '#education' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Achievements', href: '#achievements' }
                ].map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => {
                        const element = document.querySelector(link.href)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-bold text-lg mb-6 text-gray-100">
                Contact Info
              </h4>
              <ul className="space-y-4">
                {profile?.location && (
                  <li className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300">
                      {profile.location}
                    </span>
                  </li>
                )}
                
                {profile?.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <a 
                      href={`mailto:${profile.email}`}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {profile.email}
                    </a>
                  </li>
                )}
                
                {profile?.phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <a 
                      href={`tel:${profile.phone}`}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {profile.phone}
                    </a>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="pt-8 border-t border-primary-900/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-center md:text-left">
              © {currentYear} {profile?.fullName || 'Your Name'}. Made with{' '}
              <Heart className="w-4 h-4 inline-block text-red-500 mx-1" />
              using Next.js & Tailwind CSS
            </p>
            
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-dark-50/60 border border-primary-600/30 hover:bg-dark-50/80 hover:border-primary-400 rounded-lg transition-colors duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to Top</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
