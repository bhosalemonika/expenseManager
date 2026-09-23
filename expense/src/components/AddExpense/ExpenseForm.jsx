import { useEffect, useState } from 'react'
import '../../css/ExpenseForm.css'

function makeForm(expense, category) {
  return {
    title: expense?.title || '',
    amount: expense?.amount || '',
    category: expense?.category || category,
    description: expense?.description || '',
  }
}

function ExpenseForm({ categories, expense, onSave, onCancel,setPage,}) {
  const firstCategory = categories[0] || 'Food & Dining'
  const [form, setForm] = useState(() => makeForm(expense, firstCategory))
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(makeForm(expense, firstCategory))
    setSaved(false)
  }, [expense, firstCategory])

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function submit(event) {
   event.preventDefault()
    onSave({ ...form, amount: Number(form.amount), })
     if (!expense) { setPage('dashboard') }
  }

  return (
    <section className="form-panel">
      <form onSubmit={submit}>
        <label>
          Expense Title
          <input name="title" value={form.title} onChange={update} placeholder="e.g., Monthly Grocery" required />
        </label>

        <label>
          Amount
          <input name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={update} placeholder="0.00" required />
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={update}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Description
          <textarea name="description" value={form.description} onChange={update} placeholder="Add notes about this expense" />
        </label>

        <div className="form-actions">
          <button className="green-button" type="submit">
            {expense ? 'Update Expense' : 'Save Expense'}
          </button>
          <button className="outline-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>

        {saved && !expense && <p className="success-text">Expense saved locally.</p>}
      </form>
    </section>
  )
}

export default ExpenseForm
