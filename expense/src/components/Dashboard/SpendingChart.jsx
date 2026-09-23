import '../../css/SpendingChart.css'
import { useState } from 'react'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

function getMonthlyTotals(expenses) {
  const totals = months.map(() => 0)

  expenses.forEach((expense) => {
    if (expense.income) return
    const month = new Date(expense.date).getMonth()
    if (!Number.isNaN(month)) {
      totals[month] += Number(expense.amount)
    }
  })

  const highest = Math.max(...totals, 1)
  return totals.map((total) => {
    if (total === 0) return 10
    return Math.max((total / highest) * 100, 10)
  })
}

function SpendingChart({ expenses }) {
  const [range, setRange] = useState('last-year')
  const chartHeights = getMonthlyTotals(expenses)

  return (
    <section className="panel chart-panel">
      <div className="panel-title">
        <h3>Monthly Spending Trends</h3>

        <select
          value={range}
          onChange={(event) => setRange(event.target.value)}
        >
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-year">This Year</option>
          <option value="last-year">Last Year</option>
        </select>
      </div>

      <div className="chart">
        {chartHeights.map((height, index) => (
          <div
            key={months[index]}
            className={index === new Date().getMonth() ? 'bar selected' : 'bar'}
            style={{ height: `${height}%` }}
          >
            <span>{months[index]}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SpendingChart