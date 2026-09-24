'use client';

import { useState } from 'react';
import { devicePresets, DevicePreset } from '@/lib/devicePresets';
import { uploadVideo } from '@/lib/uploadVideo';
import { FiUploadCloud, FiCheck, FiPlay, FiSliders, FiCpu, FiLayers } from 'react-icons/fi';
import { MdPhoneIphone, MdLaptop, MdPhoneAndroid, MdCameraAlt, MdOutlineShield } from 'react-icons/md';
import { SiXiaomi, SiHuawei, SiGooglechrome } from 'react-icons/si';
import Navbar from '@/components/Navbar';
import VideoPreview from '@/components/VideoPreview';

const categories = [
  { id: 'iPhone', name: 'iPhone', icon: MdPhoneIphone },
  { id: 'Samsung', name: 'Samsung', icon: MdPhoneAndroid },
  { id: 'Xiaomi', name: 'Xiaomi', icon: SiXiaomi },
  { id: 'Huawei', name: 'Huawei', icon: SiHuawei },
  { id: 'Desktop', name: 'Desktop/PC', icon: MdLaptop },
  { id: 'Browser', name: 'Browser Web', icon: SiGooglechrome },
] as const;

export default function UploadPage() {
  const [selectedCategory, setSelectedCategory] = useState<DevicePreset['category']>('iPhone');
  const [selectedPreset, setSelectedPreset] = useState<DevicePreset | null>(devicePresets[0] || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [activeStep, setActiveStep] = useState<'device' | 'upload'>('upload');

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

  const handlePreviewCancel = () => {
    setShowPreview(false);
    setSelectedFile(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-white to-[#F5F2EB] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[#180606] shadow-xs text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#31AAA9]" />
              <span>Studio Upload Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#180606] tracking-tight">
              Inject Native Hardware Signature
            </h1>
            <p className="text-sm text-gray-600">
              Select your target hardware profile, drop your source clip, and export genuine camera roll metadata.
            </p>

            {/* Apple Segmented View Toggle */}
            <div className="pt-2 flex justify-center">
              <div className="apple-segmented-bar p-1">
                <button
                  onClick={() => setActiveStep('upload')}
                  className={`apple-segmented-item flex items-center gap-1.5 ${
                    activeStep === 'upload' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                  }`}
                >
                  <FiUploadCloud className="w-3.5 h-3.5" />
                  <span>Upload & Cloak</span>
                </button>
                <button
                  onClick={() => setActiveStep('device')}
                  className={`apple-segmented-item flex items-center gap-1.5 ${
                    activeStep === 'device' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                  }`}
                >
                  <MdCameraAlt className="w-3.5 h-3.5" />
                  <span>Select Target Device ({selectedPreset?.name || 'iPhone 16 Pro'})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Upload Progress Modal */}
          {isUploading && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="apple-card bg-white p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
                <div className="w-12 h-12 rounded-full border-3 border-[#31AAA9]/20 border-t-[#31AAA9] animate-spin mx-auto" />
                <div>
                  <h3 className="text-lg font-bold text-[#180606]">Cloaking Video Atoms...</h3>
                  <p className="text-xs text-gray-500 mt-1">Injecting {selectedPreset?.name} sensor parameters</p>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#31AAA9] to-[#208382] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-[#31AAA9]">{uploadProgress}% Complete</p>
              </div>
            </div>
          )}

          {/* Video Preview Modal / Container */}
          {showPreview && selectedFile !== null ? (
            <div className="mb-12">
              <VideoPreview
                file={selectedFile}
                devicePreset={selectedPreset || undefined}
                onConfirm={handleUploadConfirm}
                onCancel={handlePreviewCancel}
              />
            </div>
          ) : (
            activeStep === 'upload' ? (
              /* Dropzone Container */
              <div className="apple-card p-8 sm:p-12 text-center space-y-6">
                
                {/* Active Target Banner */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FAF9F6] border border-black/[0.06] text-xs">
                  <span className="text-gray-500">Active Target Profile:</span>
                  <span className="font-bold text-[#180606] flex items-center gap-1.5">
                    <MdCameraAlt className="w-3.5 h-3.5 text-[#31AAA9]" />
                    {selectedPreset?.name || 'iPhone 16 Pro Max'}
                  </span>
                  <button
                    onClick={() => setActiveStep('device')}
                    className="text-[#31AAA9] font-bold hover:underline ml-2"
                  >
                    Change Device
                  </button>
                </div>

                <div
                  className={`max-w-2xl mx-auto p-10 sm:p-14 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
                    isDragging
                      ? 'border-[#31AAA9] bg-[#31AAA9]/10 scale-[1.01]'
                      : 'border-[#31AAA9]/30 hover:border-[#31AAA9] bg-gradient-to-b from-[#FAF9F6] to-white/70 hover:shadow-md'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('upload-page-file')?.click()}
                >
                  <input
                    type="file"
                    id="upload-page-file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                  />

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#31AAA9]/20 to-[#F8E0A4]/30 text-[#31AAA9] flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <FiUploadCloud className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold text-[#180606] mb-1">
                    {isDragging ? 'Release to upload video' : 'Drop your video file here'}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-medium mb-4">
                    Supports MP4, MOV, ProRes, WebM (up to 2GB per file)
                  </p>

                  <div className="inline-flex items-center gap-3">
                    <span className="btn-primary !px-6 !py-2.5 text-xs !rounded-full">
                      Browse Files
                    </span>
                  </div>
                </div>

                {/* Technical Features Mini Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 text-left">
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-black/[0.04] flex items-center gap-2.5">
                    <FiCheck className="w-4 h-4 text-[#31AAA9] flex-shrink-0" />
                    <span className="text-xs text-gray-700 font-medium">Automatic EXIF atom injection</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-black/[0.04] flex items-center gap-2.5">
                    <FiCheck className="w-4 h-4 text-[#31AAA9] flex-shrink-0" />
                    <span className="text-xs text-gray-700 font-medium">Zero-loss WebAssembly speed</span>
                  </div>
                  <div className="p-3 bg-[#FAF9F6] rounded-xl border border-black/[0.04] flex items-center gap-2.5">
                    <FiCheck className="w-4 h-4 text-[#31AAA9] flex-shrink-0" />
                    <span className="text-xs text-gray-700 font-medium">Wipes CapCut / Adobe stamps</span>
                  </div>
                </div>

              </div>
            ) : (
              /* Device Preset Selection Step */
              <div className="apple-card p-6 sm:p-8 space-y-6 text-left">
                <div>
                  <h3 className="text-xl font-bold text-[#180606]">Target Camera Hardware Profile</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Choose the hardware sensor signature to forge onto your video.</p>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-[#F3F2EE] p-1.5 rounded-2xl border border-black/[0.04]">
                  {categories.map(({ id, name, icon: Icon }) => (
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

                {/* Preset List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {presets.map(preset => {
                    const isSelected = selectedPreset?.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setSelectedPreset(preset);
                          setActiveStep('upload');
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white border-[#31AAA9] shadow-sm ring-1 ring-[#31AAA9]'
                            : 'bg-white/60 border-black/[0.06] hover:bg-white hover:border-black/15'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[#180606]">{preset.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#31AAA9]/10 text-[#31AAA9]">
                              {preset.frameRate} FPS
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 font-mono">{preset.resolution}</p>
                        </div>

                        <div className="pt-2 mt-2 border-t border-black/[0.04] flex items-center justify-between text-[11px]">
                          <span className="text-gray-400">Tap to apply</span>
                          {isSelected && <FiCheck className="w-3.5 h-3.5 text-[#31AAA9]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveStep('upload')}
                    className="btn-primary !px-5 !py-2 text-xs !rounded-full"
                  >
                    Continue with Selected Device
                  </button>
                </div>
              </div>
            )
          )}

        </div>
      </div>
    </>
  );
}
