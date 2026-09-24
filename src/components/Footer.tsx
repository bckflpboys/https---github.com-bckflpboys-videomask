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
  FiActivity
} from 'react-icons/fi';
import { MdCameraAlt } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-[#140505] text-gray-400 border-t border-[#6C1A1A]/40 relative overflow-hidden pb-20 md:pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#31AAA9]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#A82020]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Status Bar in Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-12 mb-12 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <Logo withLink href="/" size="md" theme="dark" />
            <span className="hidden sm:inline-block text-xs font-semibold text-gray-500">
              | Next-Gen EXIF & Optical Sensor Emulation
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#31AAA9] animate-pulse" />
            <span className="text-gray-300 font-medium">All 50+ Hardware Sensors Operational</span>
            <span className="text-[10px] text-[#F8E0A4] font-mono">99.98% SLA</span>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left mb-12">
          
          <div>
            <h4 className="text-xs font-bold text-[#F8E0A4] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <MdCameraAlt className="w-3.5 h-3.5 text-[#31AAA9]" />
              <span>Studio & Engine</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#studio" className="hover:text-white transition-colors">
                  Studio Cloak
                </Link>
              </li>
              <li>
                <Link href="/upload" className="hover:text-white transition-colors">
                  Batch Video Cloak
                </Link>
              </li>
              <li>
                <Link href="/#studio" className="hover:text-white transition-colors">
                  EXIF Tree Inspector
                </Link>
              </li>
              <li>
                <Link href="/#studio" className="hover:text-white transition-colors">
                  Device Sensor Library
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#F8E0A4] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <FiSliders className="w-3.5 h-3.5 text-[#A82020]" />
              <span>Features</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  Sensor Noise Calibration
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  GPS & Geotag Synthesis
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  Temporal Timestamp Shift
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  Algorithm Detection Shield
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#F8E0A4] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <FiTag className="w-3.5 h-3.5 text-[#6C1A1A]" />
              <span>Plans & Access</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Starter (Free)
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Pro Creator ($9/mo)
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Studio Enterprise
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Member Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#F8E0A4] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <FiLock className="w-3.5 h-3.5 text-[#31AAA9]" />
              <span>Trust & Privacy</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Sandbox Guarantee
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Zero Data Retention
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} VideoMask Studio. Designed with Apple human interface standards.</p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Pure WebAssembly • 0 Server Re-encoding</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
