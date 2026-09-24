'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DevicePreset } from '@/lib/devicePresets';
import { FiPlay, FiPause, FiInfo, FiShare2, FiHeart, FiMaximize2, FiCheckCircle } from 'react-icons/fi';
import { MdLocationOn, MdCameraAlt } from 'react-icons/md';

interface IPhoneMockupProps {
  videoUrl?: string | null;
  selectedPreset?: DevicePreset | null;
  activeCategory?: string;
  onUploadClick?: () => void;
  className?: string;
}

export default function IPhoneMockup({
  videoUrl,
  selectedPreset,
  activeCategory = 'iPhone',
  onUploadClick,
  className = '',
}: IPhoneMockupProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMetadataSheet, setShowMetadataSheet] = useState(true);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:15');
  const [progress, setProgress] = useState(35);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Default simulated specs based on preset
  const presetName = selectedPreset?.name || 'iPhone 16 Pro Max';
  const make = selectedPreset?.metadata?.make || 'Apple';
  const software = selectedPreset?.metadata?.software || 'iOS 18.0';
  const resolution = selectedPreset?.resolution || '3840x2160';
  const frameRate = selectedPreset?.frameRate || 60;

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [videoUrl]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 15;
      const curMin = Math.floor(cur / 60);
      const curSec = Math.floor(cur % 60);
      const durMin = Math.floor(dur / 60);
      const durSec = Math.floor(dur % 60);
      setCurrentTime(`${curMin}:${curSec < 10 ? '0' : ''}${curSec}`);
      setDuration(`${durMin}:${durSec < 10 ? '0' : ''}${durSec}`);
      setProgress((cur / dur) * 100);
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Glow Halo */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#31AAA9]/20 via-[#F8E0A4]/25 to-[#A82020]/15 rounded-[60px] blur-2xl opacity-70 pointer-events-none" />

      {/* iPhone Hardware Frame */}
      <div className="relative w-[320px] sm:w-[350px] md:w-[370px] h-[660px] sm:h-[700px] bg-gradient-to-b from-[#2E2E32] via-[#1F1F23] to-[#141416] p-3 rounded-[54px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_0_2px_rgba(0,0,0,0.8)] border border-[#F8E0A4]/20 transition-all duration-300">
        
        {/* Hardware Side Buttons */}
        <div className="absolute -left-[3px] top-[115px] w-[3px] h-[26px] bg-[#3A3A3E] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[155px] w-[3px] h-[50px] bg-[#3A3A3E] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[215px] w-[3px] h-[50px] bg-[#3A3A3E] rounded-l-sm" />
        <div className="absolute -right-[3px] top-[165px] w-[3px] h-[75px] bg-[#3A3A3E] rounded-r-sm" />

        {/* OLED Screen Area */}
        <div className="relative w-full h-full bg-[#050505] rounded-[44px] overflow-hidden flex flex-col justify-between border border-black/40">
          
          {/* iOS Status Bar */}
          <div className="relative z-30 pt-3 px-7 flex items-center justify-between text-white text-xs font-semibold tracking-tight">
            <span>9:41</span>

            {/* Dynamic Island */}
            <div className="w-28 h-7 bg-black rounded-full flex items-center justify-between px-3 shadow-[0_0_8px_rgba(0,0,0,0.9)] cursor-pointer hover:scale-105 transition-transform">
              {/* Camera sensor */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1E] border border-[#2D2D32] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#0D2434]" />
              </div>
              {/* Mic / Live Indicator */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#31AAA9] animate-pulse" />
                <span className="text-[9px] text-[#F8E0A4] font-bold tracking-wider">CLOAKED</span>
              </div>
            </div>

            {/* Battery & Signal */}
            <div className="flex items-center space-x-1.5 text-white/90">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/>
              </svg>
              <div className="w-5 h-2.5 border border-white/80 rounded-sm p-0.5 flex items-center">
                <div className="w-3 h-full bg-white rounded-xs" />
              </div>
            </div>
          </div>

          {/* Top iOS App Navigation Bar */}
          <div className="relative z-20 px-5 pt-3 flex items-center justify-between text-white/90">
            <button className="flex items-center space-x-1 text-xs font-medium text-white/80 hover:text-white transition-colors">
              <span className="text-base leading-none">‹</span>
              <span>Videos</span>
            </button>
            <div className="text-center">
              <p className="text-[11px] font-semibold text-white/90 tracking-wide">Today</p>
              <p className="text-[9px] text-white/50">2:45 PM</p>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <button 
                onClick={() => setShowMetadataSheet(!showMetadataSheet)}
                className={`p-1.5 rounded-full transition-all ${showMetadataSheet ? 'bg-[#31AAA9] text-white shadow-md' : 'hover:bg-white/10'}`}
                title="Toggle iOS Inspector Sheet"
              >
                <FiInfo className="w-3.5 h-3.5" />
              </button>
              <FiHeart className="w-3.5 h-3.5 hover:text-[#A82020] transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Center Video Viewport */}
          <div className="relative flex-1 mx-3 my-2 rounded-3xl overflow-hidden bg-gradient-to-b from-[#180A0A] via-[#101014] to-[#0A0A0C] flex items-center justify-center group">
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                loop
                playsInline
                muted
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />
            ) : (
              /* Simulated Active Video Poster */
              <div 
                onClick={onUploadClick}
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#31AAA9]/20 via-[#180808]/60 to-[#0A0505]"
              >
                {/* Background ambient pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F8E0A4_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#A82020] to-[#31AAA9] p-0.5 shadow-[0_8px_25px_rgba(49,170,169,0.3)] mb-4 group-hover:scale-105 transition-transform flex items-center justify-center">
                  <div className="w-full h-full bg-[#180606] rounded-2xl flex items-center justify-center">
                    <FiPlay className="w-7 h-7 text-[#F8E0A4] ml-1" />
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#F8E0A4] text-[#180606] mb-2 uppercase tracking-wider">
                    {presetName}
                  </span>
                  <h4 className="text-white text-sm font-bold tracking-tight">Tap to Load Video</h4>
                  <p className="text-white/50 text-xs mt-1 max-w-[200px]">Simulate authentic {make} camera roll playback</p>
                </div>
              </div>
            )}

            {/* Play/Pause Overlay Control */}
            {videoUrl && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {isPlaying ? <FiPause className="w-5 h-5" /> : <FiPlay className="w-5 h-5 ml-0.5" />}
              </button>
            )}

            {/* Floating Quick Tag Chip */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center gap-1.5 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#31AAA9]" />
              <span>{activeCategory} Sensor</span>
            </div>

            {/* Video Timeline Scrubber */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center gap-2 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-[9px] text-white/70">
              <span>{currentTime}</span>
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#31AAA9] to-[#F8E0A4] rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{duration}</span>
            </div>
          </div>

          {/* Slide-Up iOS Inspector Metadata Sheet */}
          {showMetadataSheet && (
            <div className="relative z-30 mx-2 mb-2 p-3.5 rounded-3xl bg-[#1C1C1E]/95 backdrop-blur-xl border border-white/10 text-white text-left shadow-2xl transition-all duration-300">
              {/* Grab Handle */}
              <div className="w-9 h-1 bg-white/30 rounded-full mx-auto mb-2.5" />

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-xs font-bold text-white tracking-tight">{presetName}</h5>
                    <FiCheckCircle className="w-3 h-3 text-[#31AAA9]" />
                  </div>
                  <p className="text-[10px] text-white/60 mt-0.5">
                    Main Camera • 24 mm ƒ/1.78
                  </p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#31AAA9]/20 text-[#5DE2E0] border border-[#31AAA9]/30 uppercase tracking-wider">
                  NATIVE EXIF
                </span>
              </div>

              {/* Technical Spec Matrix */}
              <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2 border-t border-white/10">
                <div className="bg-white/5 p-1.5 rounded-xl text-center border border-white/5">
                  <span className="block text-[8px] text-white/40 uppercase font-semibold">Format</span>
                  <span className="text-[10px] font-bold text-[#F8E0A4]">4K ProRes</span>
                </div>
                <div className="bg-white/5 p-1.5 rounded-xl text-center border border-white/5">
                  <span className="block text-[8px] text-white/40 uppercase font-semibold">Frame Rate</span>
                  <span className="text-[10px] font-bold text-white">{frameRate} fps</span>
                </div>
                <div className="bg-white/5 p-1.5 rounded-xl text-center border border-white/5">
                  <span className="block text-[8px] text-white/40 uppercase font-semibold">Software</span>
                  <span className="text-[10px] font-bold text-white truncate block">{software}</span>
                </div>
              </div>

              {/* Geolocation Tag Badge */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] text-white/70 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 truncate">
                  <MdLocationOn className="w-3.5 h-3.5 text-[#A82020] flex-shrink-0" />
                  <span className="truncate">Cupertino, CA • 37.3346° N, 122.0090° W</span>
                </div>
                <span className="text-[9px] font-bold text-[#31AAA9]">CLOAKED</span>
              </div>
            </div>
          )}

          {/* iOS Bottom Navigation & Home Indicator */}
          <div className="relative z-20 pb-2">
            <div className="w-32 h-1 bg-white/60 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
