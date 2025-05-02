import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext'
import api from '../services/api'

const ProfileContext = createContext()

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [profiles, setProfiles] = useState([])
  const [activeProfile, setActiveProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar perfiles cuando está autenticado
  useEffect(() => {
    const loadProfiles = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get('/profiles')
          setProfiles(response.data.data)

          // Verificar si hay un perfil activo en localStorage
          const savedProfileId = localStorage.getItem('activeProfileId')
          if (savedProfileId) {
            const profile = response.data.data.find(
              (p) => p._id === savedProfileId
            )
            if (profile) {
              setActiveProfile(profile)
            }
          }
        } catch (error) {
          console.error('Error al cargar perfiles:', error)
          toast.error('Error al cargar perfiles')
        }
      } else {
        // Limpiar perfiles cuando no está autenticado
        setProfiles([])
        setActiveProfile(null)
      }

      setLoading(false)
    }

    loadProfiles()
  }, [isAuthenticated])

  // Establecer perfil activo
  const selectProfile = (profile) => {
    setActiveProfile(profile)
    localStorage.setItem('activeProfileId', profile._id)
  }

  // Limpiar perfil activo
  const clearActiveProfile = () => {
    setActiveProfile(null)
    localStorage.removeItem('activeProfileId')
  }

  // Crear un nuevo perfil
  const createProfile = async (profileData) => {
    try {
      const response = await api.post('/profiles', profileData)
      setProfiles([...profiles, response.data])
      toast.success('¡Perfil creado exitosamente!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Error al crear perfil'
      toast.error(message)
      throw error
    }
  }

  // Actualizar un perfil
  const updateProfile = async (id, profileData) => {
    try {
      const response = await api.put(`/profiles/${id}`, profileData)

      // Actualizar lista de perfiles
      setProfiles(
        profiles.map((profile) =>
          profile._id === id ? response.data : profile
        )
      )

      // Actualizar perfil activo si es el que se está editando
      if (activeProfile && activeProfile._id === id) {
        setActiveProfile(response.data)
      }

      toast.success('¡Perfil actualizado exitosamente!')
      return response.data
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error al actualizar perfil'
      toast.error(message)
      throw error
    }
  }

  // Eliminar un perfil
  const deleteProfile = async (id) => {
    try {
      await api.delete(`/profiles/${id}`)

      // Eliminar de la lista de perfiles
      setProfiles(profiles.filter((profile) => profile._id !== id))

      // Limpiar perfil activo si es el que se está eliminando
      if (activeProfile && activeProfile._id === id) {
        clearActiveProfile()
      }

      toast.success('¡Perfil eliminado exitosamente!')
      return true
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error al eliminar perfil'
      toast.error(message)
      throw error
    }
  }

  const value = {
    profiles,
    activeProfile,
    loading,
    selectProfile,
    clearActiveProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  }

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
