import ResourceTable from './ResourceTable'
import { useResourceList } from './useResource'

export default function TeamList() {
  const { items, loading, error } = useResourceList('/api/admin/team')

  return (
    <ResourceTable
      title="Team"
      basePath="/admin/team"
      items={items}
      loading={loading}
      error={error}
      columns={[
        { key: 'sortOrder', label: '#' },
        { key: 'name',  label: 'Name' },
        { key: 'role',  label: 'Role' },
        { key: 'published', label: 'Published',
          render: (i) => i.published ? <span className="text-green-600 text-xs font-bold">YES</span>
                                     : <span className="text-slate-400 text-xs font-bold">HIDDEN</span> },
      ]}
    />
  )
}
