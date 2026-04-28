// src/components/ChatBot/FileNameInput.jsx
import { useRef, useState, useEffect } from 'react'
import './FileNameInput.css'

export default function FileNameInput({ value, onChange }) {
  const inputRef  = useRef(null)
  const sizerRef  = useRef(null)
  const [editing, setEditing] = useState(false)

  // keep sizer in sync — sizer is an invisible span that mirrors the input text
  // so we can measure the natural width and resize the input to match
  useEffect(() => {
    if (sizerRef.current && inputRef.current) {
      inputRef.current.style.width = sizerRef.current.offsetWidth + 'px'
    }
  }, [value])

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      inputRef.current.blur()
    }
  }

  return (
    <div className="fn-root">
      <span className="fn-arrow">←</span>

      <div className={`fn-input-wrap ${editing ? 'editing' : ''}`}>
        {/* invisible sizer span */}
        <span className="fn-sizer" ref={sizerRef} aria-hidden="true">
          {value || ' '}
        </span>
        <input
          ref={inputRef}
          className="fn-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setEditing(true)}
          onBlur={() => setEditing(false)}
          onKeyDown={handleKeyDown}
          maxLength={48}
          spellCheck={false}
        />
      </div>

      <span className="fn-arrow">→</span>
      <span className="fn-ext">.pdf</span>
    </div>
  )
}