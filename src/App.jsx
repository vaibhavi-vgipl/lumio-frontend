// src/App.jsx
import './styles/global.css'
import { useEffect } from 'react'
import ChatBot from './components/ChatBot/ChatBot'
import { ensureAuth } from './data/api'

export default function App() {
  useEffect(() => {
    ensureAuth()
  }, [])

  return (
    <div className="app-shell">
      <div className="app-watermark">e-banker</div>
      <ChatBot />

      <style>{`
        .app-shell {
          height: 100vh;
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: var(--font);
        }

        .app-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .app-watermark {
          position: absolute;
          font-family: var(--font-display);
          font-size: 96px;
          font-weight: 600;
          color: #30323b;
          letter-spacing: -0.02em;
          user-select: none;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}