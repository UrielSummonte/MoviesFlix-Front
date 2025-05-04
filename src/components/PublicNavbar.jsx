// import { useState, useEffect, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'
// import { useTheme } from '../contexts/ThemeContext'

// const PublicNavbar = () => {
//   const { isAuthenticated, logout, user } = useAuth()
//   const { toggleTheme, isDark } = useTheme()
//   const navigate = useNavigate()

//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isMenuAdminOpen, setIsMenuAdminOpen] = useState(false)

//   const adminMenuRef = useRef(null)
//   const profileMenuRef = useRef(null)

//   const handleLogout = () => {
//     logout()
//     navigate('/login')
//   }

//   // Cierra menús al hacer clic fuera
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         adminMenuRef.current &&
//         !adminMenuRef.current.contains(event.target)
//       ) {
//         setIsMenuAdminOpen(false)
//       }

//       if (
//         profileMenuRef.current &&
//         !profileMenuRef.current.contains(event.target)
//       ) {
//         setIsMenuOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   const navbarClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
//   const buttonClass = isDark
//     ? 'text-gray-400 hover:text-white'
//     : 'text-gray-800 hover:text-black'

//   return (
//     <nav className={`${navbarClass} shadow-md`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <span className="text-red-600 font-bold text-2xl">
//                 MOVIES FLIX
//               </span>
//             </Link>
//           </div>

//           <div className="flex items-center">
//             <button
//               onClick={toggleTheme}
//               className={`p-2 rounded-full ${buttonClass} focus:outline-none`}
//             >
//               {isDark ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//                   />
//                 </svg>
//               )}
//             </button>

//             <div className="ml-4">
//               {isAuthenticated ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="btn-primary text-sm"
//                   >
//                     Mi Cuenta
//                   </button>
//                   {isMenuOpen && (
//                     <div
//                       className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 ${
//                         isDark ? 'bg-gray-800' : 'bg-white'
//                       } border`}
//                     >
//                       <button
//                         onClick={handleLogout}
//                         className={`block w-full text-left px-4 py-2 text-sm ${
//                           isDark
//                             ? 'text-white hover:bg-gray-700'
//                             : 'text-black hover:bg-gray-100'
//                         }`}
//                       >
//                         Cerrar Sesión
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="flex space-x-2">
//                   <Link to="/login" className="btn-primary text-sm">
//                     Iniciar Sesión
//                   </Link>
//                   <Link to="/register" className="btn-secondary text-sm">
//                     Registrarse
//                   </Link>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className="md:hidden">
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <Link
//             to="/"
//             className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
//           >
//             Home
//           </Link>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default PublicNavbar

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useEffect, useRef, useState } from 'react'

const PublicNavbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const { toggleTheme, isDark } = useTheme()
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuAdminOpen, setIsMenuAdminOpen] = useState(false)

  const adminMenuRef = useRef(null)
  const profileMenuRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Cierra menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target)
      ) {
        setIsMenuAdminOpen(false)
      }

      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navbarClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
  const buttonClass = isDark
    ? 'text-gray-400 hover:text-white'
    : 'text-gray-800 hover:text-black'
  const menuBgClass = isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'
  const hoverBgClass = isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'

  return (
    <nav className={`${navbarClass} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-red-600 font-bold text-2xl">
                MOVIES FLIX
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${buttonClass} focus:outline-none`}
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

            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <div className="relative" ref={adminMenuRef}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsMenuAdminOpen(!isMenuAdminOpen)
                        setIsMenuOpen(false)
                      }}
                      className={`btn-secondary text-sm px-4 py-2 rounded-md ${
                        isDark
                          ? 'text-white hover:bg-gray-700'
                          : 'text-black hover:bg-gray-100'
                      }`}
                    >
                      Admin
                    </button>
                    {isMenuAdminOpen && (
                      <div
                        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${menuBgClass} border`}
                      >
                        <Link
                          to="/admin/dashboard"
                          className={`block px-4 py-2 text-sm ${hoverBgClass}`}
                        >
                          Panel Admin
                        </Link>
                        <Link
                          to="/admin/usuarios"
                          className={`block px-4 py-2 text-sm ${hoverBgClass}`}
                        >
                          Gestión de Usuarios
                        </Link>
                        <Link
                          to="/admin/configuracion"
                          className={`block px-4 py-2 text-sm ${hoverBgClass}`}
                        >
                          Configuración
                        </Link>
                        <Link
                          to="/admin/estadisticas"
                          className={`block px-4 py-2 text-sm ${hoverBgClass}`}
                        >
                          Estadísticas
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen)
                      setIsMenuAdminOpen(false)
                    }}
                    className="btn-primary text-sm"
                  >
                    Mi Cuenta
                  </button>
                  {isMenuOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 ${menuBgClass} border`}
                    >
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-2 text-sm ${hoverBgClass}`}
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="btn-primary text-sm">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn-secondary text-sm">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default PublicNavbar
