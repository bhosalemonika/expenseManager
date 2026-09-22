import '../../css/SettingsOption.css'

function SettingsOption({ label, name, type, value, onChange, readOnly }) {
  return (
    <label className="settings-option">
      {label}
      <input
        name={name}
        type={type || 'text'}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </label>
  )
}

export default SettingsOption
