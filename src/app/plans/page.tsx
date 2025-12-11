import Link from "next/link";
import { Check } from "lucide-react";

export default function PlansPage() {
  const plans = [
    {
      name: "Bronze",
      price: "$49",
      period: "per month",
      description: "Perfect for beginners starting their chess journey",
      features: [
        "2 group lessons per week",
        "Access to online learning materials",
        "Community forum access",
        "Monthly progress reports",
        "Basic opening repertoire guide"
      ],
      cta: "Get Started",
      featured: false
    },
    {
      name: "Silver",
      price: "$99",
      period: "per month",
      description: "Ideal for intermediate players looking to advance",
      features: [
        "1 private lesson per week",
        "2 group lessons per week",
        "Advanced training materials",
        "Game analysis service",
        "Tournament preparation",
        "Custom opening repertoire",
        "Priority forum support"
      ],
      cta: "Most Popular",
      featured: true
    },
    {
      name: "Gold",
      price: "$199",
      period: "per month",
      description: "Comprehensive program for serious competitive players",
      features: [
        "2 private lessons per week",
        "Unlimited group lessons",
        "Premium training content",
        "Detailed game analysis",
        "Tournament coaching",
        "Custom study plans",
        "24/7 instructor support",
        "Competition entry assistance",
        "Mental training sessions"
      ],
      cta: "Go Premium",
      featured: false
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#232829] via-[#44321b] to-[#232829] text-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Programs & Pricing</h1>
            <p className="mt-6 text-lg leading-8 text-[#bac1bf]">
              Choose the perfect plan to match your chess goals and commitment level
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-2xl ${
                  plan.featured
                    ? 'bg-gradient-to-br from-[#c49e4e] to-[#9e7642] text-white ring-4 ring-[#c49e4e] scale-105 shadow-2xl'
                    : 'bg-white text-[#232829] ring-1 ring-[#bac1bf]/30 hover:ring-[#c49e4e]/50 transition-all'
                } shadow-lg`}
              >
                <div className="p-8">
                  {plan.featured && (
                    <div className="mb-4">
                      <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
                        {plan.cta}
                      </span>
                    </div>
                  )}
                  <h3 className={`text-2xl font-bold ${plan.featured ? 'text-white' : 'text-[#232829]'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mt-4 text-sm ${plan.featured ? 'text-white/90' : 'text-[#5a605a]'}`}>
                    {plan.description}
                  </p>
                  <p className="mt-6">
                    <span className={`text-4xl font-bold tracking-tight ${plan.featured ? 'text-white' : 'text-[#232829]'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm font-semibold ${plan.featured ? 'text-white/80' : 'text-[#5a605a]'}`}>
                      {' '}/{plan.period}
                    </span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check className={`h-6 w-5 flex-none ${plan.featured ? 'text-white/90' : 'text-[#c49e4e]'}`} />
                        <span className={`text-sm ${plan.featured ? 'text-white/90' : 'text-[#5a605a]'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0 mt-auto">
                  <Link
                    href="/contact"
                    className={`block w-full rounded-md px-6 py-3 text-center text-sm font-semibold shadow-sm transition-colors ${
                      plan.featured
                        ? 'bg-white text-[#c49e4e] hover:bg-gray-100'
                        : 'bg-[#c49e4e] text-white hover:bg-[#9e7642]'
                    }`}
                  >
                    {plan.featured ? plan.cta : 'Enroll Now'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-sm border border-[#bac1bf]/30">
            <h3 className="text-2xl font-bold text-[#232829] mb-4">What's Included in All Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#5a605a]">
              <div>
                <p className="mb-2">✓ Access to interactive chess articles and lessons</p>
                <p className="mb-2">✓ Community forum participation</p>
                <p className="mb-2">✓ Monthly chess tournaments</p>
              </div>
              <div>
                <p className="mb-2">✓ Progress tracking dashboard</p>
                <p className="mb-2">✓ Study material library</p>
                <p className="mb-2">✓ Certificate upon completion</p>
              </div>
            </div>
          </div>

          {/* FAQ or Note */}
          <div className="mt-12 text-center">
            <p className="text-[#5a605a]">
              Not sure which plan is right for you?{' '}
              <Link href="/contact" className="text-[#c49e4e] hover:text-[#9e7642] font-medium transition-colors">
                Contact us
              </Link>
              {' '}for a free consultation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
