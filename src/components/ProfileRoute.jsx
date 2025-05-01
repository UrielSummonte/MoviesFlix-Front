import { Navigate, Outlet } from "react-router-dom"
import { useProfile } from "../contexts/ProfileContext"

const ProfileRoute = () => {
  const { activeProfile, loading } = useProfile()

  // Mostrar estado de carga mientras se verifica el perfil
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  // Redirigir a selección de perfil si no hay perfil activo
  if (!activeProfile) {
    return <Navigate to="/profiles" />
  }

  // Renderizar rutas hijas si el perfil está activo
  return <Outlet />
}

export default ProfileRoute
