import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminFetch } from '../lib/api'

/**
 * Loads a list of resources for the admin (includes drafts).
 */
export function useResourceList(basePath) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = () => {
    setLoading(true)
    adminFetch(basePath)
      .then((data) => { setItems(data); setError('') })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(reload, [basePath])
  return { items, loading, error, reload }
}

/**
 * Loads a single resource (or a fresh blank one if creating). Returns helpers
 * for save and delete that navigate back to the SPA list route on success.
 *
 * Pages must pass both:
 *   - apiPath: e.g. '/api/admin/products' (where CRUD requests go)
 *   - uiPath:  e.g. '/admin/products'     (where to navigate after save/delete)
 */
export function useResourceItem(apiPath, uiPath, blank) {
  const { id } = useParams()
  const nav = useNavigate()
  const isNew = id === undefined
  const [item, setItem] = useState(isNew ? blank : null)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) return
    adminFetch(`${apiPath}/${id}`)
      .then(setItem)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [apiPath, id, isNew])

  const save = async (data) => {
    setSaving(true)
    setError('')
    try {
      if (isNew) {
        await adminFetch(apiPath, { method: 'POST', body: JSON.stringify(data) })
      } else {
        await adminFetch(`${apiPath}/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
      }
      nav(uiPath)
    } catch (err) {
      setError(err.body?.error || err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (isNew) return
    if (!window.confirm('Delete this item?')) return
    try {
      await adminFetch(`${apiPath}/${id}`, { method: 'DELETE' })
      nav(uiPath)
    } catch (err) {
      setError(err.body?.error || err.message)
    }
  }

  return { item, setItem, loading, saving, error, save, remove, isNew }
}

/**
 * Loads a singleton resource (about/contact). Save uses PATCH on the
 * collection root.
 */
export function useSingleton(basePath, blank) {
  const [item, setItem] = useState(blank)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    adminFetch(basePath)
      .then((data) => setItem(data || blank))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePath])

  const save = async (data) => {
    setSaving(true)
    setError('')
    try {
      await adminFetch(basePath, { method: 'PATCH', body: JSON.stringify(data) })
      setSavedAt(new Date())
    } catch (err) {
      setError(err.body?.error || err.message)
    } finally {
      setSaving(false)
    }
  }

  return { item, setItem, loading, saving, error, savedAt, save }
}
