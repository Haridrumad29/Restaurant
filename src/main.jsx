import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css';
import { AuthProvider } from './Context/AuthContext';
import {NotificationProvider} from './Context/NotificationContext'

createRoot(document.getElementById('root')).render(
<NotificationProvider>
  <AuthProvider>

  <StrictMode>
    <App />
  </StrictMode>,
  </AuthProvider>
</NotificationProvider>
)
