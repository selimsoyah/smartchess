'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import ScrollToTop from '@/components/ScrollToTop'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! We\'ll get back to you soon.' })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
            <p className="mt-6 text-lg leading-8 text-[#bac1bf]">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-[#bac1bf]/30">
              <h2 className="text-2xl font-bold text-[#232829] mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#232829] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#232829] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#232829] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#232829] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-[#bac1bf] rounded-md focus:ring-2 focus:ring-[#c49e4e] focus:border-transparent text-[#232829]"
                  />
                </div>

                {status && (
                  <div className={`p-4 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#c49e4e] text-white rounded-md font-medium hover:bg-[#9e7642] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#232829] mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#c49e4e]/10">
                      <Mail className="h-6 w-6 text-[#c49e4e]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#232829] mb-1">Email</h3>
                    <p className="text-[#5a605a] break-all">Smartchessacademytunisie@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#c49e4e]/10">
                      <Phone className="h-6 w-6 text-[#c49e4e]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#232829] mb-1">Phone</h3>
                    <p className="text-[#5a605a]">+216 21 678 900</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#c49e4e]/10">
                      <MapPin className="h-6 w-6 text-[#c49e4e]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#232829] mb-1">Location</h3>
                    <p className="text-[#5a605a]">Sahloul 4</p>
                    <p className="text-[#5a605a]">Sousse, Tunisia</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white rounded-lg shadow-sm p-6 border border-[#bac1bf]/30">
                <h3 className="font-semibold text-[#232829] mb-3">Operating Hours</h3>
                <div className="space-y-2 text-sm text-[#5a605a]">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  )
}
