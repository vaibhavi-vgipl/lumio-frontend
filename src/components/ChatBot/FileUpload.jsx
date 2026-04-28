// src/components/ChatBot/FileUpload.jsx
import { useState, useRef } from 'react'
import './FileUpload.css'

export default function FileUpload({ onComplete }) {
  const [dragging, setDragging]   = useState(false)
  const [file, setFile]           = useState(null)
  const [fileName, setFileName]   = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded]   = useState(false)
  const inputRef                  = useRef(null)
  const sizerRef                  = useRef(null)

  function handleFile(f) {
    if (!f) return
    setFile(f)
    const nameWithoutExt = f.name.replace(/\.[^/.]+$/, '')
    setFileName(nameWithoutExt)
    simulateUpload()
  }

  function simulateUpload() {
    setUploading(true)
    setUploaded(false)
    setTimeout(() => {
      setUploading(false)
      setUploaded(true)
    }, 1800)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  function handleDragOver(e) {
    e.preventDefault()
    setDragging(true)
  }

  function handleDragLeave() {
    setDragging(false)
  }

  function handleInputChange(e) {
    handleFile(e.target.files[0])
  }

  function handleNameChange(e) {
    setFileName(e.target.value)
    if (sizerRef.current && inputRef.current) {
      // sync width after state update
      setTimeout(() => {
        if (sizerRef.current && inputRef.current) {
          inputRef.current.style.width =
            Math.max(40, sizerRef.current.offsetWidth + 4) + 'px'
        }
      }, 0)
    }
  }

  function handleContinue() {
    onComplete({ file, fileName: fileName || 'Report' })
  }

  function handleSkip() {
    onComplete({ file: null, fileName: 'Report' })
  }

  return (
    <div className="fu-root">

      {/* Drop zone */}
      <div
        className={`fu-dropzone ${dragging ? 'dragging' : ''} ${uploaded ? 'uploaded' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !file && document.getElementById('fu-file-input').click()}
      >
        <input
          id="fu-file-input"
          type="file"
          accept=".xlsx,.xls,.csv,.pdf"
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />

        {!file && !uploading && (
          <div className="fu-idle">
            <div className="fu-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="6" width="20" height="16" rx="2"
                  stroke="#D4A843" strokeWidth="1.4" fill="rgba(212,168,67,0.08)"/>
                <path d="M4 10h20" stroke="#D4A843" strokeWidth="1.2"/>
                <path d="M9 14h4M9 17h7" stroke="#D4A843"
                  strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M18 14l2 2-2 2" stroke="#D4A843"
                  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="fu-idle-text">
              Drop your report file here
            </div>
            <div className="fu-idle-sub">
              .xlsx · .csv · .pdf supported
            </div>
            <button
              className="fu-browse-btn"
              onClick={e => { e.stopPropagation(); document.getElementById('fu-file-input').click() }}
            >
              Browse file
            </button>
          </div>
        )}

        {uploading && (
          <div className="fu-uploading">
            <div className="fu-upload-spinner" />
            <div className="fu-upload-text">Reading file...</div>
            <div className="fu-upload-bar">
              <div className="fu-upload-fill" />
            </div>
          </div>
        )}

        {uploaded && !uploading && (
          <div className="fu-done">
            <div className="fu-done-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10"
                  fill="rgba(42,122,80,0.1)" stroke="#2A7A50" strokeWidth="1.4"/>
                <path d="M6.5 11l3 3 6-6"
                  stroke="#2A7A50" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="fu-done-name">{file?.name}</div>
            <div className="fu-done-size">
              {file ? (file.size / 1024).toFixed(1) + ' KB' : ''}
            </div>
            <button
              className="fu-reupload"
              onClick={e => {
                e.stopPropagation()
                setFile(null)
                setUploaded(false)
                setFileName('')
              }}
            >
              Change file
            </button>
          </div>
        )}
      </div>

      {/* File name editor */}
      {uploaded && (
        <div className="fu-name-row">
          <span className="fu-name-label">File name</span>
          <div className="fu-name-input-wrap">
            <span className="fu-arrow">←</span>
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <span
                ref={sizerRef}
                className="fu-name-sizer"
                aria-hidden="true"
              >
                {fileName || ' '}
              </span>
              <input
                ref={inputRef}
                className="fu-name-input"
                value={fileName}
                onChange={handleNameChange}
                maxLength={48}
                spellCheck={false}
                style={{ minWidth: 40 }}
              />
            </div>
            <span className="fu-arrow">→</span>
            <span className="fu-ext">.pdf</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="fu-actions">
        <button className="fu-skip" onClick={handleSkip}>
          Skip — no file
        </button>
        <button
          className="fu-continue"
          onClick={handleContinue}
          disabled={!uploaded && !!file}
        >
          {uploaded ? 'Continue →' : 'Skip & Continue →'}
        </button>
      </div>

    </div>
  )
}