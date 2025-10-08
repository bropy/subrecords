'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Mail, Lock } from 'lucide-react'

import { Button } from '@heroui/react'
import { useAuthStore } from '@/app/shared/store/auth.store'

// Zod schema for login
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const { signIn, isLoading } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await signIn(data.email, data.password)
    
    if (error) {
      onError?.(error.message)
    } else {
      onSuccess?.()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-netflix-white mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-netflix-text-gray" />
          <input
            {...register('email')}
            type="email"
            className="w-full pl-10 pr-4 py-3 bg-netflix-light-gray border border-netflix-text-gray/30 rounded-lg text-netflix-white placeholder-netflix-text-gray focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-netflix-red">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-netflix-white mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-netflix-text-gray" />
          <input
            {...register('password')}
            type="password"
            className="w-full pl-10 pr-4 py-3 bg-netflix-light-gray border border-netflix-text-gray/30 rounded-lg text-netflix-white placeholder-netflix-text-gray focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-netflix-red">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-netflix-red hover:bg-red-700 text-netflix-white font-semibold py-3 rounded-lg transition-colors"
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  )
}
