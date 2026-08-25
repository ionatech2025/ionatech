import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { adminFetch } from '../lib/api'

export default function ResetPassword() {
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 10) {
      setError('Password must be at least 10 characters.')
      return
    }
    if (password !== confirm) {
      setError("Passwords don't match.")
      return
    }

    setBusy(true)
    try {
      await adminFetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
      })
      nav('/admin/login', { replace: true, state: { resetSuccess: true } })
    } catch (err) {
      setError(err.body?.error === 'invalid_or_expired_token'
        ? 'This reset link is invalid or has expired. Request a new one.'
        : err.message)
    } finally {
      setBusy(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-6 text-center">
          <p className="text-red-600">This link is missing a reset token.</p>
          <Link to="/admin/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
            Request a new one
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Set a new password</h1>
          <p className="text-slate-500 text-sm">At least 10 characters — length matters more than symbols.</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="new-password" className="text-sm font-bold text-slate-700">New password</label>
          <input
            id="new-password"
            type="password"
            name="new-password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={10}
            ref={(el) => el && el.focus()}
            className="w-full px-5 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-bold text-slate-700">Confirm password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={10}
            className="w-full px-5 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        {error && (
          <div className="text-sm p-3 bg-red-50 text-red-700 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {busy ? 'Saving…' : 'Reset password'}
        </button>
      </form>
    </div>
  )
}
