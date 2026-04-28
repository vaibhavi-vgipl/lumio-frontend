// src/main.jsx
import './styles/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ReportPreview from './components/Report/ReportPreview'

const isPreview = window.location.pathname === '/report-preview'

ReactDOM.createRoot(document.getElementById('root')).render(
  isPreview ? <ReportPreview /> : <App />
)