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
  FiZap 
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

  return (
    <section id="features" className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      {/* Subtle Apple Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#31AAA9]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#A82020]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[#180606] shadow-xs text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#31AAA9]" />
            <span>Architecture & Physics</span>
            <span className="text-gray-300">•</span>
            <span className="text-[#A82020] font-bold">100% Native Emulation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#180606] tracking-tight">
            Built Like an Apple Operating System.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A82020] via-[#C92A2A] to-[#31AAA9]">
              Engineered for Creators.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Every camera signature is mathematically calibrated to mirror real optical sensors, aperture mechanisms, and metadata atoms.
          </p>

          {/* Segmented Filter Pills */}
          <div className="pt-2 flex justify-center">
            <div className="apple-segmented-bar p-1">
              <button
                onClick={() => setFilter('all')}
                className={`apple-segmented-item flex items-center gap-1.5 ${
                  filter === 'all' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <FiLayers className="w-3.5 h-3.5" />
                <span>All Capabilities</span>
              </button>
              <button
                onClick={() => setFilter('sensor')}
                className={`apple-segmented-item flex items-center gap-1.5 ${
                  filter === 'sensor' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <FiCpu className="w-3.5 h-3.5" />
                <span>Sensors & Optics</span>
              </button>
              <button
                onClick={() => setFilter('metadata')}
                className={`apple-segmented-item flex items-center gap-1.5 ${
                  filter === 'metadata' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <FiSliders className="w-3.5 h-3.5" />
                <span>EXIF & GPS</span>
              </button>
              <button
                onClick={() => setFilter('security')}
                className={`apple-segmented-item flex items-center gap-1.5 ${
                  filter === 'security' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <FiLock className="w-3.5 h-3.5" />
                <span>Privacy Shield</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBenefits.map((benefit) => {
              const Icon = benefit.icon;
              const isExpanded = expandedId === benefit.id;

              return (
                <motion.div
                  key={benefit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="apple-card p-7 text-left flex flex-col justify-between group cursor-pointer"
                  onClick={() => toggleExpand(benefit.id)}
                >
                  <div>
                    {/* Header Row with Icon and Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: benefit.iconBg, color: benefit.accentColor }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/5 text-[#180606] uppercase tracking-wider">
                        {benefit.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#180606] mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 mb-3">
                      {benefit.subtitle}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Expandable Technical Details */}
                  <div>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 pt-3 border-t border-black/[0.06] space-y-1.5"
                      >
                        <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Injected Parameters:</p>
                        {benefit.technicalDetails.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 font-mono">
                            <FiCheckCircle className="w-3.5 h-3.5 text-[#31AAA9] flex-shrink-0" />
                            <span className="truncate">{detail}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-[#31AAA9]">
                      <span>{isExpanded ? 'Collapse specs' : 'Tap to expand specs'}</span>
                      <MdChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center p-1.5 bg-white border border-black/[0.08] rounded-full shadow-xs">
            <span className="px-4 py-1.5 text-xs text-gray-700 font-medium">
              Over 250,000+ videos masked for TikTok & Instagram
            </span>
            <span className="bg-[#180606] text-[#F8E0A4] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#31AAA9]" />
              0 Platform Rejections
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
