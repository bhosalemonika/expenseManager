import { useState } from 'react'
import expenseLogo from '../assets/Images/expense.png'
import googleIcon from '../assets/icon/google.png'
import lockIcon from '../assets/icon/uil_lock.png'
import userIcon from '../assets/icon/user.png'
import {
  registerUserAccount,
  signInUserAccount,
} from '../hooks/useUserStorage'
import '../css/LoginPage.css'

function LoginPage({ setPage }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')

  function showMessage(text, type = 'info') {
    setMessage(text)
    setMessageType(type)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const profile = {
      name: form.get('name')?.toString().trim() || '',
      email: form.get('email')?.toString().trim() || '',
      password: form.get('password')?.toString() || '',
    }

    try {
      if (isSignUp) {
        registerUserAccount(profile)
        event.currentTarget.reset()
        setIsSignUp(false)
        showMessage('Account created successfully. Please sign in.', 'success')
        return
      }

      signInUserAccount(profile)
      setPage('dashboard')
    } catch (error) {
      showMessage(
        error.message || 'Something went wrong. Please try again.',
        'error',
      )
    }
  }

  function switchMode() {
    setIsSignUp(!isSignUp)
    setMessage('')
    setMessageType('info')
  }

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-label="Expense Manager account access">
        <header className="brand">
          <img className="brand-logo" src={expenseLogo} alt="Expense Manager" />
          <h1>Expense Manager</h1>
          <p>Empowering your academic financial journey.</p>
        </header>

        <div className="auth-card">
          <h2>{isSignUp ? 'Create account' : 'Welcome back'}</h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <label htmlFor="name">User Name</label>
                <div className="input-wrap">
                  <img src={userIcon} alt="" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                  />
                </div>

                <label htmlFor="email">Email</label>
                <div className="input-wrap">
                  <img src={userIcon} alt="" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </>
            )}

            {!isSignUp && (
              <>
                <label htmlFor="email">Email</label>
                <div className="input-wrap">
                  <img src={userIcon} alt="" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </>
            )}

            <div className="label-row">
              <label htmlFor="password">Password</label>

              {!isSignUp && (
                <button
                  className="text-button"
                  type="button"
                  onClick={() =>
                    showMessage('Password reset is not connected yet.')
                  }
                >
                  Forgot Password?
                </button>
              )}
            </div>

            <div className="input-wrap">
              <img src={lockIcon} alt="" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
              />
            </div>

            {!isSignUp && (
              <label className="remember">
                <input name="remember" type="checkbox" />
                Remember this device
              </label>
            )}

            <button className="primary-button" type="submit">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {!isSignUp && (
            <button
              className="google-button"
              type="button"
              onClick={() => showMessage('Google sign-in is not connected yet.')}
            >
              <img src={googleIcon} alt="" />
              Sign in with Google
            </button>
          )}

          {message && (
            <p className={`form-message ${messageType}`} role="status">
              {message}
            </p>
          )}
        </div>

        <p className="switch-copy">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}

          <button
            className="text-button switch-button"
            type="button"
            onClick={switchMode}
          >
            {isSignUp ? 'Sign In' : 'Sign Up for Free'}
          </button>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
