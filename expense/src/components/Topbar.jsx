import { useMemo } from 'react'
import { actionIcons } from '../data/categoryData'
import {
  buildTransactionNotifications,
  defaultNotificationReads,
  getUnreadNotificationCount,
} from '../data/notificationsData'
import { useExpenses } from '../hooks/useExpenses'
import { useUserStorage } from '../hooks/useUserStorage'
import searchIcon from '../assets/icon/searchIcon.png'
import '../css/Topbar.css'

function Topbar({ page, setPage, onSearch }) {
  const { expenses } = useExpenses()
  const [readNotifications] = useUserStorage(
    'notifications',
    defaultNotificationReads,
  )
  const notificationItems = useMemo(
    () => buildTransactionNotifications(expenses),
    [expenses],
  )
  const unreadCount = getUnreadNotificationCount(
    notificationItems,
    readNotifications,
  )
  const badgeLabel = unreadCount > 99 ? '99+' : unreadCount

  return (
    <header className="topbar">
      <div className="search-box">
        <img src={searchIcon} alt="" />
        <input
          aria-label="Search"
          placeholder="Search transactions, categories..."
          onChange={(event) => onSearch?.(event.target.value)}
        />
      </div>
      <div className="topbar-actions">
        <button
          type="button"
          className={
            page === 'notifications'
              ? 'notification-button active'
              : 'notification-button'
          }
          onClick={() => setPage?.('notifications')}
          aria-label={
            unreadCount
              ? `Open notifications, ${unreadCount} unread`
              : 'Open notifications'
          }
        >
          <img src={actionIcons.notification} alt="" />
          {unreadCount > 0 && (
            <span className="topbar-notification-badge">{badgeLabel}</span>
          )}
        </button>
        <button
          type="button"
          className={
            page === 'profile'
              ? 'profile-button active'
              : 'profile-button'
          }
          onClick={() => setPage?.('profile')}
          aria-label="Open profile"
        >
          <img className="avatar" src={actionIcons.profile} alt="" />
        </button>
      </div>
    </header>
  )
}

export default Topbar
