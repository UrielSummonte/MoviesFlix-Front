import api from './api'

// Obtener todas las películas
export const getMovies = async (params = {}) => {
  try {
    const cleanParams = {}
    if (params.page) cleanParams.page = params.page
    if (params.limit) cleanParams.limit = params.limit
    const response = await api.get('/movies', { params: cleanParams })
    console.log('resp', response)

    return {
      data: response.data.data,
      count: response.data.count,
      total: response.data.total,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
    }
  } catch (error) {
    console.error('Error al obtener películas:', error)
    throw error
  }
}

// Agregar una nueva película
export const addMovie = async (movieData) => {
  try {
    const response = await axios.post(`${API_URL}/movies`, movieData)
    return response.data
  } catch (error) {
    console.error('Error al agregar película:', error)
    throw error
  }
}

// Actualizar una película existente
export const updateMovie = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/movies/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error('Error al actualizar película:', error)
    throw error
  }
}

// Eliminar una película
export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/movies/${id}`)
    return response.data
  } catch (error) {
    console.error('Error al eliminar película:', error)
    throw error
  }
}

// Obtener estadísticas de usuarios
export const getUserStats = async () => {
  try {
    const response = await api.get('/movies/users/stats')
    console.log("data", response.data);
        
    return response.data.data
  } catch (error) {
    console.error('Error al obtener estadísticas de usuarios:', error)
    throw error
  }
}
