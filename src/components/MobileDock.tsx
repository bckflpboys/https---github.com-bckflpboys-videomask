'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FiHome, FiVideo, FiSliders, FiUser, FiUploadCloud } from 'react-icons/fi';
import { MdCameraAlt } from 'react-icons/md';

export default function MobileDock() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { label: 'Home', href: '/', icon: FiHome, isActive: pathname === '/' },
    { label: 'Studio', href: '/#studio', icon: MdCameraAlt, isActive: pathname === '/#studio' },
    { label: 'Upload', href: '/upload', icon: FiUploadCloud, isActive: pathname === '/upload', highlight: true },
    { label: 'Features', href: '/#features', icon: FiSliders, isActive: pathname === '/#features' },
    { 
      label: session ? 'Account' : 'Sign In', 
      href: session ? '/dashboard' : '/auth/signin', 
      icon: FiUser, 
      isActive: pathname.startsWith('/dashboard') || pathname.startsWith('/auth') 
    },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden pointer-events-none">
      <div className="mx-auto max-w-sm pointer-events-auto">
        <nav className="flex items-center justify-around px-2 py-2 bg-white/90 backdrop-blur-2xl rounded-2xl border border-black/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 active:scale-[0.92] ${
                  item.highlight
                    ? 'text-white'
                    : item.isActive
                    ? 'text-[#31AAA9]'
                    : 'text-gray-400 hover:text-[#180606]'
                }`}
              >
                {item.highlight ? (
                  <div className="w-11 h-11 -mt-5 rounded-2xl bg-gradient-to-br from-[#31AAA9] to-[#208382] shadow-[0_4px_16px_rgba(49,170,169,0.4)] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <>
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] font-semibold mt-0.5 tracking-tight">
                      {item.label}
                    </span>
                    {item.isActive && (
                      <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#31AAA9]" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
