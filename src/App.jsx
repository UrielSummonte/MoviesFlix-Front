import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useProfile } from './contexts/ProfileContext'
import ProtectedRoute from './components/ProtectedRoute'
import ProfileRoute from './components/ProfileRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import ProfileSelection from './pages/ProfileSelection'
import ProfileManagement from './pages/ProfileManagement'
import CreateProfile from './pages/CreateProfile'
import EditProfile from './pages/EditProfile'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Watchlist from './pages/Watchlist'
import NotFound from './pages/NotFound'
import PublicLayout from './components/PublicLayout'
import ScrollToTop from './components/ScrollTop'
import PanelAdmin from './pages/PanelAdmin'
import UserStats from './pages/UserStats'

function App() {
  const { isAuthenticated, loading: authLoading, user } = useAuth()
  const { activeProfile, loading: profileLoading } = useProfile()

  const isLoading = authLoading || profileLoading

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Auth routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/profiles" />}
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/profiles" />
          }
        />

        {/* Public Layout: sin login o sin perfil activo */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Rutas protegidas pero aún dentro de PublicLayout porque no se ha seleccionado perfil */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profiles" element={<ProfileSelection />} />
            <Route path="/profile-management" element={<ProfileManagement />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/edit-profile/:id" element={<EditProfile />} />
            <Route
              path="/admin/dashboard"
              element={
                isAuthenticated && user?.role === 'admin' ? (
                  <PanelAdmin />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/stats"
              element={
                isAuthenticated && user?.role === 'admin' ? (
                  <UserStats />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Route>
        </Route>

        {/* Rutas completamente protegidas: login + perfil activo */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProfileRoute />}>
            <Route element={<Layout />}>
              <Route path="/watchlist" element={<Watchlist />} />
            </Route>
          </Route>
        </Route>

        {/* Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
