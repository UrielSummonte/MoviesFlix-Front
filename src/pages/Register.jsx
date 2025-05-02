import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../contexts/AuthContext'

// Esquema de validación
const registerSchema = yup
  .object({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup
      .string()
      .email('Dirección de email inválida')
      .required('El email es obligatorio'),
    password: yup
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Por favor confirma tu contraseña'),
  })
  .required()

const Register = () => {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const { confirmPassword, ...userData } = data
      const success = await registerUser(userData)
      if (success) {
        navigate('/profiles')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 px-4 py-6">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">MOVIES FLIX</h1>
          <h2 className="mt-2 text-xl font-bold text-white">Crea tu cuenta</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Campo nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register('name')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Campo email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register('password')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register('confirmPassword')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Botón submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition duration-200 disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                'Registrarse'
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-400 mt-2 space-y-1">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-500">
              Inicia Sesión
            </Link>
          </p>
          <p>
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-white underline"
            >
              Volver a la página de inicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
