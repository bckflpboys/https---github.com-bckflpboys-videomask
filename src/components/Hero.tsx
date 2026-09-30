'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MdPhoneIphone, 
  MdLaptop, 
  MdPhoneAndroid,
  MdCameraAlt,
  MdLocationOn,
  MdOutlineShield,
  MdCheckCircle,
  MdOutlineTune
} from 'react-icons/md';
import { 
  FiUploadCloud, 
  FiSliders, 
  FiEye, 
  FiCpu, 
  FiCheck, 
  FiArrowRight, 
  FiPlay, 
  FiSmartphone,
  FiZap,
  FiActivity,
  FiShare2,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { SiXiaomi, SiHuawei, SiGooglechrome } from 'react-icons/si';
import { devicePresets, DevicePreset } from '@/lib/devicePresets';
import { uploadVideo } from '@/lib/uploadVideo';
import VideoPreview from '@/components/VideoPreview';
import IPhoneMockup from '@/components/IPhoneMockup';
import { useSession } from 'next-auth/react';

type StudioTab = 'studio' | 'inspector' | 'devices' | 'shield';

export default function Hero() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<StudioTab>('studio');
  const [selectedCategory, setSelectedCategory] = useState<DevicePreset['category']>('iPhone');
  const [selectedPreset, setSelectedPreset] = useState<DevicePreset | null>(devicePresets[0] || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const [highlightKey, setHighlightKey] = useState(0);
  const [showAllDevices, setShowAllDevices] = useState(false);

  // Quick Cloak toggles
  const [toggleGps, setToggleGps] = useState(true);
  const [toggleNoise, setToggleNoise] = useState(true);
  const [toggleTimestamp, setToggleTimestamp] = useState(true);

  const presets = devicePresets.filter(preset => preset.category === selectedCategory);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    if (!file.type.includes('video/')) {
      alert('Please upload a video file (MP4, MOV, WebM)');
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setShowPreview(true);
  };

  const handleUploadConfirm = async (processedFile: File) => {
    if (!processedFile) return;
    
    setShowPreview(false);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await uploadVideo(processedFile);
      
      if (result.success) {
        console.log('Upload successful:', result.data);
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setSelectedFile(null);
    }
  };

  const handleNonAuthUpload = () => {
    setShowSignUpPrompt(true);
    setHighlightKey(prev => prev + 1);
  };

  const handlePreviewCancel = () => {
    setShowPreview(false);
    setSelectedFile(null);
  };

  const loadSampleVideo = () => {
    // Royalty-free short vertical video for quick live demo in the iPhone
    setPreviewUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  };

  const categories = [
    { id: 'iPhone', name: 'iPhone', icon: MdPhoneIphone },
    { id: 'Samsung', name: 'Samsung', icon: MdPhoneAndroid },
    { id: 'Xiaomi', name: 'Xiaomi', icon: SiXiaomi },
    { id: 'Huawei', name: 'Huawei', icon: SiHuawei },
    { id: 'Desktop', name: 'Desktop', icon: MdLaptop },
    { id: 'Browser', name: 'Browser', icon: SiGooglechrome },
  ];

  const tabs: { id: StudioTab; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'studio', label: 'Studio', icon: MdCameraAlt, color: '#31AAA9' },
    { id: 'inspector', label: 'Inspector', icon: FiSliders, color: '#A82020' },
    { id: 'devices', label: 'Devices', icon: FiSmartphone, color: '#6C1A1A' },
    { id: 'shield', label: 'Shield', icon: MdOutlineShield, color: '#31AAA9' },
  ];

  return (
    <section id="studio" className="relative pt-28 sm:pt-32 pb-12 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header — Minimal, Apple Keynote Style */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#180606] border border-black/[0.06] shadow-sm text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#31AAA9] animate-pulse" />
            <span>Video EXIF Cloak Studio</span>
          </div>

          <h1 className="text-[2.5rem] sm:text-6xl font-black tracking-tight text-[#180606] leading-[1.05] mb-4">
            Turn Any Video Into{' '}
            <span className="bg-gradient-to-r from-[#A82020] via-[#C92A2A] to-[#6C1A1A] bg-clip-text text-transparent">
              Native Footage
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            Authentic camera metadata. Zero tracking signatures. Full algorithm trust.
          </p>
        </div>

        {/* Segmented Tab Bar — iOS Style */}
        <div className="flex justify-center mb-8 animate-fade-in-up animation-delay-100">
          <div className="apple-segmented-bar w-full max-w-md sm:w-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`apple-segmented-item flex-1 sm:flex-none flex items-center justify-center gap-1.5 ${
                    activeTab === tab.id ? 'apple-segmented-active' : 'apple-segmented-inactive'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? '' : 'opacity-60'}`} style={activeTab === tab.id ? { color: tab.color } : {}} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal / Video Preview when file is active */}
        {showPreview && selectedFile !== null && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl my-8">
              <VideoPreview
                file={selectedFile}
                devicePreset={selectedPreset || undefined}
                onConfirm={session ? handleUploadConfirm : handleNonAuthUpload}
                onCancel={handlePreviewCancel}
              />
              {showSignUpPrompt && !session && (
                <div 
                  className="mt-6 p-6 bg-white/95 rounded-3xl border border-[#F8E0A4] shadow-2xl animate-highlight text-center max-w-lg mx-auto"
                  key={highlightKey}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#A82020]/10 text-[#A82020] flex items-center justify-center mx-auto mb-3">
                    <FiZap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#180606] mb-1">Sign in to Export</h3>
                  <p className="text-gray-500 text-sm mb-5">Create a free account for 10 free credits per month.</p>
                  <div className="flex gap-3 justify-center">
                    <Link href="/auth/signup" className="btn-primary !px-6 !py-2.5 text-sm">
                      Create Free Account
                    </Link>
                    <Link href="/auth/signin" className="btn-secondary !px-6 !py-2.5 text-sm">
                      Sign In
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB 1: STUDIO CLOAK ===================== */}
        {activeTab === 'studio' && (
          <div className="animate-fade-in-up animation-delay-200">
            {/* Desktop: 2 column — Controls + iPhone | Mobile: Stacked cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              
              {/* Left Column — iOS Settings-Style Stacked Cards */}
              <div className="space-y-4 order-2 lg:order-1">
                
                {/* Card 1: Device Selector */}
                <div className="ios-section p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#31AAA9]/10 flex items-center justify-center">
                        <FiCpu className="w-4 h-4 text-[#31AAA9]" />
                      </div>
                      <span className="text-sm font-bold text-[#180606]">Target Sensor</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{presets.length} models</span>
                  </div>

                  {/* Category Pills — Horizontal Scroll on Mobile */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide mb-4">
                    {categories.map(({ id, name, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => {
                          const cat = id as DevicePreset['category'];
                          setSelectedCategory(cat);
                          const firstOfCat = devicePresets.find(p => p.category === cat);
                          if (firstOfCat) setSelectedPreset(firstOfCat);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                          selectedCategory === id
                            ? 'bg-[#180606] text-white shadow-sm'
                            : 'bg-[#F7F6F3] text-gray-600 hover:bg-gray-200/70'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${selectedCategory === id ? 'text-[#31AAA9]' : 'text-gray-400'}`} />
                        {name}
                      </button>
                    ))}
                  </div>

                  {/* Preset Grid — 2×2 */}
                  <div className="grid grid-cols-2 gap-2">
                    {presets.slice(0, showAllDevices ? undefined : 4).map((preset) => {
                      const isSelected = selectedPreset?.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => setSelectedPreset(preset)}
                          className={`p-3 rounded-2xl text-left transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#31AAA9]/8 border-2 border-[#31AAA9] shadow-sm'
                              : 'bg-[#F7F6F3] border-2 border-transparent hover:border-gray-200'
                          }`}
                        >
                          <p className="text-xs font-bold text-[#180606] truncate">{preset.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {preset.resolution} · {preset.frameRate}fps
                          </p>
                          {isSelected && (
                            <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[#31AAA9]">
                              <FiCheck className="w-3 h-3" /> Active
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {presets.length > 4 && (
                    <button 
                      onClick={() => setShowAllDevices(!showAllDevices)}
                      className="mt-3 w-full py-2 text-xs font-semibold text-[#31AAA9] hover:text-[#208382] flex items-center justify-center gap-1 transition-colors"
                    >
                      {showAllDevices ? (
                        <><FiChevronUp className="w-3.5 h-3.5" /> Show Less</>
                      ) : (
                        <><FiChevronDown className="w-3.5 h-3.5" /> Show All {presets.length} Devices</>
                      )}
                    </button>
                  )}
                </div>

                {/* Card 2: Cloak Parameters — iOS Toggle Rows */}
                <div className="ios-section p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-[#A82020]/10 flex items-center justify-center">
                      <MdOutlineTune className="w-4 h-4 text-[#A82020]" />
                    </div>
                    <span className="text-sm font-bold text-[#180606]">Cloak Engine</span>
                  </div>

                  <div className="space-y-1">
                    {/* GPS Toggle */}
                    <button
                      type="button"
                      onClick={() => setToggleGps(!toggleGps)}
                      className="ios-row w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#A82020]/10 flex items-center justify-center">
                          <MdLocationOn className="w-4 h-4 text-[#A82020]" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-[#180606]">GPS Spoof</p>
                          <p className="text-[11px] text-gray-400">Cupertino, CA</p>
                        </div>
                      </div>
                      <div className={`ios-toggle ${toggleGps ? 'ios-toggle-on' : 'ios-toggle-off'}`}>
                        <div className={`ios-toggle-knob ${toggleGps ? 'left-[22px]' : 'left-[2px]'}`} />
                      </div>
                    </button>

                    {/* Noise Toggle */}
                    <button
                      type="button"
                      onClick={() => setToggleNoise(!toggleNoise)}
                      className="ios-row w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#31AAA9]/10 flex items-center justify-center">
                          <FiActivity className="w-4 h-4 text-[#31AAA9]" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-[#180606]">ISO Dither</p>
                          <p className="text-[11px] text-gray-400">Sensor noise pattern</p>
                        </div>
                      </div>
                      <div className={`ios-toggle ${toggleNoise ? 'ios-toggle-on' : 'ios-toggle-off'}`}>
                        <div className={`ios-toggle-knob ${toggleNoise ? 'left-[22px]' : 'left-[2px]'}`} />
                      </div>
                    </button>

                    {/* Timestamp Toggle */}
                    <button
                      type="button"
                      onClick={() => setToggleTimestamp(!toggleTimestamp)}
                      className="ios-row w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#6C1A1A]/10 flex items-center justify-center">
                          <FiZap className="w-4 h-4 text-[#6C1A1A]" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-[#180606]">Rec-Time Fix</p>
                          <p className="text-[11px] text-gray-400">Timestamp injection</p>
                        </div>
                      </div>
                      <div className={`ios-toggle ${toggleTimestamp ? 'ios-toggle-on' : 'ios-toggle-off'}`}>
                        <div className={`ios-toggle-knob ${toggleTimestamp ? 'left-[22px]' : 'left-[2px]'}`} />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Card 3: Upload Zone — Clean & Centered */}
                <div
                  className={`ios-section p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? 'ring-2 ring-[#31AAA9] bg-[#31AAA9]/5 scale-[1.01]'
                      : 'hover:shadow-md'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('hero-main-upload')?.click()}
                >
                  <input
                    type="file"
                    id="hero-main-upload"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                  />

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#31AAA9]/15 to-[#F8E0A4]/20 text-[#31AAA9] flex items-center justify-center mx-auto mb-4">
                    <FiUploadCloud className="w-7 h-7" />
                  </div>

                  <h3 className="text-base font-bold text-[#180606] mb-1">
                    {isDragging ? 'Drop video file here' : 'Upload & Cloak'}
                  </h3>
                  <p className="text-gray-400 text-xs mb-4">
                    MP4, MOV, ProRes — up to 2GB
                  </p>

                  <div className="inline-flex items-center gap-2.5">
                    <span className="btn-primary !px-5 !py-2.5 text-sm !rounded-xl">
                      Browse File
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        loadSampleVideo();
                      }}
                      className="px-4 py-2.5 text-sm font-semibold text-gray-600 bg-[#F7F6F3] rounded-xl hover:bg-gray-200/70 transition-colors flex items-center gap-1.5"
                    >
                      <FiPlay className="w-3.5 h-3.5 text-[#A82020]" />
                      Sample
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column — iPhone Mockup Preview */}
              <div className="flex flex-col items-center order-1 lg:order-2 lg:sticky lg:top-28">
                <div className="text-center mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[#180606] text-[11px] font-semibold border border-black/[0.04]">
                    <MdCameraAlt className="w-3.5 h-3.5 text-[#31AAA9]" />
                    Live Preview
                  </span>
                </div>

                <IPhoneMockup
                  videoUrl={previewUrl}
                  selectedPreset={selectedPreset}
                  activeCategory={selectedCategory}
                  onUploadClick={() => document.getElementById('hero-main-upload')?.click()}
                />
              </div>

            </div>
          </div>
        )}

        {/* ===================== TAB 2: EXIF INSPECTOR ===================== */}
        {activeTab === 'inspector' && (
          <div className="animate-fade-in-up animation-delay-200 max-w-4xl mx-auto">
            <div className="ios-section p-6 sm:p-8 mb-8">
              <h3 className="text-xl font-black text-[#180606] tracking-tight mb-1">
                Before & After EXIF Comparison
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                See how VideoMask transforms raw metadata into native camera signatures.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Raw File */}
                <div className="p-5 rounded-2xl bg-[#FDF8F8] border border-[#A82020]/10 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#A82020]/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#A82020]" />
                      <h4 className="font-bold text-[#180606] text-sm">Raw Video</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#A82020]/10 text-[#A82020]">
                      HIGH RISK
                    </span>
                  </div>

                  <dl className="space-y-2 text-xs">
                    {[
                      ['Camera', 'None / Stripped'],
                      ['Lens', 'Undefined'],
                      ['Focal Length', '0.00 mm'],
                      ['Software', 'FFmpeg / CapCut'],
                      ['GPS', '0.0000° N'],
                      ['Trust Score', '14%'],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-1.5 border-b border-[#A82020]/5 last:border-0">
                        <dt className="text-gray-500">{label}</dt>
                        <dd className="font-mono text-gray-400 text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Cloaked File */}
                <div className="p-5 rounded-2xl bg-[#F5FCFC] border border-[#31AAA9]/15 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-[#31AAA9]/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#31AAA9]" />
                      <h4 className="font-bold text-[#180606] text-sm">Cloaked</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#31AAA9]/10 text-[#31AAA9]">
                      NATIVE
                    </span>
                  </div>

                  <dl className="space-y-2 text-xs">
                    {[
                      ['Camera', 'Apple Inc.'],
                      ['Lens', 'iPhone 16 Pro triple'],
                      ['Focal Length', '6.765 mm ƒ/1.78'],
                      ['Software', 'iOS 18.2'],
                      ['GPS', '37.33° N, 122.01° W'],
                      ['Trust Score', '99.8%'],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-1.5 border-b border-[#31AAA9]/5 last:border-0">
                        <dt className="text-gray-500">{label}</dt>
                        <dd className="font-mono text-[#180606] font-semibold text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: DEVICE LIBRARY ===================== */}
        {activeTab === 'devices' && (
          <div className="animate-fade-in-up animation-delay-200">
            <div className="ios-section p-6 sm:p-8 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-black text-[#180606] tracking-tight">
                    Hardware Sensor Library
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    50+ verified device profiles with real lens data.
                  </p>
                </div>

                <div className="flex gap-1.5 overflow-x-auto">
                  {['iPhone', 'Samsung', 'Xiaomi'].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat as DevicePreset['category'])}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedCategory === cat ? 'bg-[#180606] text-white' : 'bg-[#F7F6F3] text-gray-600 hover:bg-gray-200/70'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {presets.map((preset) => (
                  <div 
                    key={preset.id}
                    className="p-4 rounded-2xl bg-[#F7F6F3] border border-transparent hover:border-[#31AAA9]/30 hover:bg-white transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#F8E0A4]/50 text-[#180606] uppercase">
                        {preset.category}
                      </span>
                      <span className="text-xs font-bold text-[#31AAA9]">{preset.frameRate} FPS</span>
                    </div>

                    <h4 className="font-bold text-[#180606] text-sm mb-0.5">{preset.name}</h4>
                    <p className="text-[11px] text-gray-400 font-mono mb-3">{preset.resolution}</p>

                    <button
                      onClick={() => {
                        setSelectedPreset(preset);
                        setActiveTab('studio');
                      }}
                      className="w-full py-2 text-xs font-bold text-[#31AAA9] bg-[#31AAA9]/8 rounded-xl hover:bg-[#31AAA9]/15 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100"
                    >
                      Select <FiArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 4: ALGORITHM SHIELD ===================== */}
        {activeTab === 'shield' && (
          <div className="animate-fade-in-up animation-delay-200 max-w-4xl mx-auto">
            <div className="ios-section p-6 sm:p-8 mb-8">
              <h3 className="text-xl font-black text-[#180606] tracking-tight mb-1">
                Algorithm Verification
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Tested against 2026 AI ingestion pipelines.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: 'TikTok FYP', score: '99.8%', note: 'Camera roll bonus', icon: FiActivity, color: '#31AAA9' },
                  { name: 'Instagram Reels', score: '99.4%', note: 'No dupe penalty', icon: FiShare2, color: '#A82020' },
                  { name: 'YouTube Shorts', score: '100%', note: '4K60 HDR pass', icon: FiZap, color: '#6C1A1A' },
                  { name: 'X / Twitter', score: '99.9%', note: 'Audio atoms OK', icon: FiCheck, color: '#31AAA9' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="stat-card text-center">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${item.color}10` }}>
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <p className="text-2xl font-black text-[#180606] mb-0.5">{item.score}</p>
                      <p className="text-xs font-bold text-[#180606] mb-0.5">{item.name}</p>
                      <p className="text-[10px] text-gray-400">{item.note}</p>
                      <span className="inline-block mt-2 text-[9px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        PASS
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Feature Highlights — Compact Grid Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto animate-fade-in-up animation-delay-300">
          <div className="ios-section p-5 text-center group">
            <div className="w-11 h-11 rounded-2xl bg-[#31AAA9]/10 text-[#31AAA9] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <MdPhoneIphone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#180606] mb-1">Real Hardware Physics</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Genuine aperture, focal length & sensor dithering per device.
            </p>
          </div>

          <div className="ios-section p-5 text-center group">
            <div className="w-11 h-11 rounded-2xl bg-[#A82020]/10 text-[#A82020] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <MdOutlineShield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#180606] mb-1">Reposter Shield</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Wipe editing software traces & avoid shadowbans.
            </p>
          </div>

          <div className="ios-section p-5 text-center group">
            <div className="w-11 h-11 rounded-2xl bg-[#F8E0A4]/30 text-[#6C1A1A] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <FiZap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#180606] mb-1">In-Browser Remux</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              WebAssembly & FFmpeg — zero re-encoding.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
