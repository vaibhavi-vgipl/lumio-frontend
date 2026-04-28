// src/App.jsx
import './styles/global.css'
import ChatBot from './components/ChatBot/ChatBot'

export default function App() {
  return (
    <div className="app-shell">

      {/* Topbar */}
      <div className="app-topbar">
        <div className="app-topbar-left">
          <div className="app-logo">
            <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
              <rect x="3" y="3" width="8" height="10" rx="1.5" fill="rgba(212,168,67,0.3)" stroke="#D4A843" strokeWidth="1.4"/>
              <rect x="15" y="3" width="8" height="6" rx="1.5" fill="rgba(212,168,67,0.3)" stroke="#D4A843" strokeWidth="1.4"/>
              <rect x="15" y="13" width="8" height="10" rx="1.5" fill="rgba(212,168,67,0.6)" stroke="#D4A843" strokeWidth="1.4"/>
              <rect x="3" y="17" width="8" height="6" rx="1.5" fill="rgba(212,168,67,0.6)" stroke="#D4A843" strokeWidth="1.4"/>
            </svg>
            <span>FINCORE CBS</span>
          </div>
          <div className="app-breadcrumb">
            <span>Dashboard</span>
            <span className="app-breadcrumb-sep">/</span>
            <span>Reports</span>
            <span className="app-breadcrumb-sep">/</span>
            <span className="app-breadcrumb-active">Financial Reports</span>
          </div>
        </div>
        <div className="app-topbar-right">
          <div className="app-topbar-search">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="#9E9B93" strokeWidth="1.3"/>
              <path d="M9 9L12 12" stroke="#9E9B93" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span>Search...</span>
          </div>
          <div className="app-topbar-notif">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1.5C5.01 1.5 3 3.51 3 6v3.5L1.5 11h12L12 9.5V6c0-2.49-2.01-4.5-4.5-4.5Z" stroke="#6B6860" strokeWidth="1.2"/>
              <path d="M6 11.5a1.5 1.5 0 003 0" stroke="#6B6860" strokeWidth="1.2"/>
              <circle cx="11" cy="3" r="2" fill="#D4A843"/>
            </svg>
          </div>
          <div className="app-topbar-divider"/>
          <div className="app-user">
            <div className="app-user-avatar">RM</div>
            <div className="app-user-info">
              <span className="app-user-name">Rahul Mehta</span>
              <span className="app-user-role">Sr. Analyst</span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-body">

        {/* Sidebar */}
        <div className="app-sidebar">
          <div className="app-sidebar-section">
            <div className="app-sidebar-label">Main</div>
            <div className="app-nav-item active">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.9"/>
                <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" opacity="0.9"/>
              </svg>
              Dashboard
            </div>
            <div className="app-nav-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 10L5 7L8 9L12 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Reports
              <span className="app-nav-badge">12</span>
            </div>
            <div className="app-nav-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Audit Logs
            </div>
          </div>

          <div className="app-sidebar-section">
            <div className="app-sidebar-label">Banking</div>
            <div className="app-nav-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="4" width="11" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M1.5 6.5h11" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M7 1.5L1.5 4h11L7 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              Loans
            </div>
            <div className="app-nav-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5.5 7.5L8 10L12 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
              </svg>
              NPA Tracker
              <span className="app-nav-badge warn">3</span>
            </div>
            <div className="app-nav-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="3" width="10" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5 3V2M9 3V2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M2 6h10" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              Deposits
            </div>
            <div className="app-nav-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M2 12c0-2.21 2.24-4 5-4s5 1.79 5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Customers
            </div>
          </div>

          <div className="app-sidebar-section">
            <div className="app-sidebar-label">Settings</div>
            <div className="app-nav-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.93 2.93l1.06 1.06M10.01 10.01l1.06 1.06M2.93 11.07l1.06-1.06M10.01 3.99l1.06-1.06" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Settings
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="app-content">

          {/* Page header */}
          <div className="app-page-header">
            <div>
              <div className="app-page-title">Financial Reports</div>
              <div className="app-page-sub">FY2024 · All Regions · Last updated 2 hours ago</div>
            </div>
            <div className="app-page-actions">
              <button className="app-action-btn">Export</button>
              <button className="app-action-btn">Filter</button>
              <button className="app-action-btn primary">+ New Report</button>
            </div>
          </div>

          {/* KPI row */}
          <div className="app-kpi-row">
            {[
              { label: "Net Revenue",    value: "₹482M", delta: "+6.2%",  up: true  },
              { label: "Net Profit",     value: "₹91M",  delta: "−8.1%",  up: false },
              { label: "Total Expenses", value: "₹391M", delta: "+12.4%", up: false },
              { label: "NPA Ratio",      value: "4.2%",  delta: "+0.4pt", up: false },
            ].map((k, i) => (
              <div className="app-kpi-card" key={i}>
                <div className="app-kpi-label">{k.label}</div>
                <div className="app-kpi-value">{k.value}</div>
                <div className={`app-kpi-delta ${k.up ? 'up' : 'down'}`}>
                  {k.up ? '▲' : '▼'} {k.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="app-table-card">
            <div className="app-table-header">
              <span className="app-table-title">Branch Performance</span>
              <span className="app-table-sub">Q4 FY2024</span>
            </div>
            <table className="app-table">
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Region</th>
                  <th>Revenue</th>
                  <th>Expenses</th>
                  <th>Net P/L</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Mumbai Central", "West",  "₹82.4M","₹61.1M","₹21.3M","Healthy"],
                  ["Delhi NCR",      "North", "₹74.9M","₹58.7M","₹16.2M","Healthy"],
                  ["Bengaluru Tech", "South", "₹69.3M","₹55.2M","₹14.1M","Watch"  ],
                  ["Chennai Port",   "South", "₹51.2M","₹44.9M","₹6.3M", "Watch"  ],
                  ["Hyderabad East", "South", "₹48.7M","₹46.1M","₹2.6M", "Critical"],
                  ["Kolkata HQ",     "East",  "₹44.2M","₹36.1M","₹8.1M", "Healthy"],
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="app-td-branch">{row[0]}</td>
                    <td>{row[1]}</td>
                    <td className="app-td-mono">{row[2]}</td>
                    <td className="app-td-mono">{row[3]}</td>
                    <td className="app-td-mono">{row[4]}</td>
                    <td>
                      <span className={`app-status-pill ${row[5].toLowerCase()}`}>
                        {row[5]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <ChatBot />

      <style>{`
        .app-shell {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--surface);
          overflow: hidden;
          font-family: var(--font);
        }

        /* ── Topbar ── */
        .app-topbar {
          height: 52px;
          background: var(--white);
          border-bottom: 1px solid var(--border-strong);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          flex-shrink: 0;
          z-index: 10;
        }
        .app-topbar-left { display: flex; align-items: center; gap: 20px; }
        .app-logo {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 700;
          color: var(--ink); letter-spacing: 0.06em;
        }
        .app-breadcrumb {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--text-muted);
        }
        .app-breadcrumb-sep { color: var(--border-strong); }
        .app-breadcrumb-active { color: var(--ink); font-weight: 500; }
        .app-topbar-right { display: flex; align-items: center; gap: 12px; }
        .app-topbar-search {
          display: flex; align-items: center; gap: 7px;
          background: var(--surface); border: 1px solid var(--border-strong);
          border-radius: 7px; padding: 6px 12px;
          font-size: 12px; color: var(--text-sub);
          cursor: text; width: 180px;
        }
        .app-topbar-notif {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--surface); border: 1px solid var(--border-strong);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .app-topbar-divider {
          width: 1px; height: 24px;
          background: var(--border-strong);
        }
        .app-user { display: flex; align-items: center; gap: 9px; cursor: pointer; }
        .app-user-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--ink);
          color: var(--gold);
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .app-user-name {
          display: block; font-size: 12px;
          font-weight: 600; color: var(--ink);
        }
        .app-user-role {
          display: block; font-size: 10px; color: var(--text-sub);
        }

        /* ── Body ── */
        .app-body {
          display: flex; flex: 1; overflow: hidden;
        }

        /* ── Sidebar ── */
        .app-sidebar {
          width: 200px; flex-shrink: 0;
          background: var(--white);
          border-right: 1px solid var(--border-strong);
          padding: 16px 10px;
          display: flex; flex-direction: column; gap: 8px;
          overflow-y: auto;
        }
        .app-sidebar-section { display: flex; flex-direction: column; gap: 2px; }
        .app-sidebar-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-sub); padding: 8px 8px 4px;
        }
        .app-nav-item {
          display: flex; align-items: center; gap: 9px;
          padding: 8px 10px; border-radius: 8px;
          font-size: 12px; font-weight: 500;
          color: var(--text-muted); cursor: pointer;
          transition: all 0.15s; position: relative;
        }
        .app-nav-item:hover {
          background: var(--surface);
          color: var(--ink);
        }
        .app-nav-item.active {
          background: var(--gold-light);
          color: var(--gold-dim);
        }
        .app-nav-item.active svg { color: var(--gold-dim); }
        .app-nav-badge {
          margin-left: auto; font-size: 9px; font-weight: 700;
          background: var(--surface-2); color: var(--text-muted);
          padding: 2px 6px; border-radius: 10px;
        }
        .app-nav-badge.warn {
          background: #FEF3C7; color: #92400E;
        }

        /* ── Content ── */
        .app-content {
          flex: 1; overflow-y: auto;
          padding: 24px 28px;
          display: flex; flex-direction: column; gap: 20px;
        }

        /* Page header */
        .app-page-header {
          display: flex; align-items: flex-start;
          justify-content: space-between;
        }
        .app-page-title {
          font-size: 20px; font-weight: 600;
          color: var(--ink);
          font-family: var(--font-display);
        }
        .app-page-sub {
          font-size: 11px; color: var(--text-sub); margin-top: 3px;
        }
        .app-page-actions { display: flex; gap: 8px; align-items: center; }
        .app-action-btn {
          padding: 7px 14px; border-radius: 7px;
          font-size: 12px; font-weight: 500;
          background: var(--white); color: var(--ink);
          border: 1px solid var(--border-strong);
          cursor: pointer; font-family: var(--font);
          transition: background 0.15s;
        }
        .app-action-btn:hover { background: var(--surface); }
        .app-action-btn.primary {
          background: var(--ink); color: var(--gold);
          border-color: var(--ink);
        }
        .app-action-btn.primary:hover { opacity: 0.88; }

        /* KPI row */
        .app-kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .app-kpi-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px; padding: 16px 18px;
        }
        .app-kpi-label {
          font-size: 11px; color: var(--text-muted); margin-bottom: 6px;
        }
        .app-kpi-value {
          font-size: 22px; font-weight: 600; color: var(--ink);
          font-family: var(--font-display);
        }
        .app-kpi-delta {
          font-size: 11px; margin-top: 5px; font-weight: 500;
        }
        .app-kpi-delta.up   { color: var(--positive); }
        .app-kpi-delta.down { color: var(--negative); }

        /* Table */
        .app-table-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 12px; overflow: hidden;
        }
        .app-table-header {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center;
          justify-content: space-between;
        }
        .app-table-title {
          font-size: 13px; font-weight: 600; color: var(--ink);
        }
        .app-table-sub {
          font-size: 11px; color: var(--text-sub);
        }
        .app-table {
          width: 100%; border-collapse: collapse; font-size: 12px;
        }
        .app-table th {
          padding: 9px 18px; text-align: left;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: var(--text-muted);
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .app-table td {
          padding: 10px 18px; color: var(--ink);
          border-bottom: 1px solid var(--border);
        }
        .app-table tr:last-child td { border-bottom: none; }
        .app-table tr:hover td { background: var(--surface); }
        .app-td-branch { font-weight: 500; }
        .app-td-mono {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
        }
        .app-status-pill {
          padding: 3px 9px; border-radius: 20px;
          font-size: 10px; font-weight: 600;
        }
        .app-status-pill.healthy {
          background: var(--positive-bg); color: var(--positive);
        }
        .app-status-pill.watch {
          background: #FEF3C7; color: #92400E;
        }
        .app-status-pill.critical {
          background: var(--negative-bg); color: var(--negative);
        }
      `}</style>
    </div>
  )
}