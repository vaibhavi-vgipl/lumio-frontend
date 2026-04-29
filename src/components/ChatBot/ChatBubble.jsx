// src/components/ChatBot/ChatBubble.jsx
import { useState, useEffect, useRef } from 'react'
import StepQuestion from './StepQuestion'
import FileUpload from './FileUpload'
import { questions } from '../../data/questions'
import './ChatBubble.css'

const LOADING_STEPS = [
  "Initializing Lumio AI...",
  "Loading report schemas...",
  "Preparing your workspace...",
  "Ready to generate reports",
]

export default function ChatBubble({ onClose, onPreview }) {
  const [phase, setPhase]              = useState('loading')
  const [loadStep, setLoadStep]        = useState(0)
  const [completedSteps, setCompleted] = useState([])
  const [showReady, setShowReady]      = useState(false)
  const [currentStep, setCurrentStep]  = useState(0)
  const [answers, setAnswers]          = useState({})
  const [fileName, setFileName]        = useState('Report')
  const [direction, setDirection]      = useState('forward')
  const [stepKey, setStepKey]          = useState(0)
  const timers = useRef([])
  

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase !== 'loading') return
    const schedule = [
      [0,    () => setLoadStep(0)],
      [900,  () => { setCompleted([0]);       setLoadStep(1) }],
      [1800, () => { setCompleted([0,1]);     setLoadStep(2) }],
      [2700, () => { setCompleted([0,1,2]);   setLoadStep(3) }],
      [3500, () => { setCompleted([0,1,2,3]); setShowReady(true) }],
      [4400, () => setPhase('upload')],
    ]
    schedule.forEach(([delay, fn]) => {
      const t = setTimeout(fn, delay)
      timers.current.push(t)
    })
  }, [phase])

  const visibleQuestions = questions.filter(q => {
    if (!q.dependsOn) return true
    return answers[q.dependsOn.key] === q.dependsOn.value
  })

  const current        = visibleQuestions[currentStep]
  const isLast         = currentStep === visibleQuestions.length - 1
  const selectedAnswer = answers[current?.key]
  const canProceed     = current?.optional ? true : !!selectedAnswer
  const progress       = (currentStep / (visibleQuestions.length - 1)) * 100

  function handleUploadComplete({ file, fileName: fn }) {
    setFileName(fn)
    setPhase('questions')
  }

  function handleSelect(key, value) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function handleNext() {
    if (isLast) handlePreview()
    else {
      setDirection('forward')
      setStepKey(k => k + 1)
      setCurrentStep(p => p + 1)
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setDirection('back')
      setStepKey(k => k + 1)
      setCurrentStep(p => p - 1)
    } else {
      // go back to upload screen
      setPhase('upload')
      setCurrentStep(0)
      setAnswers({})
    }
  }
function handlePreview() {
  const params = Object.fromEntries(
    Object.entries({ ...answers, fileName }).filter(([, v]) => v)
  )
  localStorage.setItem('lumio_report_params', new URLSearchParams(params).toString())
  onPreview(params)
}


  return (
    <div className="cb-wrapper">

      {/* Header */}
      <div className="cb-header">
        <div className="cb-header-left">
          <div className="cb-header-icon">
            <svg width="16" height="16" viewBox="0 0 26 26" fill="none">
              <rect x="3" y="3" width="8" height="10" rx="1.5"
                fill="rgba(212,168,67,0.3)" stroke="#D4A843" strokeWidth="1.4"/>
              <rect x="15" y="3" width="8" height="6" rx="1.5"
                fill="rgba(212,168,67,0.3)" stroke="#D4A843" strokeWidth="1.4"/>
              <rect x="15" y="13" width="8" height="10" rx="1.5"
                fill="rgba(212,168,67,0.6)" stroke="#D4A843" strokeWidth="1.4"/>
              <rect x="3" y="17" width="8" height="6" rx="1.5"
                fill="rgba(212,168,67,0.6)" stroke="#D4A843" strokeWidth="1.4"/>
            </svg>
          </div>
          <div>
            <div className="cb-title">Lumio AI</div>
            <div className="cb-subtitle">
              {phase === 'loading'   ? 'Initializing...'   :
               phase === 'upload'    ? 'Upload Data File'   :
               'Report Generator'}
            </div>
          </div>
        </div>
        <button className="cb-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Phase indicator dots */}
      {phase !== 'loading' && (
        <div className="cb-phase-dots">
          <div className={`cb-phase-dot ${phase === 'upload' ? 'active' : 'done'}`} />
          <div className="cb-phase-line" />
          <div className={`cb-phase-dot ${
            phase === 'questions' ? 'active' : phase === 'upload' ? '' : 'done'
          }`} />
        </div>
      )}

      {/* Loading */}
      {phase === 'loading' && (
        <div className="cb-loading">
          <div className="cb-orb-wrap">
            <div className="cb-ring cb-ring-1" />
            <div className="cb-ring cb-ring-2" />
            <div className="cb-ring cb-ring-3" />
            <div className="cb-orb-core">
              <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
                <rect x="3" y="3" width="8" height="10" rx="1.5"
                  fill="rgba(212,168,67,0.4)" stroke="#D4A843" strokeWidth="1.4"/>
                <rect x="15" y="3" width="8" height="6" rx="1.5"
                  fill="rgba(212,168,67,0.4)" stroke="#D4A843" strokeWidth="1.4"/>
                <rect x="15" y="13" width="8" height="10" rx="1.5"
                  fill="rgba(212,168,67,0.7)" stroke="#D4A843" strokeWidth="1.4"/>
                <rect x="3" y="17" width="8" height="6" rx="1.5"
                  fill="rgba(212,168,67,0.7)" stroke="#D4A843" strokeWidth="1.4"/>
              </svg>
            </div>
          </div>

          <div className="cb-load-steps">
            {LOADING_STEPS.map((text, i) => {
              const isDone   = completedSteps.includes(i)
              const isActive = loadStep === i && !isDone
              return (
                <div
                  key={i}
                  className="cb-load-step"
                  style={{
                    opacity:    i <= loadStep ? 1 : 0.2,
                    transform:  i <= loadStep
                      ? 'translateX(0)' : 'translateX(-10px)',
                    transition: `opacity 0.45s ease ${i * 0.06}s,
                                 transform 0.45s ease ${i * 0.06}s`,
                    color: isDone
                      ? 'var(--text-muted)'
                      : isActive ? 'var(--ink)' : 'var(--text-sub)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <div
                    className="cb-load-dot"
                    style={{
                      borderColor: isDone || isActive
                        ? 'var(--gold)' : 'var(--border-strong)',
                      background: isDone || isActive
                        ? 'var(--gold-light)' : 'var(--surface-2)',
                    }}
                  >
                    {isDone
                      ? <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5l2 2 4-4"
                            stroke="#D4A843" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      : isActive
                        ? <div className="cb-dot-pulse" />
                        : null
                    }
                  </div>
                  <span>{text}</span>
                </div>
              )
            })}
          </div>

          <div
            className="cb-ready-text"
            style={{
              opacity:    showReady ? 1 : 0,
              transform:  showReady ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            ✦ All systems ready
          </div>
        </div>
      )}

      {/* Upload phase */}
      {phase === 'upload' && (
        <FileUpload onComplete={handleUploadComplete} />
      )}

      {/* Questions phase */}
      {phase === 'questions' && (
        <div className="cb-questions-phase">

          {/* Progress */}
          <div className="cb-progress-bar">
            <div className="cb-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Step meta */}
          <div className="cb-step-meta">
            <span className="cb-step-count">
              {currentStep + 1}
              <span> / {visibleQuestions.length}</span>
            </span>
            <span className="cb-step-label">{current?.subtitle}</span>
          </div>

          {/* Question body */}
          <div
            className="cb-body"
            key={stepKey}
            style={{
              animation: `${direction === 'forward'
                ? 'slideInForward' : 'slideInBack'
              } 0.3s cubic-bezier(0.4,0,0.2,1) both`
            }}
          >
            {current && (
              <StepQuestion
                question={current.question}
                options={current.options}
                type={current.type}
                placeholder={current.placeholder}
                optional={current.optional}
                selected={selectedAnswer}
                onSelect={(value) => handleSelect(current.key, value)}
              />
            )}
          </div>

          {/* Answer chips */}
          {Object.keys(answers).length > 0 && (
            <div className="cb-answers-strip">
              {Object.entries(answers).filter(([, v]) => v).map(([k, v]) => (
                <span key={k} className="cb-answer-chip">
                  {v.length > 22 ? v.slice(0, 22) + '…' : v}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="cb-footer">
            <button
              className="cb-btn secondary"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="cb-btn primary"
              onClick={handleNext}
              disabled={!canProceed}
            >
              {isLast ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 6.5H12M7 1.5L12 6.5L7 11.5"
                      stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Preview Report
                </>
              ) : 'Next →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}