import { CosButton } from '@cube-frontend/ui-library'
import Keycloak from '@cube-frontend/ui-library/icons/colored/keyclock.svg?react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import './App.css'
import './tailwind.css'

export const App = () => {
  return (
    <div className="min-h-svh w-full bg-scene-background p-4">
      <CosButton type="secondary" usage="icon-left" Icon={Keycloak}>
        Keycloak Login Page
      </CosButton>
    </div>
  )
}
