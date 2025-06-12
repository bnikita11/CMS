// import { createContext, useContext, useEffect, useState } from "react";

// interface AuthContextType {
//   isLoggedIn: boolean;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  userId: string | null
  setUserId: React.Dispatch<React.SetStateAction<string | null>>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("jwtToken") || localStorage.getItem("LoginToken")
    const storedUserId = localStorage.getItem("userId")

    if (token && storedUserId) {
      setIsLoggedIn(true)
      setUserId(storedUserId)
    } else {
      setIsLoggedIn(false)
      setUserId(null)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("LoginToken")
    localStorage.removeItem("userId")
    localStorage.removeItem("tenantId")
    setIsLoggedIn(false)
    setUserId(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

