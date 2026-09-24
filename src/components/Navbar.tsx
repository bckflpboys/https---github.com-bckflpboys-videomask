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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Apple Glass Navigation Bar */}
        <div className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 bg-white/85 backdrop-blur-2xl rounded-full border border-black/[0.08] shadow-[0_8px_30px_rgba(24,6,6,0.06)] transition-all">
          
          {/* Brand Logo & Version Pill */}
          <div className="flex items-center gap-3">
            <Logo withLink href="/" size="md" />
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#180606]/5 border border-black/5 text-[10px] font-semibold text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-[#31AAA9] animate-pulse" />
              <span>v2.4 Pro</span>
            </div>
          </div>

          {/* Desktop Center Segmented Navigation */}
          <nav className="hidden md:flex items-center bg-[#F2F1ED] p-1 rounded-full border border-black/[0.05]">
            <Link 
              href="/#studio" 
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-black hover:bg-white/80 transition-all"
            >
              <MdCameraAlt className="w-3.5 h-3.5 text-[#31AAA9]" />
              <span>Studio</span>
            </Link>
            <Link 
              href="/#features" 
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-black hover:bg-white/80 transition-all"
            >
              <FiSliders className="w-3.5 h-3.5 text-[#A82020]" />
              <span>Features</span>
            </Link>
            <Link 
              href="/#pricing" 
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-black hover:bg-white/80 transition-all"
            >
              <FiTag className="w-3.5 h-3.5 text-[#6C1A1A]" />
              <span>Pricing</span>
            </Link>
            <Link 
              href="/upload" 
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-black hover:bg-white/80 transition-all"
            >
              <FiUploadCloud className="w-3.5 h-3.5 text-[#31AAA9]" />
              <span>Cloak Batch</span>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {session ? (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10 text-xs font-semibold text-[#180606] hover:border-[#31AAA9] transition-all shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#A82020] to-[#31AAA9] text-white flex items-center justify-center text-[10px] font-bold">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 rounded-full text-gray-500 hover:text-[#A82020] hover:bg-black/5 transition-all"
                  title="Sign Out"
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/auth/signin" 
                  className="px-4 py-2 text-xs font-semibold text-gray-700 hover:text-black transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="btn-primary !px-5 !py-2 text-xs !rounded-full shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {session ? (
              <Link
                href="/dashboard"
                className="w-8 h-8 rounded-full bg-[#180606] text-[#F8E0A4] text-xs font-bold flex items-center justify-center border border-[#F8E0A4]/40"
              >
                {session.user?.name?.[0] || 'U'}
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="px-3.5 py-1.5 rounded-full bg-[#180606] text-white text-xs font-semibold"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-sm pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-5 border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.15)] space-y-2">
            <Link
              href="/#studio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-800 hover:bg-[#FAF9F6] transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-[#31AAA9]/15 text-[#31AAA9] flex items-center justify-center">
                <MdCameraAlt className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-none">Studio Cloak</p>
                <p className="text-[11px] text-gray-500 font-normal mt-1">Interactive camera simulation</p>
              </div>
            </Link>

            <Link
              href="/#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-800 hover:bg-[#FAF9F6] transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-[#A82020]/15 text-[#A82020] flex items-center justify-center">
                <FiSliders className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-none">Features</p>
                <p className="text-[11px] text-gray-500 font-normal mt-1">EXIF injection & temporal shift</p>
              </div>
            </Link>

            <Link
              href="/#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-800 hover:bg-[#FAF9F6] transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-[#F8E0A4]/40 text-[#6C1A1A] flex items-center justify-center">
                <FiTag className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-none">Plans & Pricing</p>
                <p className="text-[11px] text-gray-500 font-normal mt-1">Creator & enterprise licenses</p>
              </div>
            </Link>

            <Link
              href="/upload"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-gray-800 hover:bg-[#FAF9F6] transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-[#31AAA9]/15 text-[#31AAA9] flex items-center justify-center">
                <FiUploadCloud className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-none">Batch Upload</p>
                <p className="text-[11px] text-gray-500 font-normal mt-1">Queue & process multiple files</p>
              </div>
            </Link>

            <div className="pt-2 border-t border-gray-100 flex gap-2">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 btn-secondary !py-2.5 text-xs text-center justify-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:text-[#A82020]"
                  >
                    <FiLogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 btn-secondary !py-2.5 text-xs text-center justify-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 btn-primary !py-2.5 text-xs text-center justify-center"
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
