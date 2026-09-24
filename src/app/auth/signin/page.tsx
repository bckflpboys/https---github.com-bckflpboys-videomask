'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { FiMail, FiLock, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF9F6] via-white to-[#F5F2EB] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#31AAA9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#A82020]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back navigation */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.08] text-xs font-semibold text-gray-700 hover:text-black transition-all shadow-xs"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="apple-card p-8 sm:p-10 space-y-6 shadow-[0_20px_50px_rgba(24,6,6,0.08)] bg-white/90">
          
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#180606] tracking-tight">
              Sign in to Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Access your cloaked videos, device profiles, and API keys
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#F8F7F3] border border-black/10 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#31AAA9] focus:outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#F8F7F3] border border-black/10 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-[#31AAA9] focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-2xl bg-[#A82020]/10 border border-[#A82020]/20 text-[#A82020] text-xs font-semibold flex items-center gap-2">
                <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary !py-3.5 !rounded-full text-xs sm:text-sm shadow-md"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Signing in...</span>
                  </span>
                ) : (
                  'Sign In to VideoMask'
                )}
              </button>
            </div>
          </form>

          <div className="text-center pt-4 border-t border-black/[0.05]">
            <p className="text-xs text-gray-500">
              New to VideoMask?{' '}
              <Link href="/auth/signup" className="font-bold text-[#A82020] hover:underline">
                Create free account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
