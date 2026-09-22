import ExpenseTable from '../Dashboard/ExpenseTable'
import '../../css/TransactionTable.css'

function TransactionTable({ categories, expenses, onRemove, onEdit }) {
  return (
    <div className="transaction-table">
      <ExpenseTable
        categories={categories}
        expenses={expenses}
        onRemove={onRemove}
        onEdit={onEdit}
      />
    </div>
  )
}

export default TransactionTable
