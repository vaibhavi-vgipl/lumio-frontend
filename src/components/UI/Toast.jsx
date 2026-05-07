// src/components/UI/Toast.jsx
import { useEffect } from 'react'
import './Toast.css'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {type === 'success' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="rgba(42,122,80,0.15)" stroke="#2A7A50" strokeWidth="1.3"/>
            <path d="M4.5 8l2.5 2.5 5-5"
              stroke="#2A7A50" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {type === 'error' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="rgba(139,32,32,0.15)" stroke="#8B2020" strokeWidth="1.3"/>
            <path d="M5 5l6 6M11 5l-6 6"
              stroke="#8B2020" strokeWidth="1.5"
              strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  )
}