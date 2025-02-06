import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import { Carousel } from './components/Carousel/Carousel'
import { LoginForm } from './components/LoginForm/LoginForm'
import './keycloakLoginContextSetupDev'
import './tailwind.css'

export const App = () => {
  return (
    <div className="flex h-svh min-h-[860px] w-full bg-grey-0">
      <LoginForm />
      <Carousel />
    </div>
  )
}
