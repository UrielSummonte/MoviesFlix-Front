import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import api from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar si el usuario ya está logueado al montar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
          const response = await api.get("/auth/me")
          setUser(response.data)
        } catch (error) {
          console.error("Error de autenticación:", error)
          localStorage.removeItem("token")
          delete api.defaults.headers.common["Authorization"]
        }
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  // Registrar un nuevo usuario
  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData)
      const { token, user } = response.data

      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
      toast.success("¡Registro exitoso!")
      return true
    } catch (error) {
      const message = error.response?.data?.message || "Error en el registro"
      toast.error(message)
      return false
    }
  }

  // Login de usuario
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials)
      const { token, user } = response.data

      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
      toast.success("¡Login exitoso!")
      return true
    } catch (error) {
      const message = error.response?.data?.message || "Error en el login"
      toast.error(message)
      return false
    }
  }

  // Logout de usuario
  const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
    setUser(null)
    toast.info("Has cerrado sesión")
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
