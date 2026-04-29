import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useResourceItem } from './useResource'
import { Field, TextInput, TextArea, NumberInput, CheckboxField, IconPicker, LinesField, FormActions, PageHeader } from './FormBits'
import ImageField from './ImageField'

const BLANK = {
  slug: '', title: '', description: '',
  iconName: '', iconImage: '', image: '', colorClass: 'text-blue-600',
  features: [],
  details: { overview: '', technologies: [], benefits: [] },
  sortOrder: 0, published: true,
}

export default function ServiceEdit() {
  const nav = useNavigate()
  const { item, setItem, loading, saving, error, save, remove, isNew } = useResourceItem('/api/admin/services', '/admin/services', BLANK)

  if (loading) return <p className="text-slate-500">Loading…</p>
  if (!item) return <p className="text-red-600">{error || 'Not found.'}</p>

  const set = (patch) => setItem({ ...item, ...patch })
  const setDetails = (patch) => set({ details: { ...item.details, ...patch } })

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save(item) }}
      className="space-y-5 bg-white p-8 rounded-2xl border border-slate-100"
    >
      <PageHeader title={isNew ? 'New service' : 'Edit service'} />

      <Field label="Slug"><TextInput value={item.slug} onChange={(v) => set({ slug: v })} required /></Field>
      <Field label="Title"><TextInput value={item.title} onChange={(v) => set({ title: v })} required /></Field>
      <Field label="Short description"><TextArea value={item.description} onChange={(v) => set({ description: v })} rows={3} /></Field>

      <Field label="Features" hint="Short bullet items shown on the card. One per line.">
        <LinesField value={item.features} onChange={(v) => set({ features: v })} placeholder={'React & Next.js\nNode.js Backend\nDatabase Design'} />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Icon"><IconPicker value={item.iconName} onChange={(v) => set({ iconName: v })} /></Field>
        <Field label="Color class" hint="Tailwind class, e.g. text-blue-600."><TextInput value={item.colorClass} onChange={(v) => set({ colorClass: v })} /></Field>
      </div>

      <ImageField label="Card image" value={item.image} onChange={(v) => set({ image: v })} />
      <ImageField label="Small icon image" hint="Optional illustrated icon shown in the card title." value={item.iconImage} onChange={(v) => set({ iconImage: v })} />

      <div className="border-t border-slate-100 pt-5 space-y-4">
        <h3 className="font-bold text-slate-900">Details (modal content)</h3>
        <Field label="Overview"><TextArea value={item.details?.overview} onChange={(v) => setDetails({ overview: v })} /></Field>
        <Field label="Technologies" hint="One per line."><LinesField value={item.details?.technologies || []} onChange={(v) => setDetails({ technologies: v })} placeholder={'React.js\nNext.js\nNode.js'} /></Field>
        <Field label="Benefits" hint="One per line."><LinesField value={item.details?.benefits || []} onChange={(v) => setDetails({ benefits: v })} placeholder={'Responsive Design\nSEO Optimized\nFast Loading'} /></Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Sort order"><NumberInput value={item.sortOrder} onChange={(v) => set({ sortOrder: v })} /></Field>
        <div className="flex items-end"><CheckboxField label="Published" value={item.published} onChange={(v) => set({ published: v })} /></div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <FormActions saving={saving} onCancel={() => nav('/admin/services')} onDelete={isNew ? null : remove} />
    </form>
  )
}
