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

function App() {
  return (
    <>
      {/* TODO: inject global css, setup global store here. */}
      <Layout>{/* TODO: setup react router logic here. */}</Layout>
    </>
  )
}

export default App
