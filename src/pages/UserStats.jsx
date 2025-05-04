import { useEffect, useState, useRef } from 'react'
import { getUserStats } from '../services/adminService'
import Chart from 'chart.js/auto'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'  // Importar el hook

const UserStats = () => {
  const { theme } = useTheme()  // Obtener el tema actual
  const [stats, setStats] = useState(null)
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUserStats()
        setStats(data)
      } catch (error) {
        console.error('Error al cargar estadísticas:', error)
      }
    }

    fetchStats()
  }, [])

  useEffect(() => {
    if (stats && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: ['Usuarios Regulares', 'Administradores'],
          datasets: [
            {
              data: [stats.regularUsers, stats.adminUsers],
              backgroundColor: [
                'rgba(34, 197, 94, 0.7)',
                'rgba(239, 68, 68, 0.7)',
              ],
              borderColor: [
                'rgba(34, 197, 94, 1)',
                'rgba(239, 68, 68, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Distribución de Usuarios por Rol',
            },
          },
        },
      })
    }
  }, [stats])

  if (!stats) return <p className="p-6">Cargando estadísticas...</p>

  const { totalUsers, regularUsers, adminUsers } = stats

  const percent = (value) =>
    totalUsers > 0 ? ((value / totalUsers) * 100).toFixed(1) : 0

  return (
    <main className={`flex-1 container mx-auto p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Estadísticas de Usuarios</h1>
        <Link
          to="/admin/dashboard"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Volver al Panel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h5 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Total de Usuarios</h5>
          <p className="text-4xl font-bold text-blue-500">{totalUsers}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h5 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Usuarios Regulares</h5>
          <p className="text-4xl font-bold text-green-500">{regularUsers}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h5 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Administradores</h5>
          <p className="text-4xl font-bold text-red-500">{adminUsers}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h5 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Distribución de Usuarios</h5>
          <canvas ref={chartRef}></canvas>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h5 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Información Adicional</h5>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Porcentaje de Administradores</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {percent(adminUsers)}%
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>Porcentaje de Usuarios Regulares</span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                {percent(regularUsers)}%
              </span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default UserStats
