import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, TextInput, FormActions, PageHeader } from './FormBits'
import { adminFetch } from '../lib/api'

export default function ChangePassword() {
  const nav = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedAt, setSavedAt] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSavedAt(null)

    if (newPassword.length < 10) {
      setError('New password must be at least 10 characters.')
      return
    }
    if (newPassword !== confirm) {
      setError("New passwords don't match.")
      return
    }

    setSaving(true)
    try {
      await adminFetch('/api/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      setCurrentPassword('')
      setNewPassword('')
      setConfirm('')
      setSavedAt(new Date())
    } catch (err) {
      setError(err.body?.error === 'invalid_current_password'
        ? 'Current password is incorrect.'
        : err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5 bg-white p-8 rounded-2xl border border-slate-100 max-w-lg">
      <PageHeader title="Change password" subtitle="Changing your password signs out every other session — this one stays signed in." />

      <Field label="Current password">
        <TextInput type="password" autoComplete="current-password" value={currentPassword} onChange={setCurrentPassword} required />
      </Field>

      <Field label="New password" hint="At least 10 characters.">
        <TextInput type="password" autoComplete="new-password" value={newPassword} onChange={setNewPassword} required minLength={10} />
      </Field>

      <Field label="Confirm new password">
        <TextInput type="password" autoComplete="new-password" value={confirm} onChange={setConfirm} required minLength={10} />
      </Field>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {savedAt && <p className="text-emerald-600 text-sm">Password changed.</p>}

      <FormActions saving={saving} onCancel={() => nav('/admin')} onDelete={null} />
    </form>
  )
}
