'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaEye, FaSignOutAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa'

interface Crane {
  id: number
  name: string
  model: string
  year: number
  status: string
  category: string
  isAvailable: boolean
  createdAt: string
}

export default function AdminDashboard() {
  const [cranes, setCranes] = useState<Crane[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchCranes()
    
    // Set up periodic refresh every 30 seconds
    const interval = setInterval(fetchCranes, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // Refresh cranes when returning to dashboard
  useEffect(() => {
    const handleFocus = () => {
      fetchCranes()
    }
    
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchCranes()
      }
    }
    
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Add router event listener to refresh when navigating back
  useEffect(() => {
    const handleRouteChange = () => {
      fetchCranes()
    }
    
    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  const fetchCranes = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Add cache-busting parameter to ensure fresh data
      const response = await fetch(`/api/admin/cranes?_t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      if (response.status === 401) {
        router.push('/en/admin/login')
        return
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch cranes')
      }
      
      const data = await response.json()
      console.log('Admin Dashboard - Fetched cranes:', data.length, 'cranes')
      console.log('Admin Dashboard - First 3 cranes:', data.slice(0, 3).map(c => ({ id: c.id, name: c.name, slug: c.slug })))
      setCranes(data)
    } catch (err) {
      console.error('Admin Dashboard - Fetch error:', err)
      setError('Failed to fetch cranes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this crane?')) return

    try {
      const response = await fetch(`/api/admin/cranes/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        setCranes(cranes.filter(crane => crane.id !== id))
        alert('Crane deleted successfully')
      } else if (response.status === 401) {
        router.push('/en/admin/login')
        return
      } else {
        const errorData = await response.json()
        alert(`Failed to delete crane: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting crane:', error)
      alert('Network error')
    }
  }

  const handleToggleAvailability = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/cranes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isAvailable: !currentStatus
        }),
        credentials: 'include'
      })

      if (response.ok) {
        setCranes(cranes.map(c => 
          c.id === id ? { ...c, isAvailable: !currentStatus } : c
        ))
        // Refresh data after a short delay to ensure consistency
        setTimeout(() => fetchCranes(), 500)
      } else if (response.status === 401) {
        router.push('/en/admin/login')
        return
      } else {
        const errorData = await response.json()
        alert(`Failed to update crane status: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating crane status:', error)
      alert('Network error')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { 
        method: 'POST',
        credentials: 'include'
      })
      router.push('/en/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      available: 'bg-green-100 text-green-800',
      sold: 'bg-red-100 text-red-800',
      comingsoon: 'bg-yellow-100 text-yellow-800',
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage tower cranes</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchCranes}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
              >
                <span>Refresh</span>
              </button>
              <Link
                href="/en/admin/cranes/new"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
              >
                <FaPlus className="w-4 h-4" />
                <span>Add Crane</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-900">{cranes.length}</div>
            <div className="text-gray-600">Total Cranes</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">
              {cranes.filter(c => c.status === 'available').length}
            </div>
            <div className="text-gray-600">Available</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-red-600">
              {cranes.filter(c => c.status === 'sold').length}
            </div>
            <div className="text-gray-600">Sold</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {cranes.filter(c => c.status === 'comingsoon').length}
            </div>
            <div className="text-gray-600">Coming Soon</div>
          </div>
        </div>

        {/* Cranes Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Tower Cranes</h2>
          </div>
          
          {cranes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No cranes found</p>
              <Link
                href="/en/admin/cranes/new"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md inline-flex items-center space-x-2"
              >
                <FaPlus className="w-4 h-4" />
                <span>Add First Crane</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crane
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model & Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cranes.map((crane) => (
                    <tr key={crane.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{crane.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{crane.model}</div>
                        <div className="text-sm text-gray-500">{crane.year}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(crane.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{crane.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleAvailability(crane.id, crane.isAvailable)}
                          className={`text-2xl ${crane.isAvailable ? 'text-green-600' : 'text-gray-400'}`}
                        >
                          {crane.isAvailable ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link
                          href={`/en/admin/cranes/${crane.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEye className="inline w-4 h-4" />
                        </Link>
                        <Link
                          href={`/en/admin/cranes/${crane.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit className="inline w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(crane.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="inline w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 