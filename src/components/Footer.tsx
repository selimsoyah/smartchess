'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Mail } from 'lucide-react'
import ChessKnightLogo from './ChessKnightLogo'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Thanks for subscribing!')
        setEmail('')
      } else {
        setMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-[#232829] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* About Section */}
          <div className="animate-slideUp">
            <div className="flex items-center gap-3 mb-4 group">
              <ChessKnightLogo className="w-12 h-12 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
              <h3 className="text-lg font-semibold">Smart Chess Academy</h3>
            </div>
            <p className="text-[#bac1bf] text-sm">
              Elevating chess players of all levels through expert coaching, 
              structured programs, and a supportive community.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/profile.php?id=61575530577638" target="_blank" rel="noopener noreferrer" className="text-[#bac1bf] hover:text-[#c49e4e] hover:scale-125 transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/smart.chessacademy/" target="_blank" rel="noopener noreferrer" className="text-[#bac1bf] hover:text-[#c49e4e] hover:scale-125 transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:Smartchessacademytunisie@gmail.com" className="text-[#bac1bf] hover:text-[#c49e4e] hover:scale-125 transition-all duration-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slideUp delay-100">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/plans" className="text-[#bac1bf] hover:text-[#c49e4e] hover:translate-x-2 inline-block transition-all duration-300">Programs & Pricing</Link></li>
              <li><Link href="/articles" className="text-[#bac1bf] hover:text-[#c49e4e] hover:translate-x-2 inline-block transition-all duration-300">Chess Articles</Link></li>
              <li><Link href="/forum" className="text-[#bac1bf] hover:text-[#c49e4e] hover:translate-x-2 inline-block transition-all duration-300">Community Forum</Link></li>
              <li><Link href="/about" className="text-[#bac1bf] hover:text-[#c49e4e] hover:translate-x-2 inline-block transition-all duration-300">About Us</Link></li>
              <li><Link href="/contact" className="text-[#bac1bf] hover:text-[#c49e4e] hover:translate-x-2 inline-block transition-all duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-slideUp delay-200">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-[#bac1bf] text-sm mb-4">
              Subscribe to our newsletter for chess tips, news, and academy updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 rounded bg-[#44321b] text-white border border-[#745832] focus:border-[#c49e4e] focus:outline-none focus:ring-2 focus:ring-[#c49e4e] placeholder:text-[#bac1bf]/60 transition-all duration-300"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-[#c49e4e] hover:bg-[#9e7642] hover:scale-105 rounded font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-[#232829] shadow-md hover:shadow-lg"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
              {message && (
                <p className={`text-sm animate-slideDown ${message.includes('Thanks') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#44321b] text-center text-sm text-[#bac1bf] animate-fadeIn">
          <p>&copy; {new Date().getFullYear()} Smart Chess Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
