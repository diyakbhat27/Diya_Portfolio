'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Eye, Calendar, Tag, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import SEO from '../../../components/SEO'
import data from '../../../data.json'

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    if (params?.id) {
      const foundProject = data.projects.find(p => p.id === params.id)
      setProject(foundProject)
    }
  }, [params])

  if (!mounted) return null

  if (!project) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/#projects" className="btn-primary">
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer profile={data.profile} />
      </>
    )
  }

  return (
    <>
      <SEO 
        title={`${project.title} - ${data.profile.fullName}`}
        description={project.summary}
        keywords={`${project.tech?.join(', ')}, ${data.profile.fullName}, project`}
        author={data.profile.fullName}
        url={`https://diyakbhat.dev/projects/${project.id}`}
        image={project.image || data.profile.avatar}
      />
      
      <NavBar />
      
      <main className="pt-20">
        <section className="section">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/#projects"
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Link>

              <div className="mb-8">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4">
                  {project.type}
                </span>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  {project.title}
                </h1>
              </div>

              {project.image && (
                <motion.div 
                  className="mb-8 rounded-2xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 lg:h-96 object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeTE9IjAiIHgyPSI4MDAiIHkyPSI0MDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRjNGNEY2Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRTVFN0VCIi8+PC9ncmFkaWVudD48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjQwMCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjI0cHgiIGZvbnQtZmFtaWx5PSJBcmlhbCI+UHJvamVjdCBJbWFnZTwvdGV4dD48L3N2Zz4='
                    }}
                  />
                </motion.div>
              )}

              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-12">
                      <h3 className="text-xl font-bold mb-6">Key Features</h3>
                      <div className="grid gap-4">
                        {project.features?.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-3 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                          </motion.div>
                        )) || (
                          <motion.div
                            className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                          >
                            <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-3 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">Advanced implementation using modern technologies</p>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {project.challenges && (
                      <div className="mt-12">
                        <h3 className="text-xl font-bold mb-6">Challenges & Solutions</h3>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                          <p className="text-gray-600 dark:text-gray-400">
                            {project.challenges}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                <div className="lg:col-span-1">
                  <motion.div
                    className="card p-6 sticky top-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h3 className="text-lg font-bold mb-6">Project Details</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech?.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                          Category
                        </h4>
                        <p className="text-gray-900 dark:text-gray-100">{project.type}</p>
                      </div>

                      {project.duration && (
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Duration
                          </h4>
                          <p className="text-gray-900 dark:text-gray-100">{project.duration}</p>
                        </div>
                      )}

                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="space-y-3">
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 w-full p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              {project.repo.includes('github') ? (
                                <Github className="w-5 h-5" />
                              ) : (
                                <ExternalLink className="w-5 h-5" />
                              )}
                              <span className="font-medium">
                                {project.repo.includes('github') ? 'View Code' : 'View Project'}
                              </span>
                            </a>
                          )}
                          
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 w-full p-3 bg-primary-100 dark:bg-primary-900/20 hover:bg-primary-200 dark:hover:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg transition-colors"
                            >
                              <Eye className="w-5 h-5" />
                              <span className="font-medium">Live Demo</span>
                            </a>
                          )}

                          {project.id && (
                            <a
                              href={`/demos/${project.id}`}
                              className="flex items-center gap-3 w-full p-3 bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg transition-colors"
                            >
                              <Eye className="w-5 h-5" />
                              <span className="font-medium">Interactive Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6">Interested in Similar Projects?</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/#projects" className="btn-primary">
                    View All Projects
                  </Link>
                  <Link href="/#contact" className="btn-outline">
                    Get In Touch
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer profile={data.profile} />
    </>
  )
}
