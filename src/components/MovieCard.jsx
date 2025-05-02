import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../contexts/WatchlistContext'
import { useTheme } from '../contexts/ThemeContext'

const MovieCard = ({ movie }) => {
  const { isMovieInWatchlist, toggleWatchlist, watchlist } = useWatchlist()
  const [isHovered, setIsHovered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const { theme } = useTheme()

  const title = movie.title || ''
  const description = movie.overview || ''
  const posterUrl = movie.poster_path || ''
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : ''
  const rating = movie.rating || ''
  const vote = movie.vote_average || 0
  const genres = movie.genres || []
  const movieId = movie._id

  useEffect(() => {
    setIsInWatchlist(isMovieInWatchlist(movieId))
  }, [movieId, isMovieInWatchlist, watchlist])

  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await toggleWatchlist(movie)
    setIsInWatchlist(result)
    setLoading(false)
  }

  if (!movieId) return null

  const isDark = theme === 'dark'

  return (
    <div
      className={`card relative ${isDark ? 'bg-gray-900' : 'bg-white shadow'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movieId}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl || '/placeholder.svg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />

          {isHovered && (
            <div
              className={`absolute inset-0 p-4 flex flex-col justify-between transition-opacity duration-300 ${
                isDark
                  ? 'bg-black bg-opacity-75'
                  : 'bg-white bg-opacity-90 border border-gray-300'
              }`}
            >
              <div>
                <h3
                  className={`font-bold ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {releaseYear} {movie.duration && `• ${movie.duration} min`}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className={isDark ? 'text-white' : 'text-black'}>
                    {vote.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-white bg-yellow-500 px-1 rounded-md">
                    {rating}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {genres.slice(0, 2).map((genre, index) => (
                    <span
                      key={index}
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <p
                className={`text-xs line-clamp-3 mt-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {description}
              </p>
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={handleClick}
        disabled={loading}
        className={`absolute top-2 right-2 rounded-full p-1 hover:bg-opacity-90 transition-colors ${
          isDark ? 'bg-black bg-opacity-70' : 'bg-gray-300 bg-opacity-70'
        }`}
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : isInWatchlist ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
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
        )}
      </button>
    </div>
  )
}

export default MovieCard
