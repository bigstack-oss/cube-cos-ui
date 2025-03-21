import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import { DataCenterProvider } from './context/DataCenterProvider'
import { IntegrationsContextProvider } from './context/IntegrationsContextProvider'
import { UserContextProvider } from './context/UserContextProvider'
import { CosRoutes } from './CosRoutes'
import Layout from './layout/Layout'

import './App.css'
import './tailwind.css'

function App() {
  return (
    // TODO: inject global css, setup global store here.
    <DataCenterProvider>
      <UserContextProvider>
        <IntegrationsContextProvider>
          <Layout>
            <CosRoutes />
          </Layout>
        </IntegrationsContextProvider>
      </UserContextProvider>
    </DataCenterProvider>
  )
}

export default App
