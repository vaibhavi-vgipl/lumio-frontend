// src/components/ChatBot/StepQuestion.jsx
import './StepQuestion.css'

const WORD_LIMIT = 100

function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

export default function StepQuestion({
  question, options, type,
  placeholder, optional, selected, onSelect
}) {
  const wordCount = type === 'text' ? countWords(selected || '') : 0
  const isOver    = wordCount > WORD_LIMIT

  function handleTextChange(e) {
    const val   = e.target.value
    const words = countWords(val)
    if (words <= WORD_LIMIT) {
      onSelect(val)
    } else {
      // allow typing but cap — trim to 100 words
      const trimmed = val.trim().split(/\s+/).slice(0, WORD_LIMIT).join(' ')
      onSelect(trimmed)
    }
  }

  return (
    <div className="sq-root">
      <p className="sq-question">{question}</p>

      {type === 'text' ? (
        <div className="sq-text-wrap">
          {optional && <span className="sq-optional-badge">Optional</span>}
          <textarea
            className={`sq-textarea ${isOver ? 'over-limit' : ''}`}
            placeholder={placeholder}
            value={selected || ''}
            onChange={handleTextChange}
            rows={4}
          />
          <div className="sq-word-count-row">
            <span className={`sq-word-count ${wordCount >= 90 ? 'warn' : ''}`}>
              {wordCount} / {WORD_LIMIT} words
            </span>
            {wordCount >= 90 && (
              <span className="sq-word-warn">Approaching limit</span>
            )}
          </div>
        </div>
      ) : (
        <div className="sq-options">
          {options.map(opt => {
            const label = typeof opt === 'string' ? opt : opt.label
            const icon  = typeof opt === 'object' ? opt.icon : null
            return (
              <button
                key={label}
                className={`sq-option ${selected === label ? 'selected' : ''}`}
                onClick={() => onSelect(label)}
              >
                {icon && <span className="sq-option-icon">{icon}</span>}
                {label}
                {selected === label && (
                  <span className="sq-check">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}