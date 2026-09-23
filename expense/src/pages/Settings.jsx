import AppShell from '../components/AppShell'
import {
  currencyOptions,
  themeOptions,
} from '../data/settingsData'
import { useSettings } from '../hooks/useSettings'
import { useUserStorage } from '../hooks/useUserStorage'
import '../css/Settings.css'

function getInitial(profile) {
  const value = (profile?.name || profile?.email || 'User').trim() || 'User'
  return value.charAt(0).toUpperCase()
}

function Settings({ setPage }) {
  const [profile, setProfile] = useUserStorage('profile')
  const [settings, setSettings] = useSettings({ applyTheme: true })
  const fallbackName = profile?.email?.split('@')[0] || 'User'
  const displayName = profile?.name ?? fallbackName

  function updateProfile(event) {
    setProfile({
      ...profile,
      name: event.target.value,
    })
  }

  function updateSetting(name, value) {
    setSettings({
      [name]: value,
    })
  }

  function toggleSetting(name) {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: !currentSettings[name],
    }))
  }

  return (
    <AppShell page="settings" setPage={setPage}>
      <div className="settings-page">
        <header className="settings-heading">
          <p className="settings-kicker">Workspace controls</p>
          <h2>Settings</h2>
          <p>
            Shape your expense manager around the way you work and review money.
          </p>
        </header>

        <section className="settings-account-card" aria-label="Current account">
          <div className="settings-account-main">
            <span className="settings-avatar">{getInitial(profile)}</span>
            <div>
              <span className="settings-eyebrow">Signed in as</span>
              <input
                aria-label="Display name"
                className="settings-name-input"
                value={displayName}
                onChange={updateProfile}
              />
              <p>Your preferences are saved for this workspace.</p>
            </div>
          </div>
          <span className="settings-status">Active</span>
        </section>

        <div className="settings-grid">
          <section className="settings-card" aria-labelledby="preferences-title">
            <header className="settings-card-header">
              <div>
                <h3 id="preferences-title">Preferences</h3>
                <p>Defaults used across your dashboard</p>
              </div>
              {/* <span>01</span> */}
            </header>

            <label className="settings-control-row">
              <span>
                <strong>Currency</strong>
                <small>Default currency used for expense totals</small>
              </span>
              <select
                value={settings.currency}
                onChange={(event) =>
                  updateSetting('currency', event.target.value)
                }
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="settings-control-row">
              <span>
                <strong>Theme</strong>
                <small>Choose the visual appearance of your workspace</small>
              </span>
              <select
                value={settings.theme}
                onChange={(event) =>
                  updateSetting('theme', event.target.value)
                }
              >
                {themeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="settings-card" aria-labelledby="notifications-title">
            <header className="settings-card-header">
              <div>
                <h3 id="notifications-title">Notifications</h3>
                <p>Choose what deserves your attention</p>
              </div>
              <span>02</span>
            </header>

            <label className="settings-toggle-row">
              <span>
                <strong>Weekly summary</strong>
                <small>Receive a weekly spending overview</small>
              </span>
              <span className="settings-switch">
                <input
                  type="checkbox"
                  checked={settings.weeklySummary}
                  onChange={() => toggleSetting('weeklySummary')}
                />
                <span aria-hidden="true" />
              </span>
            </label>

            <label className="settings-toggle-row">
              <span>
                <strong>Transaction alerts</strong>
                <small>Show an update when a transaction is recorded</small>
              </span>
              <span className="settings-switch">
                <input
                  type="checkbox"
                  checked={settings.transactionAlerts}
                  onChange={() => toggleSetting('transactionAlerts')}
                />
                <span aria-hidden="true" />
              </span>
            </label>
          </section>

          <section
            className="settings-card settings-card-privacy"
            aria-labelledby="privacy-title"
          >
            <header className="settings-card-header">
              <div>
                <h3 id="privacy-title">Data & Privacy</h3>
                <p>Your account data stays on this device</p>
              </div>
              <span>03</span>
            </header>
            
            <div className="settings-storage-row">
              <span className="settings-storage-icon">DB</span>
              <div>
                <strong>Local storage</strong>
                <small>Categories and expenses are scoped to your account.</small>
              </div>
              <span className="settings-secure">Secure</span>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  )
}

export default Settings
