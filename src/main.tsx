import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import '@fontsource/anton/400.css'
import '@fontsource-variable/manrope'
import './index.css'
import App from './App.tsx'

// Keep the installed app fresh; offline support comes from the generated SW.
registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
