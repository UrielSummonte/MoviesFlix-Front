import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme } from '../contexts/ThemeContext'
import * as yup from 'yup'

const profileSchema = yup
  .object({
    name: yup
      .string()
      .required('El nombre es obligatorio')
      .max(30, 'El nombre debe tener máximo 30 caracteres'),
    type: yup
      .string()
      .required('El tipo de perfil es obligatorio')
      .oneOf(['adult', 'teen', 'child'], 'Tipo de perfil inválido'),
    avatar: yup.string().nullable(),
  })
  .required()

const ProfileForm = ({ profile = null, onSubmit, buttonText = 'Guardar' }) => {
  const { isDark } = useTheme()
  const avatars = [
    'https://occ-0-7180-1740.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABd3Zi1Uez07EQoQcOjTEVh8fv10hlvtZpnFbZNysscDNsz68W4VFPouIUba_ylyz_Lu1vbfElLBwwrfuG2dulgQKsGC9PS97CQ.png?r=a71',
    'https://occ-0-7180-1740.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABaKhq8_koRe36dg_ZIzZtoo4GJjIIBVe6WQ9cHsmOWj-yahykBnxcMsnRyqBG_E81wVhsxv-KSIM0xH8qUXTS8YKC8LczDYl8Q.png?r=558',
    'https://occ-0-7180-1740.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTc7Gr2EDoMfskMmMo7SJ1YtMSie5xkH_nI2CHLu6v6Q1wPZHVipEjYpb62LGDr_ANSDD32ZSV-l9bjDeXcUWpIsjyYdFkIWxA.png?r=bfe',
    'https://occ-0-7180-1740.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABSNtVALfcTgzCvVMNR6LRU9uPUT0xcFWJ5vZwXeBC_6E6vekKlBLOaOT3HhDRUIgoRrJpuewkTOW7TcNSAIg5esv9z5kK8K8zw.png?r=9ca'
  ]

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: profile?.name || '',
      type: profile?.type || 'adult',
      avatar: profile?.avatar || '',
    },
  })

  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar || '')

  const handleAvatarSelect = (img) => {
    setAvatarPreview(img)
    setValue('avatar', img)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-md mx-auto p-6 rounded-2xl shadow-lg space-y-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <h2
        className={`text-2xl font-semibold text-center ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        Crear Perfil
      </h2>

      <div>
        <label
          htmlFor="name"
          className={`block text-sm font-medium mb-1 ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Nombre
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-4 py-2 rounded-lg border ${
            isDark
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-gray-100 text-black border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="type"
          className={`block text-sm font-medium mb-1 ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Tipo de Perfil
        </label>
        <select
          id="type"
          className={`w-full px-4 py-2 rounded-lg border ${
            isDark
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-gray-100 text-black border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register('type')}
        >
          <option value="adult">Adulto</option>
          <option value="teen">Adolescente</option>
          <option value="child">Niño</option>
        </select>
        {errors.type && (
          <p className="text-sm text-red-400 mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <p
          className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          Selecciona un Avatar
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {avatars.map((avatar, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleAvatarSelect(avatar)}
              className={`w-16 h-16 rounded-full border-4 ${
                avatar === avatarPreview
                  ? 'border-blue-500'
                  : 'border-transparent'
              } focus:outline-none overflow-hidden`}
            >
              <img
                src={avatar}
                alt={`Avatar ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        {errors.avatar && (
          <p className="text-sm text-red-400 mt-1">{errors.avatar.message}</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden border-2 ${
            isDark
              ? 'border-gray-500 bg-gray-700'
              : 'border-gray-300 bg-gray-100'
          }`}
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Vista previa de avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = ''
                setAvatarPreview('')
              }}
            />
          ) : (
            <span className="text-3xl font-bold text-white">
              {profile?.name?.charAt(0).toUpperCase() || '?'}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
      >
        {buttonText}
      </button>
    </form>
  )
}

export default ProfileForm
