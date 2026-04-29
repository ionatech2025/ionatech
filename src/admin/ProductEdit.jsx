import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useResourceItem } from './useResource'
import { Field, TextInput, TextArea, NumberInput, CheckboxField, IconPicker, LinesField, FormActions, PageHeader } from './FormBits'
import ImageField from './ImageField'

const BLANK = {
  slug: '', title: '', description: '', category: '',
  iconName: '', image: '', client: '', projectUrl: '',
  techStack: [], sortOrder: 0, published: true,
}

export default function ProductEdit() {
  const nav = useNavigate()
  const { item, setItem, loading, saving, error, save, remove, isNew } = useResourceItem('/api/admin/products', BLANK)

  if (loading) return <p className="text-slate-500">Loading…</p>
  if (!item) return <p className="text-red-600">{error || 'Not found.'}</p>

  const set = (patch) => setItem({ ...item, ...patch })

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save(item) }}
      className="space-y-5 bg-white p-8 rounded-2xl border border-slate-100"
    >
      <PageHeader title={isNew ? 'New product' : 'Edit product'} subtitle="Showcase real iONA work — fill in the client and links to make it a case study." />

      <Field label="Slug" hint="URL-safe identifier. Must be unique."><TextInput value={item.slug} onChange={(v) => set({ slug: v })} required /></Field>
      <Field label="Title"><TextInput value={item.title} onChange={(v) => set({ title: v })} required /></Field>
      <Field label="Category"><TextInput value={item.category} onChange={(v) => set({ category: v })} /></Field>
      <Field label="Description"><TextArea value={item.description} onChange={(v) => set({ description: v })} /></Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Client" hint="Customer name shown on the case-study card."><TextInput value={item.client} onChange={(v) => set({ client: v })} /></Field>
        <Field label="Project URL" hint="Live link or case-study page."><TextInput value={item.projectUrl} onChange={(v) => set({ projectUrl: v })} placeholder="https://…" /></Field>
      </div>

      <Field label="Tech stack" hint="One technology per line."><LinesField value={item.techStack} onChange={(v) => set({ techStack: v })} placeholder={'React\nNode.js\nPostgreSQL'} /></Field>

      <Field label="Icon"><IconPicker value={item.iconName} onChange={(v) => set({ iconName: v })} /></Field>

      <ImageField label="Product image" value={item.image} onChange={(v) => set({ image: v })} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Sort order"><NumberInput value={item.sortOrder} onChange={(v) => set({ sortOrder: v })} /></Field>
        <div className="flex items-end"><CheckboxField label="Published" value={item.published} onChange={(v) => set({ published: v })} /></div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <FormActions saving={saving} onCancel={() => nav('/admin/products')} onDelete={isNew ? null : remove} />
    </form>
  )
}
