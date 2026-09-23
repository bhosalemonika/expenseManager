import {
  getCategoryColor,
  getCategoryIconSrc,
  getCategoryName,
} from '../../data/categoryData'
import { formatMoney } from '../../data/settingsData'
import { useSettings } from '../../hooks/useSettings'
import '../../css/StatCard.css'

function StatCard({ category, expenses }) {
  const [settings] = useSettings()
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
      <strong>{formatMoney(categoryTotal, settings.currency)}</strong>
      <em>
        {count} transaction{count === 1 ? '' : 's'}
      </em>
    </div>
  )
}

export default StatCard
