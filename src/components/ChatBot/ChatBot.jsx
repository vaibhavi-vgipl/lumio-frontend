// src/components/ChatBot/ChatBot.jsx
import { useState } from 'react'
import ChatBubble from './ChatBubble'
import ReportPreview from '../Report/ReportPreview'
import './ChatBot.css'

export default function ChatBot() {
  const [isOpen,     setIsOpen]     = useState(false)
  const [isAnimating,setIsAnimating]= useState(false)
  const [previewConfig, setPreviewConfig] = useState(null)

  function handleToggle() {
    if (isAnimating) return
    setIsAnimating(true)
    setIsOpen(prev => !prev)
    setTimeout(() => setIsAnimating(false), 400)
  }

  function handlePreview(config) {
    setPreviewConfig(config)
    setIsOpen(false)
  }

  function handleClosePreview() {
    setPreviewConfig(null)
  }

  return (
    <>
      {/* Full screen preview overlay */}
      {previewConfig && (
        <div className="preview-overlay-wrap">
          <button className="preview-back-btn" onClick={handleClosePreview}>
            ← Back
          </button>
          <ReportPreview inlineConfig={previewConfig} />
        </div>
      )}

      {!previewConfig && (
        <>
          {isOpen && (
            <ChatBubble
              onClose={handleToggle}
              onPreview={handlePreview}
            />
          )}
          <button
            className={`chat-fab ${isOpen ? 'open' : ''} ${isAnimating ? 'animating' : ''}`}
            onClick={handleToggle}
          >
            <span className="chat-fab-tooltip">Generate Report</span>
            <span className={`fab-icon fab-report ${isOpen ? 'hidden' : ''}`}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="3" y="3" width="8" height="10" rx="1.5"
                  fill="rgba(212,168,67,0.25)" stroke="#D4A843" strokeWidth="1.2"/>
                <rect x="15" y="3" width="8" height="6" rx="1.5"
                  fill="rgba(212,168,67,0.25)" stroke="#D4A843" strokeWidth="1.2"/>
                <rect x="15" y="13" width="8" height="10" rx="1.5"
                  fill="rgba(212,168,67,0.5)" stroke="#D4A843" strokeWidth="1.2"/>
                <rect x="3" y="17" width="8" height="6" rx="1.5"
                  fill="rgba(212,168,67,0.5)" stroke="#D4A843" strokeWidth="1.2"/>
              </svg>
            </span>
            <span className={`fab-icon fab-close ${isOpen ? '' : 'hidden'}`}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2L16 16M16 2L2 16"
                  stroke="#D4A843" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="fab-ripple" />
          </button>
        </>
      )}
    </>
  )
}