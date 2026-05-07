// src/data/api.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://samruddhiss-macbook-pro.local:8742'

const DEV_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWY5ZDFmNzJiYjZhNzVjNjNmMTRkZDEiLCJleHAiOjE3Nzc5ODM1MTUsImlhdCI6MTc3Nzk3OTkxNX0.LsKUkVKgiHWv8MnQ-hdSG7CsO2XE431N-5soqH4Nrp8'

export function getToken() {
  return localStorage.getItem('lumio_token') || DEV_TOKEN
}

export function isLoggedIn() {
  return !!getToken()
}

export function logout() {
  localStorage.removeItem('lumio_token')
}

// ── Auth ──────────────────────────────────────────────

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Login failed')
  const data = await res.json()
  localStorage.setItem('lumio_token', data.access_token)
  return data
}

export async function register(name, email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  if (!res.ok) throw new Error('Registration failed')
  return res.json()
}

export async function getMe() {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  if (!res.ok) throw new Error('Not authenticated')
  return res.json()
}

export async function updateMe(updates) {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(updates)
  })
  if (!res.ok) throw new Error('Update failed')
  return res.json()
}

// ── Report type mapper ────────────────────────────────

function mapReportType(reportType) {
  const map = {
    'Profit & Loss':  'profit_loss',
    'NPA Report':     'npa_analysis',
    'Loan Report':    'loan_disbursement',
    'Credit Report':  'credit_risk',
    'Deposit Report': 'deposit_analysis',
  }
  return map[reportType] || 'profit_loss'
}

// ── Helpers ───────────────────────────────────────────

function buildNLRequest({ reportType, period, region, customPrompt }) {
  let text = `Generate a ${reportType} report`
  if (period)       text += ` for ${period}`
  if (region)       text += ` for ${region}`
  if (customPrompt) text += `. Additional focus: ${customPrompt}`
  return text
}

function buildDateRange(period) {
  if (!period) return { period: 'FY2024' }
  const map = {
    'Q1 FY2024':        { start: '2024-04-01', end: '2024-06-30', label: 'Q1 FY2024'  },
    'Q2 FY2024':        { start: '2024-07-01', end: '2024-09-30', label: 'Q2 FY2024'  },
    'Q3 FY2024':        { start: '2024-10-01', end: '2024-12-31', label: 'Q3 FY2024'  },
    'Q4 FY2024':        { start: '2025-01-01', end: '2025-03-31', label: 'Q4 FY2024'  },
    'Full Year FY2024': { start: '2024-04-01', end: '2025-03-31', label: 'FY2024'      },
    'Full Year FY2023': { start: '2023-04-01', end: '2024-03-31', label: 'FY2023'      },
  }
  return map[period] || { period }
}

// ── Report Generation ─────────────────────────────────

export async function generateReport({ reportType, period, region, customPrompt, projectId }) {
  const res = await fetch(`${BASE_URL}/api/generate-report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      report_type: mapReportType(reportType),
      nl_request:  buildNLRequest({ reportType, period, region, customPrompt }),
      branch_code: 'qcmm7MUzU0z5DJZQF5II',
      date_range:  buildDateRange(period),
      project_id:  projectId || null
    })
  })
  if (!res.ok) throw new Error('Report generation failed')
  return res.json()
}

// ── Export PDF ────────────────────────────────────────

export async function exportPDFFromAPI(projectId) {
  const res = await fetch(`${BASE_URL}/api/export-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ project_id: projectId })
  })
  if (!res.ok) throw new Error('Export failed')
  return res.json() // returns a string (PDF URL or base64)
}

// ── Projects ──────────────────────────────────────────

export async function getProjects() {
  const res = await fetch(`${BASE_URL}/api/projects`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}

export async function getProject(projectId) {
  const res = await fetch(`${BASE_URL}/api/projects/${projectId}`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  if (!res.ok) throw new Error('Failed to fetch project')
  return res.json()
}

export async function createProject({ name, reportType, period, region, customPrompt }) {
  const res = await fetch(`${BASE_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      name,
      report_type: mapReportType(reportType),
      nl_request:  buildNLRequest({ reportType, period, region, customPrompt }),
      branch_code: 'qcmm7MUzU0z5DJZQF5II',
      date_range:  buildDateRange(period),
      report_config: {}
    })
  })
  if (!res.ok) throw new Error('Failed to create project')
  return res.json()
}

export async function updateProject(projectId, updates) {
  const res = await fetch(`${BASE_URL}/api/projects/${projectId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(updates)
  })
  if (!res.ok) throw new Error('Failed to update project')
  return res.json()
}

export async function deleteProject(projectId) {
  const res = await fetch(`${BASE_URL}/api/projects/${projectId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  if (!res.ok) throw new Error('Failed to delete project')
  return res.json()
}

// ── Health check ──────────────────────────────────────

export async function healthCheck() {
  const res = await fetch(`${BASE_URL}/health`)
  if (!res.ok) throw new Error('Backend unreachable')
  return res.json()
}