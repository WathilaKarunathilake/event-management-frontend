import { createContext, useContext, useEffect, useState } from "react"
import type { Role, User } from "@/models/AuthModel"
import { handleGettingJwtInfo } from "@/services/AuthService"

interface AuthContextType {
  user: User | null
  login: () => Promise<void>
  logout: () => void
  hasRole: (role: Role) => boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

let globalLogout: (() => void) | null = null

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const getUserDetails = async () => {
    try {
      setLoading(true)
      const response = await handleGettingJwtInfo()
      console.log(response)
      setUser(response)
    } catch (error) {
      console.error("Failed to get user details", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  const login = async () => {
    try {
      await getUserDetails()
    } catch (e) {
      console.error("Login error", e)
    }
  }

  const logout = async () => {
    setUser(null)
  }

  const hasRole = (role: Role) => user?.role.includes(role) ?? false

  useEffect(() => {
    globalLogout = logout
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used in AuthProvider")
  return ctx
}

export function logoutUser() {
  if (globalLogout) globalLogout()
}
