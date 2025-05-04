import { useState, useEffect, useRef } from 'react'
import { getMovies } from '../services/movieService'
import { Link } from 'react-router-dom'
import { useProfile } from '../contexts/ProfileContext'
import { useTheme } from '../contexts/ThemeContext'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef(null)

  const { activeProfile } = useProfile()
  const { isDark } = useTheme() 

  const fetchResults = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([])
      return
    }

    try {
      const response = await getMovies({
        search: searchTerm,
        profileType: activeProfile?.type,
        limit: 10,
      })

      setResults(response.data)
      setShowDropdown(true)
    } catch (error) {
      console.error('Error buscando películas:', error)
    }
  }

  useEffect(() => {
    fetchResults(query)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const inputTextColor = isDark ? 'text-white' : 'text-black'
  const inputBgColor = isDark ? 'bg-gray-800' : 'bg-white'
  const inputBorderColor = isDark ? 'border-gray-600' : 'border-gray-300'
  const inputFocusRing = isDark ? 'focus:ring-red-500' : 'focus:ring-red-400'

  return (
    <div className="relative w-full max-w-lg mx-auto mt-10" ref={inputRef}>
      <input
        type="text"
        value={query}
        placeholder="🔍 Buscar películas..."
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full p-3 text-lg border-2 rounded-lg shadow-md focus:outline-none ${inputBgColor} ${inputTextColor} ${inputBorderColor} ${inputFocusRing} transition duration-300`}
      />

      {showDropdown && (
        <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-2xl max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            results.map((movie) => (
              <Link
                key={movie._id}
                to={`/movie/${movie._id}`}
                className="flex items-center p-3 hover:bg-red-50 transition"
                onClick={() => setShowDropdown(false)}
              >
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded mr-4 shadow-sm"
                />
                <span className="text-gray-800 font-semibold">{movie.title}</span>
              </Link>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">
              No se encontraron resultados.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
