'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdPhoneIphone, 
  MdAccessTime, 
  MdLocationOn, 
  MdCameraAlt, 
  MdMovie,
  MdOutlineTune,
  MdShield,
  MdChevronRight
} from 'react-icons/md';
import { 
  FiCpu, 
  FiSliders, 
  FiLock, 
  FiCheckCircle, 
  FiLayers,
  FiZap,
  FiChevronDown
} from 'react-icons/fi';

type CategoryFilter = 'all' | 'sensor' | 'metadata' | 'security';

interface BenefitItem {
  id: string;
  category: 'sensor' | 'metadata' | 'security';
  title: string;
  subtitle: string;
  description: string;
  technicalDetails: string[];
  icon: React.ElementType;
  badge: string;
  accentColor: string;
  iconBg: string;
}

const benefitsData: BenefitItem[] = [
  {
    id: 'device-sensor',
    category: 'sensor',
    title: 'Hardware Sensor Emulation',
    subtitle: 'Sony IMX & Samsung ISOCELL profiles',
    description: 'Inject accurate focal lengths, sensor dimensions (1/1.28", 1/1.3"), and authentic CFA color filter arrays to match genuine smartphone cameras.',
    technicalDetails: [
      'ExifIFD:FocalLengthIn35mmFormat',
      'True aperture values (ƒ/1.78, ƒ/2.2)',
      'Native ISO gain curves & sensor dither'
    ],
    icon: MdCameraAlt,
    badge: 'Hardware Level',
    accentColor: '#31AAA9',
    iconBg: 'rgba(49, 170, 169, 0.12)',
  },
  {
    id: 'timestamps',
    category: 'metadata',
    title: 'Temporal Desync & Timestamps',
    subtitle: 'Wipe CapCut & Premiere render clocks',
    description: 'Completely overwrite creation, modification, and QuickTime mvhd atom timestamps with realistic shoot-time chronologies.',
    technicalDetails: [
      'CreationDate & ModificationDate sync',
      'Millisecond UTC offset matching local timezone',
      'Wipes Adobe/CapCut render encoder stamps'
    ],
    icon: MdAccessTime,
    badge: 'Anti-Detection',
    accentColor: '#A82020',
    iconBg: 'rgba(168, 32, 32, 0.10)',
  },
  {
    id: 'gps-spoof',
    category: 'metadata',
    title: 'Precision Geotag Synthesis',
    subtitle: 'Inject genuine GPS coordinates',
    description: 'Add authentic GPS latitude, longitude, altitude, and geodetic reference datums (WGS-84) indistinguishable from iOS CoreLocation tags.',
    technicalDetails: [
      'GPSLatitudeRef & GPSLongitudeRef tags',
      'Realistic GPSAltitude & GPSProcessingMethod',
      'Cupertino, Tokyo, NYC, London preset coordinates'
    ],
    icon: MdLocationOn,
    badge: 'Location Engine',
    accentColor: '#6C1A1A',
    iconBg: 'rgba(108, 26, 26, 0.10)',
  },
  {
    id: 'apple-prores',
    category: 'sensor',
    title: 'ProRes & HEVC Container Masking',
    subtitle: 'Pristine 10-bit color profile',
    description: 'Support for high-bitrate video formats including MP4, MOV, and WebM, with authentic QuickTime atoms without destructive re-encoding.',
    technicalDetails: [
      'Zero loss remux via WebAssembly & FFmpeg',
      'BT.709 and BT.2020 color primary tagging',
      'Native Apple hvc1 / hev1 fourcc atom tagging'
    ],
    icon: MdMovie,
    badge: 'Lossless Remux',
    accentColor: '#31AAA9',
    iconBg: 'rgba(49, 170, 169, 0.12)',
  },
  {
    id: 'device-models',
    category: 'sensor',
    title: 'Multi-Device Camera Models',
    subtitle: 'iPhone 16 Pro to Galaxy S24 Ultra',
    description: 'Choose from dozens of verified device configurations including Apple, Samsung, Xiaomi, Huawei, Google Pixel, and Cinema bodies.',
    technicalDetails: [
      'TIFF:Make & TIFF:Model tags',
      'Software build version strings (e.g. 22C150)',
      'LensModel specific identification keys'
    ],
    icon: MdPhoneIphone,
    badge: '50+ Devices',
    accentColor: '#A82020',
    iconBg: 'rgba(168, 32, 32, 0.10)',
  },
  {
    id: 'privacy-shield',
    category: 'security',
    title: 'Client-Side Privacy Sandbox',
    subtitle: 'Your source media stays confidential',
    description: 'Video metadata manipulation and preview rendering are computed locally in your browser sandbox with end-to-end privacy for your media.',
    technicalDetails: [
      'Local WebAssembly processing pipeline',
      'No permanent server storage of source drafts',
      'Cryptographically scrubbed metadata logs'
    ],
    icon: MdShield,
    badge: 'Zero-Knowledge',
    accentColor: '#6C1A1A',
    iconBg: 'rgba(108, 26, 26, 0.10)',
  },
];

export default function Benefits() {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredBenefits = filter === 'all' 
    ? benefitsData 
    : benefitsData.filter(item => item.category === filter);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const filterTabs = [
    { id: 'all' as CategoryFilter, label: 'All', icon: FiLayers },
    { id: 'sensor' as CategoryFilter, label: 'Sensors', icon: FiCpu },
    { id: 'metadata' as CategoryFilter, label: 'EXIF & GPS', icon: FiSliders },
    { id: 'security' as CategoryFilter, label: 'Privacy', icon: FiLock },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header — Minimal */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/[0.06] text-[#180606] shadow-sm text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#31AAA9]" />
            <span>Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-[2.75rem] font-black text-[#180606] tracking-tight leading-tight mb-3">
            Engineered for{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A82020] to-[#31AAA9]">
              Creators
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
            Every camera signature is mathematically calibrated to mirror real optical sensors.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center mb-8">
          <div className="apple-segmented-bar">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`apple-segmented-item flex items-center gap-1.5 ${
                    filter === tab.id ? 'apple-segmented-active' : 'apple-segmented-inactive'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Cards Grid — iOS Grouped Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredBenefits.map((benefit) => {
              const Icon = benefit.icon;
              const isExpanded = expandedId === benefit.id;

              return (
                <motion.div
                  key={benefit.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="ios-section p-5 text-left flex flex-col justify-between cursor-pointer group active:scale-[0.99] transition-transform"
                  onClick={() => toggleExpand(benefit.id)}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: benefit.iconBg, color: benefit.accentColor }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-black/[0.03] text-gray-500 uppercase tracking-wider">
                        {benefit.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#180606] mb-0.5 leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-3">
                      {benefit.subtitle}
                    </p>

                    {/* Only show full description when expanded */}
                    {!isExpanded && (
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                        {benefit.description}
                      </p>
                    )}
                  </div>

                  {/* Expandable Technical Details */}
                  <div>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-3 space-y-2"
                      >
                        <p className="text-gray-500 text-xs leading-relaxed mb-3">
                          {benefit.description}
                        </p>

                        <div className="p-3 rounded-xl bg-[#F7F6F3] space-y-1.5">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Injected Parameters</p>
                          {benefit.technicalDetails.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-600">
                              <FiCheckCircle className="w-3 h-3 text-[#31AAA9] flex-shrink-0" />
                              <span className="font-mono truncate">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-400">{isExpanded ? 'Collapse' : 'View specs'}</span>
                      <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-black/[0.04] shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#31AAA9] animate-pulse" />
              250,000+ videos masked
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <span className="text-sm font-bold text-[#180606]">0 Platform Rejections</span>
          </div>
        </div>

      </div>
    </section>
  );
}
