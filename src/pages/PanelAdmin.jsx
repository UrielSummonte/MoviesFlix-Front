// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { getMovies } from '../services/adminService' // Importa el servicio

// const PanelAdmin = () => {
//   const [movies, setMovies] = useState([]) // Estado para almacenar las películas
//   const [loading, setLoading] = useState(true) // Estado para manejar la carga
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//   }) // Estado para manejar la paginación

//   // Función para obtener las películas
//   const fetchMovies = async (page = 1) => {
//     setLoading(true)
//     try {
//       const params = { page, limit: 8 } // Limite de 50 como pediste
//       const response = await getMovies(params) // Llamada al servicio
//       setMovies(response.data)
//       setPagination({
//         currentPage: response.currentPage,
//         totalPages: response.totalPages,
//       })
//     } catch (error) {
//       console.error('Error al cargar las películas:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Efecto para cargar las películas al montar el componente
//   useEffect(() => {
//     fetchMovies(1)
//   }, [])

//   // Manejo de cambio de página
//   const handlePageChange = (page) => {
//     fetchMovies(page)
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen py-8 px-4">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-semibold text-gray-800">Películas</h1>
//           <div className="space-x-2">
//             <Link
//               to="/admin/addMovie"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//             >
//               Agregar Película
//             </Link>
//             <Link
//               to="/admin/stats"
//               className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//             >
//               Estadísticas de Usuarios
//             </Link>
//           </div>
//         </div>

//         <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
//                   Título
//                 </th>
//                 <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
//                   Clasificación
//                 </th>
//                 <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
//                   Géneros
//                 </th>
//                 <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
//                   Idioma
//                 </th>
//                 <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
//                   Fecha
//                 </th>
//                 <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
//                   Acciones
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {movies.map((movie) => (
//                 <tr key={movie._id} className="border-t hover:bg-gray-50">
//                   <td className="py-2 px-4 text-sm text-gray-700">
//                     {movie.title}
//                   </td>
//                   <td className="py-2 px-4 text-sm text-gray-700">
//                     {movie.rating}
//                   </td>
//                   <td className="py-2 px-4 text-sm text-gray-700">
//                     {movie.genres.join(', ')}
//                   </td>
//                   <td className="py-2 px-4 text-sm text-gray-700">
//                     {movie.original_language || 'N/A'}
//                   </td>
//                   <td className="py-2 px-4 text-sm text-gray-700">
//                     {movie.release_date
//                       ? new Date(movie.release_date).toLocaleDateString()
//                       : 'N/A'}
//                   </td>
//                   <td className="py-2 px-4 text-sm space-x-2">
//                     <Link
//                       to={`/admin/editMovie/${movie._id}`}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
//                     >
//                       Editar
//                     </Link>
//                     <button
//                       onClick={() =>
//                         window.confirm(
//                           '¿Estás seguro de eliminar esta película?'
//                         )
//                       }
//                       className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
//                     >
//                       Eliminar
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Paginación */}
//         <div className="mt-6 flex justify-center space-x-2">
//           <button
//             onClick={() => handlePageChange(pagination.currentPage - 1)}
//             disabled={pagination.currentPage === 1}
//             className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
//           >
//             Anterior
//           </button>
//           <span className="self-center text-gray-700">
//             Página {pagination.currentPage} de {pagination.totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(pagination.currentPage + 1)}
//             disabled={pagination.currentPage === pagination.totalPages}
//             className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
//           >
//             Siguiente
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PanelAdmin


import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMovies } from '../services/adminService' // Importa el servicio
import { useTheme } from '../contexts/ThemeContext'  // Importar el hook para el tema

const PanelAdmin = () => {
  const { theme } = useTheme()  // Obtener el tema actual
  const [movies, setMovies] = useState([]) // Estado para almacenar las películas
  const [loading, setLoading] = useState(true) // Estado para manejar la carga
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  }) // Estado para manejar la paginación

  // Función para obtener las películas
  const fetchMovies = async (page = 1) => {
    setLoading(true)
    try {
      const params = { page, limit: 8 } // Limite de 50 como pediste
      const response = await getMovies(params) // Llamada al servicio
      setMovies(response.data)
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
      })
    } catch (error) {
      console.error('Error al cargar las películas:', error)
    } finally {
      setLoading(false)
    }
  }

  // Efecto para cargar las películas al montar el componente
  useEffect(() => {
    fetchMovies(1)
  }, [])

  // Manejo de cambio de página
  const handlePageChange = (page) => {
    fetchMovies(page)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-8 px-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Películas</h1>
          <div className="space-x-2">
            <Link
              to="/admin/addMovie"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Agregar Película
            </Link>
            <Link
              to="/admin/stats"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Estadísticas de Usuarios
            </Link>
          </div>
        </div>

        <div className={`overflow-x-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg`}>
          <table className="min-w-full table-auto">
            <thead className={`${theme === 'dark' ? 'bg-gray-00' : 'bg-gray-100'}`}>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  Título
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  Clasificación
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  Géneros
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  Idioma
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  Fecha
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {movie.title}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {movie.rating}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {movie.genres.join(', ')}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {movie.original_language || 'N/A'}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {movie.release_date
                      ? new Date(movie.release_date).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="py-2 px-4 text-sm space-x-2">
                    <Link
                      to={`/admin/editMovie/${movie._id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() =>
                        window.confirm(
                          '¿Estás seguro de eliminar esta película?'
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Anterior
          </button>
          <span className="self-center text-gray-700">
            Página {pagination.currentPage} de {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}

export default PanelAdmin
