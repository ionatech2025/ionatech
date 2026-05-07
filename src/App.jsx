import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicSite from './PublicSite'
import AdminApp from './admin/AdminApp'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
