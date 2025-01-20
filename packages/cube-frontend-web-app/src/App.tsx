import { useEffect, useState } from 'react'
import { cubeApi } from '@cube-frontend/api'
import { CosButton, CosIconFrame } from '@cube-frontend/ui-library'
import AddCircle from '@cube-frontend/ui-library/icons/monochrome/add_circle.svg?react'
import Keycloak from '@cube-frontend/ui-library/icons/colored/keyclock.svg?react'
import HomeIcon from '@cube-frontend/ui-library/icons/monochrome/home_02.svg?react'
import { toUpperCase } from '@cube-frontend/utils'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import './App.css'
import './tailwind.css'

function App() {
  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    cubeApi.fetchSettings().then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div className="min-h-svh w-full bg-scene-background p-4">
      <CosButton>CosButton</CosButton>
      {/* This is only for demonstration about how to use icon library now. */}
      <div className="flex items-center gap-x-2">
        <AddCircle className="icon-xl text-green-600" />
        <CosIconFrame
          size="md"
          className="cursor-pointer rounded-md transition-colors hover:bg-slate-300"
        >
          <Keycloak className="cursor-pointer" />
        </CosIconFrame>
        <CosIconFrame size="lg">
          <HomeIcon className="text-blue-600" />
        </CosIconFrame>
      </div>

      {data && <p className="cos-haha mt-12 pt-2">{toUpperCase(data)}</p>}
    </div>
  )
}

export default App
