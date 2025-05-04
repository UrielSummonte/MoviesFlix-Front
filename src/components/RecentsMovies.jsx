import { useState, useEffect } from 'react'
import MovieGrid from './MovieGrid'
import { toast } from 'react-toastify'
import { getMovies } from '../services/movieService'
import { useProfile } from '../contexts/ProfileContext'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const RecentMovies = ({ watchlistIds }) => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, user } = useAuth()
  const { activeProfile } = useProfile()
  const { isDark } = useTheme()
  const { theme } = useTheme()
  const [selectedGenre, setSelectedGenre] = useState('')

  const fetchMovies = async (currentPage) => {
    try {
      setLoading(true)
      let allMovies = []
      let total = 0
      let pages = 1

      const commonParams = {
        page: currentPage,
        limit: 10,
        sortBy: 'release_date',
        order: 'desc',
      }

      if (selectedGenre && selectedGenre !== 'Todos') {
        commonParams.genre = selectedGenre
      }

      if (isAuthenticated && user && activeProfile) {
        const profileType = activeProfile.type
        const response = await getMovies({
          ...commonParams,
          profileType,
        })

        allMovies = response.data
        total = response.total
        pages = response.totalPages

        const idsInWatchlist = watchlistIds || []

        const moviesWithWatchlistFlag = allMovies.map((movie) => ({
          ...movie,
          isInWatchlist: idsInWatchlist.includes(movie._id),
        }))

        setMovies(moviesWithWatchlistFlag)
      } else if (!isAuthenticated) {
        const response = await getMovies(commonParams)
        allMovies = response.data
        total = response.total
        pages = response.totalPages

        setMovies(allMovies)
      } else {
        setLoading(false)
        return
      }

      setTotalPages(pages)
    } catch (error) {
      toast.error('Error al cargar películas recientes')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(page)
  }, [page, isAuthenticated, activeProfile, selectedGenre])

  const buttonClass = isDark
    ? 'bg-gray-700 text-white'
    : 'bg-gray-300 text-black'
  const containerClass = isDark
    ? 'bg-gray-900 text-white'
    : 'bg-white text-black'

    const genreOptions = ['Todos', 'Action', 'Comedy', 'Drama', 'Horror']

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-center px-4 pt-6">
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>Agregadas Recientemente</h2>

        <select
          value={selectedGenre}
          onChange={(e) => {
            setPage(1) 
            setSelectedGenre(e.target.value)
          }}
          className={`ml-4 px-2 py-1 rounded border 
            ${isDark 
              ? 'bg-gray-800 text-white border-gray-600' 
              : 'bg-white text-black border-gray-300'
            }`}
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <MovieGrid
        movies={movies}
        loading={loading}
      />

      <div className="flex justify-center mt-4 space-x-2">
        <button
          className={`${buttonClass} px-3 py-1 rounded disabled:opacity-50`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span className="text-white px-2 py-1">
          Página {page} de {totalPages}
        </span>
        <button
          className={`${buttonClass} px-3 py-1 rounded disabled:opacity-50`}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default RecentMovies
