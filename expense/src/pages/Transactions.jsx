import { useState } from 'react'
import AppShell from '../components/AppShell'
import TransactionFilter from '../components/Transactions/TransactionFilter'
import TransactionTable from '../components/Transactions/TransactionTable'
import { defaultCategories, getCategoryName, mergeCategories } from '../data/categoryData'
import { useExpenses } from '../hooks/useExpenses'
import { useUserStorage } from '../hooks/useUserStorage'
import '../css/Transactions.css'

const editKey = 'expense-manager-editing-expense'

function csvValue(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

function Transactions({ setPage }) {
  const { expenses, removeExpense } = useExpenses()
  const [savedCategories] = useUserStorage('categories', defaultCategories)
  const categoryOptions = mergeCategories(
    defaultCategories,
    savedCategories,
    expenses.map((expense) => expense.category),
  )
  const allCategories = categoryOptions.map(getCategoryName)

  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState('all')
  const [category, setCategory] = useState('all')

  const filtered = expenses.filter((expense) => {
    if (
      search &&
      !expense.title.toLowerCase().includes(search.toLowerCase())
    ) {
      return false
    }

    if (category !== 'all' && expense.category !== category) {
      return false
    }

    if (period !== 'all') {
      const days = Number(period)
      const expenseDate = new Date(expense.date)
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - days)
      if (expenseDate < cutoff) {
        return false
      }
    }

    return true
  })

  function editExpense(expense) {
    localStorage.setItem(
      editKey,
      JSON.stringify(expense)
    )

    setPage('expense')
  }

  function addNewExpense() {
    localStorage.removeItem(editKey)
    localStorage.removeItem('editingExpense')
    setPage('expense')
  }

  function downloadCSV() {
    const header = ['Date', 'Title', 'Category', 'Description', 'Amount', 'Type']
    const rows = filtered.map((expense) => [
      expense.date,
      expense.title,
      expense.category,
      expense.description,
      expense.amount,
      expense.income ? 'Income' : 'Expense',
    ])
    const csv = [header, ...rows]
      .map((row) => row.map(csvValue).join(','))
      .join('\n')
    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8;' }),
    )
    const link = document.createElement('a')

    link.href = url
    link.download = 'transactions.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AppShell page="transactions" setPage={setPage}>
      <div className="transactions-page">
        <div className="page-heading">
          <div>
            <h2>Transactions</h2>
            <p>View and manage your detailed spending history.</p>
          </div>

          <button
            className="green-button"
            onClick={addNewExpense}
          >
            ＋ Add New Expense
          </button>
        </div>
        <section className="panel transactions-panel">
          <TransactionFilter
            search={search}
            onSearchChange={setSearch}
            period={period}
            onPeriodChange={setPeriod}
            category={category}
            onCategoryChange={setCategory}
            categories={allCategories}
            onDownload={downloadCSV}
          />
          <TransactionTable
            categories={categoryOptions}
            expenses={filtered}
            onEdit={editExpense}
            onRemove={removeExpense}
          />

        </section>

      </div>

    </AppShell>
  )
}

export default Transactions
