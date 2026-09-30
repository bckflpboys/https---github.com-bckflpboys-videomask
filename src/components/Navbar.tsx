'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Logo from '@/components/Logo';
import { 
  FiSliders, 
  FiTag, 
  FiUploadCloud, 
  FiUser, 
  FiLogOut, 
  FiGrid, 
  FiMenu, 
  FiX, 
  FiShield,
  FiPlay
} from 'react-icons/fi';
import { MdCameraAlt } from 'react-icons/md';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Floating Glass Navbar — Pill Shape */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-white/80 backdrop-blur-2xl rounded-2xl border border-black/[0.05] shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all">
          
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <Logo withLink href="/" size="md" withSubtitle={false} />
          </div>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F2F1ED] p-1 rounded-xl border border-black/[0.04]">
            <Link 
              href="/#studio" 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] text-[13px] font-semibold text-gray-600 hover:text-black hover:bg-white/80 transition-all"
            >
              <MdCameraAlt className="w-3.5 h-3.5 text-[#31AAA9]" />
              Studio
            </Link>
            <Link 
              href="/#features" 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] text-[13px] font-semibold text-gray-600 hover:text-black hover:bg-white/80 transition-all"
            >
              <FiSliders className="w-3.5 h-3.5 text-[#A82020]" />
              Features
            </Link>
            <Link 
              href="/#pricing" 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] text-[13px] font-semibold text-gray-600 hover:text-black hover:bg-white/80 transition-all"
            >
              <FiTag className="w-3.5 h-3.5 text-[#6C1A1A]" />
              Pricing
            </Link>
            <Link 
              href="/upload" 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] text-[13px] font-semibold text-gray-600 hover:text-black hover:bg-white/80 transition-all"
            >
              <FiUploadCloud className="w-3.5 h-3.5 text-[#31AAA9]" />
              Batch
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <div className="flex items-center gap-2">
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F7F6F3] text-[13px] font-semibold text-[#180606] hover:bg-gray-200/70 transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#A82020] to-[#31AAA9] text-white flex items-center justify-center text-[10px] font-bold">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 rounded-xl text-gray-400 hover:text-[#A82020] hover:bg-[#A82020]/5 transition-all"
                  title="Sign Out"
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/auth/signin" 
                  className="px-4 py-2 text-[13px] font-semibold text-gray-600 hover:text-black transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="btn-primary !px-4 !py-2 text-[13px] !rounded-xl"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-2">
            {session ? (
              <Link
                href="/dashboard"
                className="w-8 h-8 rounded-xl bg-[#180606] text-[#F8E0A4] text-xs font-bold flex items-center justify-center"
              >
                {session.user?.name?.[0] || 'U'}
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="px-3 py-1.5 rounded-xl bg-[#180606] text-white text-xs font-semibold"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer — iOS Sheet Style */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-4 border border-black/[0.05] shadow-[0_8px_40px_rgba(0,0,0,0.12)] space-y-1">
            {[
              { href: '/#studio', icon: MdCameraAlt, iconBg: 'bg-[#31AAA9]/10', iconColor: 'text-[#31AAA9]', label: 'Studio Cloak', sub: 'Camera simulation' },
              { href: '/#features', icon: FiSliders, iconBg: 'bg-[#A82020]/10', iconColor: 'text-[#A82020]', label: 'Features', sub: 'EXIF & temporal shift' },
              { href: '/#pricing', icon: FiTag, iconBg: 'bg-[#F8E0A4]/30', iconColor: 'text-[#6C1A1A]', label: 'Pricing', sub: 'Plans & access' },
              { href: '/upload', icon: FiUploadCloud, iconBg: 'bg-[#31AAA9]/10', iconColor: 'text-[#31AAA9]', label: 'Batch Upload', sub: 'Queue multiple files' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-[#180606] hover:bg-[#F7F6F3] transition-all active:scale-[0.98]"
                >
                  <div className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="leading-none text-[13px]">{item.label}</p>
                    <p className="text-[11px] text-gray-400 font-normal mt-0.5">{item.sub}</p>
                  </div>
                </Link>
              );
            })}

            <div className="pt-3 border-t border-black/[0.04] flex gap-2">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2.5 text-center text-[13px] font-semibold bg-[#F7F6F3] text-[#180606] rounded-xl"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="p-2.5 rounded-xl bg-[#F7F6F3] text-gray-500 hover:text-[#A82020]"
                  >
                    <FiLogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2.5 text-center text-[13px] font-semibold bg-[#F7F6F3] text-[#180606] rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 btn-primary !py-2.5 text-[13px] text-center justify-center !rounded-xl"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
