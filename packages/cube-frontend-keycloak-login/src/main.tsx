import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

// Using an interval as a quick fix to delay React rendering until the required
// DOM element is present in Keycloak's login page.
const intervalId = setInterval(() => {
  const root = document.getElementById('kc-form-wrapper')
  if (root) {
    clearInterval(intervalId)
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}, 250)
