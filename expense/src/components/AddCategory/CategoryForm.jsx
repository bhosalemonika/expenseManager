import { useState } from 'react'
import CategoryIcon from '../CategoryIcon'
import { categoryIcons, categoryColors } from '../../data/categoryIcons'
import { getCategoryName } from '../../data/categoryData'
import '../../css/CategoryForm.css'

function CategoryForm({ existingCategories, onSave, onCancel }) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState(categoryIcons[1].id)
  const [color, setColor] = useState(categoryColors[0])
  const [message, setMessage] = useState('')


  

  function submit(event) {
    event.preventDefault()
    const categoryName = name.trim()
    if (!categoryName) return
    if (existingCategories.some((category) => getCategoryName(category).toLowerCase() === categoryName.toLowerCase())) {
      setMessage('This category already exists.')
      return
    }
    onSave({ name: categoryName, icon, color })
  }

  return (
    <section className="add-category-card">
      <form onSubmit={submit}>
        <label htmlFor="category-name">Category Name</label>
        <input
          id="category-name"
          value={name}
          onChange={(event) => { setName(event.target.value); setMessage('') }}
          placeholder="e.g., Monthly Subscriptions"
          autoFocus
          required
        />
        <fieldset>
          <legend>Choose Icon</legend>
          <div className="icon-picker">
            {categoryIcons.map((item) => (
              <CategoryIcon
                key={item.id}
                icon={item}
                selected={icon === item.id}
                onSelect={setIcon}
              />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Pick Category Color</legend>
          <div className="color-picker">
            {categoryColors.map((item) => (
              <button
                type="button"
                key={item}
                aria-label={`Choose ${item}`}
                className={color === item ? 'color-swatch selected' : 'color-swatch'}
                style={{ backgroundColor: item }}
                onClick={() => setColor(item)}
              />
            ))}
          </div>
        </fieldset>
        <div className="form-actions">
          <button className="green-button" type="submit">Create Category</button>
          <button className="outline-button" type="button" onClick={onCancel}>Cancel</button>
        </div>
        {message && <p className="error-text" role="alert">{message}</p>}
      </form>
    </section>
  )
}

export default CategoryForm
