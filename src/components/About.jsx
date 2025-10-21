/**
 * About Component
 * Displays education and experience information
 * Timeline-style layout for work experience and education history
 */
import React from 'react'
import { motion } from 'framer-motion'

const About = ({ education, experience, profile }) => {
  return (
    <section id="about" className="section-container bg-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        {/* Profile Photo */}
        {profile?.photo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30"></div>
              <img
                src={profile.photo}
                alt={profile.name}
                className="relative w-48 h-48 rounded-full object-cover border-4 border-primary/50 shadow-2xl"
              />
            </div>
          </motion.div>
        )}

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Education Section */}
          {education && education.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-2">
                🎓 Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-effect p-6 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                      <span className="text-sm text-primary font-medium">{edu.duration}</span>
                    </div>
                    <p className="text-gray-300 font-medium mb-2">{edu.institution}</p>
                    <p className="text-gray-500 text-sm mb-3">📍 {edu.location}</p>
                    <p className="text-gray-400">{edu.details}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-2">
                💼 Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-effect p-6 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-semibold text-white">{exp.title}</h4>
                        <p className="text-gray-300 font-medium">
                          {exp.company} {exp.type && <span className="text-primary text-sm">• {exp.type}</span>}
                        </p>
                      </div>
                      <span className="text-sm text-primary font-medium">{exp.duration}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">📍 {exp.location}</p>
                    <p className="text-gray-400 mb-4">{exp.description}</p>
                    
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 font-medium">Key Achievements:</p>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default About
