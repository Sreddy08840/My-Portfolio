/**
 * ProjectCard Component
 * Displays individual project information with animation
 * Uses framer-motion for entrance animations
 */
import React from 'react'
import { motion } from 'framer-motion'

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-effect p-6 hover:bg-white/10 transition-all group flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition">
          {project.name}
        </h3>
        <span className="text-primary text-2xl">#{project.id}</span>
      </div>
      <p className="text-gray-400 mb-4 flex-grow">{project.desc}</p>
      
      {/* Tech Stack */}
      {project.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-primary/10 border border-primary/30 rounded text-xs text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      
      {project.link && project.link !== '#' && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-secondary transition group"
        >
          View Project
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      )}
      {project.link === '#' && (
        <span className="text-gray-600 text-sm">Coming soon</span>
      )}
    </motion.div>
  )
}

export default ProjectCard
