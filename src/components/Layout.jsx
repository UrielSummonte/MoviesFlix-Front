import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useProfile } from '../contexts/ProfileContext'
import { useTheme } from '../contexts/ThemeContext'

const Layout = () => {
  const { activeProfile } = useProfile()
  const { theme } = useTheme()

  if (!activeProfile) {
    return (
      <div className={`${theme} flex flex-col min-h-screen`}>
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    )
  }

  return (
    <div className={`${theme} flex flex-col min-h-screen`}>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
