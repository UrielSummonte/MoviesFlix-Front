import { useRef } from "react"
import MovieCard from "./MovieCard"
import { Link } from "react-router-dom"

const MovieSlider = ({ watchlist }) => {
  const sliderRef = useRef(null)
  const movies = watchlist.movies

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { current } = sliderRef
      const scrollAmount =
        direction === "left"
          ? -current.offsetWidth * 0.75
          : current.offsetWidth * 0.75

      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Películas en tu lista</h2>

      <div className="relative group">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none' // IE
          }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-4 rounded-md">
            {movies.map((movie) => (
              <div key={movie._id} className="flex-none w-48 md:w-56">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

        {movies.length > 2 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/80 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/80 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="text-center mt-6">
        <Link
          to="/watchlist"
          className="inline-block bg-red-600 text-white px-5 py-2 rounded-md text-sm font-medium shadow hover:bg-red-700 transition-colors"
        >
          Ir a mi lista
        </Link>
      </div>
    </div>
  )
}

export default MovieSlider
