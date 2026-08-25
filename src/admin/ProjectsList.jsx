import ResourceTable from './ResourceTable'
import { useResourceList } from './useResource'

export default function ProjectsList() {
  const { items, loading, error } = useResourceList('/api/admin/projects')

  return (
    <ResourceTable
      title="Projects"
      basePath="/admin/projects"
      items={items}
      loading={loading}
      error={error}
      columns={[
        { key: 'sortOrder', label: '#' },
        { key: 'title',     label: 'Title' },
        { key: 'client',    label: 'Client' },
        { key: 'status',    label: 'Status' },
        { key: 'published', label: 'Published',
          render: (i) => i.published ? <span className="text-green-600 text-xs font-bold">YES</span>
                                     : <span className="text-slate-400 text-xs font-bold">DRAFT</span> },
      ]}
    />
  )
}
