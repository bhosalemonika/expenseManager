import { useState } from 'react'
import AppShell from '../components/AppShell'
import SettingsOption from '../components/Settings/SettingsOption'
import { useUserStorage } from '../hooks/useUserStorage'
import '../css/Settings.css'

function Settings({ setPage }) {
  const [profile, setProfile] = useUserStorage('profile')
  const [saved, setSaved] = useState(false)
  function update(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
    setSaved(false)
  }
  return (
    <AppShell page="settings" setPage={setPage}>
      <div className="settings-page">
      <div className="page-heading">
        <div>
          <h2>Settings</h2>
          <p>Manage your profile and application preferences.</p>
        </div>
      </div>
      <section className="form-panel settings-panel">
        <SettingsOption label="Your Name" name="name" value={profile.name} onChange={update} />
        <SettingsOption label="Email Address" name="email" type="email" value={profile.email} onChange={update} readOnly />
        <button className="green-button" onClick={() => setSaved(true)}>Save Changes</button>
        {saved && <p className="success-text">Settings saved locally.</p>}
      </section>
      </div>
    </AppShell>
  )
}
export default Settings
