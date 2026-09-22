import AppShell from '../components/AppShell'
import CategoryCard from '../components/Categories/CategoryCard'
import { defaultCategories, mergeCategories } from '../data/categoryData'
import { useUserStorage } from '../hooks/useUserStorage'
import { useExpenses } from '../hooks/useExpenses'
import '../css/Categories.css'

function Categories({ setPage }) {
  const [savedCategories] = useUserStorage('categories', defaultCategories)
  const { expenses } = useExpenses()
  const categories = mergeCategories(
    defaultCategories,
    savedCategories,
    expenses.map((expense) => expense.category),
  )

  return (
    <AppShell page="categories" setPage={setPage}>
      <div className="categories-page">
      <div className="page-heading">
        <div>
          <h2>Categories</h2>
          <p>Organize your spending habits efficiently.</p>
        </div>
        <button className="green-button" onClick={() => setPage('addCategory')}>＋ Add New Category</button>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
            transactionCount={expenses.filter((e) => e.category === category.name).length}
          />
        ))}
      </div>
      </div>
    </AppShell>
  )
}

export default Categories
