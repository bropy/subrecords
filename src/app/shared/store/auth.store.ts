import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'

import { supabase } from '@/pkg/libraries/supabase/client'

// User profile type
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
  fetchUserProfile: () => Promise<void>
  createUserProfile: (userId: string, email: string) => Promise<{ error: Error | null }>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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

          // If signup successful, try to create user profile
          if (data.user) {
            set({
              user: data.user,
              isAuthenticated: !!data.user,
              isLoading: false,
            })
            
            // Try to create user profile manually (fallback if trigger fails)
            const profileResult = await get().createUserProfile(data.user.id, data.user.email || email)
            
            if (profileResult.error) {
              console.log('User profile creation note:', profileResult.error.message || 'Profile may already exist')
              // Don't fail signup if profile creation fails
            }
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

          // Fetch user profile after successful sign in
          if (data.user) {
            // Try to fetch existing profile first
            await get().fetchUserProfile()
            
            // If no profile exists, create one
            if (!get().userProfile) {
              console.log('No profile found, creating one...')
              await get().createUserProfile(data.user.id, data.user.email || email)
            }
          }

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

      fetchUserProfile: async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser()
          
          if (user) {
            const { data: profile, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single()

            if (error) {
              console.error('Error fetching user profile:', error)
              // If profile doesn't exist, try to create it
              if (error.code === 'PGRST116') { // No rows returned
                console.log('User profile not found, creating...')
                const createResult = await get().createUserProfile(user.id, user.email || '')
                if (createResult.error) {
                  console.error('Failed to create user profile:', createResult.error)
                }
              }
            } else {
              set({ userProfile: profile })
            }
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      },

      createUserProfile: async (userId: string, email: string) => {
        try {
          const { data, error } = await supabase
            .from('users')
            .insert({
              id: userId,
              email: email,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single()

          if (error) {
            // Check if it's a duplicate key error (user already exists)
            if (error.code === '23505') {
              console.log('User profile already exists, fetching existing...')
              // Try to fetch the existing profile
              const { data: existingProfile } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single()
              
              if (existingProfile) {
                set({ userProfile: existingProfile })
                return { error: null }
              }
            }
            
            // Only log actual errors, not empty objects
            if (error.message || error.code) {
              console.error('Error creating user profile:', error.message || error.code)
            }
            return { error }
          }

          set({ userProfile: data })
          return { error: null }
        } catch (error) {
          console.error('Error creating user profile:', error)
          return { error: error as Error }
        }
      },

      initialize: async () => {
        try {
          console.log('Initializing auth...')
          
          // Get initial session
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (error) {
            console.error('Error getting session:', error)
            set({ 
              user: null,
              userProfile: null,
              isAuthenticated: false,
              isLoading: false 
            })
            return
          }
          
          console.log('Session found:', !!session)
          
          if (session?.user) {
            console.log('User authenticated:', session.user.email)
            set({
              user: session.user,
              isAuthenticated: true,
              isLoading: false,
            })

            // Fetch user profile
            await get().fetchUserProfile()
          } else {
            console.log('No session found')
            set({
              user: null,
              userProfile: null,
              isAuthenticated: false,
              isLoading: false,
            })
          }

          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email)
            
            if (session?.user) {
              set({
                user: session.user,
                isAuthenticated: true,
                isLoading: false,
              })

              // Fetch user profile on auth state change
              await get().fetchUserProfile()
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
      onRehydrateStorage: () => (state) => {
        // This runs after the store is rehydrated from localStorage
        if (state) {
          console.log('Auth store rehydrated:', state.isAuthenticated ? 'Logged in' : 'Not logged in')
        }
      },
    }
  )
)
