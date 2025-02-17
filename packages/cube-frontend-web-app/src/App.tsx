import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import './App.css'
import './tailwind.css'
import Layout from './layout/Layout'
import { DataCenterProvider } from './context/DataCenterProvider'
import { HomePage } from './pages/HomePage/HomePage'
import { UserContextProvider } from './context/UserContextProvider'
import { IntegrationsContextProvider } from './context/IntegrationsContextProvider'

function App() {
  return (
    <>
      {/* TODO: inject global css, setup global store here. */}
      <DataCenterProvider>
        <UserContextProvider>
          <IntegrationsContextProvider>
            <Layout>
              {/* TODO: setup react router logic here. */}
              <HomePage />
            </Layout>
          </IntegrationsContextProvider>
        </UserContextProvider>
      </DataCenterProvider>
    </>
  )
}

export default App
