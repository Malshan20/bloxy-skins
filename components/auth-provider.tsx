"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "seller" | "admin"
}

type AuthContextType = {
  user: User | null
  signIn: (credentials: any) => void
  signUp: (credentials: any) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const signIn = (credentials: any) => {
    // In a real app, this would validate credentials with your backend
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: credentials.email || "user@example.com",
      role: credentials.role || "user",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const signUp = (credentials: any) => {
    // In a real app, this would create a new user in your backend
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: credentials.email || "user@example.com",
      role: credentials.role || "user",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

