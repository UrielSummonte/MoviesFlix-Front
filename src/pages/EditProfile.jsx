import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useProfile } from '../contexts/ProfileContext'
import ProfileForm from '../components/ProfileForm'
import { useTheme } from '../contexts/ThemeContext'

const EditProfile = () => {
  const { id } = useParams()
  const { profiles, updateProfile, deleteProfile } = useProfile()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { isDark } = useTheme()

  // Encontrar perfil por ID
  useEffect(() => {
    const foundProfile = profiles.find((p) => p._id === id)

    if (foundProfile) {
      setProfile(foundProfile)
    } else {
      toast.error('Perfil no encontrado')
      navigate('/profile-management')
    }
  }, [id, profiles, navigate])

  const handleSubmit = async (data) => {
    setLoading(true)

    try {
      await updateProfile(id, data)
      navigate('/profile-management')
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el perfil permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (result.isConfirmed) {
      setDeleting(true)

      try {
        await deleteProfile(id)
        await Swal.fire({
          title: 'Eliminado',
          text: 'El perfil ha sido eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        navigate('/profile-management')
      } catch (error) {
        console.error('Error al eliminar perfil:', error)
        await Swal.fire({
          title: 'Error',
          text: 'Hubo un error al eliminar el perfil.',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      } finally {
        setDeleting(false)
      }
    }
  }

  const handleCancel = () => {
    navigate('/profile-management')
  }

  if (!profile) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? 'bg-black' : 'bg-white'
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  // Clases dinámicas para el fondo y el texto según el tema
  const containerClass = isDark
    ? 'bg-gray-900 text-white'
    : 'bg-white text-black'
  const buttonClass = isDark
    ? 'bg-gray-700 border-gray-600 hover:bg-gray-800'
    : 'bg-gray-200 border-gray-400 hover:bg-gray-300'
  const deleteButtonClass = isDark
    ? 'bg-red-700 hover:bg-red-800'
    : 'bg-red-500 hover:bg-red-600'

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${containerClass} px-4 py-8`}
    >
      <h1 className="text-3xl font-bold text-red-600 mb-2">MOVIES FLIX</h1>
      <h2 className="text-2xl font-bold text-white mb-8">Editar Perfil</h2>

      <div className="w-full max-w-md bg-gray-900 rounded-lg p-6">
        <ProfileForm
          profile={profile}
          onSubmit={handleSubmit}
          buttonText={loading ? 'Guardando...' : 'Guardar Cambios'}
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={handleCancel}
            className={`${buttonClass} flex-1 py-2 px-4 rounded text-white transition-colors`}
          >
            Cancelar
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`${deleteButtonClass} flex-1 py-2 px-4 rounded text-white transition-colors`}
          >
            {deleting ? 'Eliminando...' : 'Eliminar Perfil'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
