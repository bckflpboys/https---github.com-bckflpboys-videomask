'use client';

import { useState } from 'react';
import { devicePresets, DevicePreset } from '@/lib/devicePresets';
import { uploadVideo } from '@/lib/uploadVideo';
import { FiUploadCloud } from 'react-icons/fi';
import { MdPhoneIphone, MdLaptop, MdPhoneAndroid } from 'react-icons/md';
import { SiXiaomi, SiHuawei, SiGooglechrome } from 'react-icons/si';
import Navbar from '@/components/Navbar';
import VideoPreview from '@/components/VideoPreview';

const categories = [
  { id: 'iPhone', name: 'iPhone', icon: MdPhoneIphone },
  { id: 'Samsung', name: 'Samsung', icon: MdPhoneAndroid },
  { id: 'Xiaomi', name: 'Xiaomi', icon: SiXiaomi },
  { id: 'Huawei', name: 'Huawei', icon: SiHuawei },
  { id: 'Desktop', name: 'Desktop/Laptop', icon: MdLaptop },
  { id: 'Browser', name: 'Browser Upload', icon: SiGooglechrome },
] as const;

export default function UploadPage() {
  const [selectedCategory, setSelectedCategory] = useState<DevicePreset['category']>('iPhone');
  const [selectedPreset, setSelectedPreset] = useState<DevicePreset | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

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
      alert('Please upload a video file');
      return;
    }
    setSelectedFile(file);
    setShowPreview(true);
  };

  const handleUploadConfirm = async () => {
    if (!selectedFile) return;
    
    setShowPreview(false);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await uploadVideo(selectedFile);
      
      if (result.success) {
        // Handle successful upload
        console.log('Upload successful:', result.data);
        // You can redirect to the editing page or show success message
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Upload Video</h1>

            {isUploading && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 border-2 border-gray-400 shadow-lg">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Uploading Video...</h3>
                    <div className="h-2 bg-blue-100 rounded-full overflow-hidden border border-blue-400">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-blue-600">Progress: {uploadProgress}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Video Preview or Upload Area */}
            <div className="mb-16 p-8 bg-white rounded-xl border-2 border-gray-400 shadow-lg">
              {showPreview && selectedFile !== null ? (
                <VideoPreview
                  file={selectedFile}
                  devicePreset={selectedPreset || undefined}
                  onConfirm={handleUploadConfirm}
                  onCancel={handlePreviewCancel}
                />
              ) : (
                <div
                  className={`max-w-3xl mx-auto p-12 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                      : 'border-blue-400 hover:border-blue-500 bg-white/80'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                  />
                  <div className="text-center space-y-4">
                    <div className="text-blue-600">
                      <FiUploadCloud className="w-16 h-16 mx-auto" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {isDragging ? 'Drop your video here' : selectedPreset 
                          ? `Upload video for ${selectedPreset.name}`
                          : 'Upload your video'}
                      </h3>
                      <p className="text-gray-500">or click to browse</p>
                      <p className="text-gray-400 text-sm mt-2">Supports MP4, MOV, AVI (up to 2GB)</p>
                      {!selectedPreset && (
                        <p className="text-blue-600 text-sm mt-2">
                          Tip: Select a device preset below for optimized video settings
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Device Preset Section */}
            <div className="p-8 bg-white rounded-xl border-2 border-gray-400 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Device Preset</h2>
              <p className="text-lg text-gray-600 mb-8">Select a device to optimize your video for the best viewing experience</p>
              
              {/* Device Category Selection */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categories.map(({ id, name, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setSelectedCategory(id as DevicePreset['category'])}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 bg-white ${
                        selectedCategory === id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-400 hover:border-blue-500'
                      }`}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <span className="block text-sm font-medium text-gray-900">{name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Device Presets */}
              <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Model</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {presets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left bg-white ${
                        selectedPreset?.id === preset.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-400 hover:border-blue-500'
                      }`}
                    >
                      <h3 className="font-medium text-gray-900 mb-2">{preset.name}</h3>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>Resolution: {preset.resolution}</p>
                        <p>Frame Rate: {preset.frameRate}fps</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
