import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './Login'
import Layout from './Layout'
import Dashboard from './Dashboard'
import ProductsList from './ProductsList'
import ProductEdit from './ProductEdit'
import ProjectsList from './ProjectsList'
import ProjectEdit from './ProjectEdit'
import ServicesList from './ServicesList'
import ServiceEdit from './ServiceEdit'
import TeamList from './TeamList'
import TeamEdit from './TeamEdit'
import AboutEdit from './AboutEdit'
import ContactEdit from './ContactEdit'
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary.jsx'
import { adminFetch } from '../lib/api'

export default function AdminApp() {
  const [authState, setAuthState] = useState({ status: 'loading', user: null })

  const refreshAuth = async () => {
    try {
      const { user } = await adminFetch('/api/auth/me')
      setAuthState({ status: 'authed', user })
    } catch (err) {
      if (err.status === 401) setAuthState({ status: 'anon', user: null })
      else setAuthState({ status: 'error', error: err.message })
    }
  }

  useEffect(() => { refreshAuth() }, [])

  if (authState.status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading admin…
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="login" element={
          authState.status === 'authed'
            ? <Navigate to="/admin" replace />
            : <Login onSuccess={refreshAuth} />
        } />
        <Route path="*" element={
          authState.status === 'authed'
            ? <Layout user={authState.user} onLogout={refreshAuth} />
            : <RedirectToLogin />
        }>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/new" element={<ProductEdit />} />
          <Route path="products/:id" element={<ProductEdit />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectEdit />} />
          <Route path="projects/:id" element={<ProjectEdit />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="services/new" element={<ServiceEdit />} />
          <Route path="services/:id" element={<ServiceEdit />} />
          <Route path="team" element={<TeamList />} />
          <Route path="team/new" element={<TeamEdit />} />
          <Route path="team/:id" element={<TeamEdit />} />
          <Route path="about" element={<AboutEdit />} />
          <Route path="contact" element={<ContactEdit />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

function RedirectToLogin() {
  const loc = useLocation()
  return <Navigate to="/admin/login" state={{ from: loc }} replace />
}
