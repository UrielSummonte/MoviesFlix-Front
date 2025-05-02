import { Outlet } from 'react-router-dom'
import PublicNavbar from './PublicNavbar'
import Navbar from './Navbar'
import Footer from './Footer'
import { useProfile } from '../contexts/ProfileContext'
import { useTheme } from '../contexts/ThemeContext'

const PublicLayout = () => {
  const { activeProfile } = useProfile()
  const { isDark } = useTheme()

  const backgroundClass = isDark
    ? 'bg-gray-900 text-white'
    : 'bg-white text-black'

  if (!activeProfile) {
    return (
      <div className={`flex flex-col min-h-screen ${backgroundClass}`}>
        <PublicNavbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${backgroundClass}`}>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
