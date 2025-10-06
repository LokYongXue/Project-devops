import React, { useState } from "react";
import axios from 'axios'
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')  //email is the state and setEmail is method
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const naviagte = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login",{email,password});
            if(response.data.success){
              login(response.data.user)
              localStorage.setItem("token", response.data.token)
              if(response.data.user.role == "admin"){
                naviagte("/admin-dashboard")
              }else{
                naviagte("/employee-dashboard")
              }
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
              setError(error.response.data.error)
            }else{
              setError("Changed from dev branch : Server Error")
            }
        }
    }


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Employee Management System
        </h2>
        <h3 className="text-lg text-gray-500 mb-6">Login</h3>
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            onChange={(e)=> setEmail(e.target.value)} required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="*****"
            onChange={(e)=> setPassword(e.target.value)} required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
