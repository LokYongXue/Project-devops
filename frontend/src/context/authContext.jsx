import axios from 'axios'
import React, { Children, createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()
const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const verifyUser = async () =>{
            try {
                const token = localStorage.getItem("token")
                if(token){
                const response = await axios.get("http://localhost:5000/api/auth/verify",{
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                })
                if(response.data.success){
                    setUser(response.data.user)
                }
            }else{
                setUser(null)
            }
            } catch (error) {
                if(error.response && !error.response.data.error){
                    setUser(null)
                }
            }finally{
                setLoading(false)
            }
        }
        verifyUser()
    },[])
    
    const login = (user) =>{
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }

  return (  //any component inside <UserContext.Provider> can access user without props
    <UserContext.Provider value={{user, login, logout, loading}}>
        {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => useContext(UserContext)
export default AuthContextProvider   //provider component wrap the data so globlally available