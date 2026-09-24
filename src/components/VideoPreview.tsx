'use client';

import { useState, useEffect, useRef } from 'react';
import { getVideoMetadata, formatFileSize } from '@/lib/videoMetadata';
import { processVideo } from '@/lib/videoProcessor';
import type { DevicePreset } from '@/lib/devicePresets';
import { 
  FiFilm, 
  FiHardDrive, 
  FiClock, 
  FiSliders, 
  FiVolume2, 
  FiCheck, 
  FiX, 
  FiEdit3, 
  FiUploadCloud,
  FiActivity,
  FiZap
} from 'react-icons/fi';
import { MdCameraAlt, MdOutlineTune, MdAspectRatio } from 'react-icons/md';

interface VideoMetadata {
  fileName: string;
  fileSize: string;
  fileType: string;
  lastModified: string;
  duration: number;
  width: number;
  height: number;
  aspectRatio: number;
  frameRate?: number;
  bitrate?: number;
  videoCodec?: string;
  audioCodec?: string;
  audioChannels?: number;
  audioSampleRate?: number;
  speed?: number;
  resizeMode?: ResizeMode;
}

interface VideoPreviewProps {
  file: File;
  devicePreset?: DevicePreset;
  onConfirm: (file: File) => void;
  onCancel: () => void;
}

declare global {
  interface HTMLVideoElement {
    captureStream(): MediaStream;
  }
}

type ResizeMode = 'stretch' | 'crop' | 'letterbox';
type InspectorTab = 'video' | 'file' | 'audio' | 'preset';

export default function VideoPreview({ file, devicePreset, onConfirm, onCancel }: VideoPreviewProps) {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedMetadata, setEditedMetadata] = useState<Partial<VideoMetadata>>({});
  const [processingMetadata, setProcessingMetadata] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File>(file);
  const [activeTab, setActiveTab] = useState<InspectorTab>('video');
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatDuration = (seconds: number) => {
    const minutes = (seconds / 60).toFixed(2);
    return `${seconds.toFixed(2)}s (${minutes} min)`;
  };

  const formatAspectRatio = (width: number, height: number) => {
    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };
    const divisor = gcd(width, height);
    const ratioWidth = width / divisor;
    const ratioHeight = height / divisor;
    return `${Math.round(ratioWidth)}:${Math.round(ratioHeight)}`;
  };

  const getVideoFrameRate = async (video: HTMLVideoElement): Promise<number | undefined> => {
    return new Promise((resolve) => {
      try {
        const stream = video.captureStream();
        const track = stream.getVideoTracks()[0];
        
        if (track) {
          const capabilities = track.getCapabilities();
          const settings = track.getSettings();
          
          if (settings.frameRate) {
            resolve(settings.frameRate);
            return;
          }
          
          if (capabilities.frameRate && typeof capabilities.frameRate !== 'object') {
            resolve(capabilities.frameRate);
            return;
          }
        }
        resolve(undefined);
      } catch (e) {
        console.warn('Could not determine frame rate:', e);
        resolve(undefined);
      }
    });
  };

  useEffect(() => {
    let objectUrl = '';
    
    const loadVideoData = async () => {
      try {
        objectUrl = URL.createObjectURL(currentFile);
        setVideoUrl(objectUrl);

        const video = document.createElement('video');
        video.preload = 'metadata';
        video.muted = true;
        video.src = objectUrl;

        await new Promise<void>((resolve) => {
          video.onloadedmetadata = () => resolve();
        });

        const frameRate = await getVideoFrameRate(video);

        let audioInfo = {};
        try {
          const mimeCodecs = currentFile.type.split(';')[1]?.match(/codecs="([^"]+)"/)?.[1];
          const [videoCodec, audioCodec] = mimeCodecs?.split(',').map(codec => codec?.trim()) || [];

          const audioContext = new AudioContext();
          const mediaElement = audioContext.createMediaElementSource(video);
          audioInfo = {
            audioCodec: audioCodec || undefined,
            audioChannels: mediaElement.channelCount || undefined,
            audioSampleRate: audioContext.sampleRate || undefined,
          };
          audioContext.close();
        } catch (e) {
          console.warn('Could not get audio metadata:', e);
        }

        const bitrate = currentFile.size * 8 / (video.duration || 1);

        const mimeCodecs = currentFile.type.split(';')[1]?.match(/codecs="([^"]+)"/)?.[1];
        const [videoCodec] = mimeCodecs?.split(',') || [];

        const newMetadata: VideoMetadata = {
          fileName: currentFile.name,
          fileSize: formatFileSize(currentFile.size),
          fileType: currentFile.type,
          lastModified: new Date(currentFile.lastModified).toLocaleString(),
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          aspectRatio: video.videoWidth / (video.videoHeight || 1),
          frameRate,
          bitrate,
          videoCodec,
          ...audioInfo
        };

        setMetadata(newMetadata);
        setLoading(false);

        video.remove();
      } catch (error) {
        console.error('Error loading video:', error);
        setLoading(false);
      }
    };

    loadVideoData();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [currentFile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.pause();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', () => {
      video.muted = false;
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const handleCancel = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
    onCancel();
  };

  const handleSaveChanges = async () => {
    if (!metadata) return;
    
    setProcessingMetadata(true);
    setProcessingError(null);
    setProcessingProgress(0);
    
    try {
      const updatedMetadata = { ...metadata, ...editedMetadata };
      const processedFile = await processVideo(currentFile, updatedMetadata, (progress) => {
        setProcessingProgress(progress);
      });
      
      setCurrentFile(processedFile);
      setMetadata(updatedMetadata);
      setShowEditModal(false);
      
    } catch (error) {
      console.error('Error processing video:', error);
      setProcessingError('Failed to process video. Please try again.');
    } finally {
      setProcessingMetadata(false);
      setProcessingProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/90 backdrop-blur-xl rounded-[32px] border border-black/[0.08] shadow-lg">
        <div className="w-10 h-10 rounded-full border-3 border-[#31AAA9]/20 border-t-[#31AAA9] animate-spin mb-3"></div>
        <p className="text-xs font-semibold text-gray-600">Analyzing video stream & atoms...</p>
      </div>
    );
  }

  return (
    <div className="apple-card p-6 sm:p-8 space-y-6 text-left max-w-4xl mx-auto">
      
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#31AAA9]/15 text-[#31AAA9] flex items-center justify-center">
            <FiFilm className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#180606] leading-tight">Video Inspector & Cloak Ready</h3>
            <p className="text-xs text-gray-500">{metadata?.fileName}</p>
          </div>
        </div>

        {devicePreset && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EC] border border-[#F8E0A4] text-[11px] font-bold text-[#6C1A1A]">
            <MdCameraAlt className="w-3.5 h-3.5 text-[#A82020]" />
            <span>Target: {devicePreset.name}</span>
          </div>
        )}
      </div>

      {/* Video Viewport Container */}
      <div className="relative aspect-video max-w-3xl mx-auto bg-black rounded-[24px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.25)] border border-black/20">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          preload="metadata"
          className="w-full h-full object-contain"
          style={devicePreset ? {
            maxWidth: devicePreset.resolution ? `${parseInt(devicePreset.resolution.split('x')[0])}px` : 'none',
            maxHeight: devicePreset.resolution ? `${parseInt(devicePreset.resolution.split('x')[1])}px` : 'none',
          } : undefined}
        />
      </div>

      {/* Apple Segmented Controls for Metadata Categories */}
      <div className="flex justify-center">
        <div className="apple-segmented-bar p-1">
          <button
            onClick={() => setActiveTab('video')}
            className={`apple-segmented-item flex items-center gap-1.5 ${
              activeTab === 'video' ? 'apple-segmented-active' : 'apple-segmented-inactive'
            }`}
          >
            <MdAspectRatio className="w-3.5 h-3.5" />
            <span>Video Specs</span>
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`apple-segmented-item flex items-center gap-1.5 ${
              activeTab === 'file' ? 'apple-segmented-active' : 'apple-segmented-inactive'
            }`}
          >
            <FiHardDrive className="w-3.5 h-3.5" />
            <span>File Details</span>
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`apple-segmented-item flex items-center gap-1.5 ${
              activeTab === 'audio' ? 'apple-segmented-active' : 'apple-segmented-inactive'
            }`}
          >
            <FiVolume2 className="w-3.5 h-3.5" />
            <span>Audio Track</span>
          </button>
          {devicePreset && (
            <button
              onClick={() => setActiveTab('preset')}
              className={`apple-segmented-item flex items-center gap-1.5 ${
                activeTab === 'preset' ? 'apple-segmented-active' : 'apple-segmented-inactive'
              }`}
            >
              <MdCameraAlt className="w-3.5 h-3.5" />
              <span>Target Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-5 rounded-[22px] bg-[#FAF9F6] border border-black/[0.05]">
        {activeTab === 'video' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Resolution</span>
              <span className="text-sm font-bold text-[#180606]">{metadata?.width} × {metadata?.height}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Aspect Ratio</span>
              <span className="text-sm font-bold text-[#180606]">{formatAspectRatio(metadata?.width || 0, metadata?.height || 0)}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Frame Rate</span>
              <span className="text-sm font-bold text-[#31AAA9]">{metadata?.frameRate || '30'} FPS</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Duration</span>
              <span className="text-sm font-bold text-[#180606]">{formatDuration(metadata?.duration || 0)}</span>
            </div>
          </div>
        )}

        {activeTab === 'file' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-white rounded-xl border border-black/[0.04] col-span-2">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Filename</span>
              <span className="text-sm font-bold text-[#180606] truncate block">{metadata?.fileName}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Size</span>
              <span className="text-sm font-bold text-[#180606]">{metadata?.fileSize}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Format</span>
              <span className="text-sm font-bold text-[#180606]">{metadata?.fileType.split('/')[1]?.toUpperCase() || 'MP4'}</span>
            </div>
          </div>
        )}

        {activeTab === 'audio' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Audio Codec</span>
              <span className="text-sm font-bold text-[#180606]">{metadata?.audioCodec || 'AAC'}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Channels</span>
              <span className="text-sm font-bold text-[#180606]">
                {metadata?.audioChannels === 1 ? 'Mono' : metadata?.audioChannels === 2 ? 'Stereo' : 'Stereo (2ch)'}
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Sample Rate</span>
              <span className="text-sm font-bold text-[#31AAA9]">
                {metadata?.audioSampleRate ? `${(metadata.audioSampleRate / 1000).toFixed(1)} kHz` : '48.0 kHz'}
              </span>
            </div>
          </div>
        )}

        {activeTab === 'preset' && devicePreset && (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Target Device</span>
              <span className="text-sm font-bold text-[#180606]">{devicePreset.name}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Target Resolution</span>
              <span className="text-sm font-bold text-[#180606]">{devicePreset.resolution}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/[0.04]">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Target FPS</span>
              <span className="text-sm font-bold text-[#31AAA9]">{devicePreset.frameRate} fps</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
        <button
          onClick={handleCancel}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:text-black hover:bg-black/5 transition-all text-center"
        >
          Cancel
        </button>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex-1 sm:flex-none btn-secondary !py-2.5 !px-5 text-xs !rounded-full"
          >
            <FiEdit3 className="w-3.5 h-3.5 text-[#31AAA9]" />
            <span>Customize Atoms</span>
          </button>

          <button
            onClick={() => onConfirm(currentFile)}
            className="flex-1 sm:flex-none btn-primary !py-2.5 !px-6 text-xs !rounded-full"
          >
            <FiUploadCloud className="w-4 h-4" />
            <span>Proceed with Cloak</span>
          </button>
        </div>
      </div>

      {/* Apple Edit Metadata Modal */}
      {showEditModal && metadata && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="apple-card bg-white p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-black/[0.06]">
              <div>
                <h3 className="text-xl font-bold text-[#180606]">Customize Video Atoms</h3>
                <p className="text-xs text-gray-500">Fine tune technical metadata signatures before rendering</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Output Name</label>
                  <input
                    type="text"
                    value={editedMetadata.fileName || metadata.fileName}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, fileName: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#31AAA9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Container Format</label>
                  <select
                    value={editedMetadata.fileType || metadata.fileType}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, fileType: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#31AAA9] focus:outline-none bg-white"
                  >
                    <option value="video/mp4">MP4 (Native H.264 / HEVC)</option>
                    <option value="video/quicktime">MOV (Apple ProRes)</option>
                    <option value="video/webm">WebM (VP9)</option>
                    <option value="video/x-matroska">MKV</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Width (px)</label>
                  <input
                    type="number"
                    value={editedMetadata.width || metadata?.width}
                    onChange={(e) => {
                      const width = parseInt(e.target.value) || 1920;
                      setEditedMetadata({
                        ...editedMetadata,
                        width,
                        aspectRatio: width / (editedMetadata.height || metadata?.height || 1080)
                      });
                    }}
                    className="w-full px-3.5 py-2.5 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#31AAA9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Height (px)</label>
                  <input
                    type="number"
                    value={editedMetadata.height || metadata?.height}
                    onChange={(e) => {
                      const height = parseInt(e.target.value) || 1080;
                      setEditedMetadata({
                        ...editedMetadata,
                        height,
                        aspectRatio: (editedMetadata.width || metadata?.width || 1920) / height
                      });
                    }}
                    className="w-full px-3.5 py-2.5 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#31AAA9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Resize Mode</label>
                  <select
                    value={editedMetadata.resizeMode || 'crop'}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, resizeMode: e.target.value as ResizeMode })}
                    className="w-full px-3.5 py-2.5 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#31AAA9] focus:outline-none bg-white"
                  >
                    <option value="crop">Crop to Fill (Recommended)</option>
                    <option value="letterbox">Pillar/Letterbox</option>
                    <option value="stretch">Direct Stretch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Audio Channels</label>
                  <select
                    value={editedMetadata.audioChannels || metadata.audioChannels || '2'}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, audioChannels: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#31AAA9] focus:outline-none bg-white"
                  >
                    <option value="1">Mono (1.0)</option>
                    <option value="2">Stereo (2.0)</option>
                    <option value="6">5.1 Spatial Audio</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Sample Rate</label>
                  <select
                    value={editedMetadata.audioSampleRate || metadata.audioSampleRate || '48000'}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, audioSampleRate: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 border border-black/10 rounded-xl focus:ring-2 focus:ring-[#31AAA9] focus:outline-none bg-white"
                  >
                    <option value="44100">44.1 kHz (CD Audio)</option>
                    <option value="48000">48.0 kHz (Cinema / Broadcast)</option>
                    <option value="96000">96.0 kHz (Studio Hi-Res)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error & Progress Feedback */}
            {processingMetadata && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-[#31AAA9]">
                  <span>Repatching QuickTime atoms...</span>
                  <span>{Math.round(processingProgress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#31AAA9] to-[#208382] transition-all duration-200" 
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {processingError && (
              <div className="p-3 rounded-xl bg-[#A82020]/10 text-[#A82020] text-xs font-semibold">
                {processingError}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-black/[0.06]">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                disabled={processingMetadata}
                className="btn-secondary !py-2.5 !px-5 text-xs !rounded-full"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                disabled={processingMetadata}
                className="btn-primary !py-2.5 !px-6 text-xs !rounded-full"
              >
                {processingMetadata ? 'Applying...' : 'Apply Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
