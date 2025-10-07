import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const {user, loading} = useAuth()
  const navigate = useNavigate()

  if(loading){
    return <div>Loading.... </div>
  }
  if(!user){
    navigate('/login')
  }
  return (
    //<div>AdminDashboard {user.name}</div>
      <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name || "Admin"}
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your system, monitor activities, and control settings from here.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Users</h2>
            <p className="text-gray-700">View and manage user accounts</p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Analytics</h2>
            <p className="text-gray-700">Track usage and system performance</p>
          </div>

          <div className="bg-purple-100 p-4 rounded-xl text-center shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Settings</h2>
            <p className="text-gray-700">Update configuration and preferences</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard