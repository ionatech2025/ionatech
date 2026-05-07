import { useSingleton } from './useResource'
import { Field, TextInput, TextArea, IconPicker, FormActions, PageHeader } from './FormBits'
import ImageField from './ImageField'

const BLANK = {
  eyebrow: '', titleLead: '', titleHighlight: '',
  description: '', image: '',
  statBadgeValue: '', statBadgeLabel: '',
  stats: [],
}

export default function AboutEdit() {
  const { item, setItem, loading, saving, error, savedAt, save } = useSingleton('/api/admin/about', BLANK)
  if (loading) return <p className="text-slate-500">Loading…</p>
  const set = (patch) => setItem({ ...item, ...patch })
  const setStat = (i, patch) => {
    const next = [...(item.stats || [])]
    next[i] = { ...next[i], ...patch }
    set({ stats: next })
  }
  const addStat = () => set({ stats: [...(item.stats || []), { iconName: '', label: '', detail: '' }] })
  const removeStat = (i) => set({ stats: (item.stats || []).filter((_, idx) => idx !== i) })

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); save(item) }}
      className="space-y-5 bg-white p-8 rounded-2xl border border-slate-100"
    >
      <PageHeader title="About section" subtitle={savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : 'Single page block. Saving updates the public site within ~60s.'} />

      <Field label="Eyebrow" hint='Small uppercase label above the title (e.g. "Who We Are").'>
        <TextInput value={item.eyebrow} onChange={(v) => set({ eyebrow: v })} />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Title — leading"><TextInput value={item.titleLead} onChange={(v) => set({ titleLead: v })} /></Field>
        <Field label="Title — highlight" hint="Rendered in blue."><TextInput value={item.titleHighlight} onChange={(v) => set({ titleHighlight: v })} /></Field>
      </div>
      <Field label="Description" hint="Plain text or simple inline HTML (e.g. <strong>)."><TextArea value={item.description} onChange={(v) => set({ description: v })} rows={5} /></Field>
      <ImageField label="Image" value={item.image} onChange={(v) => set({ image: v })} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Stat badge value"><TextInput value={item.statBadgeValue} onChange={(v) => set({ statBadgeValue: v })} placeholder="100%" /></Field>
        <Field label="Stat badge label"><TextInput value={item.statBadgeLabel} onChange={(v) => set({ statBadgeLabel: v })} placeholder="Client Commitment" /></Field>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900">Benefit grid stats</h3>
          <button type="button" onClick={addStat} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Add stat</button>
        </div>
        <div className="space-y-3">
          {(item.stats || []).map((s, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-slate-50 rounded-xl">
              <div className="md:col-span-3"><IconPicker value={s.iconName} onChange={(v) => setStat(i, { iconName: v })} /></div>
              <TextInput value={s.label} onChange={(v) => setStat(i, { label: v })} placeholder="Label" />
              <TextInput value={s.detail} onChange={(v) => setStat(i, { detail: v })} placeholder="Detail" />
              <button type="button" onClick={() => removeStat(i)} className="text-red-600 hover:text-red-700 text-sm">Remove</button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <FormActions saving={saving} onCancel={() => window.history.back()} />
    </form>
  )
}
