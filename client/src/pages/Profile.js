import React, { useContext } from 'react'
import { Context } from '..'
import Loader from '../components/Loader'

function Profile() {

  const {isAuthenticated, user, loading} = useContext(Context)

  console.log(user)
  console.log(isAuthenticated)
  return (
    loading? <Loader/> : (
      <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-semibold mb-2">{user?.name}</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>
    </div>
    
    
    )
  )
}

export default Profile