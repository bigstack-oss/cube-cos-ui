import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import { CosToastProvider } from '@cube-frontend/ui-library'
import { DataCenterProvider } from './context/DataCenterProvider'
import { ApplicationIntegrationsContextProvider } from './context/ApplicationIntegrationsContextProvider'
import { UserContextProvider } from './context/UserContextProvider'
import { CosTimeZoneProvider } from './context/CosTimeZoneProvider'
import { NotificationsContextProvider } from './context/NotificationsContextProvider'
import { CosRoutes } from './CosRoutes'
import Layout from './layout/Layout'

import './App.css'
import './tailwind.css'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n'

function App() {
  return (
    <DataCenterProvider>
      <UserContextProvider>
        <ApplicationIntegrationsContextProvider>
          <CosTimeZoneProvider>
            <CosToastProvider>
              <NotificationsContextProvider>
                <I18nextProvider i18n={i18n}>
                  <Layout>
                    <CosRoutes />
                  </Layout>
                </I18nextProvider>
              </NotificationsContextProvider>
            </CosToastProvider>
          </CosTimeZoneProvider>
        </ApplicationIntegrationsContextProvider>
      </UserContextProvider>
    </DataCenterProvider>
  )
}

export default App
