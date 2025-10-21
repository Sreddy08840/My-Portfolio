/**
 * Skills Component
 * Displays technical skills organized by category
 * Shows languages, frontend, backend, databases, and tools
 */
import React from 'react'
import { motion } from 'framer-motion'

const Skills = ({ skills }) => {
  if (!skills) return null

  const skillCategories = [
    { title: 'Languages', items: skills.languages, icon: '💻', color: 'from-blue-500 to-cyan-500' },
    { title: 'Frontend', items: skills.frontend, icon: '🎨', color: 'from-purple-500 to-pink-500' },
    { title: 'Backend', items: skills.backend, icon: '⚙️', color: 'from-green-500 to-emerald-500' },
    { title: 'Databases', items: skills.databases, icon: '🗄️', color: 'from-orange-500 to-red-500' },
    { title: 'Tools', items: skills.tools, icon: '🛠️', color: 'from-yellow-500 to-amber-500' }
  ]

  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          Tech <span className="text-primary">Stack</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-effect p-6 rounded-lg hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`text-3xl bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            🚀 Always learning and exploring new technologies
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills
