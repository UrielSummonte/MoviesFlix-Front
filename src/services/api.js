import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
const token = localStorage.getItem("token")
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration
    if (error.response && error.response.status === 401) {
      // Check if it's not a login/register request
      if (!error.config.url.includes("/auth/login") && !error.config.url.includes("/auth/register")) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  },
)

export default api
