import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import '@fontsource/noto-sans-tc/400.css'
import '@fontsource/noto-sans-tc/500.css'
import '@fontsource/noto-sans-tc/600.css'
import '@fontsource/noto-sans-tc/800.css'
import './keycloakLoginContextSetupDev'
import { KeycloakPage } from './pages/KeycloakPage'
import './tailwind.css'

export const App = () => {
  return <KeycloakPage context={window.keycloakLoginContext} />
}
