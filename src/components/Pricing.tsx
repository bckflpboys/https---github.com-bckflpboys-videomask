'use client';

import Link from 'next/link';

interface PlanFeature {
  id: string;
  text: string;
}

interface Plan {
  name: string;
  price: string;
  period?: string;
  features: PlanFeature[];
  cta: string;
  popular: boolean;
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    features: [
      { id: 'free-1', text: 'Upload up to 5 videos per month' },
      { id: 'free-2', text: 'Basic metadata editing' },
      { id: 'free-3', text: 'Standard quality exports' },
      { id: 'free-4', text: 'Community support' }
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    features: [
      { id: 'pro-1', text: 'Upload up to 50 videos per month' },
      { id: 'pro-2', text: 'Advanced metadata editing' },
      { id: 'pro-3', text: 'HD quality exports' },
      { id: 'pro-4', text: 'Priority support' },
      { id: 'pro-5', text: 'Custom device profiles' },
      { id: 'pro-6', text: 'Batch processing' }
    ],
    cta: 'Start Pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      { id: 'ent-1', text: 'Unlimited video uploads' },
      { id: 'ent-2', text: 'Advanced metadata editing' },
      { id: 'ent-3', text: '4K quality exports' },
      { id: 'ent-4', text: 'Dedicated support' },
      { id: 'ent-5', text: 'Custom device profiles' },
      { id: 'ent-6', text: 'API access' },
      { id: 'ent-7', text: 'Custom integration' }
    ],
    cta: 'Contact Us',
    popular: false
  }
];

export default function Pricing() {
  return (
    <section className="py-24 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <div className="text-xl text-gray-600">
            Choose the perfect plan for your needs
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                    Popular
                  </span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className={`block w-full py-3 px-6 text-center rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
