import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { clearCurrentUser } from '../hooks/useUserStorage'
import '../css/AppShell.css'

function AppShell({ page, setPage, children }) {
  const [search, setSearch] = useState('')

  function logout() {
    clearCurrentUser()
    localStorage.removeItem('expense-manager-editing-expense')
    localStorage.removeItem('editingExpense')
    setPage('login')
  }

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} onLogout={logout} />
      <div className="main-column">
        <Topbar onSearch={setSearch} />
        <main className="content-area" data-search={search}>{children}</main>
      </div>
    </div>
  )
}

export default AppShell
