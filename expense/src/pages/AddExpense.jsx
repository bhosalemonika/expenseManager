import { useState } from 'react'
import AppShell from '../components/AppShell'
import ExpenseForm from '../components/AddExpense/ExpenseForm'
import { defaultCategories, getCategoryName, mergeCategories } from '../data/categoryData'
import { useExpenses } from '../hooks/useExpenses'
import { useUserStorage } from '../hooks/useUserStorage'
import '../css/AddExpense.css'

const editKey = 'expense-manager-editing-expense'

function readEditingExpense() {
  try {
    const saved = localStorage.getItem(editKey) || localStorage.getItem('editingExpense')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function clearEditingExpense() {
  localStorage.removeItem(editKey)
  localStorage.removeItem('editingExpense')
}

function AddExpense({ setPage }) {
  const { addExpense, updateExpense } = useExpenses()
  const [editingExpense, setEditingExpense] = useState(readEditingExpense)
  const [savedCategories] = useUserStorage('categories', defaultCategories)
  const categories = mergeCategories(
    defaultCategories,
    savedCategories,
    editingExpense?.category ? [editingExpense.category] : [],
  ).map(getCategoryName)

  function handleSave(expense) {
    if (editingExpense) {
      updateExpense({ ...editingExpense, ...expense })
      clearEditingExpense()
      setEditingExpense(null)
      setPage('dashboard')
      return
    }

    addExpense(expense)
  }

  function handleCancel() {
    clearEditingExpense()
    setEditingExpense(null)
    setPage('dashboard')
  }

  return (
    <AppShell page="expense" setPage={setPage}>
      <div className="add-expense-page">
        <div className="page-heading">
          <div>
            <h3>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h3>
            <p>Keep track of your academic and personal spending to stay on budget.</p>
          </div>
        </div>

        <ExpenseForm
          categories={categories}
          expense={editingExpense}
          onSave={handleSave}
          onCancel={handleCancel}
          setPage={setPage}
        />
      </div>
    </AppShell>
  )
}

export default AddExpense
