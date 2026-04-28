// src/components/ChatBot/ChatBot.jsx
import { useState } from 'react'
import ChatBubble from './ChatBubble'
import './ChatBot.css'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  function handleToggle() {
    if (isAnimating) return
    setIsAnimating(true)
    setIsOpen(prev => !prev)
    setTimeout(() => setIsAnimating(false), 400)
  }

  return (
    <>
      {isOpen && <ChatBubble onClose={handleToggle} />}
      <button
        className={`chat-fab ${isOpen ? 'open' : ''} ${isAnimating ? 'animating' : ''}`}
        onClick={handleToggle}
        title="Generate Report"
      >
        <span className="chat-fab-tooltip">Generate Report</span>

        {/* Report icon — morphs to X when open */}
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
            <path d="M5 20.5L7 18.5L9 20"
              stroke="#D4A843" strokeWidth="1.1"
              strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 20L19 17L21 19.5"
              stroke="#D4A843" strokeWidth="1.1"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>

        <span className={`fab-icon fab-close ${isOpen ? '' : 'hidden'}`}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16"
              stroke="#D4A843" strokeWidth="2"
              strokeLinecap="round"/>
          </svg>
        </span>

        <span className="fab-ripple" />
      </button>
    </>
  )
}