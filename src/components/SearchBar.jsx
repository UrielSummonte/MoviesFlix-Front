// import { useState, useEffect, useRef } from "react";
// import { getMovies } from "../services/movieService";
// import { Link } from "react-router-dom";
// import { useTheme } from "../contexts/ThemeContext";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const inputRef = useRef(null);
//   const { theme } = useTheme();
//   const { activeProfile } = useProfile();

//   useEffect(() => {
//     const fetchResults = async (searchTerm) => {
//       if (!query.trim()) {
//         setResults([]);
//         setShowDropdown(false);
//         return;
//       }

//       try {
//         const response = await getMovies();
//         const allMovies = response.data;
//         const filtered = allMovies.filter((movie) =>
//           movie.title.toLowerCase().includes(query.toLowerCase())
//         );
//         setResults(filtered);
//         setShowDropdown(true);
//       } catch (error) {
//         console.error("Error buscando películas:", error);
//       }
//     };

//     fetchResults();
//   }, [query]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (inputRef.current && !inputRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative w-full max-w-md mx-auto mt-6" ref={inputRef}>
//       <input
//         type="text"
//         value={query}
//         placeholder="Buscar películas..."
//         onChange={(e) => setQuery(e.target.value)}
//         className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
//           theme === "dark"
//             ? "bg-gray-800 border-gray-700 text-white focus:ring-red-400"
//             : "bg-white border-gray-300 text-black focus:ring-red-500"
//         }`}
//       />

//       {showDropdown && results.length > 0 && (
//         <div
//           className={`absolute z-50 w-full border rounded-md mt-1 shadow-lg max-h-80 overflow-y-auto ${
//             theme === "dark"
//               ? "bg-gray-800 border-gray-700 text-white"
//               : "bg-white border-gray-200 text-black"
//           }`}
//         >
//           {results.map((movie) => (
//             <Link
//               key={movie._id}
//               to={`/movie/${movie._id}`}
//               className={`flex items-center p-2 transition ${
//                 theme === "dark"
//                   ? "hover:bg-gray-700"
//                   : "hover:bg-gray-100"
//               }`}
//               onClick={() => setShowDropdown(false)}
//             >
//               <img
//                 src={movie.poster_path}
//                 alt={movie.title}
//                 className="w-12 h-16 object-cover rounded mr-4"
//               />
//               <span className="font-medium">{movie.title}</span>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import { useState, useEffect, useRef } from 'react'
import { getMovies } from '../services/movieService'
import { Link } from 'react-router-dom'
import { useProfile } from '../contexts/ProfileContext'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef(null)

  const { activeProfile } = useProfile()

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

  return (
    <div className="relative w-full max-w-md mx-auto mt-6" ref={inputRef}>
      <input
        type="text"
        value={query}
        placeholder="Buscar películas..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-80 overflow-y-auto">
          {results.map((movie) => (
            <Link
              key={movie._id}
              to={`/movie/${movie._id}`}
              className="flex items-center p-2 hover:bg-gray-100 transition"
              onClick={() => setShowDropdown(false)}
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-12 h-16 object-cover rounded mr-4"
              />
              <span className="text-gray-800 font-medium">{movie.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
