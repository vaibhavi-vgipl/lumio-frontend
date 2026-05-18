// src/data/api.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://samruddhiss-macbook-pro.local:8742'

// dev credentials — replace with proper login screen later
const DEV_EMAIL    = 'vaibhavi4@test.com'
const DEV_PASSWORD = 'test1234'

// ── Token management ──────────────────────────────────

export function getToken() {
  return localStorage.getItem('lumio_token')
}

function setToken(token) {
  localStorage.setItem('lumio_token', token)
}

export function isLoggedIn() {
  return !!getToken()
}

export function logout() {
  localStorage.removeItem('lumio_token')
}

// auto login — call on app start
export async function ensureAuth() {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: DEV_EMAIL, password: DEV_PASSWORD })
    })
    if (!res.ok) throw new Error('Login failed')
    const data = await res.json()
    setToken(data.access_token)
    return data.access_token
  } catch {
    return null
  }
}

// smart fetch — auto refreshes token on 401
async function apiFetch(url, options = {}) {
  let token = getToken()

  let res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    }
  })

  // token expired — auto login and retry once
  if (res.status === 401) {
    token = await ensureAuth()
    if (token) {
      res = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        }
      })
    }
  }

  return res
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
  setToken(data.access_token)
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
  const res = await apiFetch(`${BASE_URL}/auth/me`)
  if (!res.ok) throw new Error('Not authenticated')
  return res.json()
}

export async function updateMe(updates) {
  const res = await apiFetch(`${BASE_URL}/auth/me`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  })
  if (!res.ok) throw new Error('Update failed')
  return res.json()
}

// ── Report type mapper ────────────────────────────────

function mapReportType(reportType) {
  const map = {
    'Profit & Loss':  'loan_disbursement',
    'NPA Report':     'npa_analysis',
    'Loan Report':    'loan_disbursement',
    'Credit Report':  'credit_risk',
    'Deposit Report': 'loan_disbursement',
  }
  return map[reportType] || 'loan_disbursement'
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
  const res = await apiFetch(`${BASE_URL}/api/generate-report`, {
    method: 'POST',
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

export async function exportPDFFromAPI(reportType, reportData) {
  const res = await apiFetch(`${BASE_URL}/api/export-pdf`, {
    method: 'POST',
    body: JSON.stringify({
      report_type: reportType,
      report_data: {
        report_sections:   reportData.report_sections   || [],
        insights:          reportData.insights          || [],
        chart_suggestions: reportData.chart_suggestions || [],
        resolved_values:   reportData.resolved_values   || {}
      }
    })
  })
  if (!res.ok) throw new Error('Export failed')
  return res.json()
}

// ── Projects ──────────────────────────────────────────

export async function getProjects() {
  const res = await apiFetch(`${BASE_URL}/api/projects`)
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}

export async function getProject(projectId) {
  const res = await apiFetch(`${BASE_URL}/api/projects/${projectId}`)
  if (!res.ok) throw new Error('Failed to fetch project')
  return res.json()
}

export async function createProject({ name, reportType, period, region, customPrompt }) {
  const res = await apiFetch(`${BASE_URL}/api/projects`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      report_type:   mapReportType(reportType),
      nl_request:    buildNLRequest({ reportType, period, region, customPrompt }),
      branch_code:   'qcmm7MUzU0z5DJZQF5II',
      date_range:    buildDateRange(period),
      report_config: {}
    })
  })
  if (!res.ok) throw new Error('Failed to create project')
  return res.json()
}

export async function updateProject(projectId, updates) {
  const res = await apiFetch(`${BASE_URL}/api/projects/${projectId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  })
  if (!res.ok) throw new Error('Failed to update project')
  return res.json()
}

export async function deleteProject(projectId) {
  const res = await apiFetch(`${BASE_URL}/api/projects/${projectId}`, {
    method: 'DELETE'
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