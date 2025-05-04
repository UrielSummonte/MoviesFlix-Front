import { useNavigate } from 'react-router-dom'
import { useProfile } from '../contexts/ProfileContext'
import ProfileAvatar from '../components/ProfileAvatar'
import { useTheme } from '../contexts/ThemeContext'

const ProfileSelection = () => {
  const { profiles, selectProfile } = useProfile()
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleProfileSelect = (profile) => {
    selectProfile(profile)
    navigate('/')
  }

  const handleCreateProfile = () => {
    navigate('/create-profile')
  }

  const handleManageProfiles = () => {
    navigate('/profile-management')
  }

  const isDark = theme === 'dark'
  const bgColor = isDark ? 'bg-black' : 'bg-white'
  const primaryText = isDark ? 'text-white' : 'text-gray-900'
  const secondaryText = isDark ? 'text-gray-400' : 'text-gray-600'
  const cardBg = isDark
    ? 'bg-gray-800 hover:bg-gray-700'
    : 'bg-gray-200 hover:bg-gray-300'
  const iconColor = isDark ? 'text-gray-400' : 'text-gray-600'

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 ${bgColor}`}
    >
      <h1 className="text-3xl font-bold text-red-600 mb-2">Movies Flix</h1>
      <h2 className={`text-2xl font-bold mb-12 ${primaryText}`}>
        ¿Quién está viendo?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
        {profiles.map((profile) => (
          <ProfileAvatar
            key={profile._id}
            profile={profile}
            onClick={handleProfileSelect}
          />
        ))}

        {profiles.length < 5 && (
          <div className="flex flex-col items-center">
            <button
              onClick={handleCreateProfile}
              className={`w-24 h-24 rounded-md flex items-center justify-center transition-colors ${cardBg}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-12 w-12 ${iconColor}`}
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
            <span className={`mt-2 text-center ${secondaryText}`}>
              Añadir Perfil
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleManageProfiles}
        className="t-4 px-6 py-2 bg-red-600 text-white rounded-md text-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
      >
        Gestionar Perfiles
      </button>
    </div>
  )
}

export default ProfileSelection
