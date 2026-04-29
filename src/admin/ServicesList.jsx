import React from 'react'
import ResourceTable from './ResourceTable'
import { useResourceList } from './useResource'

export default function ServicesList() {
  const { items, loading, error } = useResourceList('/api/admin/services')

  return (
    <ResourceTable
      title="Services"
      basePath="/admin/services"
      items={items}
      loading={loading}
      error={error}
      columns={[
        { key: 'sortOrder', label: '#' },
        { key: 'title',     label: 'Title' },
        { key: 'features',  label: 'Features',
          render: (i) => <span className="text-slate-500 text-xs">{(i.features || []).join(', ')}</span> },
        { key: 'published', label: 'Published',
          render: (i) => i.published ? <span className="text-green-600 text-xs font-bold">YES</span>
                                     : <span className="text-slate-400 text-xs font-bold">DRAFT</span> },
      ]}
    />
  )
}
