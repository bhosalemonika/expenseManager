import { getCategoryColor, getCategoryIconSrc, getCategoryName } from '../../data/categoryData'
import '../../css/CategoryCard.css'

function CategoryCard({ category, transactionCount }) {
  const categoryName = getCategoryName(category)

  return (
    <div
      className="category-card"
      style={{ '--category-color': getCategoryColor(category) }}
    >
      <img className="card-icon" src={getCategoryIconSrc(category)} alt="" />
      <h3>{categoryName}</h3>
      <small>
        Expense &nbsp; {transactionCount} Transaction{transactionCount === 1 ? '' : 's'}
      </small>
    </div>
  )
}

export default CategoryCard
