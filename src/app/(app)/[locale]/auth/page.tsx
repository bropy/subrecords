'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, UserPlus } from 'lucide-react'

import { LoginForm } from '@/app/features/auth/components/login-form.component'
import { RegisterForm } from '@/app/features/auth/components/register-form.component'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/')
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  return (
    <div className="min-h-screen bg-dark-blue flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-beige-100 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-beige-400">
            {isLogin ? 'Sign in to your account' : 'Join SubMusic today'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Auth Form */}
        <div className="bg-dark-blue-light p-8 rounded-lg shadow-lg border border-dark-blue-gray">
          {isLogin ? (
            <LoginForm onSuccess={handleSuccess} onError={handleError} />
          ) : (
            <RegisterForm onSuccess={handleSuccess} onError={handleError} />
          )}

          {/* Toggle between login and register */}
          <div className="mt-6 text-center">
            <p className="text-beige-400 text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError(null)
              }}
              className="mt-2 text-red-500 hover:text-red-400 font-bold text-sm transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              {isLogin ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
