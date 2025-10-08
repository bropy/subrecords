import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'

import { supabase } from '@/pkg/libraries/supabase/client'

export interface UserProfile {
  id: string
  email: string
  created_at: string
  updated_at: string
}

interface AuthState {
  user: User | null
  userProfile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      userProfile: null,
      isLoading: true,
      isAuthenticated: false,

      signUp: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          })

          if (error) {
            return { error }
          }

          if (data.user) {
            set({
              user: data.user,
              isAuthenticated: !!data.user,
              isLoading: false,
            })
          }

          return { error: null }
        } catch (error) {
          return { error: error as Error }
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) {
            return { error }
          }

          set({
            user: data.user,
            isAuthenticated: !!data.user,
            isLoading: false,
          })

          return { error: null }
        } catch (error) {
          return { error: error as Error }
        }
      },

      signOut: async () => {
        try {
          await supabase.auth.signOut()
          set({
            user: null,
            userProfile: null,
            isAuthenticated: false,
            isLoading: false,
          })
        } catch (error) {
          console.error('Error signing out:', error)
        }
      },

      initialize: async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (error) {
            set({ 
              user: null,
              userProfile: null,
              isAuthenticated: false,
              isLoading: false 
            })
            return
          }
          
          if (session?.user) {
            set({
              user: session.user,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            set({
              user: null,
              userProfile: null,
              isAuthenticated: false,
              isLoading: false,
            })
          }

          supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
              set({
                user: session.user,
                isAuthenticated: true,
                isLoading: false,
              })
            } else {
              set({
                user: null,
                userProfile: null,
                isAuthenticated: false,
                isLoading: false,
              })
            }
          })
        } catch (error) {
          console.error('Error initializing auth:', error)
          set({ 
            user: null,
            userProfile: null,
            isAuthenticated: false,
            isLoading: false 
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        userProfile: state.userProfile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
