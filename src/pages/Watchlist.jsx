import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { getWatchlist } from "../services/movieService"
import { useProfile } from "../contexts/ProfileContext"
import MovieCard from "../components/MovieCard"
import { useWatchlist } from "../contexts/WatchlistContext" // <-- Importamos el context

const Watchlist = () => {
  const { activeProfile } = useProfile()
  const { watchlist, setWatchlist, isMovieInWatchlist, toggleWatchlist } = useWatchlist()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        setLoading(true)
        if (activeProfile) {
          const data = await getWatchlist(activeProfile._id)
          setWatchlist({ movies: data.movies.movies || [] }) // Usamos setWatchlist del Context
        }
      } catch (error) {
        console.error("Error loading watchlist:", error)
        toast.error("Failed to load watchlist")
      } finally {
        setLoading(false)
      }
    }

    loadWatchlist()
  }, [activeProfile, setWatchlist])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-white mb-8">Mi Lista</h1>

        {watchlist.movies?.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Tu lista está vacía</h2>
            <p className="text-gray-400 mb-6">Agrega películas a tu lista para verlas más tarde.</p>
            <a href="/" className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300">
              Explorar Películas
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchlist.movies.map((movie) => (
              <MovieCard 
                key={movie._id}
                movie={movie}
                isInWatchlist={isMovieInWatchlist(movie._id)}
                onWatchlistChange={() => toggleWatchlist(movie)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Watchlist
