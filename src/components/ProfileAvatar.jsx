import { Link } from 'react-router-dom'

const ProfileAvatar = ({ profile, onClick, isManagement = false }) => {
  // Colores de avatar basados en el tipo de perfil
  const getAvatarColor = (type) => {
    switch (type) {
      case 'adult':
        return 'bg-red-600'
      case 'teen':
        return 'bg-blue-600'
      case 'child':
        return 'bg-green-600'
      default:
        return 'bg-gray-600'
    }
  }

  // Contenido del avatar
  const avatarContent = (
    <>
      {profile.avatar ? (
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-4xl font-bold text-white">
          {profile.name.charAt(0).toUpperCase()}
        </span>
      )}
    </>
  )

  // Si está en modo gestión, envolver con Link a página de edición
  if (isManagement) {
    return (
      <div className="flex flex-col items-center">
        <Link
          to={`/edit-profile/${profile._id}`}
          className={`w-24 h-24 rounded-md flex items-center justify-center ${getAvatarColor(
            profile.type
          )} hover:opacity-80 transition-opacity`}
        >
          {avatarContent}
        </Link>
        <span className="mt-2 text-xs text-gray-400 capitalize">
          {profile.name}
        </span>
      </div>
    )
  }

  // De lo contrario, usar como avatar clickeable
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => onClick(profile)}
        className={`w-24 h-24 rounded-md flex items-center justify-center ${getAvatarColor(
          profile.type
        )} hover:opacity-80 transition-opacity`}
      >
        {avatarContent}
      </button>
      <span className="mt-2 text-xs text-gray-400 capitalize">
        {profile.name}
      </span>
    </div>
  )
}

export default ProfileAvatar
