import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-8">Page Not Found</h2>
      <p className="text-gray-400 text-center max-w-md mb-8">
        La página que estás buscando pudo haber sido removida, ha cambiado su
        nombre o está temporalmente no disponible.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
