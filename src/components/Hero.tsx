'use client';

import { useState } from 'react';

export default function Hero() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8">
            Transform Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Content
            </span>
            <br />
            Share with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Impact
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Upload your videos and customize metadata for each social platform.
            Reach your audience effectively across all channels.
          </p>

          <div
            className={`max-w-2xl mx-auto p-8 rounded-2xl border-2 border-dashed transition-colors duration-200 ${
              isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Drop your video here or browse
              </h3>
              <p className="text-gray-500 text-sm">
                Support for MP4, MOV, AVI up to 2GB
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60">
            <img src="/youtube.svg" alt="YouTube" className="h-6" />
            <img src="/instagram.svg" alt="Instagram" className="h-6" />
            <img src="/tiktok.svg" alt="TikTok" className="h-6" />
            <img src="/twitter.svg" alt="Twitter" className="h-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
