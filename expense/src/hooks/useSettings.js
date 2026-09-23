import { useEffect } from 'react'
import {
  applyThemePreference,
  defaultSettings,
  normalizeSettings,
} from '../data/settingsData'
import { useUserStorage } from './useUserStorage'

export function useSettings(options = {}) {
  const [storedSettings, setStoredSettings] = useUserStorage(
    'settings',
    defaultSettings,
  )
  const settings = normalizeSettings(storedSettings)

  useEffect(() => {
    if (options.applyTheme) {
      applyThemePreference(settings.theme)
    }
  }, [options.applyTheme, settings.theme])

  function updateSettings(nextSettings) {
    setStoredSettings((currentSettings) => {
      const normalizedCurrent = normalizeSettings(currentSettings)
      const value =
        typeof nextSettings === 'function'
          ? nextSettings(normalizedCurrent)
          : {
              ...normalizedCurrent,
              ...nextSettings,
            }

      return normalizeSettings(value)
    })
  }

  return [settings, updateSettings]
}
