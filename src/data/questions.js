// src/data/questions.js
export const questions = [
  {
    id: 1,
    question: "What type of report do you want to generate?",
    subtitle: "Select the report category",
    key: "reportType",
    type: "mcq",
    options: [
      { label: "Profit & Loss",  icon: "📊" },
      { label: "NPA Report",     icon: "⚠️" },
      { label: "Loan Report",    icon: "🏦" },
      { label: "Credit Report",  icon: "💳" },
      { label: "Deposit Report", icon: "🏧" },
    ]
  },
  {
    id: 2,
    question: "Select time period & financial year",
    subtitle: "Define the reporting window",
    key: "period",
    type: "mcq",
    options: [
      { label: "Q1 FY2024" },
      { label: "Q2 FY2024" },
      { label: "Q3 FY2024" },
      { label: "Q4 FY2024" },
      { label: "Full Year FY2024" },
      { label: "Full Year FY2023" },
    ]
  },
  {
    id: 3,
    question: "Select region & dimensions",
    subtitle: "Scope and grouping of data",
    key: "region",
    type: "mcq",
    options: [
      { label: "All Regions — Branch-wise"  },
      { label: "North — Region-wise"        },
      { label: "South — Region-wise"        },
      { label: "East — Region-wise"         },
      { label: "West — Region-wise"         },
      { label: "All — Product-wise"         },
    ]
  },
  {
    id: 4,
    question: "What visualizations do you need?",
    subtitle: "Charts included in the report",
    key: "chartType",
    type: "mcq",
    options: [
      { label: "Bar Chart",          icon: "📊" },
      { label: "Pie Chart",          icon: "🥧" },
      { label: "Line Chart",         icon: "📈" },
      { label: "Bar + Line Combo",   icon: "🔀" },
      { label: "No Charts",          icon: "📄" },
    ]
  },
  {
    id: 5,
    question: "Any custom instructions?",
    subtitle: "Add specific focus areas (max 100 words)",
    key: "customPrompt",
    type: "text",
    placeholder: "e.g. Focus on South region branches with NPA above 5%, highlight YoY comparison, flag anomalies...",
    optional: true
  }
]