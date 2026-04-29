import React, { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Field, TextInput, inputClass } from './FormBits'

/**
 * Image input that supports either pasting a URL/path or uploading a file
 * to Vercel Blob (via /api/admin/upload). On a successful upload the
 * returned URL is written into the value via onChange.
 */
export default function ImageField({ label, value, onChange, hint }) {
  const fileRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const upload = async (file) => {
    setBusy(true)
    setError('')
    try {
      const r = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
        credentials: 'include',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
      })
      const text = await r.text()
      const body = text ? JSON.parse(text) : null
      if (!r.ok) throw new Error(body?.error || `upload_failed (${r.status})`)
      onChange(body.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <Field label={label} hint={hint || 'Paste a URL/path, or upload a file (up to 8 MB).'}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/foo.jpg or https://…"
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            <Upload size={16} />
            {busy ? 'Uploading…' : 'Upload'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              title="Clear"
              className="px-3 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) upload(file)
          }}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {value && (
          <div className="p-2 bg-slate-50 rounded-lg inline-block">
            <img
              src={value}
              alt="preview"
              className="h-24 w-auto rounded object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>
        )}
      </div>
    </Field>
  )
}
