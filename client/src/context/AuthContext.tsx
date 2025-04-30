import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'
import api from "../api/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  loginAuth: ({ username, password }: LoginCredientials) => void;
}

export interface LoginCredientials {
  username?: string, password?: string  
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const[isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('');

  useEffect(() => {
    auth().catch(() => setIsAuthenticated(false))
}, [isAuthenticated, setIsAuthenticated])

const refreshToken = async () => {
    const refreshToken = localStorage.getItem("REFRESHTOKEN");

    if(!refreshToken) { 
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }
    
    try {
        const res = await api.post("api/auth/token/refresh/", {
            refresh: refreshToken,
        });

        if (res.status === 200) {
            localStorage.setItem("ACCESSTOKEN", res.data.access)
            setIsAuthenticated(true)
            setIsLoading(false)
        }
    } catch (error) {
        setIsAuthenticated(false);
        setIsLoading(false)
    }
}

async function loginAuth ({ username, password }: LoginCredientials ) {
  setError('')
  try {
    const res = await api.post('api/auth/login/', {username, password})

    if (res.status === 200){
      localStorage.setItem("ACCESSTOKEN", res.data.access);
      localStorage.setItem("REFRESHTOKEN", res.data.refresh);
      auth()
    }
  } catch (error: any) {
    setError(error.response?.data.detail || 'Failed to login.');
    console.error(error);
  }
}

  const auth = async () => {
    const token = localStorage.getItem("ACCESSTOKEN")

    if(!token) { 
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }
  
    const decoded = jwtDecode (token)
    const tokenExpiration = decoded.exp  
    const now = Math.floor(Date.now() / 1000)

    if(tokenExpiration! <= now ) {
      await refreshToken()
    }else{
      setIsAuthenticated(true)
      setIsLoading(false)
    } 
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, error, loginAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};