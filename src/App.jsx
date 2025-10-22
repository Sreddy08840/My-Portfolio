/**
 * Main App Component
 * Loads profile data from public/profile.json and orchestrates all sections
 * Handles localStorage availability detection
 */
import React, { useState, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import Hero3D from './components/Hero3D'
import ProjectCard from './components/ProjectCard'
import ContactForm from './components/ContactForm'
import Skills from './components/Skills'
import About from './components/About'
import Certificates from './components/Certificates'

const App = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [localStorageAvailable, setLocalStorageAvailable] = useState(true)

  // Check localStorage availability
  useEffect(() => {
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      setLocalStorageAvailable(true)
    } catch (e) {
      console.error('localStorage is not available:', e)
      setLocalStorageAvailable(false)
    }
  }, [])

  // Load profile data
  useEffect(() => {
    fetch('/profile.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load profile data')
        return res.json()
      })
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading profile:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Handle admin access
  const handleAdminAccess = () => {
    const password = prompt('Enter admin password:')
    if (password === 'admin123') {
      setShowAdmin(true)
    } else {
      alert('Incorrect password')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darker">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darker">
        <div className="text-center glass-effect p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Profile</h2>
          <p className="text-gray-400">{error}</p>
          <p className="text-sm text-gray-500 mt-4">Please check if profile.json exists in the public folder.</p>
        </div>
      </div>
    )
  }

  if (showAdmin) {
    return (
      <div className="min-h-screen bg-darker">
        <AdminPanel onClose={() => setShowAdmin(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-darker">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-primary"
            >
              {profile.name}
            </motion.div>
            <div className="hidden md:flex gap-6">
              <a href="#about" className="text-gray-300 hover:text-primary transition text-sm">
                About
              </a>
              <a href="#skills" className="text-gray-300 hover:text-primary transition text-sm">
                Skills
              </a>
              <a href="#projects" className="text-gray-300 hover:text-primary transition text-sm">
                Projects
              </a>
              <a href="#certificates" className="text-gray-300 hover:text-primary transition text-sm">
                Certificates
              </a>
              <a href="#contact" className="text-gray-300 hover:text-primary transition text-sm">
                Contact
              </a>
              
            </div>
           
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-16 flex items-center">
        <div className="section-container w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl lg:text-6xl font-bold"
              >
                Hi, I'm <span className="text-primary">{profile.name}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl text-gray-400"
              >
                {profile.title}
              </motion.p>
              {profile.tagline && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-lg text-gray-500"
                >
                  {profile.tagline}
                </motion.p>
              )}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-500"
              >
                📍 {profile.location}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-300 leading-relaxed"
              >
                {profile.about}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex gap-4"
              >
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary hover:bg-secondary transition rounded-lg font-medium"
                >
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass-effect hover:bg-white/10 transition rounded-lg font-medium"
                >
                  LinkedIn
                </a>
              </motion.div>
            </motion.div>

            {/* Right: 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[500px] lg:h-[600px]"
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center glass-effect rounded-lg">
                  <p className="text-gray-400">Loading 3D scene...</p>
                </div>
              }>
                <Hero3D />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {profile.education && profile.experience && (
        <About education={profile.education} experience={profile.experience} profile={profile} />
      )}

      {/* Skills Section */}
      {profile.skills && <Skills skills={profile.skills} />}

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Certificates Section */}
      {profile.certificates && <Certificates certificates={profile.certificates} />}

      {/* Contact Section */}
      <section id="contact" className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            Get In <span className="text-primary">Touch</span>
          </h2>
          {!localStorageAvailable && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">
                ⚠️ localStorage is not available in your browser. Contact form is disabled.
                Please enable cookies/storage or try a different browser.
              </p>
            </div>
          )}
          <ContactForm 
            profile={profile} 
            localStorageAvailable={localStorageAvailable}
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About Column */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">{profile.name}</h3>
              <p className="text-gray-400 text-sm">
                {profile.tagline || profile.title}
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-400 hover:text-primary transition text-sm">
                  About
                </a>
                <a href="#skills" className="block text-gray-400 hover:text-primary transition text-sm">
                  Skills
                </a>
                <a href="#projects" className="block text-gray-400 hover:text-primary transition text-sm">
                  Projects
                </a>
                <a href="#contact" className="block text-gray-400 hover:text-primary transition text-sm">
                  Contact
                </a>
              </div>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
              <div className="space-y-2">
                <a
                  href={profile.email ? `mailto:${profile.email}` : '#'}
                  className="block text-gray-400 hover:text-primary transition text-sm"
                >
                  📧 {profile.email}
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-primary transition text-sm"
                >
                  💻 GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-primary transition text-sm"
                >
                  💼 LinkedIn
                </a>
                {profile.portfolio && (
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-primary transition text-sm"
                  >
                    🌐 Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <p className="text-center text-gray-500 text-sm">
              © 2025 {profile.name}. Built with React, Three.js & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
