import React, { useState } from 'react'
import { adminFetch } from '../lib/api'

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await adminFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      await onSuccess?.()
    } catch (err) {
      setError(err.body?.error === 'invalid_credentials' ? 'Invalid email or password.' : err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">iONA Admin</h1>
          <p className="text-slate-500 text-sm">Sign in to manage site content.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="w-full px-5 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
