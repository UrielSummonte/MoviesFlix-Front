import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../contexts/ProfileContext'
import ProfileForm from "../components/ProfileForm"
import { useTheme } from '../contexts/ThemeContext'

const CreateProfile = () => {
  const { createProfile } = useProfile()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { isDark } = useTheme()

  const handleSubmit = async (data) => {
    setLoading(true)

    try {
      await createProfile(data)
      navigate('/profile-management')
    } catch (error) {
      console.error('Error al crear perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/profile-management')
  }

  // Clases dinámicas para el fondo y el texto según el tema
  const containerClass = isDark
    ? 'bg-gray-900 text-white'
    : 'bg-white text-black'
  const buttonClass = isDark
    ? 'bg-gray-700 border-gray-600 hover:bg-gray-800'
    : 'bg-gray-200 border-gray-400 hover:bg-gray-300'

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${containerClass} px-4 py-8`}
    >
      <h1 className="text-3xl font-bold text-red-600 mb-2">MOVIES FLIX</h1>
      <h2 className="text-2xl font-bold text-white mb-8">Crear Perfil</h2>

      <div className="w-full max-w-md bg-gray-900 rounded-lg p-6">
        <ProfileForm
          onSubmit={handleSubmit}
          buttonText={loading ? 'Creando...' : 'Crear Perfil'}
        />

        <button
          onClick={handleCancel}
          className={`${buttonClass} w-full mt-4 py-2 px-4 rounded text-white transition-colors`}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default CreateProfile
