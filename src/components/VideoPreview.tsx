'use client';

import { useState, useEffect, useRef } from 'react';
import { getVideoMetadata, formatFileSize } from '@/lib/videoMetadata';
import type { DevicePreset } from '@/lib/devicePresets';

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
}

interface VideoPreviewProps {
  file: File;
  devicePreset?: DevicePreset;
  onConfirm: () => void;
  onCancel: () => void;
}

declare global {
  interface HTMLVideoElement {
    captureStream(): MediaStream;
  }
}

export default function VideoPreview({ file, devicePreset, onConfirm, onCancel }: VideoPreviewProps) {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedMetadata, setEditedMetadata] = useState<Partial<VideoMetadata>>({});
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
          
          // Try to get the actual frame rate from the track settings
          if (settings.frameRate) {
            resolve(settings.frameRate);
            return;
          }
          
          // Try to get it from capabilities
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
        objectUrl = URL.createObjectURL(file);
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
          // Get audio codec from MIME type
          const mimeCodecs = file.type.split(';')[1]?.match(/codecs="([^"]+)"/)?.[1];
          const [videoCodec, audioCodec] = mimeCodecs?.split(',').map(codec => codec?.trim()) || [];

          // Get audio track settings
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

        const bitrate = file.size * 8 / video.duration;

        const mimeCodecs = file.type.split(';')[1]?.match(/codecs="([^"]+)"/)?.[1];
        const [videoCodec] = mimeCodecs?.split(',') || [];

        const newMetadata: VideoMetadata = {
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          fileType: file.type,
          lastModified: new Date(file.lastModified).toLocaleString(),
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          aspectRatio: video.videoWidth / video.videoHeight,
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
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.pause(); // Ensure video is paused when metadata loads
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', () => {
      // Remove muted attribute when user explicitly plays the video
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Video Preview */}
      <div className="relative aspect-video max-w-3xl mx-auto bg-black rounded-xl overflow-hidden border-2 border-gray-400">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          preload="metadata"
          className="w-full h-full"
          style={devicePreset ? {
            maxWidth: devicePreset.resolution ? `${parseInt(devicePreset.resolution.split('x')[0])}px` : 'none',
            maxHeight: devicePreset.resolution ? `${parseInt(devicePreset.resolution.split('x')[1])}px` : 'none',
          } : undefined}
        />
      </div>

      {/* Metadata Display */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border-2 border-gray-400">
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Video Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Information */}
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-400">
              <h4 className="font-medium text-gray-900 mb-4">File Details</h4>
              <dl className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <dt className="text-gray-500 shrink-0">Name</dt>
                  <dd className="text-gray-900 text-right break-all">{metadata?.fileName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Size</dt>
                  <dd className="text-gray-900">{metadata?.fileSize}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Type</dt>
                  <dd className="text-gray-900">{metadata?.fileType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Modified</dt>
                  <dd className="text-gray-900">{metadata?.lastModified}</dd>
                </div>
              </dl>
            </div>

            {/* Video Specifications */}
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-400">
              <h4 className="font-medium text-gray-900 mb-4">Video Specifications</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Duration</dt>
                  <dd className="text-gray-900">{formatDuration(metadata?.duration || 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Resolution</dt>
                  <dd className="text-gray-900">{metadata?.width} × {metadata?.height}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Aspect Ratio</dt>
                  <dd className="text-gray-900">{formatAspectRatio(metadata?.width || 0, metadata?.height || 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Frame Rate</dt>
                  <dd className="text-gray-900">{metadata?.frameRate || 'Unknown'} fps</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Bitrate</dt>
                  <dd className="text-gray-900">
                    {metadata?.bitrate ? `${(metadata.bitrate / 1000000).toFixed(2)} Mbps` : 'Unknown'}
                  </dd>
                </div>
                {metadata?.videoCodec && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Video Codec</dt>
                    <dd className="text-gray-900">{metadata.videoCodec}</dd>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h5 className="font-medium text-gray-900 mb-3">Audio Specifications</h5>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Audio Codec</dt>
                    <dd className="text-gray-900">{metadata?.audioCodec || 'Not available'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Audio Channels</dt>
                    <dd className="text-gray-900">
                      {metadata?.audioChannels ? 
                        (metadata.audioChannels === 1 ? 'Mono' : 
                         metadata.audioChannels === 2 ? 'Stereo' : 
                         `${metadata.audioChannels} channels`) : 
                        'Not available'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Sample Rate</dt>
                    <dd className="text-gray-900">
                      {metadata?.audioSampleRate ? 
                        `${(metadata.audioSampleRate / 1000).toFixed(1)} kHz` : 
                        'Not available'}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Target Device Information */}
            {devicePreset && (
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-400">
                <h4 className="font-medium text-gray-900 mb-4">Target Device Settings</h4>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Device</dt>
                    <dd className="text-gray-900">{devicePreset.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Target Resolution</dt>
                    <dd className="text-gray-900">{devicePreset.resolution}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Target Frame Rate</dt>
                    <dd className="text-gray-900">{devicePreset.frameRate} fps</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-400 flex justify-end space-x-4 rounded-b-xl">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Edit Metadata
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Proceed with Upload
            </button>
          </div>
        </div>
      </div>

      {/* Edit Metadata Modal */}
      {showEditModal && metadata && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Video Metadata</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* File Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">File Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={editedMetadata.fileName || metadata.fileName}
                        onChange={(e) => setEditedMetadata({ ...editedMetadata, fileName: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        value={editedMetadata.fileType || metadata.fileType}
                        onChange={(e) => setEditedMetadata({ ...editedMetadata, fileType: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="video/mp4">MP4</option>
                        <option value="video/webm">WebM</option>
                        <option value="video/x-matroska">MKV</option>
                        <option value="video/quicktime">MOV</option>
                        <option value="video/x-msvideo">AVI</option>
                        <option value="video/x-flv">FLV</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Modified Date</label>
                      <input
                        type="datetime-local"
                        value={editedMetadata.lastModified ? new Date(editedMetadata.lastModified).toISOString().slice(0, 16) : new Date(metadata.lastModified).toISOString().slice(0, 16)}
                        onChange={(e) => setEditedMetadata({ ...editedMetadata, lastModified: new Date(e.target.value).toISOString() })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Video Specifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Video Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Resolution Width</label>
                      <input
                        type="number"
                        value={editedMetadata.width || metadata.width}
                        onChange={(e) => {
                          const width = Number(e.target.value);
                          const height = editedMetadata.height || metadata.height;
                          setEditedMetadata({
                            ...editedMetadata,
                            width,
                            aspectRatio: width / height
                          });
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Resolution Height</label>
                      <input
                        type="number"
                        value={editedMetadata.height || metadata.height}
                        onChange={(e) => {
                          const height = Number(e.target.value);
                          const width = editedMetadata.width || metadata.width;
                          setEditedMetadata({
                            ...editedMetadata,
                            height,
                            aspectRatio: width / height
                          });
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
                      <select
                        value={editedMetadata.aspectRatio || metadata.aspectRatio}
                        onChange={(e) => {
                          const ratio = Number(e.target.value);
                          const height = editedMetadata.height || metadata.height;
                          setEditedMetadata({
                            ...editedMetadata,
                            aspectRatio: ratio,
                            width: Math.round(height * ratio)
                          });
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={16/9}>16:9</option>
                        <option value={4/3}>4:3</option>
                        <option value={21/9}>21:9</option>
                        <option value={1}>1:1</option>
                        <option value={3/2}>3:2</option>
                        <option value={9/16}>9:16 (Portrait)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Frame Rate (fps)</label>
                      <select
                        value={editedMetadata.frameRate || metadata.frameRate}
                        onChange={(e) => setEditedMetadata({ ...editedMetadata, frameRate: Number(e.target.value) })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="23.976">23.976 (Film)</option>
                        <option value="24">24 (Cinema)</option>
                        <option value="25">25 (PAL)</option>
                        <option value="29.97">29.97 (NTSC)</option>
                        <option value="30">30</option>
                        <option value="48">48</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Video Speed (×)</label>
                      <select
                        value={editedMetadata.speed || 1}
                        onChange={(e) => {
                          const speed = Number(e.target.value);
                          setEditedMetadata({
                            ...editedMetadata,
                            speed,
                            duration: metadata.duration / speed
                          });
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0.25">0.25× (Slow)</option>
                        <option value="0.5">0.5× (Slow)</option>
                        <option value="0.75">0.75× (Slow)</option>
                        <option value="1">1× (Normal)</option>
                        <option value="1.25">1.25× (Fast)</option>
                        <option value="1.5">1.5× (Fast)</option>
                        <option value="2">2× (Fast)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input
                        type="text"
                        value={formatDuration(editedMetadata.duration || metadata.duration)}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Audio Specifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Audio Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Audio Codec</label>
                      <input
                        type="text"
                        value={editedMetadata.audioCodec || metadata.audioCodec || ''}
                        onChange={(e) => setEditedMetadata({ ...editedMetadata, audioCodec: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Audio Channels</label>
                      <select
                        value={editedMetadata.audioChannels || metadata.audioChannels || ''}
                        onChange={(e) => setEditedMetadata({ ...editedMetadata, audioChannels: Number(e.target.value) })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">Mono</option>
                        <option value="2">Stereo</option>
                        <option value="6">5.1 Surround</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sample Rate (kHz)</label>
                      <select
                        value={editedMetadata.audioSampleRate || metadata.audioSampleRate || ''}
                        onChange={(e) => setEditedMetadata({ ...editedMetadata, audioSampleRate: Number(e.target.value) })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="44100">44.1</option>
                        <option value="48000">48.0</option>
                        <option value="96000">96.0</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Apply metadata changes
                    setMetadata({ ...metadata, ...editedMetadata });
                    setShowEditModal(false);
                  }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
