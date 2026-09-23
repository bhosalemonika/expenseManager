import { navigationItems } from '../data/categoryData'
import logoutIcon from '../assets/icon/logout_.png'
import '../css/Sidebar.css'
import expenseLogo from '../assets/Images/expense.png'

function Sidebar({ page, setPage, onLogout }) {
  function openPage(pageId) {
    if (pageId === 'expense') {
      localStorage.removeItem('expense-manager-editing-expense')
      localStorage.removeItem('editingExpense')
    }
    setPage(pageId)
  }
  return (
    <aside className="sidebar">
    <div className="sidebar-brand">
  <img src={expenseLogo} alt="Expense Manager"  className='img-side'/>
  Expense Manager
</div>
      <nav>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={page === item.id ? 'nav-link active' : 'nav-link'}
            onClick={() => openPage(item.id)}
          >
            <img src={item.icon} alt="" />
            {item.label}
          </button>
        ))}
      </nav>

      <button
        className="logout-button"
        onClick={onLogout}
      >
        <img src={logoutIcon} alt="" />
        Logout
      </button>

    </aside>
  )
}

export default Sidebar
