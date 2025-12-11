'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { signOut } from '@/app/auth/actions'
import { User } from '@supabase/supabase-js'
import { Profile } from '@/lib/types/database.types'
import { Upload, User as UserIcon, ExternalLink } from 'lucide-react'
import LichessStats from '@/components/lichess/LichessStats'
import RecentGames from '@/components/lichess/RecentGames'
import UserStudies from '@/components/lichess/UserStudies'

interface ProfileClientProps {
  user: User
  profile: Profile | null
}

export default function ProfileClient({ user, profile }: ProfileClientProps) {
  const router = useRouter()
  const [username, setUsername] = useState(profile?.username || '')
  const [lichessUsername, setLichessUsername] = useState(profile?.lichess_username || '')
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          lichess_username: lichessUsername || null,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      router.refresh()
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setMessage(null)

      if (!e.target.files || e.target.files.length === 0) {
        return
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const supabase = createClient()

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      setAvatarUrl(data.publicUrl)
      setMessage({ type: 'success', text: 'Avatar uploaded successfully!' })
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to upload avatar' })
    } finally {
      setUploading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-[#bac1bf]/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#232829] to-[#44321b] px-6 py-8">
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            <p className="mt-2 text-[#bac1bf]">Manage your account settings and preferences</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Avatar Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#232829] mb-4">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="h-24 w-24 rounded-full object-cover border-4 border-[#c49e4e]/20"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-[#c49e4e]/10 flex items-center justify-center border-4 border-[#c49e4e]/20">
                      <UserIcon className="h-12 w-12 text-[#c49e4e]" />
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="avatar-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#c49e4e] text-[#232829] rounded-md font-medium hover:bg-[#9e7642] transition-colors cursor-pointer"
                  >
                    <Upload className="h-4 w-4" />
                    {uploading ? 'Uploading...' : 'Upload new photo'}
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  <p className="mt-2 text-xs text-[#5a605a]">JPG, PNG or GIF (max 2MB)</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#232829] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2 border border-[#bac1bf] rounded-md bg-gray-50 text-[#5a605a] cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-[#5a605a]">Email cannot be changed</p>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[#232829] mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                  placeholder="Your display name"
                />
              </div>

              <div>
                <label htmlFor="lichess_username" className="block text-sm font-medium text-[#232829] mb-2">
                  Lichess Username (Optional)
                </label>
                <div className="relative">
                  <input
                    id="lichess_username"
                    type="text"
                    value={lichessUsername}
                    onChange={(e) => setLichessUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                    placeholder="Your Lichess.org username"
                  />
                  {lichessUsername && (
                    <a
                      href={`https://lichess.org/@/${lichessUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c49e4e] hover:text-[#9e7642]"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
                <p className="mt-1 text-xs text-[#5a605a]">
                  Link your Lichess account to display your stats and ratings
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232829] mb-2">
                  Member Since
                </label>
                <p className="text-[#5a605a]">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {message && (
                <div className={`p-4 rounded-md ${
                  message.type === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm ${
                    message.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {message.text}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#c49e4e] text-[#232829] rounded-md font-medium hover:bg-[#9e7642] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-6 py-3 bg-[#232829] text-white rounded-md font-medium hover:bg-[#44321b] transition-colors shadow-sm"
                >
                  Sign Out
                </button>
              </div>
            </form>

            {/* Lichess Stats Section */}
            {profile?.lichess_username && (
              <div className="mt-8 pt-8 border-t border-[#bac1bf]/30 space-y-8">
                <LichessStats username={profile.lichess_username} />
                <RecentGames username={profile.lichess_username} limit={5} />
                <UserStudies username={profile.lichess_username} limit={6} showInArticles={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
