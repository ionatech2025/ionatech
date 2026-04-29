import React from 'react'
import { Link } from 'react-router-dom'
import { Package, Settings2, Users, Info, Phone } from 'lucide-react'

const CARDS = [
  { to: '/admin/products', label: 'Products', desc: 'Showcase real iONA work — clients, links, tech stack.', icon: Package },
  { to: '/admin/services', label: 'Services', desc: 'Edit service offerings, technologies, and benefits.',    icon: Settings2 },
  { to: '/admin/team',     label: 'Team',     desc: 'Manage team members, roles, bios, and photos.',          icon: Users },
  { to: '/admin/about',    label: 'About',    desc: 'About-section copy, eyebrow, and stats.',                icon: Info },
  { to: '/admin/contact',  label: 'Contact',  desc: 'Email, phone, address, and WhatsApp number.',            icon: Phone },
]

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
      <p className="text-slate-500 mb-10">Pick a section to manage.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CARDS.map(({ to, label, desc, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="block p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-slate-900">{label}</h3>
            </div>
            <p className="text-sm text-slate-500">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
