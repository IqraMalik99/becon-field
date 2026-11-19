import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import { ConsultationProvider } from './context/ConsultationProvider.jsx'

const path = window.location.pathname
const isAdmin = path === '/admin' || path.startsWith('/admin/')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? (
      <Admin />
    ) : (
      <ConsultationProvider>
        <App />
      </ConsultationProvider>
    )}
  </StrictMode>,
)
