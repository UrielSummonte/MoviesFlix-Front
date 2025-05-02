import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getMovie,
  addToWatchlist,
  removeFromWatchlist,
} from '../services/movieService'
import { useProfile } from '../contexts/ProfileContext'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { activeProfile } = useProfile()
  const { theme } = useTheme()
  const [movie, setMovie] = useState(null)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [loading, setLoading] = useState(true)
  const [watchlistLoading, setWatchlistLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const movieData = await getMovie(id)
        setMovie(movieData)
      } catch (error) {
        console.error('Error loading movie details:', error)
        toast.error('Error al cargar los detalles de la película')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id, isAuthenticated, activeProfile])

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      toast.info('Inicia sesión para agregar películas a tu lista')
      navigate('/login')
      return
    }

    if (!activeProfile) {
      toast.error('Por favor selecciona un perfil primero')
      navigate('/profiles')
      return
    }

    setWatchlistLoading(true)

    try {
      if (isInWatchlist) {
        await removeFromWatchlist(activeProfile._id, id)
        toast.success('Eliminado de tu lista')
        setIsInWatchlist(false)
      } else {
        await addToWatchlist(activeProfile._id, id)
        toast.success('Agregado a tu lista')
        setIsInWatchlist(true)
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error al actualizar la lista'
      toast.error(message)
    } finally {
      setWatchlistLoading(false)
    }
  }

  const isDark = theme === 'dark'

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div
          className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
            isDark ? 'border-red-600' : 'border-red-500'
          }`}
        ></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Película no encontrada</h2>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Volver al Inicio
        </Link>
      </div>
    )
  }

  const title = movie.title || ''
  const description = movie.overview || ''
  const posterUrl = movie.poster_path || ''
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : ''
  const duration = movie.duration || 0
  const rating = movie.rating || 'NR'
  const vote = movie.vote_average || 0
  const genres = movie.genres || []
  const trailerUrl = movie.trailerURL || ''

  return (
    <div
      className={`min-h-screen ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {!isAuthenticated && (
          <div
            className={`p-4 rounded-lg mb-8 shadow-lg ${
              isDark
                ? 'bg-gradient-to-r from-red-700 to-red-900 text-white'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">
                  ¡Crea una cuenta para disfrutar de todas las funciones!
                </h3>
                <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Guarda tus películas favoritas, crea perfiles y más.
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-md font-medium ${
                    isDark
                      ? 'bg-white text-red-700 hover:bg-gray-100'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className={`border px-4 py-2 rounded-md font-medium ${
                    isDark
                      ? 'border-white text-white hover:bg-white/10'
                      : 'border-red-600 text-red-600 hover:bg-red-50'
                  }`}
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={posterUrl}
                alt={title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 lg:w-3/4">
            <div
              className={`flex-1 p-4 rounded-lg mb-8 ${
                isDark
                  ? 'bg-gradient-to-r from-black via-red-900/40 to-transparent'
                  : 'bg-red-100'
              }`}
            >
              <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {releaseYear}
              </span>
              {duration > 0 && (
                <span
                  className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {duration} min
                </span>
              )}
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-white">{vote.toFixed(1)}</span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  isDark
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {rating}
              </span>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-1 rounded ${
                      isDark
                        ? 'bg-red-600 text-white'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8`}>
              {description}
            </p>

            <div className="mb-6">
              <div className="flex flex-wrap gap-4">
                {trailerUrl && (
                  <a
                    href={trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ver Trailer
                  </a>
                )}

                <button
                  onClick={handleWatchlistToggle}
                  disabled={watchlistLoading}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    isDark
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  {watchlistLoading ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                  ) : isInWatchlist ? (
                    <span className="flex items-center">✓ En tu lista</span>
                  ) : (
                    <span className="flex items-center">
                      + Agregar a mi lista
                    </span>
                  )}
                </button>
              </div>

              <Link
                to="/"
                className={`mt-4 inline-block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isDark
                    ? 'text-red-400 hover:text-white'
                    : 'text-red-600 hover:text-red-800'
                }`}
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
