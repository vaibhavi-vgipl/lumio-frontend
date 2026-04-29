// src/main.jsx
import './styles/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ReportPreview from './components/Report/ReportPreview'

// detect preview mode three ways:
// 1. browser: /report-preview path
// 2. browser: ?preview=1 param
// 3. Tauri: ?preview=1 param
const urlParams = new URLSearchParams(window.location.search)
const isPreview =
  window.location.pathname.includes('report-preview') ||
  urlParams.get('preview') === '1'

ReactDOM.createRoot(document.getElementById('root')).render(
  isPreview ? <ReportPreview /> : <App />
)