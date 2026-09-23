import { useEffect, useState } from 'react'
import { defaultCategories, getCategoryName } from '../data/categoryData'

const DATA_KEY = 'expense-manager-data'
const CURRENT_USER_KEY = 'expense-manager-current-user-email'
const USER_STORAGE_EVENT = 'expense-manager-user-storage-change'
const starterExpenses = []

function read(key, fallback) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function copy(value) {
  return JSON.parse(JSON.stringify(value))
}

export function normalizeUserEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function getData() {
  const data = read(DATA_KEY, { users: {} })

  return {
    users: data.users || {}
  }
}

function saveData(data) {
  save(DATA_KEY, data)
}

// function emitStorageChange(section) {
//   if (typeof window === 'undefined') return

//   queueMicrotask(() => {
//     window.dispatchEvent(
//       new CustomEvent(USER_STORAGE_EVENT, {
//         detail: { section },
//       }),
//     )
//   })
// }

function requireEmail(profile) {
  const email = normalizeUserEmail(profile?.email)

  if (!email) {
    throw new Error('Please enter a valid email address.')
  }

  return email
}

function requirePassword(profile) {
  const password = String(profile?.password || '')

  if (!password.trim()) {
    throw new Error('Please enter your password.')
  }

  return password
}

function getProfile(email, profile = {}) {
  return {
    name: profile.name || email.split('@')[0] || 'User',
    email
  }
}

function groupExpenses(expenses, categories = []) {
  const grouped = {}

  categories
    .map(getCategoryName)
    .filter(Boolean)
    .forEach((category) => {
      grouped[category] = []
    })

  expenses.forEach((expense) => {
    const category = expense.category || 'Uncategorized'

    if (!grouped[category]) {
      grouped[category] = []
    }

    grouped[category].push({
      ...expense,
      category
    })
  })

  return grouped
}

function getExpenses(groupedExpenses) {
  if (Array.isArray(groupedExpenses)) {
    return groupedExpenses
  }

  return Object.entries(groupedExpenses || {})
    .flatMap(([category, expenses]) =>
      Array.isArray(expenses)
        ? expenses.map((expense) => ({
            ...expense,
            category: expense.category || category
          }))
        : []
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

function createUser(email, profile = {}) {
  return {
    isLoggedIn: false,
    password: profile.password || '',
    profile: getProfile(email, profile),
    categories: copy(defaultCategories),
    expensesByCategory: groupExpenses(
      starterExpenses,
      defaultCategories
    )
  }
}

function getUser(data, email, profile = {}) {
  if (!data.users[email]) {
    data.users[email] = createUser(email, profile)
  }

  const user = data.users[email]

  user.profile = {
    ...getProfile(email),
    ...user.profile,
    ...(profile.name ? { name: profile.name } : {}),
    email
  }

  user.categories ||= copy(defaultCategories)
  if (!user.expensesByCategory) {
    user.expensesByCategory = groupExpenses(
      user.expenses || starterExpenses,
      user.categories
    )
  }
  delete user.expenses
  return user
}

function setLogin(data, email) {
  Object.keys(data.users).forEach((userEmail) => {
    data.users[userEmail].isLoggedIn = userEmail === email
  })
}

export function getCurrentUserEmail() {
  const email = normalizeUserEmail(
    localStorage.getItem(CURRENT_USER_KEY)
  )
  const data = getData()
  if (!email) {
    const loggedInUser = Object.keys(data.users).find(
      (email) => data.users[email].isLoggedIn
    )
    if (loggedInUser) {
      localStorage.setItem(CURRENT_USER_KEY, loggedInUser)
      return loggedInUser
    }

    return ''
  }

  if (!data.users[email]) {
    localStorage.removeItem(CURRENT_USER_KEY)
    return ''
  }

  if (data.users[email].isLoggedIn === false) {
    localStorage.removeItem(CURRENT_USER_KEY)
    return ''
  }

  return email
}

export function ensureUserAccount(profile, options = {}) {
  const email = requireEmail(profile)

  const data = getData()
  const user = getUser(data, email, profile)

  if (profile?.password) {
    user.password = profile.password
  }

  if (options.setCurrent !== false) {
    setLogin(data, email)
    localStorage.setItem(CURRENT_USER_KEY, email)
  } else {
    user.isLoggedIn = false
  }

  saveData(data)

  return user
}

export function registerUserAccount(profile) {
  const email = requireEmail(profile)
  const password = requirePassword(profile)
  const name = String(profile?.name || '').trim()

  if (!name) {
    throw new Error('Please enter your name.')
  }

  const data = getData()

  if (data.users[email]) {
    throw new Error('An account already exists. Please sign in.')
  }

  data.users[email] = createUser(email, {
    ...profile,
    email,
    name,
    password,
  })

  data.users[email].isLoggedIn = false
  saveData(data)
  localStorage.removeItem(CURRENT_USER_KEY)

  return data.users[email]
}

export function signInUserAccount(profile) {
  const email = requireEmail(profile)
  const password = requirePassword(profile)
  const data = getData()

  if (!data.users[email]) {
    throw new Error('No account found. Please sign up first.')
  }

  const user = getUser(data, email)
  const savedPassword = user.password || user.auth?.password || ''

  if (savedPassword && savedPassword !== password) {
    throw new Error('Incorrect password. Please try again.')
  }

  if (!savedPassword) {
    user.password = password
  }

  setLogin(data, email)
  localStorage.setItem(CURRENT_USER_KEY, email)
  saveData(data)

  return user
}

export function clearCurrentUser() {
  const data = getData()

  Object.values(data.users).forEach((user) => {
    user.isLoggedIn = false
  })

  saveData(data)
  localStorage.removeItem(CURRENT_USER_KEY)
}

function getDefault(section, email, initialValue) {
  if (initialValue !== undefined) {
    return copy(initialValue)
  }

  if (section === 'profile') {
    return getProfile(email)
  }

  if (section === 'categories') {
    return copy(defaultCategories)
  }

  if (section === 'expenses') {
    return copy(starterExpenses)
  }

  return null
}

export function readCurrentUserSection(section, initialValue) {
  const email = getCurrentUserEmail()

  if (!email) {
    return getDefault(section, '', initialValue)
  }

  const data = getData()
  const user = getUser(data, email)

  if (section === 'expenses') {
    return getExpenses(user.expensesByCategory)
  }

  if (user[section] === undefined) {
    user[section] = getDefault(
      section,
      email,
      initialValue
    )
  }
  saveData(data)
  return user[section]
}

export function writeCurrentUserSection(section, value) {
  const email = getCurrentUserEmail()

  if (!email) {
    return value
  }

  const data = getData()
  const user = getUser(data, email)

  if (section === 'expenses') {
    user.expensesByCategory = groupExpenses(
      value,
      user.categories
    )
  } else {
    user[section] = value
  }

  if (section === 'categories') {
    user.expensesByCategory = groupExpenses(
      getExpenses(user.expensesByCategory),
      value
    )
  }

  saveData(data)
 // emitStorageChange(section)

  return section === 'expenses'
    ? getExpenses(user.expensesByCategory)
    : user[section]
}

export function useUserStorage(section, initialValue) {
  const [value, setValue] = useState(() =>
    readCurrentUserSection(section, initialValue)
  )

  useEffect(() => {
    function refresh(event) {
      if (event.type === USER_STORAGE_EVENT) {
        const changedSection = event.detail?.section

        if (changedSection && changedSection !== section) return
      }

      if (
        event.type === 'storage' &&
        event.key &&
        event.key !== DATA_KEY &&
        event.key !== CURRENT_USER_KEY
      ) {
        return
      }

      setValue(readCurrentUserSection(section, initialValue))
    }

    // window.addEventListener(USER_STORAGE_EVENT, refresh)
    // window.addEventListener('storage', refresh)

    return () => {
      window.removeEventListener(USER_STORAGE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [section, initialValue])

  function updateValue(newValue) {
    setValue((oldValue) => {
      const value =
        typeof newValue === 'function'
          ? newValue(oldValue)
          : newValue

      return writeCurrentUserSection(section, value)
    })
  }

  return [value, updateValue]
}
