import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../contexts/ProfileContext'
import { useWatchlist } from '../contexts/WatchlistContext'
import { useTheme } from '../contexts/ThemeContext'

const MovieGrid = ({ movies = [], title }) => {
  const { isAuthenticated } = useAuth()
  const { activeProfile } = useProfile()
  const { toggleWatchlist } = useWatchlist()
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    setLoading(false)
  }, [isAuthenticated, activeProfile])

  const handleWatchlistChange = (movieId) => {
    const movie = movies.find((m) => m._id === movieId)
    if (movie) toggleWatchlist(movie)
  }

  if (loading) {
    return (
      <section
        className={`py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-md aspect-[2/3] animate-pulse"
            />
          ))}
        </div>
      </section>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <section
        className={`py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          {title}
        </h2>
        <div
          className={`text-center py-12 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
          } rounded-lg`}
        >
          <p className={`text-gray-400`}>No se encontraron películas</p>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
    >
      <h2
        className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            isInWatchlist={movie.isInWatchlist}
            onWatchlistChange={handleWatchlistChange}
          />
        ))}
      </div>
    </section>
  )
}

export default MovieGrid
