import React from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus } from 'lucide-react'
import { PageHeader } from './FormBits'

/**
 * Generic admin list view. Pass it column accessors and the basePath; it
 * handles loading, empty state, and a "New" button.
 */
export default function ResourceTable({ title, basePath, columns, items, loading, error }) {
  return (
    <div>
      <PageHeader
        title={title}
        action={
          <Link
            to={`${basePath}/new`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} /> New
          </Link>
        }
      />

      {loading && <p className="text-slate-500">Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {items.length === 0 ? (
            <p className="p-8 text-center text-slate-500">No items yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-left">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className="px-5 py-3 font-medium">{c.label}</th>
                  ))}
                  <th className="px-5 py-3 w-16" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    {columns.map((c) => (
                      <td key={c.key} className="px-5 py-3">{c.render ? c.render(item) : item[c.key]}</td>
                    ))}
                    <td className="px-5 py-3">
                      <Link
                        to={`${basePath}/${item.id}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Pencil size={14} /> Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
