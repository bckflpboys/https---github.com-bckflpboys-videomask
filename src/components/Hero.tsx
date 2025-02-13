'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MdPhoneIphone } from 'react-icons/md';
import { BiCustomize } from 'react-icons/bi';
import { BsLightningChargeFill } from 'react-icons/bs';
import { FiUploadCloud } from 'react-icons/fi';
import { uploadVideo } from '@/lib/uploadVideo';

export default function Hero() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      await handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file || !file.type.includes('video/')) {
      alert('Please upload a video file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await uploadVideo(file);
      
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
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-full opacity-70 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-l from-blue-100/30 to-indigo-100/30 rounded-full opacity-70 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-16">
          {/* Hero Title and Description */}
          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
              Make Videos Look{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Native
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-50"></div>
              </span>
              <br />
              to Any{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Device
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-50"></div>
              </span>
            </h1>

            <div className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              <ul className="space-y-2 list-none flex flex-col items-center">
                <li className="flex items-center gap-2 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                  Make videos look native to any device
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                  Simulate iPhone, Samsung & more
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                  Perfect for content creators
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                  Authentic look across platforms
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/upload" 
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <span className="flex items-center gap-2">
                Start Masking Videos
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link 
              href="#how-it-works" 
              className="group px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform border border-gray-100"
            >
              How It Works
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-200 hover:border-blue-400 bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30">
              <div className="text-blue-600 mb-4">
                <MdPhoneIphone className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Device Simulation</h3>
              <p className="text-gray-600 leading-relaxed">Make your videos appear as if they were recorded from any popular smartphone model.</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-200 hover:border-blue-400 bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30">
              <div className="text-blue-600 mb-4">
                <BiCustomize className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Metadata Masking</h3>
              <p className="text-gray-600 leading-relaxed">Customize video metadata to match your chosen device specifications perfectly.</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-200 hover:border-blue-400 bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30">
              <div className="text-blue-600 mb-4">
                <BsLightningChargeFill className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Processing</h3>
              <p className="text-gray-600 leading-relaxed">Fast and efficient processing with support for multiple video formats.</p>
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`max-w-2xl mx-auto p-10 rounded-2xl border-2 border-dashed transition-all duration-300 transform hover:scale-[1.02] cursor-pointer backdrop-blur-sm ${
              isDragging
                ? 'border-blue-500 bg-blue-50/80 scale-[1.02]'
                : 'border-blue-300 hover:border-blue-500 bg-white/80 hover:bg-blue-50/30'
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
                <FiUploadCloud className="w-16 h-16 mx-auto transform transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isDragging ? 'Drop your video here' : 'Drag & drop your video'}
                </h3>
                <p className="text-gray-500">or click to browse</p>
                <p className="text-gray-400 text-sm mt-2">Supports MP4, MOV, AVI (up to 2GB)</p>
              </div>
              {isUploading && (
                <div className="w-full mt-4">
                  <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-blue-600 mt-2">Uploading... {uploadProgress}%</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
