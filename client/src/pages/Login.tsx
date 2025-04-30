import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { isAuthenticated, loginAuth, error } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

    useEffect(() => {
      function Nav() {
        if(isAuthenticated) {
          navigate('/dashboard')
        }
      }
      Nav()
    }, [isAuthenticated])
  
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
        loginAuth({username, password})
      } catch (error) {
        setLoading(false);
        console.error(error)
      }
    }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-black flex items-center justify-center px-4 py-12">
  <div className="w-full max-w-md bg-gray-800 border border-cyan-600 rounded-xl shadow-lg p-8 space-y-6 text-white">
    <div>{error}</div>
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-cyan-400">Welcome Back</h2>
      <p className="text-sm text-gray-400 mt-2">Sign in to your cyber dashboard</p>
    </div>
    <form className="space-y-5" onSubmit={handleLogin}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-cyan-300">Username</label>
        <input type="username" id="username" name="email" required placeholder="username"
          value={username} onChange={e => setUsername(e.target.value)}
          className="mt-1 w-full px-4 py-3 bg-gray-900 border border-cyan-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-300 placeholder-gray-500" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-cyan-300">Password</label>
        <input type="password" id="password" name="password" required placeholder="••••••••"
          value={password} onChange={e => setPassword(e.target.value)}
          className="mt-1 w-full px-4 py-3 bg-gray-900 border border-cyan-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-300 placeholder-gray-500" />
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox text-cyan-500 bg-gray-700 border-cyan-500" />
          <span className="text-gray-400">Remember me</span>
        </label>
        <a href="#" className="text-cyan-400 hover:underline">Forgot password?</a>
      </div>
      <button type="submit"
        className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ring-1 ring-cyan-400 flex justify-center">
                      {loading && !error ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                "Sign In"
              )}
      </button>
    </form>
    <p className="text-sm text-center text-gray-400">Don't have an account?
      <a href="#" className="text-cyan-400 hover:underline">Sign up</a>
    </p>
  </div>
</section>
  )
}

export default Login