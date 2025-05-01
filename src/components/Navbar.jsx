import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../contexts/ProfileContext'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { activeProfile, clearActiveProfile } = useProfile()
  const { toggleTheme, isDark } = useTheme()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSwitchProfile = () => {
    clearActiveProfile()
    navigate('/profiles')
  }

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-red-600 font-bold text-2xl">
                MOVIES FLIX
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
              >
                Inicio
              </Link>
              <Link
                to="/watchlist"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
              >
                Mi Lista
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-400 hover:text-white focus:outline-none"
            >
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Abrir menú de usuario</span>
                  <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                    {/* {activeProfile?.name.charAt(0).toUpperCase() || user?.name.charAt(0).toUpperCase()} */}
                    <img
                      src={activeProfile?.avatar || 'ruta/por/defecto.png'}
                      alt="Avatar del perfil"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </button>
              </div>

              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-2 text-xs text-gray-400">
                    Conectado como{' '}
                    <span className="font-medium text-white">
                      {user?.email}
                    </span>
                  </div>

                  {activeProfile && (
                    <div className="px-4 py-2 text-xs text-gray-400">
                      Perfil:{' '}
                      <span className="font-medium text-white">
                        {activeProfile.name}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-gray-700 my-1"></div>

                  <button
                    onClick={handleSwitchProfile}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Cambiar Perfil
                  </button>

                  <Link
                    to="/profile-management"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Gestionar Perfiles
                  </Link>

                  <div className="border-t border-gray-700 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
          >
            Inicio
          </Link>
          <Link
            to="/watchlist"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
          >
            Mi Lista
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
