// src/services/movieService.js
import { data } from "react-router-dom"
import api from "./api"

// Get movies with pagination and filters
// export const getMovies = async (params = {}) => {
//   try {
//     const response = await api.get("/movies", { params })
    
//     return response.data.data
//   } catch (error) {
//     console.error("Error fetching movies:", error)
//     throw error
//   }
// }

// export const getMovies = async (params = {}) => {
//   try {
//     const cleanParams = {}
//     if (params.genre) cleanParams.genre = params.genre
//     if (params.profileType) cleanParams.profileType = params.profileType
//     if (params.search) cleanParams.search = params.search
//     if (params.page) cleanParams.page = params.page
//     if (params.limit) cleanParams.limit = params.limit

//     const response = await api.get("/movies", { params: cleanParams })
//     return response.data// devolver todo para paginación y más control
//   } catch (error) {
//     console.error("Error fetching movies:", error)
//     throw error
//   }
// }
export const getMovies = async (params = {}) => {
  try {
    
    const cleanParams = {};
    if (params.genre) cleanParams.genre = params.genre;
    if (params.profileType) cleanParams.profileType = params.profileType;
    if (params.search) cleanParams.search = params.search;
    if (params.page) cleanParams.page = params.page;
    if (params.limit) cleanParams.limit = params.limit;

    const response = await api.get("/movies", { params: cleanParams })  
      
    return {
      data: response.data.data,
      count: response.data.count,
      total: response.data.total,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
    };
  } catch (error) {
    console.error("Error fetching movies:", error)
    throw error
  }
}


// Get movies by profile
// export const getMovieByProfile = async (id) => {
//   try {    
//     const response = await api.get(`/movies/profile/${id}`) 
//     return response.data
//   } catch (error) {
//     console.error(`Error fetching movie ${id}:`, error)
//     throw error
//   }
// }

// Get a single movie by ID
export const getMovie = async (id) => {
  try {    
    const response = await api.get(`/movies/${id}`) 
    
    return response.data.data
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error)
    throw error
  }
}

// Get watchlist for a profile
export const getWatchlist = async (profileId) => {
  try {
    const response = await api.get(`/watchlist/${profileId}`)   
     
    return response.data
  } catch (error) {
    console.error("Error fetching watchlist:", error)
    throw error
  }
}

// Add movie to watchlist
export const addToWatchlist = async (profileId, movieId) => {
  try {    
    const response = await api.post(`/watchlist/${profileId}/movies/${movieId}`)
    return response.data.data
  } catch (error) {
    console.error("Error adding to watchlist:", error)
    throw error
  }
}

// Remove movie from watchlist
export const removeFromWatchlist = async (profileId, movieId) => {
  try {
    const response = await api.delete(`/watchlist/${profileId}/movies/${movieId}`)
    return response.data.data
  } catch (error) {
    console.error("Error removing from watchlist:", error)
    throw error
  }
}