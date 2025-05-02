import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getMovies } from '../services/movieService'
import { getWatchlist } from '../services/movieService'
import MovieGrid from '../components/MovieGrid'
import { useProfile } from '../contexts/ProfileContext'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import RecentMovies from '../components/RecentsMovies'
import { useWatchlist } from '../contexts/WatchlistContext'
import MovieSlider from '../components/MovieSlider'
import { useTheme } from '../contexts/ThemeContext'
import SearchBar from '../components/SearchBar'

const Home = () => {
  const { isAuthenticated, user } = useAuth()
  const { activeProfile } = useProfile()
  const [movies, setMovies] = useState([])
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [recentPage, setRecentPage] = useState(1)
  const [moviesIds, setMoviesIds] = useState([])
  const { watchlist, setWatchlist, isMovieInWatchlist, toggleWatchlist } =
    useWatchlist()
  const { theme } = useTheme()

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)

        if (isAuthenticated && user && activeProfile) {
          const profileType = activeProfile.type
          const profileID = activeProfile._id

          const response = await getMovies({ profileType })
          const allMovies = response.data

          const data = await getWatchlist(profileID)
          const watchlistMovies = data.movies.movies || []

          // Extraer solo los IDs de las películas en la watchlist
          const watchlistIds = watchlistMovies.map((m) => m._id)
          setMoviesIds(watchlistIds)

          // Crear nuevo array con flag `isInWatchlist`
          const moviesWithWatchlistFlag = allMovies.map((movie) => ({
            ...movie,
            isInWatchlist: watchlistIds.includes(movie._id),
          }))

          // Establecer películas con la bandera
          setMovies(moviesWithWatchlistFlag)
          setWatchlist({ movies: watchlistMovies })

          // Ejemplo: las destacadas son las primeras 5
          const featured = moviesWithWatchlistFlag.slice(0, 5)

          // Ejemplo: las top 5 por rating
          const topRated = [...moviesWithWatchlistFlag]
            .sort((a, b) => b.vote_average - a.vote_average)
            .slice(0, 5)

          setFeaturedMovies(featured)
          setTopRatedMovies(topRated)
          //setRecentMovies(moviesWithWatchlistFlag)
        } else if (!isAuthenticated) {
          const response = await getMovies()
          const allMovies = response.data
          const featured = allMovies.slice(0, 5)
          // Ejemplo: las top 5 por rating
          const topRated = [...allMovies]
            .sort((a, b) => b.vote_average - a.vote_average)
            .slice(0, 5)

          setFeaturedMovies(featured)
          setTopRatedMovies(topRated)
        }
      } catch (error) {
        console.error('Error loading movies:', error)
        toast.error('Error al cargar las películas')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [isAuthenticated, activeProfile, recentPage])

  const FeaturedMovie = () => {
    if (loading) {
      return <div className="w-full h-[60vh] bg-gray-900 animate-pulse"></div>
    }

    if (featuredMovies.length === 0) {
      return <div>No hay películas destacadas disponibles.</div>
    }

    const featured = featuredMovies[0]

    const title = featured.title || ''
    const description = featured.overview || ''
    const backdropUrl = featured.poster_path || ''
    const releaseYear = featured.release_date
      ? new Date(featured.release_date).getFullYear()
      : ''
    const rating = featured.rating || ''
    const vote = featured.vote_average || 0
    const trailerUrl = featured.trailerUrl || ''

    return (
      <div className="relative w-full h-[60vh] flex items-center">
        <div
          className={`absolute inset-0 bg-cover bg-top ${
            theme === 'dark' ? 'bg-black/70' : 'bg-white/70'
          }`}
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
        </div>

        <div
          className={`relative h-full flex flex-col justify-end p-8 max-w-4xl ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-gray-300">{releaseYear}</span>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-white">{vote.toFixed(1)}</span>
            </div>
            <div className="flex items-center bg-yellow-500 px-1 rounded-md">
              <span className="text-white">{rating}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-6 line-clamp-3">{description}</p>
          <div className="flex space-x-4">
            {trailerUrl && (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                Ver Trailer
              </a>
            )}
            <Link
              to={`/movie/${featured._id}`}
              className="btn-secondary flex items-center text-white"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Más Información
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      {/* Mostramos la película destacada si no está cargando */}
      <FeaturedMovie />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isAuthenticated && (
          <div
            className={`bg-gradient-to-r from-red-700 to-red-900 text-white p-4 rounded-lg my-6 shadow-lg ${
              theme === 'dark' ? 'bg-opacity-90' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">
                  ¡Crea una cuenta para disfrutar de todas las funciones!
                </h3>
                <p className="text-gray-200">
                  Guarda tus películas favoritas, crea perfiles y más.
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/register"
                  className="bg-white text-red-700 hover:bg-gray-100 px-4 py-2 rounded-md font-medium"
                >
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border border-white hover:bg-white/10 px-4 py-2 rounded-md font-medium"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        )}
        <SearchBar />
        <RecentMovies watchlistIds={moviesIds} />
        <MovieGrid movies={topRatedMovies} title="Mejor Valoradas" />
        <MovieSlider watchlist={watchlist} />
      </div>
    </div>
  )
}

export default Home
