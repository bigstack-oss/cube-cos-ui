import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import minMax from 'dayjs/plugin/minMax'
import relativeTime from 'dayjs/plugin/relativeTime'
import { respectTz } from '@cube-frontend/utils'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { CosErrorBoundary } from './components/ErrorDisplay/CosErrorBoundary.tsx'
import i18n from './i18n/i18n.ts'

import 'dayjs/locale/en'
import 'dayjs/locale/zh-tw'

dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.extend(minMax)
dayjs.extend(relativeTime)
dayjs.extend(respectTz)
dayjs.locale(i18n.language)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* App-level error boundary. */}
      <CosErrorBoundary containerClassName="min-h-dvh">
        <App />
      </CosErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
