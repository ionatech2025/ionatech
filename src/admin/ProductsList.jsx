import React from 'react'
import ResourceTable from './ResourceTable'
import { useResourceList } from './useResource'

export default function ProductsList() {
  const { items, loading, error } = useResourceList('/api/admin/products')

  return (
    <ResourceTable
      title="Products"
      basePath="/admin/products"
      items={items}
      loading={loading}
      error={error}
      columns={[
        { key: 'sortOrder', label: '#' },
        { key: 'title',     label: 'Title' },
        { key: 'category',  label: 'Category' },
        { key: 'client',    label: 'Client' },
        { key: 'published', label: 'Published',
          render: (i) => i.published ? <span className="text-green-600 text-xs font-bold">YES</span>
                                     : <span className="text-slate-400 text-xs font-bold">DRAFT</span> },
      ]}
    />
  )
}
