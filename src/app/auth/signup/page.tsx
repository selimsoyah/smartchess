'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      
      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
          },
        },
      })

      if (signUpError) throw signUpError

      // Check if email confirmation is required
      if (data.user && !data.session) {
        setError('Please check your email to confirm your account')
        setTimeout(() => router.push('/auth/signin'), 3000)
      } else {
        router.push('/profile')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-[#bac1bf]/30 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#232829] mb-2">Join Smart Chess Academy</h2>
            <p className="text-[#5a605a]">Create your account to get started</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#232829] mb-2">
                Username (optional)
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                placeholder="chessmaster"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#232829] mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#232829] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#232829] mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className={`p-3 rounded-md border ${
                error.includes('check your email') 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm ${
                  error.includes('check your email')
                    ? 'text-green-800'
                    : 'text-red-800'
                }`}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-[#c49e4e] text-white rounded-md font-medium hover:bg-[#9e7642] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#5a605a]">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-[#c49e4e] hover:text-[#9e7642] font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
