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
    <section className="py-24 bg-gradient-to-b from-[#FAF9F6] to-white relative overflow-hidden" id="pricing">
      {/* Subtle ambient lighting */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-[#31AAA9]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#F8E0A4]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[#180606] shadow-xs text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#31AAA9]" />
            <span>Transparent Licensing</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#180606] tracking-tight">
            Designed for Solo Creators & Global Studios
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your posting volume. Zero lock-in, cancel anytime with one click.
          </p>

          {/* Billing Switcher */}
          <div className="pt-3 flex justify-center">
            <div className="apple-segmented-bar p-1 shadow-xs">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`apple-segmented-item ${
                  billingCycle === 'monthly' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`apple-segmented-item flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#31AAA9]/15 text-[#31AAA9]">
                  SAVE 25%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`relative rounded-[32px] flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#31AAA9] shadow-[0_20px_50px_rgba(49,170,169,0.18)] scale-102 sm:scale-105 z-10'
                    : 'apple-card p-8'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-[11px] font-bold bg-[#180606] text-[#F8E0A4] border border-[#F8E0A4]/40 shadow-md uppercase tracking-wider">
                      <FiStar className="w-3 h-3 text-[#31AAA9] fill-[#31AAA9]" />
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div className={`h-full flex flex-col justify-between ${plan.popular ? 'p-8' : ''}`}>
                  <div>
                    <h3 className="text-xl font-bold text-[#180606]">{plan.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 mb-6 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Price display */}
                    <div className="flex items-baseline mb-6 pb-6 border-b border-black/[0.06]">
                      <span className="text-4xl sm:text-5xl font-black text-[#180606] tracking-tight">
                        {price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-500 text-xs font-semibold ml-2">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-3.5 mb-8 text-left">
                      {plan.features.map((feature) => (
                        <li key={feature.id} className="flex items-start text-xs sm:text-sm text-gray-700">
                          <div className="w-5 h-5 rounded-full bg-[#31AAA9]/15 text-[#31AAA9] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <FiCheck className="w-3 h-3" />
                          </div>
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link
                      href={plan.popular ? "/auth/signup" : "/auth/signin"}
                      className={`block w-full py-3 px-6 text-center rounded-full font-bold text-xs sm:text-sm transition-all duration-200 ${
                        plan.popular
                          ? 'btn-primary'
                          : 'btn-secondary'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
