import AppShell from '../components/AppShell'
import { defaultCategories, mergeCategories } from '../data/categoryData'
import { useExpenses } from '../hooks/useExpenses'
import { useSettings } from '../hooks/useSettings'
import { useUserStorage } from '../hooks/useUserStorage'
import '../css/Profile.css'

function getInitial(profile) {
  const value = (profile?.name || profile?.email || 'User').trim() || 'User'

  return value.charAt(0).toUpperCase()
}

function getDisplayName(profile) {
  return profile?.name || profile?.email?.split('@')[0] || 'User'
}

function formatProfileMoney(value, currency) {
  const amount = Number(value)

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0)
}

function formatProfileDate(value) {
  if (!value) return '--'

  const normalizedValue = String(value).includes('T')
    ? String(value)
    : `${value}T00:00:00`
  const date = new Date(normalizedValue)

  if (Number.isNaN(date.getTime())) return value

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

function ProfilePage({ setPage }) {
  const { expenses } = useExpenses()
  const [profile] = useUserStorage('profile')
  const [savedCategories] = useUserStorage('categories', defaultCategories)
  const [settings] = useSettings()
  const displayName = getDisplayName(profile)
  const email = profile?.email || 'No email saved'
  const categories = mergeCategories(
    defaultCategories,
    savedCategories,
    expenses.map((expense) => expense.category),
  )
  const sentAmount = expenses
    .filter((expense) => !expense.income)
    .reduce((total, expense) => total + Number(expense.amount || 0), 0)
  const receivedAmount = expenses
    .filter((expense) => expense.income)
    .reduce((total, expense) => total + Number(expense.amount || 0), 0)
  const totalActivity = sentAmount + receivedAmount
  const recentActivity = expenses.slice(0, 4)

  return (
    <AppShell page="profile" setPage={setPage}>
      <div className="profile-page">
        <header className="profile-heading">
          <p className="profile-kicker">Personal overview</p>
          <h2>Profile</h2>
          <p>Your account details and money movement, in one place.</p>
        </header>

        <section className="profile-account-card" aria-label="Account overview">
          <div className="profile-account-main">
            <span className="profile-avatar">{getInitial(profile)}</span>
            <div>
              <span className="profile-eyebrow">Account holder</span>
              <strong>{displayName}</strong>
              <small>{email}</small>
            </div>
          </div>
          <div className="profile-account-status">
            <span>Account status</span>
            <strong>Active</strong>
          </div>
        </section>

        <section className="profile-stats-grid" aria-label="Money overview">
          <article className="profile-stat profile-stat-sent">
            <span>Sent amount</span>
            <strong>{formatProfileMoney(sentAmount, settings.currency)}</strong>
            <small>Money recorded as expenses</small>
          </article>

          <article className="profile-stat profile-stat-received">
            <span>Received amount</span>
            <strong>{formatProfileMoney(receivedAmount, settings.currency)}</strong>
            <small>Money recorded as income</small>
          </article>

          <article className="profile-stat">
            <span>Total activity</span>
            <strong>{formatProfileMoney(totalActivity, settings.currency)}</strong>
            <small>{expenses.length} transactions recorded</small>
          </article>
        </section>

        <div className="profile-content-grid">
          <section className="profile-card" aria-labelledby="profile-details-title">
            <header className="profile-card-header">
              <div>
                <h3 id="profile-details-title">Account details</h3>
                <p>Information saved on this device</p>
              </div>
              <span>01</span>
            </header>

            <dl className="profile-detail-list">
              <div>
                <dt>Username</dt>
                <dd>{displayName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{email}</dd>
              </div>
              <div>
                <dt>Categories</dt>
                <dd>{categories.length} saved</dd>
              </div>
              <div>
                <dt>Storage</dt>
                <dd>Local device</dd>
              </div>
            </dl>
          </section>

          <section className="profile-card" aria-labelledby="profile-activity-title">
            <header className="profile-card-header">
              <div>
                <h3 id="profile-activity-title">Recent activity</h3>
                <p>Your latest money movement</p>
              </div>
              <span>02</span>
            </header>

            {recentActivity.length ? (
              <ul className="profile-activity-list">
                {recentActivity.map((expense) => {
                  const income = Boolean(expense.income)

                  return (
                    <li key={expense.id}>
                      <span
                        className={
                          income
                            ? 'profile-activity-icon income'
                            : 'profile-activity-icon expense'
                        }
                      >
                        {income ? '+' : '-'}
                      </span>
                      <span className="profile-activity-main">
                        <strong>{String(expense.title || 'Untitled').toLowerCase()}</strong>
                        <small>{formatProfileDate(expense.date)}</small>
                      </span>
                      <span
                        className={
                          income
                            ? 'profile-activity-amount income'
                            : 'profile-activity-amount expense'
                        }
                      >
                        {income ? '+' : '-'}
                        {formatProfileMoney(expense.amount, settings.currency)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="profile-empty-state">
                <strong>No activity yet</strong>
                <p>Your recent expenses and income will appear here.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  )
}

export default ProfilePage
