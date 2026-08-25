import { useState } from 'react'
import { Link } from 'react-router-dom'
import { adminFetch } from '../lib/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await adminFetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Forgot password</h1>
          <p className="text-slate-500 text-sm">We'll email you a link to reset it.</p>
        </div>

        {sent ? (
          <div className="text-sm p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            If that email has an admin account, a reset link is on its way. It expires in 1 hour.
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="forgot-email" className="text-sm font-bold text-slate-700">Email</label>
              <input
                id="forgot-email"
                type="email"
                name="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                ref={(el) => el && el.focus()}
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
              {busy ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}

        <Link to="/admin/login" className="block text-center text-sm text-slate-500 hover:text-slate-700">
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
