import { useEffect, useState } from 'react'
import './tailwind.css'
import './App.css'
import '@fontsource/inter'
import { Button } from '../../cube-frontend-components/src'
import { toUpperCase } from '@cube-frontend/utils'
import { cubeApi } from '../../cube-frontend-api/src'

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
