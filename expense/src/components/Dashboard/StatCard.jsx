import { getCategoryColor, getCategoryIconSrc, getCategoryName } from '../../data/categoryData'
import '../../css/StatCard.css'

function formatMoney(value) {
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function StatCard({ category, expenses }) {
  const categoryName = getCategoryName(category)
  const categoryTotal = expenses
    .filter((expense) => expense.category === categoryName && !expense.income)
    .reduce((sum, expense) => sum + Number(expense.amount), 0)

  const count = expenses.filter((expense) => expense.category === categoryName).length

  return (
    <div
      className="stat-card"
      style={{ '--category-color': getCategoryColor(category) }}
    >
      <img
        className="card-icon"
        src={getCategoryIconSrc(category)}
        alt=""
      />
      <small>{categoryName}</small>
      <strong>{formatMoney(categoryTotal)}</strong>
      <em>
        {count} transaction{count === 1 ? '' : 's'}
      </em>
    </div>
  )
}

export default StatCard
