'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Database, BookOpen, Award, Users, Briefcase, Eye, BrainCircuit } from 'lucide-react'

import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import ModalCard from '../components/ModalCard'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import ParticlesBackground from '../components/ParticlesBackground'
import data from '../data.json'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const { profile, projects, education, certifications, publications, extracurriculars, experience } = data

  return (
    <>
      <SEO
        title={profile.fullName}
        description={profile.shortBio}
        keywords={`${profile.skills?.join(', ')}, portfolio, developer`}
        author={profile.fullName}
        url="https://diyakbhat.dev"
        image={profile.avatar}
      />

      <ParticlesBackground />
      <NavBar />

      <main>
        <section id="home">
          <Hero profile={profile} />
        </section>

        {experience && experience.length > 0 && (
          <section id="experience" className="section relative z-10 bg-dark-100/30">
            <div className="container">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-6 text-blue-400">Work <span className="gradient-text">Experience</span></h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Professional experience building real-world AI and backend systems
                </p>
              </motion.div>

              <div className="space-y-8 max-w-4xl mx-auto">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className="card p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                          <p className="text-blue-400 font-semibold">{exp.company}</p>
                        </div>
                      </div>
                      <div className="md:text-right">
                        <span className="text-sm text-gray-300 bg-dark-50/60 border border-slate-600/30 px-3 py-1 rounded-full">{exp.period}</span>
                        <p className="text-sm text-gray-400 mt-2">{exp.location}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mt-4 ml-9">
                      {exp.highlights.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <span className="text-blue-400 mt-1 flex-shrink-0">▸</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="projects" className="section relative z-10">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-blue-400">Featured <span className="gradient-text">Projects</span></h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and expertise
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects?.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section relative z-10">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-blue-400">Skills & <span className="professional-text">Technologies</span></h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Technologies and tools I work with to bring ideas to life
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {profile.skills?.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-dark-50/60 border border-slate-600/30 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-green-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <BrainCircuit className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-blue-400">AI & ML with GenAI & RAG</h3>
                <p className="text-gray-300">Building intelligent systems with LLMs, RAG pipelines, agentic AI workflows, and machine learning models</p>
              </motion.div>

              <motion.div
                className="card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Database className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-blue-400">Data Science</h3>
                <p className="text-gray-300">Extracting insights from data using statistical analysis, predictive modeling, and interactive visualizations</p>
              </motion.div>

              <motion.div
                className="card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Eye className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-blue-400">Computer Vision</h3>
                <p className="text-gray-300">Building real-time object detection and image processing systems using YOLOv8, OpenCV, and deep learning</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="education" className="section relative z-10 bg-dark-100/30">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-blue-400">Education & <span className="professional-text">Certifications</span></h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                My academic journey and professional certifications
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-blue-400">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                  Education
                </h3>
                <div className="space-y-4">
                  {education?.map((item, index) => (
                    <ModalCard
                      key={index}
                      item={item}
                      type="education"
                      index={index}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-blue-400">
                  <Award className="w-8 h-8 text-blue-400" />
                  Certifications
                </h3>
                <div className="space-y-4">
                  {certifications?.map((item, index) => (
                    <ModalCard
                      key={index}
                      item={item}
                      type="certification"
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="achievements" className="section relative z-10">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-blue-400">Achievements & <span className="professional-text">Publications</span></h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Research publications and leadership activities
              </p>
            </motion.div>

            {publications && publications.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3 text-blue-400">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                  Publications & Research
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {publications.map((item, index) => (
                    <ModalCard
                      key={index}
                      item={item}
                      type="publication"
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {extracurriculars && extracurriculars.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3 text-blue-400">
                  <Users className="w-8 h-8 text-blue-400" />
                  Leadership & Activities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {extracurriculars.map((item, index) => (
                    <ModalCard
                      key={index}
                      item={item}
                      type="extracurricular"
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="section relative z-10 bg-dark-100/30">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-blue-400">Let's <span className="gradient-text">Connect</span></h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities and interesting projects
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="btn-primary flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Email
                </motion.a>

                <motion.a
                  href={profile.resumeFile}
                  className="btn-outline flex items-center gap-2"
                  download
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer profile={profile} />
    </>
  )
}
