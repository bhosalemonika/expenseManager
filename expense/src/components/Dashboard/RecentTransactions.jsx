import ExpenseTable from './ExpenseTable'
import '../../css/RecentTransactions.css'

function RecentTransactions({ categories, expenses, onEdit, onRemove, onViewAll }) {
  return (
    <section className="panel recent-transactions">
      <div className="panel-title">
        <h4>Recent Transactions</h4>
        <button className="text-link" onClick={onViewAll}>
          View All
        </button>
      </div>
      <ExpenseTable
        categories={categories}
        expenses={expenses.slice(0, 5)}
        onEdit={onEdit}
        onRemove={onRemove}
      />
    </section>
  )
}

export default RecentTransactions
