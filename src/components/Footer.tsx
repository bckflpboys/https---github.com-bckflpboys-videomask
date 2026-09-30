'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { 
  FiShield, 
  FiSliders, 
  FiTag, 
  FiUploadCloud, 
  FiFileText, 
  FiLock, 
  FiHelpCircle,
  FiActivity,
  FiArrowUpRight
} from 'react-icons/fi';
import { MdCameraAlt } from 'react-icons/md';

export default function Footer() {
  const footerSections = [
    {
      title: 'Product',
      icon: MdCameraAlt,
      iconColor: 'text-[#31AAA9]',
      links: [
        { label: 'Studio Cloak', href: '/#studio' },
        { label: 'Batch Upload', href: '/upload' },
        { label: 'EXIF Inspector', href: '/#studio' },
        { label: 'Device Library', href: '/#studio' },
      ],
    },
    {
      title: 'Features',
      icon: FiSliders,
      iconColor: 'text-[#A82020]',
      links: [
        { label: 'Sensor Calibration', href: '/#features' },
        { label: 'GPS Synthesis', href: '/#features' },
        { label: 'Timestamp Shift', href: '/#features' },
        { label: 'Algorithm Shield', href: '/#features' },
      ],
    },
    {
      title: 'Plans',
      icon: FiTag,
      iconColor: 'text-[#6C1A1A]',
      links: [
        { label: 'Starter (Free)', href: '/#pricing' },
        { label: 'Pro Creator', href: '/#pricing' },
        { label: 'Enterprise', href: '/#pricing' },
        { label: 'Dashboard', href: '/dashboard' },
      ],
    },
    {
      title: 'Trust',
      icon: FiLock,
      iconColor: 'text-[#31AAA9]',
      links: [
        { label: 'Privacy Sandbox', href: '#' },
        { label: 'Zero Data Retention', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'API Docs', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0F0404] text-gray-400 relative overflow-hidden pb-24 md:pb-8">

      <div className="max-w-6xl mx-auto pt-16 pb-8 px-4 sm:px-6 relative z-10">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-10 mb-10 border-b border-white/[0.06] gap-4">
          <Logo withLink href="/" size="md" theme="dark" />

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#31AAA9] animate-pulse" />
            <span className="text-gray-300 font-medium">All Systems Operational</span>
            <span className="text-[10px] text-[#F8E0A4] font-mono ml-1">99.98%</span>
          </div>
        </div>

        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title}>
                <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${section.iconColor}`} />
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-gray-500 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                      >
                        {link.label}
                        <FiArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-600 gap-2">
          <p>© {new Date().getFullYear()} VideoMask Studio</p>
          <p className="text-gray-600">WebAssembly · Zero Server Re-encoding</p>
        </div>

      </div>
    </footer>
  );
}
