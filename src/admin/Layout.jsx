import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { adminFetch } from '../lib/api'
import { LayoutDashboard, Package, FolderKanban, Settings2, Users, Info, Phone, LogOut } from 'lucide-react'

const NAV = [
  { to: '/admin',          label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products',  icon: Package },
  { to: '/admin/projects', label: 'Projects',  icon: FolderKanban },
  { to: '/admin/services', label: 'Services',  icon: Settings2 },
  { to: '/admin/team',     label: 'Team',      icon: Users },
  { to: '/admin/about',    label: 'About',     icon: Info },
  { to: '/admin/contact',  label: 'Contact',   icon: Phone },
]

export default function Layout({ user, onLogout }) {
  const nav = useNavigate()

  const logout = async () => {
    try {
      await adminFetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // Best-effort: clear the local session even if the server call fails.
    }
    await onLogout?.()
    nav('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">iONA TECH</p>
          <p className="text-lg font-bold text-slate-900">Admin</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 mb-2 truncate">{user?.email}</p>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="p-8 lg:p-12 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
