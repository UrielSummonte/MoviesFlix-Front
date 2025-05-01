import { useNavigate } from 'react-router-dom'
import { useProfile } from '../contexts/ProfileContext'
import ProfileAvatar from '../components/ProfileAvatar'

const ProfileManagement = () => {
  const { profiles } = useProfile()
  const navigate = useNavigate()

  const handleCreateProfile = () => {
    navigate('/create-profile')
  }

  const handleDone = () => {
    navigate('/profiles')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-2">FILMS FLIX</h1>
      <h2 className="text-2xl font-bold text-white mb-12">
        Gestionar Perfiles
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
        {profiles.map((profile) => (
          <ProfileAvatar
            key={profile._id}
            profile={profile}
            isManagement={true}
          />
        ))}

        {/* Botón de añadir perfil */}
        {profiles.length < 5 && (
          <div className="flex flex-col items-center">
            <button
              onClick={handleCreateProfile}
              className="w-24 h-24 rounded-md flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <span className="mt-2 text-center text-gray-400">
              Añadir Perfil
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleDone}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md text-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
      >
        Listo
      </button>
    </div>
  )
}

export default ProfileManagement
