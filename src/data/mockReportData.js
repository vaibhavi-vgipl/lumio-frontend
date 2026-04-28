// src/data/mockReportData.js
export const mockReportData = {
  "Profit & Loss": {
    kpis: [
      { label: "Net Revenue",     value: "₹482M", delta: "+6.2%", positive: true  },
      { label: "Net Profit",      value: "₹91M",  delta: "-8.1%", positive: false },
      { label: "Total Expenses",  value: "₹391M", delta: "+12.4%",positive: false },
      { label: "Profit Margin",   value: "18.9%", delta: "-2.8pts",positive: false }
    ],
    table: {
      headers: ["Branch", "Region", "Revenue", "Expenses", "Net P/L", "QoQ"],
      rows: [
        ["Mumbai Central", "West",  "₹82.4M", "₹61.1M", "₹21.3M", "+4.2%"],
        ["Delhi NCR",      "North", "₹74.9M", "₹58.7M", "₹16.2M", "+1.8%"],
        ["Bengaluru Tech", "South", "₹69.3M", "₹55.2M", "₹14.1M", "-3.4%"],
        ["Chennai Port",   "South", "₹51.2M", "₹44.9M", "₹6.3M",  "-11.2%"],
        ["Hyderabad East", "South", "₹48.7M", "₹46.1M", "₹2.6M",  "-18.7%"]
      ]
    },
    insight: "Net profit declined 8.1% QoQ despite revenue growth. South region branches show margin compression with expense ratios exceeding 90%."
  },
  "NPA Report": {
    kpis: [
      { label: "Gross NPA",   value: "₹124M", delta: "+3.2%", positive: false },
      { label: "Net NPA",     value: "₹89M",  delta: "+1.8%", positive: false },
      { label: "NPA Ratio",   value: "4.2%",  delta: "+0.4pts",positive: false },
      { label: "Provisions",  value: "₹35M",  delta: "+5.1%", positive: false }
    ],
    table: {
      headers: ["Branch", "Region", "Gross NPA", "Net NPA", "NPA Ratio", "Status"],
      rows: [
        ["Mumbai Central", "West",  "₹28M", "₹19M", "3.1%", "Watch"],
        ["Delhi NCR",      "North", "₹31M", "₹22M", "4.8%", "Critical"],
        ["Bengaluru Tech", "South", "₹24M", "₹17M", "3.6%", "Watch"],
        ["Chennai Port",   "South", "₹22M", "₹16M", "5.1%", "Critical"],
        ["Hyderabad East", "South", "₹19M", "₹15M", "4.9%", "Critical"]
      ]
    },
    insight: "NPA ratio increased by 0.4 points. South region has 3 critical branches. Immediate review recommended for Chennai and Hyderabad."
  },
  "Loan Report": {
    kpis: [
      { label: "Total Disbursed", value: "₹1.2B", delta: "+9.4%", positive: true  },
      { label: "Outstanding",     value: "₹890M", delta: "+7.1%", positive: true  },
      { label: "Repayment Rate",  value: "94.2%", delta: "+0.8%", positive: true  },
      { label: "Default Rate",    value: "5.8%",  delta: "-0.3%", positive: true  }
    ],
    table: {
      headers: ["Branch", "Region", "Disbursed", "Outstanding", "Repayment", "Default"],
      rows: [
        ["Mumbai Central", "West",  "₹320M", "₹240M", "96.1%", "3.9%"],
        ["Delhi NCR",      "North", "₹290M", "₹210M", "95.2%", "4.8%"],
        ["Bengaluru Tech", "South", "₹240M", "₹180M", "93.8%", "6.2%"],
        ["Chennai Port",   "South", "₹190M", "₹140M", "91.4%", "8.6%"],
        ["Hyderabad East", "South", "₹160M", "₹120M", "90.2%", "9.8%"]
      ]
    },
    insight: "Loan disbursement grew 9.4% YoY. South region showing higher default rates — Chennai and Hyderabad above 8% threshold."
  }
}