import React from 'react'
import { useSingleton } from './useResource'
import { Field, TextInput, FormActions, PageHeader } from './FormBits'

const BLANK = {
  email: '', phone: '', address: '',
  whatsappNumber: '', web3formsAccessKey: '',
}

export default function ContactEdit() {
  const { item, setItem, loading, saving, error, savedAt, save } = useSingleton('/api/admin/contact', BLANK)
  if (loading) return <p className="text-slate-500">Loading…</p>
  const set = (patch) => setItem({ ...item, ...patch })

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save(item) }}
      className="space-y-5 bg-white p-8 rounded-2xl border border-slate-100"
    >
      <PageHeader title="Contact info" subtitle={savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : null} />

      <Field label="Email"><TextInput value={item.email} onChange={(v) => set({ email: v })} placeholder="hello@example.com" /></Field>
      <Field label="Phone"><TextInput value={item.phone} onChange={(v) => set({ phone: v })} placeholder="+256 …" /></Field>
      <Field label="Address"><TextInput value={item.address} onChange={(v) => set({ address: v })} placeholder="Kampala, Uganda" /></Field>
      <Field label="WhatsApp number" hint="Digits only, no plus sign — e.g. 256700966715."><TextInput value={item.whatsappNumber} onChange={(v) => set({ whatsappNumber: v })} /></Field>
      <Field label="Web3Forms access key" hint="Used by the public contact form. Visible to the browser today; will be moved server-side later.">
        <TextInput value={item.web3formsAccessKey} onChange={(v) => set({ web3formsAccessKey: v })} />
      </Field>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <FormActions saving={saving} onCancel={() => window.history.back()} />
    </form>
  )
}
