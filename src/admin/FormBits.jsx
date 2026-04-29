import React from 'react'
import { iconNames } from '../data/iconRegistry'

export function Field({ label, hint, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {children}
      {hint && <span className="block text-xs text-slate-400">{hint}</span>}
    </label>
  )
}

export const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none border border-transparent focus:border-blue-200 text-slate-900'

export function TextInput({ value, onChange, ...rest }) {
  return (
    <input
      type="text"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
      {...rest}
    />
  )
}

export function TextArea({ value, onChange, rows = 4, ...rest }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`${inputClass} resize-y`}
      {...rest}
    />
  )
}

export function NumberInput({ value, onChange, ...rest }) {
  return (
    <input
      type="number"
      value={value ?? 0}
      onChange={(e) => onChange(Number(e.target.value))}
      className={inputClass}
      {...rest}
    />
  )
}

export function CheckboxField({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-blue-600"
      />
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </label>
  )
}

/**
 * Icon picker: renders a select bound to the iconRegistry entries so admins
 * can only choose icons the public site can actually render.
 */
export function IconPicker({ value, onChange }) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || null)}
      className={inputClass}
    >
      <option value="">— none —</option>
      {iconNames.map((n) => <option key={n} value={n}>{n}</option>)}
    </select>
  )
}

/**
 * One-item-per-line textarea. Keeps simple list editing simple — used for
 * features, technologies, benefits, tech_stack, etc.
 */
export function LinesField({ value, onChange, rows = 4, placeholder }) {
  const text = Array.isArray(value) ? value.join('\n') : (value ?? '')
  return (
    <textarea
      value={text}
      onChange={(e) => {
        const lines = e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
        onChange(lines)
      }}
      rows={rows}
      placeholder={placeholder}
      className={`${inputClass} resize-y font-mono text-sm`}
    />
  )
}

export function FormActions({ saving, onCancel, onDelete, deleteLabel = 'Delete' }) {
  return (
    <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
      >
        Cancel
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-auto px-5 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          {deleteLabel}
        </button>
      )}
    </div>
  )
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </header>
  )
}
