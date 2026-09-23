import { useEffect, useState } from 'react'
import './css/App.css'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AddExpense from './pages/AddExpense'
import Transactions from './pages/Transactions'
import Categories from './pages/Categories'
import AddCategory from './pages/AddCategory'
import Settings from './pages/Settings'
import NotificationPage from './pages/NotificationPage'
import ProfilePage from './pages/Profilepgae'
import {
  getCurrentUserEmail,
  readCurrentUserSection,
} from './hooks/useUserStorage'
import {
  applyThemePreference,
  defaultSettings,
  normalizeSettings,
} from './data/settingsData'

function App() {
  const [page, setPage] = useState(() => getCurrentUserEmail() ? 'dashboard' : 'login')

  useEffect(() => {
    const settings = normalizeSettings(
      readCurrentUserSection('settings', defaultSettings),
    )
    applyThemePreference(settings.theme)
  }, [page])

  if (page === 'login') return <LoginPage setPage={setPage} />

  const pages = {
    dashboard: <Dashboard setPage={setPage} />,
    expense: <AddExpense setPage={setPage} />,
    transactions: <Transactions setPage={setPage} />,
    categories: <Categories setPage={setPage} />,
    addCategory: <AddCategory setPage={setPage} />,
    settings: <Settings setPage={setPage} />,
    notifications: <NotificationPage setPage={setPage} />,
    profile: <ProfilePage setPage={setPage} />,
  }

  return pages[page] || pages.dashboard
}

export default App
