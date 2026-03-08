import { createContext, useState, useEffect } from "react"
import { loginUser, registerUser, getUserProfile } from "../services/authService"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (!storedToken) return

    setToken(storedToken)

    getUserProfile(storedToken)
      .then((profile) => {
        const profileUser = profile.user || profile
        setUser(profileUser)
        localStorage.setItem("user", JSON.stringify(profileUser))
      })
      .catch(() => logout())
  }, [])

  const login = async (credentials) => {
    const data = await loginUser(credentials)
    const nextToken = data.token
    if (!nextToken) throw new Error("Token not received")

    setToken(nextToken)
    localStorage.setItem("token", nextToken)

    const profile = await getUserProfile(nextToken)
    const profileUser = profile.user || profile
    setUser(profileUser)
    localStorage.setItem("user", JSON.stringify(profileUser))
  }

  const register = async (userData) => {
    const data = await registerUser(userData)
    const nextToken = data.token || data.accessToken

    if (nextToken) {
      setToken(nextToken)
      localStorage.setItem("token", nextToken)

      const profile = await getUserProfile(nextToken)
      const profileUser = profile.user || profile
      setUser(profileUser)
      localStorage.setItem("user", JSON.stringify(profileUser))
      return
    }

    if (data.user) {
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}