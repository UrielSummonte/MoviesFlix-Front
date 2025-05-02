import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../contexts/AuthContext'

// Esquema de validación
const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Dirección de email inválida')
      .required('El email es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
  })
  .required()

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      const success = await login(data)
      if (success) {
        navigate('/profiles')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Movies Flix</h1>
          <h2 className="mt-6 text-2xl font-bold text-white">
            Inicia sesión en tu cuenta
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
              autoComplete="current-password"
              {...register('password')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition duration-200 disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 space-y-2">
          <p className="text-gray-400">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-red-600 hover:text-red-500">
              Regístrate
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

export default Login
