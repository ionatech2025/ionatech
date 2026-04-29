import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useResourceItem } from './useResource'
import { Field, TextInput, TextArea, NumberInput, CheckboxField, FormActions, PageHeader } from './FormBits'
import ImageField from './ImageField'

const BLANK = { name: '', role: '', bio: '', image: '', sortOrder: 0, published: true }

export default function TeamEdit() {
  const nav = useNavigate()
  const { item, setItem, loading, saving, error, save, remove, isNew } = useResourceItem('/api/admin/team', BLANK)

  if (loading) return <p className="text-slate-500">Loading…</p>
  if (!item) return <p className="text-red-600">{error || 'Not found.'}</p>

  const set = (patch) => setItem({ ...item, ...patch })

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save(item) }}
      className="space-y-5 bg-white p-8 rounded-2xl border border-slate-100"
    >
      <PageHeader title={isNew ? 'New team member' : 'Edit team member'} />

      <Field label="Name"><TextInput value={item.name} onChange={(v) => set({ name: v })} required /></Field>
      <Field label="Role"><TextInput value={item.role} onChange={(v) => set({ role: v })} placeholder="e.g. Director | Co-founder" /></Field>
      <Field label="Bio"><TextArea value={item.bio} onChange={(v) => set({ bio: v })} rows={6} /></Field>
      <ImageField label="Photo" hint="Upload a photo or paste a /public/images/ path." value={item.image} onChange={(v) => set({ image: v })} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Sort order"><NumberInput value={item.sortOrder} onChange={(v) => set({ sortOrder: v })} /></Field>
        <div className="flex items-end"><CheckboxField label="Published" value={item.published} onChange={(v) => set({ published: v })} /></div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <FormActions saving={saving} onCancel={() => nav('/admin/team')} onDelete={isNew ? null : remove} />
    </form>
  )
}
