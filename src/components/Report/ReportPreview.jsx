// src/components/Report/ReportPreview.jsx
import { useEffect, useState } from 'react'
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { mockReportData } from '../../data/mockReportData'
import './ReportPreview.css'

const COLORS = ['#1A1A2E','#D4A843','#2A7A50','#8B2020','#4A6FA5','#9B6E2C']

const GENERATING_STEPS = [
  { text: "Reading report configuration...", duration: 600  },
  { text: "Fetching data from CBS...",        duration: 900  },
  { text: "Processing records...",            duration: 800  },
  { text: "Running AI analysis...",           duration: 1000 },
  { text: "Building visualizations...",       duration: 700  },
  { text: "Finalizing report...",             duration: 500  },
]

const CHART_DATA = {
  'Profit & Loss': {
    bar: [
      { name: 'Q1', Revenue: 112, Expenses: 88,  Profit: 24 },
      { name: 'Q2', Revenue: 118, Expenses: 94,  Profit: 24 },
      { name: 'Q3', Revenue: 124, Expenses: 103, Profit: 21 },
      { name: 'Q4', Revenue: 128, Expenses: 106, Profit: 22 },
    ],
    pie: [
      { name: 'West',  value: 30.7 },
      { name: 'North', value: 24.5 },
      { name: 'South', value: 23.0 },
      { name: 'East',  value: 13.8 },
      { name: 'Other', value: 8.0  },
    ],
    line: [
      { name: 'Q1', West: 28.1, South: 26.8, North: 23.1 },
      { name: 'Q2', West: 29.4, South: 25.9, North: 23.8 },
      { name: 'Q3', West: 30.2, South: 24.2, North: 24.2 },
      { name: 'Q4', West: 30.7, South: 23.0, North: 24.5 },
    ],
    histogram: [
      { range: '0–5M',   count: 4  },
      { range: '5–10M',  count: 8  },
      { range: '10–15M', count: 14 },
      { range: '15–20M', count: 9  },
      { range: '20–25M', count: 3  },
    ],
  },
  'NPA Report': {
    bar: [
      { name: 'Q1', GrossNPA: 108, NetNPA: 76, Provisions: 32 },
      { name: 'Q2', GrossNPA: 114, NetNPA: 81, Provisions: 33 },
      { name: 'Q3', GrossNPA: 119, NetNPA: 85, Provisions: 34 },
      { name: 'Q4', GrossNPA: 124, NetNPA: 89, Provisions: 35 },
    ],
    pie: [
      { name: 'Delhi NCR',      value: 31 },
      { name: 'Mumbai Central', value: 28 },
      { name: 'Bengaluru Tech', value: 24 },
      { name: 'Chennai Port',   value: 22 },
      { name: 'Hyderabad East', value: 19 },
    ],
    line: [
      { name: 'Q1', NPA_Ratio: 3.6 },
      { name: 'Q2', NPA_Ratio: 3.8 },
      { name: 'Q3', NPA_Ratio: 4.0 },
      { name: 'Q4', NPA_Ratio: 4.2 },
    ],
    histogram: [
      { range: '0–2%',  count: 3  },
      { range: '2–4%',  count: 7  },
      { range: '4–6%',  count: 11 },
      { range: '6–8%',  count: 5  },
      { range: '8–10%', count: 2  },
    ],
  },
  'Loan Report': {
    bar: [
      { name: 'Q1', Disbursed: 280, Outstanding: 210 },
      { name: 'Q2', Disbursed: 295, Outstanding: 225 },
      { name: 'Q3', Disbursed: 310, Outstanding: 240 },
      { name: 'Q4', Disbursed: 320, Outstanding: 250 },
    ],
    pie: [
      { name: 'Home Loans',     value: 38 },
      { name: 'Personal Loans', value: 26 },
      { name: 'Auto Loans',     value: 18 },
      { name: 'Business Loans', value: 12 },
      { name: 'Others',         value: 6  },
    ],
    line: [
      { name: 'Q1', Repayment: 93.4, Default: 6.6 },
      { name: 'Q2', Repayment: 93.8, Default: 6.2 },
      { name: 'Q3', Repayment: 94.0, Default: 6.0 },
      { name: 'Q4', Repayment: 94.2, Default: 5.8 },
    ],
    histogram: [
      { range: '< 1L',   count: 12 },
      { range: '1–5L',   count: 28 },
      { range: '5–10L',  count: 19 },
      { range: '10–25L', count: 11 },
      { range: '> 25L',  count: 6  },
    ],
  },
  'Credit Report': {
    bar: [
      { name: 'Q1', Approved: 340, Rejected: 60, Pending: 40 },
      { name: 'Q2', Approved: 360, Rejected: 55, Pending: 35 },
      { name: 'Q3', Approved: 390, Rejected: 48, Pending: 30 },
      { name: 'Q4', Approved: 410, Rejected: 42, Pending: 28 },
    ],
    pie: [
      { name: 'Excellent (750+)', value: 32 },
      { name: 'Good (700–749)',   value: 28 },
      { name: 'Fair (650–699)',   value: 22 },
      { name: 'Poor (<650)',      value: 18 },
    ],
    line: [
      { name: 'Q1', AvgScore: 698, Defaults: 5.2 },
      { name: 'Q2', AvgScore: 704, Defaults: 4.8 },
      { name: 'Q3', AvgScore: 711, Defaults: 4.3 },
      { name: 'Q4', AvgScore: 718, Defaults: 3.9 },
    ],
    histogram: [
      { range: '< 600',   count: 8  },
      { range: '600–650', count: 14 },
      { range: '650–700', count: 22 },
      { range: '700–750', count: 28 },
      { range: '750+',    count: 18 },
    ],
  },
  'Deposit Report': {
    bar: [
      { name: 'Q1', FD: 420, RD: 180, Savings: 310 },
      { name: 'Q2', FD: 445, RD: 195, Savings: 328 },
      { name: 'Q3', FD: 468, RD: 210, Savings: 344 },
      { name: 'Q4', FD: 492, RD: 228, Savings: 361 },
    ],
    pie: [
      { name: 'Fixed Deposit',   value: 48 },
      { name: 'Savings Account', value: 32 },
      { name: 'Recurring Dep.',  value: 14 },
      { name: 'Current Account', value: 6  },
    ],
    line: [
      { name: 'Q1', TotalDeposits: 910,  GrowthRate: 4.2 },
      { name: 'Q2', TotalDeposits: 968,  GrowthRate: 6.4 },
      { name: 'Q3', TotalDeposits: 1022, GrowthRate: 5.6 },
      { name: 'Q4', TotalDeposits: 1081, GrowthRate: 5.8 },
    ],
    histogram: [
      { range: '< 10K',    count: 18 },
      { range: '10–50K',   count: 32 },
      { range: '50–100K',  count: 24 },
      { range: '100–500K', count: 16 },
      { range: '500K+',    count: 10 },
    ],
  },
}

function getChartData(reportType) {
  return CHART_DATA[reportType] || CHART_DATA['Profit & Loss']
}

const tooltipStyle = {
  fontSize: 11, borderRadius: 8,
  border: '1px solid rgba(0,0,0,0.08)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
}

// ── Chart components ──────────────────────────────────

function BarSection({ data, reportType }) {
  const keys = Object.keys(data.bar[0]).filter(k => k !== 'name')
  return (
    <div className="rp-chart-box">
      <div className="rp-chart-title">{reportType} — Quarterly Overview</div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data.bar} margin={{ top:10, right:20, left:0, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="name" tick={{ fontSize:11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize:11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize:11, paddingTop:12 }} />
          {keys.map((k, i) => (
            <Bar key={k} dataKey={k} fill={COLORS[i]}
              radius={[4,4,0,0]} maxBarSize={48} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function PieSection({ data }) {
  return (
    <div className="rp-chart-box">
      <div className="rp-chart-title">Distribution Breakdown</div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data.pie} cx="50%" cy="50%"
            innerRadius={65} outerRadius={100}
            paddingAngle={3} dataKey="value"
            animationBegin={0} animationDuration={900}
          >
            {data.pie.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={v => `${v}%`} />
          <Legend wrapperStyle={{ fontSize:11, paddingTop:12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function LineSection({ data, reportType }) {
  const keys = Object.keys(data.line[0]).filter(k => k !== 'name')
  return (
    <div className="rp-chart-box">
      <div className="rp-chart-title">Trend Analysis — {reportType}</div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data.line} margin={{ top:10, right:20, left:0, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="name" tick={{ fontSize:11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize:11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize:11, paddingTop:12 }} />
          {keys.map((k, i) => (
            <Line key={k} type="monotone" dataKey={k}
              stroke={COLORS[i]} strokeWidth={2.5}
              dot={{ r:4, fill:COLORS[i], strokeWidth:0 }}
              activeDot={{ r:6, strokeWidth:0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function HistogramSection({ data }) {
  return (
    <div className="rp-chart-box">
      <div className="rp-chart-title">Frequency Distribution</div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data.histogram}
          margin={{ top:10, right:20, left:0, bottom:0 }}
          barCategoryGap="2%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="range" tick={{ fontSize:10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize:11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" fill={COLORS[0]} radius={[4,4,0,0]} maxBarSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function ComboSection({ data, reportType }) {
  const keys = Object.keys(data.bar[0]).filter(k => k !== 'name')
  return (
    <div className="rp-chart-box">
      <div className="rp-chart-title">Bar + Line Combo — {reportType}</div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data.bar} margin={{ top:10, right:20, left:0, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey="name" tick={{ fontSize:11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize:11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize:11, paddingTop:12 }} />
          {keys.slice(0, 2).map((k, i) => (
            <Bar key={k} dataKey={k} fill={COLORS[i]}
              radius={[4,4,0,0]} maxBarSize={48} />
          ))}
          {keys[2] && (
            <Line type="monotone" dataKey={keys[2]}
              stroke={COLORS[2]} strokeWidth={2.5}
              dot={{ r:4 }} activeDot={{ r:6 }} />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function ChartSection({ chartType, reportType }) {
  const data = getChartData(reportType)
  const type = (chartType || '').toLowerCase()
  if (!chartType || chartType === 'No Charts') return null
  if (type.includes('pie'))       return <PieSection data={data} />
  if (type.includes('line'))      return <LineSection data={data} reportType={reportType} />
  if (type.includes('histogram')) return <HistogramSection data={data} />
  if (type.includes('combo'))     return <ComboSection data={data} reportType={reportType} />
  return <BarSection data={data} reportType={reportType} />
}

// ── Loader ────────────────────────────────────────────

function GeneratingLoader({ config, onDone }) {
  const [stepIndex,   setStepIndex]   = useState(0)
  const [completed,   setCompleted]   = useState([])
  const [progress,    setProgress]    = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    let elapsed  = 0
    const total  = GENERATING_STEPS.reduce((s, x) => s + x.duration, 0)

    GENERATING_STEPS.forEach((step, i) => {
      // activate step
      setTimeout(() => setStepIndex(i), elapsed)

      // complete step + update progress
      elapsed += step.duration
      const pct = Math.round(((i + 1) / GENERATING_STEPS.length) * 100)
      setTimeout(() => {
        setCompleted(prev => [...prev, i])
        setProgress(pct)
      }, elapsed)
    })

    // show success then call onDone
    setTimeout(() => setShowSuccess(true), total + 100)
    setTimeout(() => onDone(),             total + 900)
  }, [])

  return (
    <div className="rp-gen-root">

      {/* Animated background grid */}
      <div className="rp-gen-grid" />

      <div className="rp-gen-card">

        {/* Orb */}
        <div className="rp-gen-orb-wrap">
          <div className="rp-gen-ring rp-gen-r1" />
          <div className="rp-gen-ring rp-gen-r2" />
          <div className="rp-gen-ring rp-gen-r3" />
          <div className={`rp-gen-core ${showSuccess ? 'success' : ''}`}>
            {showSuccess
              ? <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M5 13l5 5 11-11"
                    stroke="#2A7A50" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              : <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
                  <rect x="3" y="3" width="8" height="10" rx="1.5"
                    fill="rgba(212,168,67,0.4)" stroke="#D4A843" strokeWidth="1.4"/>
                  <rect x="15" y="3" width="8" height="6" rx="1.5"
                    fill="rgba(212,168,67,0.4)" stroke="#D4A843" strokeWidth="1.4"/>
                  <rect x="15" y="13" width="8" height="10" rx="1.5"
                    fill="rgba(212,168,67,0.7)" stroke="#D4A843" strokeWidth="1.4"/>
                  <rect x="3" y="17" width="8" height="6" rx="1.5"
                    fill="rgba(212,168,67,0.7)" stroke="#D4A843" strokeWidth="1.4"/>
                </svg>
            }
          </div>
        </div>

        {/* Title */}
        <div className="rp-gen-title">
          {showSuccess ? 'Report Ready' : 'Generating Report'}
        </div>
        <div className="rp-gen-subtitle">
          {config.reportType} · {config.period} · {config.region}
        </div>

        {/* Progress bar */}
        <div className="rp-gen-bar-wrap">
          <div
            className="rp-gen-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="rp-gen-pct">{progress}%</div>

        {/* Steps */}
        <div className="rp-gen-steps">
          {GENERATING_STEPS.map((step, i) => {
            const isDone   = completed.includes(i)
            const isActive = stepIndex === i && !isDone
            return (
              <div
                key={i}
                className="rp-gen-step"
                style={{
                  opacity:    i <= stepIndex ? 1 : 0.2,
                  transform:  i <= stepIndex ? 'translateX(0)' : 'translateX(-8px)',
                  transition: `opacity 0.4s ease ${i * 0.04}s,
                               transform 0.4s ease ${i * 0.04}s`,
                  color: isDone   ? 'var(--text-muted)'
                       : isActive ? 'var(--ink)'
                       : 'var(--text-sub)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <div
                  className="rp-gen-dot"
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
                      ? <div className="rp-gen-pulse" />
                      : null
                  }
                </div>
                <span>{step.text}</span>
              </div>
            )
          })}
        </div>

        {/* Success message */}
        <div
          className="rp-gen-success"
          style={{
            opacity:    showSuccess ? 1 : 0,
            transform:  showSuccess ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          ✦ Report generated successfully
        </div>

      </div>
    </div>
  )
}

// ── Main report ───────────────────────────────────────

export default function ReportPreview() {
  const [phase,  setPhase]  = useState('generating') // generating | report
  const [config, setConfig] = useState(null)
  const [data,   setData]   = useState(null)

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(window.location.search))
    setConfig(params)
    const reportData = mockReportData[params.reportType] || mockReportData['Profit & Loss']
    setData(reportData)
  }, [])

  if (!config || !data) return null

  if (phase === 'generating') {
    return (
      <GeneratingLoader
        config={config}
        onDone={() => setPhase('report')}
      />
    )
  }

  return (
    <div className="rp-root">

      {/* Header */}
      <div className="rp-header">
        <div className="rp-header-left">
          <div className="rp-logo-icon">
            <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
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
          <div>
            <div className="rp-logo-text">FINCORE CBS · Lumio AI</div>
            <div className="rp-title">{config.reportType || 'Financial Report'}</div>
          </div>
        </div>
        <div className="rp-header-right">
          <div className="rp-meta-chips">
            {config.period     && <span className="rp-chip">{config.period}</span>}
            {config.region     && <span className="rp-chip">{config.region}</span>}
            {config.chartType  && config.chartType !== 'No Charts' &&
              <span className="rp-chip">{config.chartType}</span>}
            {config.aiInsights === 'Yes' &&
              <span className="rp-chip ai">✦ AI Insights</span>}
          </div>
          <button className="rp-export-btn" onClick={() => window.print()}>
            Export PDF
          </button>
        </div>
      </div>

      <div className="rp-body">

        <div className="rp-section-label">Key Metrics</div>
        <div className="rp-kpi-grid">
          {data.kpis.map((kpi, i) => (
            <div className="rp-kpi-card" key={i}
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="rp-kpi-label">{kpi.label}</div>
              <div className="rp-kpi-value">{kpi.value}</div>
              <div className={`rp-kpi-delta ${kpi.positive ? 'pos' : 'neg'}`}>
                {kpi.positive ? '▲' : '▼'} {kpi.delta}
              </div>
            </div>
          ))}
        </div>

        {config.aiInsights === 'Yes' && (
          <>
            <div className="rp-section-label">AI Insight</div>
            <div className="rp-insight">
              <div className="rp-insight-header">
                <span className="rp-insight-label">✦ Lumio AI Analysis</span>
                <span className="rp-insight-badge">Auto-generated</span>
              </div>
              <p>{data.insight}</p>
              {config.customPrompt && (
                <div className="rp-custom-note">
                  <span>Custom focus: </span>{config.customPrompt}
                </div>
              )}
            </div>
          </>
        )}

        {config.chartType && config.chartType !== 'No Charts' && (
          <>
            <div className="rp-section-label">Visualization</div>
            <ChartSection
              chartType={config.chartType}
              reportType={config.reportType || 'Profit & Loss'}
            />
          </>
        )}

        <div className="rp-section-label">Tabular Data</div>
        <div className="rp-table-wrap">
          <div className="rp-table-header">
            <div>
              <span className="rp-table-title">
                {config.region
                  ? `${config.region} — Detail View`
                  : 'All Regions — Detail View'}
              </span>
              <span className="rp-table-sub">{config.period}</span>
            </div>
            <div className="rp-table-info">{data.table.rows.length} records</div>
          </div>
          <div className="rp-table-scroll">
            <table className="rp-table">
              <thead>
                <tr>
                  <th>#</th>
                  {data.table.headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.table.rows.map((row, i) => (
                  <tr key={i} style={{ animationDelay: `${i * 0.04}s` }}>
                    <td className="rp-td-num">{i + 1}</td>
                    {row.map((cell, j) => (
                      <td key={j}>
                        {j === row.length - 1
                          ? <span className={`rp-status-pill ${
                              cell.startsWith('+') ? 'pos' :
                              cell.startsWith('-') ? 'neg' : 'neutral'
                            }`}>{cell}</span>
                          : cell
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rp-section-label">Summary Statistics</div>
        <div className="rp-stats-grid">
          <div className="rp-stat-card">
            <div className="rp-stat-label">Total Records</div>
            <div className="rp-stat-value">{data.table.rows.length}</div>
          </div>
          <div className="rp-stat-card">
            <div className="rp-stat-label">Report Type</div>
            <div className="rp-stat-value">{config.reportType}</div>
          </div>
          <div className="rp-stat-card">
            <div className="rp-stat-label">Period</div>
            <div className="rp-stat-value">{config.period || '—'}</div>
          </div>
          <div className="rp-stat-card">
            <div className="rp-stat-label">Dimension</div>
            <div className="rp-stat-value">
              {config.region?.split('—')[1]?.trim() || 'Branch-wise'}
            </div>
          </div>
        </div>

        <div className="rp-footer">
          <span>Generated by Lumio AI · FINCORE CBS</span>
          <span>{new Date().toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric'
          })}</span>
        </div>

      </div>
    </div>
  )
}