import { Mail, MapPin, Phone, Award, Users, Trophy } from "lucide-react";
import LichessProfileCard from "@/components/lichess/LichessProfileCard";
import ScrollToTop from "@/components/ScrollToTop";

export default function AboutPage() {
  const instructors = [
    {
      name: "IM Sarah Johnson",
      title: "Head Coach & Founder",
      lichessUsername: "penguingim1"
    },
    {
      name: "FM Michael Chen",
      title: "Senior Instructor",
      lichessUsername: "DrNykterstein"
    },
    {
      name: "Alexandra Rodriguez",
      title: "Youth Development Coach",
      lichessUsername: "Hikaru"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">About Smart Chess Academy</h1>
            <p className="text-xl text-[#c49e4e]">
              Expert coaching for chess players of all levels
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#c49e4e] to-[#9e7642] text-white mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-[#232829]">15+ Years</h3>
              <p className="text-[#5a605a] mt-2">Teaching Experience</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#c49e4e] to-[#9e7642] text-white mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-[#232829]">500+</h3>
              <p className="text-[#5a605a] mt-2">Students Taught</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#c49e4e] to-[#9e7642] text-white mb-4">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-[#232829]">100+</h3>
              <p className="text-[#5a605a] mt-2">Tournament Winners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-[#232829]">Our Instructors</h2>
            <p className="mt-4 text-lg text-[#5a605a]">
              Learn from titled players and experienced coaches
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {instructors.map((instructor) => (
              <div key={instructor.name} className="bg-[#faf9f7] rounded-lg p-6 border border-[#bac1bf]/30 hover:border-[#c49e4e]/50 transition-all hover:shadow-lg">
                <div className="h-32 w-32 mx-auto bg-gradient-to-br from-[#c49e4e] to-[#9e7642] rounded-full mb-4 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {instructor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-[#232829] text-center mb-1">{instructor.name}</h3>
                <p className="text-[#c49e4e] text-center mb-4 font-medium">{instructor.title}</p>
                {instructor.lichessUsername && (
                  <div className="mt-4">
                    <LichessProfileCard username={instructor.lichessUsername} compact />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-[#232829]">Visit Us</h2>
            <p className="mt-4 text-lg text-[#5a605a]">
              Come check out our academy
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="h-96 rounded-lg overflow-hidden shadow-lg border border-[#bac1bf]/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4221.475241914964!2d10.604761118860447!3d35.834953193019395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd8b0022f2b0c1%3A0xaf19e7f36335fb58!2sSmart%20chess%20academy!5e0!3m2!1sen!2stn!4v1765465704015!5m2!1sen!2stn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="flex items-start gap-4 bg-white p-6 rounded-lg border border-[#bac1bf]/30">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#c49e4e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#232829] mb-1">Address</h3>
                  <p className="text-[#5a605a]">Sahloul 4<br />Sousse, Tunisia</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-lg border border-[#bac1bf]/30">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-[#c49e4e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#232829] mb-1">Email</h3>
                  <a href="mailto:Smartchessacademytunisie@gmail.com" className="text-[#5a605a] hover:text-[#c49e4e] transition-colors break-all">
                    Smartchessacademytunisie@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-lg border border-[#bac1bf]/30">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-[#c49e4e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#232829] mb-1">Phone</h3>
                  <a href="tel:+21621678900" className="text-[#5a605a] hover:text-[#c49e4e] transition-colors">
                    +216 21 678 900
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
}
