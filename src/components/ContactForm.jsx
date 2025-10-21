/**
 * ContactForm Component
 * Handles message submission with localStorage storage and email sending via EmailJS
 * Features:
 * - Validates form inputs
 * - Sends email to portfolio owner via EmailJS
 * - Saves messages to localStorage (key: 'portfolio_messages')
 * - Auto-downloads individual message as JSON file
 * - Provides "Download All" button for bulk export
 * - Shows success/error notifications
 */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const ContactForm = ({ profile, localStorageAvailable }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [notification, setNotification] = useState(null)

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Validate phone format (optional field, but if provided must be valid)
  const validatePhone = (phone) => {
    if (!phone.trim()) return true // Phone is optional
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
    return re.test(phone)
  }

  // Validate form
  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    return newErrors
  }

  // Download JSON file
  const downloadJSON = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Show sending notification
    showNotification('Sending message...', 'info')

    try {
      // Create message object with timestamp
      const message = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        message: formData.message.trim(),
        timestamp: new Date().toISOString()
      }

      // EmailJS configuration
      const EMAILJS_SERVICE_ID = 'service_wl0n85r'  // Your Service ID
      const EMAILJS_TEMPLATE_ID = 'template_rlij7cs'  // Your Template ID
      const EMAILJS_PUBLIC_KEY = 'rGcPZYNBqKb4VoFsm'  // Your Public Key

      // Send email via EmailJS (using standard EmailJS variable names)
      try {
        const templateParams = {
          to_name: 'Santosh',
          from_name: message.name,
          from_email: message.email,
          phone_number: message.phone,
          message: message.message,
          reply_to: message.email
        }
        
        console.log('Sending email with params:', templateParams)
        
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        )
        
        console.log('Email sent successfully via EmailJS')
      } catch (emailError) {
        console.error('EmailJS error:', emailError)
        // Continue even if email fails - still save to localStorage
      }

      // Save to localStorage if available
      if (localStorageAvailable) {
        const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]')
        const updatedMessages = [message, ...existingMessages]
        localStorage.setItem('portfolio_messages', JSON.stringify(updatedMessages))

        // Download individual message
        const filename = `message_${message.timestamp.replace(/[:.]/g, '-')}.json`
        downloadJSON(message, filename)
      }

      // Show success notification
      showNotification('✓ Message sent successfully! You will receive a response soon.')

      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' })
      setErrors({})
    } catch (error) {
      console.error('Error sending message:', error)
      showNotification('Failed to send message. Please try again or email directly at ' + profile.email, 'error')
    }
  }

  // Download all messages
  const handleDownloadAll = () => {
    if (!localStorageAvailable) {
      showNotification('localStorage is not available.', 'error')
      return
    }

    try {
      const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]')
      
      if (messages.length === 0) {
        showNotification('No messages to download.', 'error')
        return
      }

      const filename = `all_messages_${new Date().toISOString().replace(/[:.]/g, '-')}.json`
      downloadJSON(messages, filename)
      showNotification(`✓ Downloaded ${messages.length} messages as ${filename}`)
    } catch (error) {
      console.error('Error downloading messages:', error)
      showNotification('Failed to download messages.', 'error')
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="glass-effect p-8 rounded-lg">
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            notification.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/50 text-green-400' 
              : notification.type === 'info'
              ? 'bg-blue-500/10 border border-blue-500/50 text-blue-400'
              : 'bg-red-500/10 border border-red-500/50 text-red-400'
          }`}
        >
          {notification.message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!localStorageAvailable}
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.name ? 'border-red-500' : 'border-white/10'
            } rounded-lg focus:outline-none focus:border-primary transition text-white disabled:opacity-50`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!localStorageAvailable}
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.email ? 'border-red-500' : 'border-white/10'
            } rounded-lg focus:outline-none focus:border-primary transition text-white disabled:opacity-50`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Mobile Number <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!localStorageAvailable}
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.phone ? 'border-red-500' : 'border-white/10'
            } rounded-lg focus:outline-none focus:border-primary transition text-white disabled:opacity-50`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={!localStorageAvailable}
            rows={5}
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.message ? 'border-red-500' : 'border-white/10'
            } rounded-lg focus:outline-none focus:border-primary transition text-white resize-none disabled:opacity-50`}
            placeholder="Your message..."
          />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-primary hover:bg-secondary transition rounded-lg font-medium"
          >
            Send Message
          </button>
        </div>
      </form>

      {/* Info Text */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-blue-300">
          Your message will be sent directly to <strong>{profile.email}</strong> 📧
        </p>
      </div>
    </div>
  )
}

export default ContactForm
