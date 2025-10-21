/**
 * AdminPanel Component
 * Client-side admin interface to view and manage messages from localStorage
 * Features:
 * - View all messages in a table
 * - Clear all messages with confirmation
 * - Download all messages
 * - Real-time message count
 */
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AdminPanel = ({ onClose }) => {
  const [messages, setMessages] = useState([])
  const [notification, setNotification] = useState(null)

  // Load messages from localStorage
  const loadMessages = () => {
    try {
      const stored = localStorage.getItem('portfolio_messages')
      const parsed = stored ? JSON.parse(stored) : []
      setMessages(parsed)
    } catch (error) {
      console.error('Error loading messages:', error)
      showNotification('Failed to load messages', 'error')
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Clear all messages
  const handleClearAll = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete all ${messages.length} messages? This cannot be undone.`
    )
    
    if (confirmed) {
      try {
        localStorage.removeItem('portfolio_messages')
        setMessages([])
        showNotification('All messages cleared successfully')
      } catch (error) {
        console.error('Error clearing messages:', error)
        showNotification('Failed to clear messages', 'error')
      }
    }
  }

  // Download all messages
  const handleDownload = () => {
    try {
      if (messages.length === 0) {
        showNotification('No messages to download', 'error')
        return
      }

      const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `admin_export_${new Date().toISOString().replace(/[:.]/g, '-')}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      showNotification(`Downloaded ${messages.length} messages`)
    } catch (error) {
      console.error('Error downloading messages:', error)
      showNotification('Failed to download messages', 'error')
    }
  }

  // Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Admin <span className="text-primary">Panel</span>
            </h1>
            <p className="text-gray-400">
              Manage contact form messages ({messages.length} total)
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 glass-effect hover:bg-white/10 transition rounded-lg font-medium"
          >
            ← Back to Site
          </button>
        </div>

        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              notification.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/50 text-green-400' 
                : 'bg-red-500/10 border border-red-500/50 text-red-400'
            }`}
          >
            {notification.message}
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleDownload}
            disabled={messages.length === 0}
            className="px-6 py-3 bg-primary hover:bg-secondary transition rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            📥 Download All
          </button>
          <button
            onClick={handleClearAll}
            disabled={messages.length === 0}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 transition rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🗑️ Clear All Messages
          </button>
          <button
            onClick={loadMessages}
            className="px-6 py-3 glass-effect hover:bg-white/10 transition rounded-lg font-medium"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Messages Table */}
        {messages.length === 0 ? (
          <div className="glass-effect p-12 text-center rounded-lg">
            <p className="text-gray-400 text-lg">No messages yet</p>
            <p className="text-gray-600 text-sm mt-2">Messages will appear here when users submit the contact form</p>
          </div>
        ) : (
          <div className="glass-effect rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {messages.map((msg, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(msg.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {msg.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {msg.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-md">
                        <div className="line-clamp-2" title={msg.message}>
                          {msg.message}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">💡 About Message Storage</h3>
          <div className="text-sm text-blue-200 space-y-2">
            <p>
              • Messages are stored in <code className="bg-white/10 px-2 py-1 rounded">localStorage</code> under the key <code className="bg-white/10 px-2 py-1 rounded">portfolio_messages</code>
            </p>
            <p>
              • No backend server or database is used - everything is client-side only
            </p>
            <p>
              • Each message is automatically downloaded when submitted
            </p>
            <p>
              • To manually access messages, open DevTools Console and run:
            </p>
            <code className="block bg-white/10 p-3 rounded mt-2 font-mono text-xs">
              JSON.parse(localStorage.getItem('portfolio_messages'))
            </code>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminPanel
