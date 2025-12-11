'use client'

import Link from 'next/link'
import { Menu, X, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import ChessKnightLogo from './ChessKnightLogo'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/plans' },
  { name: 'Articles', href: '/articles' },
  { name: 'Puzzles', href: '/puzzles' },
  { name: 'Watch', href: '/watch' },
  { name: 'Tournaments', href: '/tournaments' },
  { name: 'Studies', href: '/studies' },
  { name: 'Forum', href: '/forum' },
  { name: 'News', href: '/news' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Contact Info Bar */}
      <div className="bg-[#44321b] border-b border-[#c49e4e]/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-2 text-sm">
            <a href="mailto:Smartchessacademytunisie@gmail.com" className="flex items-center gap-2 text-[#bac1bf] hover:text-[#c49e4e] transition-colors">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Smartchessacademytunisie@gmail.com</span>
              <span className="sm:hidden">Email Us</span>
            </a>
            <a href="tel:+21621678900" className="flex items-center gap-2 text-[#bac1bf] hover:text-[#c49e4e] transition-colors">
              <Phone className="h-4 w-4" />
              <span>+216 21 678 900</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <header className="bg-[#232829] shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95 transition-all duration-500 border-b-2 border-[#c49e4e]/20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
            <ChessKnightLogo className="w-10 h-10 transition-all duration-700 group-hover:scale-125 group-hover:rotate-[25deg] drop-shadow-lg group-hover:drop-shadow-2xl" />
            <span className="text-xl font-bold text-[#c49e4e] group-hover:text-white transition-all duration-300 group-hover:scale-105">
              Smart Chess Academy
            </span>
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
              className="text-sm font-semibold leading-6 text-[#bac1bf] hover:text-[#c49e4e] transition-all duration-300 hover:scale-125 relative group py-2"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#c49e4e] to-[#9e7642] group-hover:w-full transition-all duration-500 rounded-full"></span>
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/auth/signin" className="text-sm font-semibold leading-6 text-[#c49e4e] hover:text-[#9e7642] transition-colors">
            Sign in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#232829] animate-slideDown">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-[#bac1bf] hover:bg-[#44321b] hover:text-[#c49e4e] transition-all duration-300 hover:translate-x-2 animate-slideDown"
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/auth/signin"
              className="block rounded-md px-3 py-2 text-base font-medium text-[#bac1bf] hover:bg-[#44321b] hover:text-[#c49e4e] transition-all duration-300 hover:translate-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
    </>
  )
}
