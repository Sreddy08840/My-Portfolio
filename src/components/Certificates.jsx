/**
 * Certificates Component
 * Displays certifications and achievements
 * Card-based layout with links to view certificates
 */
import React from 'react'
import { motion } from 'framer-motion'

const Certificates = ({ certificates }) => {
  if (!certificates || certificates.length === 0) return null

  return (
    <section id="certificates" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          Certificates & <span className="text-primary">Achievements</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect p-6 rounded-lg hover:bg-white/10 transition-all group"
            >
              {/* Certificate Icon */}
              <div className="mb-4 flex items-center justify-between">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🏆
                </div>
                <span className="text-xs text-gray-500 font-medium">{cert.date}</span>
              </div>

              {/* Certificate Name */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition">
                {cert.name}
              </h3>

              {/* Issuer */}
              <p className="text-sm text-primary font-medium mb-3">
                {cert.issuer}
              </p>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {cert.description}
              </p>

              {/* View Certificate Link */}
              {cert.link && cert.link !== '#' && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-secondary transition text-sm group"
                >
                  View Certificate
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
              {(!cert.link || cert.link === '#') && (
                <span className="text-gray-600 text-sm">Certificate available upon request</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Certificates
