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
  FiShare2
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

  return (
    <section id="studio" className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-white to-[#F5F2EB]">
      {/* Apple Ambient Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#31AAA9]/15 via-[#F8E0A4]/15 to-transparent rounded-[100%] blur-3xl opacity-70" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-tl from-[#A82020]/10 via-[#6C1A1A]/5 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple iOS Header Presentation */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#180606] border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#31AAA9] animate-pulse" />
            <span>Next-Gen Video EXIF Cloak Studio</span>
            <span className="text-gray-300">•</span>
            <span className="text-[#A82020] font-bold">iOS 18 + Camera Physics</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#180606] leading-[1.08]">
            Turn Any Video Into{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="bg-gradient-to-r from-[#A82020] via-[#C92A2A] to-[#6C1A1A] bg-clip-text text-transparent">
                Native Footage
              </span>
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-[#A82020] to-[#F8E0A4] rounded-full opacity-60" />
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Simulate authentic iPhone 16 Pro, Galaxy S24 Ultra, and cinema camera sensors. Strip tracking signatures, inject true hardware EXIF, and evade compression penalties.
          </p>

          {/* iOS Segmented Navigation Bar */}
          <div className="pt-2 flex justify-center">
            <div className="apple-segmented-bar max-w-full overflow-x-auto p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('studio')}
                className={`apple-segmented-item flex items-center gap-2 ${
                  activeTab === 'studio' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <MdCameraAlt className={`w-4 h-4 ${activeTab === 'studio' ? 'text-[#31AAA9]' : ''}`} />
                <span>Studio Cloak</span>
              </button>

              <button
                onClick={() => setActiveTab('inspector')}
                className={`apple-segmented-item flex items-center gap-2 ${
                  activeTab === 'inspector' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <FiSliders className={`w-4 h-4 ${activeTab === 'inspector' ? 'text-[#A82020]' : ''}`} />
                <span>EXIF Inspector</span>
              </button>

              <button
                onClick={() => setActiveTab('devices')}
                className={`apple-segmented-item flex items-center gap-2 ${
                  activeTab === 'devices' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <FiSmartphone className={`w-4 h-4 ${activeTab === 'devices' ? 'text-[#6C1A1A]' : ''}`} />
                <span>Device Library</span>
              </button>

              <button
                onClick={() => setActiveTab('shield')}
                className={`apple-segmented-item flex items-center gap-2 ${
                  activeTab === 'shield' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <MdOutlineShield className={`w-4 h-4 ${activeTab === 'shield' ? 'text-[#31AAA9]' : ''}`} />
                <span>Algorithm Shield</span>
              </button>
            </div>
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
                  <h3 className="text-xl font-bold text-[#180606] mb-1">Sign in to Export Cloaked Video</h3>
                  <p className="text-gray-600 text-sm mb-5">Create a free account to download fully patched videos with 10 free credits per month.</p>
                  <div className="flex gap-3 justify-center">
                    <Link href="/auth/signup" className="btn-primary !px-6 !py-2.5 text-xs">
                      Create Free Account
                    </Link>
                    <Link href="/auth/signin" className="btn-secondary !px-6 !py-2.5 text-xs">
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
          <div className="apple-card p-4 sm:p-8 lg:p-10 mb-16">
            {/* Desktop Pro Software Dual Pane Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Pane: Software Studio Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Category Selector Segmented Pills */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <FiCpu className="w-3.5 h-3.5 text-[#31AAA9]" />
                      Target Camera Sensor
                    </span>
                    <span className="text-xs font-semibold text-[#31AAA9]">
                      {presets.length} Models Available
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-[#F3F2EE] p-1.5 rounded-2xl border border-black/[0.04]">
                    {[
                      { id: 'iPhone', name: 'iPhone', icon: MdPhoneIphone },
                      { id: 'Samsung', name: 'Samsung', icon: MdPhoneAndroid },
                      { id: 'Xiaomi', name: 'Xiaomi', icon: SiXiaomi },
                      { id: 'Huawei', name: 'Huawei', icon: SiHuawei },
                      { id: 'Desktop', name: 'Desktop', icon: MdLaptop },
                      { id: 'Browser', name: 'Browser', icon: SiGooglechrome },
                    ].map(({ id, name, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => {
                          const cat = id as DevicePreset['category'];
                          setSelectedCategory(cat);
                          const firstOfCat = devicePresets.find(p => p.category === cat);
                          if (firstOfCat) setSelectedPreset(firstOfCat);
                        }}
                        className={`py-2 px-2.5 rounded-xl flex flex-col items-center justify-center transition-all ${
                          selectedCategory === id
                            ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-[#180606] font-bold ring-1 ring-black/5'
                            : 'text-gray-500 hover:text-black hover:bg-white/40 font-medium'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1 ${selectedCategory === id ? 'text-[#31AAA9]' : 'text-gray-400'}`} />
                        <span className="text-[11px] leading-none">{name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset Chips Carousel / Grid */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Selected Hardware Profile
                    </span>
                    <span className="text-xs text-gray-400">Tap to switch active profile</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {presets.slice(0, 4).map((preset) => {
                      const isSelected = selectedPreset?.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => setSelectedPreset(preset)}
                          className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? 'bg-white border-[#31AAA9] shadow-[0_4px_16px_rgba(49,170,169,0.15)] ring-1 ring-[#31AAA9]'
                              : 'bg-white/60 border-black/[0.06] hover:bg-white hover:border-black/15'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold text-[#180606]">{preset.name}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">
                              {preset.resolution} • {preset.frameRate}fps
                            </p>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                            isSelected ? 'bg-[#31AAA9] text-white' : 'bg-gray-100 text-transparent'
                          }`}>
                            <FiCheck className="w-3 h-3" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dropzone Upload Section */}
                <div
                  className={`p-8 rounded-3xl border-2 border-dashed transition-all duration-300 text-center cursor-pointer ${
                    isDragging
                      ? 'border-[#31AAA9] bg-[#31AAA9]/10 scale-[1.01]'
                      : 'border-[#31AAA9]/30 hover:border-[#31AAA9] bg-gradient-to-b from-[#FAF9F6] to-white/70 hover:shadow-md'
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

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#31AAA9]/20 to-[#F8E0A4]/30 text-[#31AAA9] flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <FiUploadCloud className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-bold text-[#180606] mb-1">
                    {isDragging ? 'Drop video file here' : `Inject ${selectedPreset?.name || 'iPhone'} Metadata`}
                  </h3>
                  <p className="text-gray-500 text-xs font-medium mb-3">
                    Drag and drop your MP4, MOV, or ProRes file (up to 2GB)
                  </p>

                  <div className="inline-flex items-center gap-3">
                    <span className="btn-primary !px-5 !py-2 text-xs !rounded-full">
                      Browse Video File
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        loadSampleVideo();
                      }}
                      className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-black/10 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                    >
                      <FiPlay className="w-3 h-3 text-[#A82020]" />
                      <span>Try Sample Clip</span>
                    </button>
                  </div>
                </div>

                {/* Apple Cloaking Switches */}
                <div className="bg-[#F8F7F3] p-4 rounded-2xl border border-black/[0.05] space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <MdOutlineTune className="w-3.5 h-3.5 text-[#A82020]" />
                    <span>Neural Sensor Cloak Engine Parameters</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setToggleGps(!toggleGps)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        toggleGps ? 'bg-white border-[#31AAA9]/40 shadow-xs' : 'bg-transparent border-transparent opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MdLocationOn className="w-4 h-4 text-[#A82020]" />
                        <span className="text-xs font-semibold text-gray-800">Cupertino GPS</span>
                      </div>
                      <span className={`text-[10px] font-bold ${toggleGps ? 'text-[#31AAA9]' : 'text-gray-400'}`}>
                        {toggleGps ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setToggleNoise(!toggleNoise)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        toggleNoise ? 'bg-white border-[#31AAA9]/40 shadow-xs' : 'bg-transparent border-transparent opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FiActivity className="w-4 h-4 text-[#31AAA9]" />
                        <span className="text-xs font-semibold text-gray-800">ISO Dither</span>
                      </div>
                      <span className={`text-[10px] font-bold ${toggleNoise ? 'text-[#31AAA9]' : 'text-gray-400'}`}>
                        {toggleNoise ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setToggleTimestamp(!toggleTimestamp)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        toggleTimestamp ? 'bg-white border-[#31AAA9]/40 shadow-xs' : 'bg-transparent border-transparent opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FiZap className="w-4 h-4 text-[#6C1A1A]" />
                        <span className="text-xs font-semibold text-gray-800">Rec-Time Fix</span>
                      </div>
                      <span className={`text-[10px] font-bold ${toggleTimestamp ? 'text-[#31AAA9]' : 'text-gray-400'}`}>
                        {toggleTimestamp ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Pane: Interactive iPhone 16 Pro Simulator (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="text-center mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[#180606] text-[11px] font-semibold">
                    <MdCameraAlt className="w-3.5 h-3.5 text-[#31AAA9]" />
                    Live Hardware Viewport
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
          <div className="apple-card p-6 sm:p-10 mb-16 text-left">
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h3 className="text-2xl font-black text-[#180606] tracking-tight">
                  Before & After: Full EXIF Tree Comparison
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  How social algorithms examine incoming video files. VideoMask forges missing sensor parameters to trigger first-party native reach.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Raw Untreated File Card */}
                <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-black/[0.08] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#A82020]" />
                      <h4 className="font-bold text-gray-900 text-sm">Raw Untreated Video</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#A82020]/10 text-[#A82020] uppercase">
                      Risk: High
                    </span>
                  </div>

                  <dl className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">Camera Maker</dt>
                      <dd className="font-mono text-gray-400">None / Stripped</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">Lens Model</dt>
                      <dd className="font-mono text-gray-400">Undefined</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">Focal Length & Aperture</dt>
                      <dd className="font-mono text-gray-400">0.00 mm (Synthetic)</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">Software Signature</dt>
                      <dd className="font-mono text-red-600">FFmpeg / CapCut / Premiere</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">GPS Coords</dt>
                      <dd className="font-mono text-gray-400">0.0000° N, 0.0000° E</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-gray-500">Algorithm Trust Score</dt>
                      <dd className="font-bold text-[#A82020]">14% (Penalized as Reupload)</dd>
                    </div>
                  </dl>
                </div>

                {/* Cloaked File Card */}
                <div className="p-6 rounded-3xl bg-white border border-[#31AAA9]/40 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#31AAA9]" />
                      <h4 className="font-bold text-[#180606] text-sm">VideoMask Cloaked</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#31AAA9]/15 text-[#31AAA9] uppercase">
                      100% Native
                    </span>
                  </div>

                  <dl className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">Camera Maker</dt>
                      <dd className="font-mono text-[#180606] font-semibold">Apple Inc.</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">Lens Model</dt>
                      <dd className="font-mono text-[#180606] font-semibold">iPhone 16 Pro back triple camera</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">Focal Length & Aperture</dt>
                      <dd className="font-mono text-[#31AAA9] font-semibold">6.765 mm ƒ/1.78 ISO 50</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">Software Signature</dt>
                      <dd className="font-mono text-[#180606] font-semibold">iOS 18.2 (Build 22C150)</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <dt className="text-gray-500">GPS Coords</dt>
                      <dd className="font-mono text-[#180606] font-semibold">37.3346° N, 122.0090° W (Cupertino)</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-gray-500">Algorithm Trust Score</dt>
                      <dd className="font-bold text-[#31AAA9]">99.8% (Verified Native Camera)</dd>
                    </div>
                  </dl>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: DEVICE LIBRARY ===================== */}
        {activeTab === 'devices' && (
          <div className="apple-card p-6 sm:p-10 mb-16 text-left">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-[#180606] tracking-tight">
                  Comprehensive Hardware Sensor Library
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Each profile includes accurate lens distortion maps, color space matrices, and quicktime atom headers.
                </p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedCategory('iPhone')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === 'iPhone' ? 'bg-[#31AAA9] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  iPhone
                </button>
                <button 
                  onClick={() => setSelectedCategory('Samsung')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === 'Samsung' ? 'bg-[#31AAA9] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Samsung
                </button>
                <button 
                  onClick={() => setSelectedCategory('Xiaomi')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === 'Xiaomi' ? 'bg-[#31AAA9] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Xiaomi
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {presets.map((preset) => (
                <div 
                  key={preset.id}
                  className="p-5 rounded-2xl bg-[#FAF9F6] border border-black/[0.06] hover:border-[#31AAA9] hover:bg-white transition-all shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F8E0A4] text-[#180606] uppercase">
                      {preset.category}
                    </span>
                    <span className="text-xs font-bold text-[#31AAA9]">{preset.frameRate} FPS</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#180606] text-base">{preset.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 font-mono">{preset.resolution}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-gray-600">Sensor: 1/1.28&quot; CMOS</span>
                    <button
                      onClick={() => {
                        setSelectedPreset(preset);
                        setActiveTab('studio');
                      }}
                      className="px-3 py-1 text-xs font-bold text-[#31AAA9] hover:bg-[#31AAA9]/10 rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>Select</span>
                      <FiArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: ALGORITHM SHIELD ===================== */}
        {activeTab === 'shield' && (
          <div className="apple-card p-6 sm:p-10 mb-16 text-left">
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h3 className="text-2xl font-black text-[#180606] tracking-tight">
                  Algorithmic Verification Scorecard
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Tested against the latest 2026 AI ingestion pipelines on major video networks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'TikTok FYP Feed', score: '99.8%', note: 'Full camera roll bonus unlocked', icon: FiActivity, color: 'text-[#31AAA9]' },
                  { name: 'Instagram Reels', score: '99.4%', note: 'Zero duplicate content penalty', icon: FiShare2, color: 'text-[#A82020]' },
                  { name: 'YouTube Shorts', score: '100%', note: '4K60 HDR passthrough verified', icon: FiZap, color: 'text-[#6C1A1A]' },
                  { name: 'X / Twitter Media', score: '99.9%', note: 'Uncompressed audio atom tags', icon: FiCheck, color: 'text-[#31AAA9]' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                          PASS
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#180606]">{item.name}</h4>
                      <p className="text-2xl font-black text-[#180606]">{item.score}</p>
                      <p className="text-[11px] text-gray-500">{item.note}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Feature Grid with Apple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="apple-card p-7 text-left group">
            <div className="w-12 h-12 rounded-2xl bg-[#31AAA9]/10 text-[#31AAA9] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <MdPhoneIphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#180606] mb-2">Real Hardware Physics</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              We emulate the genuine aperture, focal length, color primaries, and pixel dithering characteristic of each device sensor.
            </p>
          </div>

          <div className="apple-card p-7 text-left group">
            <div className="w-12 h-12 rounded-2xl bg-[#A82020]/10 text-[#A82020] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <MdOutlineShield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#180606] mb-2">Reposter Shield</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Scramble creation timestamps, wipe editing software traces (CapCut, Premiere), and avoid shadowbans effortlessly.
            </p>
          </div>

          <div className="apple-card p-7 text-left group">
            <div className="w-12 h-12 rounded-2xl bg-[#F8E0A4]/40 text-[#6C1A1A] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FiZap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#180606] mb-2">Instant In-Browser Remux</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Fast client-side remuxing with WebAssembly & FFmpeg. No re-encoding or quality degradation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
