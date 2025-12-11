'use client'

import Link from 'next/link'
import { Menu, X, User as UserIcon } from 'lucide-react'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { signOut } from '@/app/auth/actions'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/plans' },
  { name: 'Articles', href: '/articles' },
  { name: 'Forum', href: '/forum' },
  { name: 'News', href: '/news' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

interface NavbarClientProps {
  user: User | null
  profile: { username: string | null; avatar_url: string | null } | null
}

export default function NavbarClient({ user, profile }: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const displayName = profile?.username || user?.email?.split('@')[0] || 'User'

  return (
    <header className="bg-[#232829] shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-[#c49e4e] hover:text-[#9e7642] transition-colors">Smart Chess Academy</span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#c49e4e]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-[#bac1bf] hover:text-[#c49e4e] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm font-semibold leading-6 text-[#c49e4e] hover:text-[#9e7642] transition-colors"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full object-cover border-2 border-[#c49e4e]"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-[#c49e4e]/20 flex items-center justify-center border-2 border-[#c49e4e]">
                    <UserIcon className="h-4 w-4 text-[#c49e4e]" />
                  </div>
                )}
                <span>{displayName}</span>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-[#bac1bf]/30">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[#232829] hover:bg-[#c49e4e]/10"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-[#232829] hover:bg-[#c49e4e]/10"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/signin" className="text-sm font-semibold leading-6 text-[#c49e4e] hover:text-[#9e7642] transition-colors">
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#232829]">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-[#bac1bf] hover:bg-[#44321b] hover:text-[#c49e4e]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#bac1bf] hover:bg-[#44321b] hover:text-[#c49e4e]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-[#bac1bf] hover:bg-[#44321b] hover:text-[#c49e4e]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="block rounded-md px-3 py-2 text-base font-medium text-[#bac1bf] hover:bg-[#44321b] hover:text-[#c49e4e]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
