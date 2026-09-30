'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiCheck, FiZap, FiShield, FiStar } from 'react-icons/fi';

interface PlanFeature {
  id: string;
  text: string;
}

interface Plan {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  period?: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    monthlyPrice: '$0',
    annualPrice: '$0',
    period: 'forever',
    description: 'Perfect for casual creators testing the neural cloaking pipeline.',
    features: [
      { id: 'free-1', text: '10 video cloaks per month' },
      { id: 'free-2', text: 'Core device profiles (iPhone 15, S23 Ultra)' },
      { id: 'free-3', text: 'Lossless WebAssembly remux' },
      { id: 'free-4', text: '1080p & 4K 30fps export' },
      { id: 'free-5', text: 'Community forum support' }
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Pro Creator',
    monthlyPrice: '$12',
    annualPrice: '$9',
    period: '/month',
    badge: 'Most Popular',
    description: 'For serious social creators, agencies, and repost growth channels.',
    features: [
      { id: 'pro-1', text: '100 high-speed cloaks per month' },
      { id: 'pro-2', text: 'All 50+ camera profiles (iPhone 16 Pro, S24 Ultra)' },
      { id: 'pro-3', text: 'Custom GPS coordinates & city tagging' },
      { id: 'pro-4', text: 'CapCut & Premiere render stamp wiper' },
      { id: 'pro-5', text: '4K 60fps & ProRes HDR metadata pass' },
      { id: 'pro-6', text: 'Batch multi-file queue processing' },
      { id: 'pro-7', text: 'Priority direct support' }
    ],
    cta: 'Get Pro Access',
    popular: true
  },
  {
    name: 'Studio Enterprise',
    monthlyPrice: '$49',
    annualPrice: '$39',
    period: '/month',
    description: 'For media teams, automation agencies, and programmatic pipelines.',
    features: [
      { id: 'ent-1', text: 'Unlimited video masking & cloaking' },
      { id: 'ent-2', text: 'Full REST API & webhook callbacks' },
      { id: 'ent-3', text: 'Custom camera lens & sensor creation' },
      { id: 'ent-4', text: 'Bulk automated cloud rendering' },
      { id: 'ent-5', text: 'Audit logs & team seats (up to 10)' },
      { id: 'ent-6', text: 'Dedicated account engineer & SLA' }
    ],
    cta: 'Contact Studio Team',
    popular: false
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" id="pricing">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/[0.06] text-[#180606] shadow-sm text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#31AAA9]" />
            <span>Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-[2.75rem] font-black text-[#180606] tracking-tight leading-tight mb-3">
            Choose Your Plan
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto mb-6">
            Zero lock-in. Cancel anytime.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex">
            <div className="apple-segmented-bar">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`apple-segmented-item ${
                  billingCycle === 'monthly' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`apple-segmented-item flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <span>Annual</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#31AAA9]/15 text-[#31AAA9]">
                  -25%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards — iOS Grouped Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto items-start">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`relative ios-section overflow-hidden transition-all duration-400 ${
                  plan.popular
                    ? 'ring-2 ring-[#31AAA9] shadow-[0_8px_40px_rgba(49,170,169,0.12)] md:scale-[1.03] z-10'
                    : ''
                }`}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#31AAA9] to-[#208382]" />
                )}

                <div className="p-6 sm:p-7">
                  {/* Plan Name & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#180606]">{plan.name}</h3>
                    {plan.popular && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#31AAA9]/10 text-[#31AAA9] uppercase tracking-wider">
                        <FiStar className="w-3 h-3 fill-[#31AAA9]" />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline mb-1">
                    <span className="text-4xl font-black text-[#180606] tracking-tight">
                      {price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 text-sm font-medium ml-1.5">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-black/[0.04] mb-5" />

                  {/* Feature list */}
                  <ul className="space-y-3 mb-7">
                    {plan.features.map((feature) => (
                      <li key={feature.id} className="flex items-start text-sm text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-[#31AAA9]/10 text-[#31AAA9] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <FiCheck className="w-3 h-3" />
                        </div>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={plan.popular ? "/auth/signup" : "/auth/signin"}
                    className={`block w-full py-3 px-6 text-center rounded-2xl font-bold text-sm transition-all duration-300 active:scale-[0.98] ${
                      plan.popular
                        ? 'btn-primary'
                        : 'bg-[#F7F6F3] text-[#180606] hover:bg-gray-200/70'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
