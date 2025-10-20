import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import { CosToastProvider } from '@cube-frontend/ui-library'
import { I18nProvider } from './i18n/I18nProvider'
import { DataCenterProvider } from './context/DataCenterProvider'
import { ApplicationIntegrationsContextProvider } from './context/ApplicationIntegrationsContextProvider'
import { UserContextProvider } from './context/UserContextProvider'
import { CosTimeZoneProvider } from './context/CosTimeZoneProvider'
import { NotificationsContextProvider } from './context/NotificationsContextProvider'
import { CosRoutes } from './CosRoutes'
import Layout from './layout/Layout'

import './App.css'
import './tailwind.css'

function App() {
  return (
    <I18nProvider>
      <DataCenterProvider>
        <UserContextProvider>
          <ApplicationIntegrationsContextProvider>
            <CosTimeZoneProvider>
              <CosToastProvider>
                <NotificationsContextProvider>
                  <Layout>
                    <CosRoutes />
                  </Layout>
                </NotificationsContextProvider>
              </CosToastProvider>
            </CosTimeZoneProvider>
          </ApplicationIntegrationsContextProvider>
        </UserContextProvider>
      </DataCenterProvider>
    </I18nProvider>
  )
}

export default App
