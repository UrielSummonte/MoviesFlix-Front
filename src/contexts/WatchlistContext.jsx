import { createContext, useContext, useState, useEffect } from 'react'
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from '../services/movieService'
import { useAuth } from './AuthContext'
import { useProfile } from './ProfileContext'
import { toast } from 'react-toastify'

const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const { activeProfile } = useProfile()
  const [watchlist, setWatchlist] = useState({ movies: [] }) // Inicializamos como un objeto con la propiedad movies

  // Cargar watchlist del servidor
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!isAuthenticated || !activeProfile) {
        setWatchlist({ movies: [] }) // Aseguramos que siempre es un objeto con la propiedad movies
        return
      }

      try {
        const data = await getWatchlist(activeProfile._id)
        setWatchlist({ movies: Array.isArray(data.movies) ? data.movies : [] })
      } catch (error) {
        console.error('Error al obtener watchlist:', error)
        toast.error('No se pudo cargar tu lista')
      }
    }

    fetchWatchlist()
  }, [isAuthenticated, activeProfile])

  const isMovieInWatchlist = (movieId) => {
    if (!watchlist || !Array.isArray(watchlist.movies)) return false
    return watchlist.movies.some(
      (movie) => movie._id?.toString() === movieId.toString()
    )
  }

  const toggleWatchlist = async (movie) => {
    if (!isAuthenticated) {
      toast.info('Inicia sesión para usar la lista')
      return false
    }

    if (!activeProfile) {
      toast.error('Selecciona un perfil primero')
      return false
    }

    try {
      const movieId = movie._id

      if (isMovieInWatchlist(movieId)) {
        // Eliminar de la lista
        await removeFromWatchlist(activeProfile._id, movieId)
        // Actualizar la lista localmente sin recargar toda la lista desde el servidor
        setWatchlist((prev) => ({
          ...prev,
          movies: prev.movies.filter(
            (m) => m._id.toString() !== movieId.toString()
          ),
        }))
        toast.success('Eliminado de tu lista')
        return false
      } else {
        // Agregar a la lista
        await addToWatchlist(activeProfile._id, movieId)
        setWatchlist((prev) => ({
          ...prev,
          movies: [...prev.movies, movie],
        }))
        toast.success('Agregado a tu lista')
        return true
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error al actualizar la lista'
      toast.error(message)
      return isMovieInWatchlist(movie._id)
    }
  }

  return (
    <WatchlistContext.Provider
      value={{ watchlist, setWatchlist, isMovieInWatchlist, toggleWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlist = () => useContext(WatchlistContext)
