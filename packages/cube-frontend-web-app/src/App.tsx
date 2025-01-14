import { useEffect, useState } from 'react'
import { cubeApi } from '@cube-frontend/api'
import { Button } from '@cube-frontend/ui-library'
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
    <div className="min-h-svh w-full bg-scene-background">
      <Button>Test My Button</Button>
      {data && <p className="cube-haha mt-12 pt-2">{toUpperCase(data)}</p>}
    </div>
  )
}

export default App
