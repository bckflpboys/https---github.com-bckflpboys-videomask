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
      let frameCount = 0;
      let lastTime = 0;
      let frameTimes: number[] = [];
      
      const checkFrame = () => {
        if (!video.paused && !video.ended) {
          frameCount++;
          const time = video.currentTime;
          if (lastTime !== time) {
            frameTimes.push(1000 / (time - lastTime));
            lastTime = time;
            
            if (frameTimes.length >= 10 || time >= 1) {
              const avgFrameRate = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
              video.pause();
              resolve(Math.round(avgFrameRate));
              return;
            }
          }
          requestAnimationFrame(checkFrame);
        }
      };

      video.play().then(() => {
        requestAnimationFrame(checkFrame);
      }).catch(() => {
        resolve(undefined);
      });
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
          // Check for captureStream/mozCaptureStream support
          const captureMethod = video.captureStream || (video as any).mozCaptureStream;
          if (captureMethod) {
            const stream = captureMethod.call(video);
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack && 'getSettings' in audioTrack) {
              const settings = audioTrack.getSettings();
              audioInfo = {
                audioChannels: settings.channelCount || undefined,
                audioSampleRate: settings.sampleRate || undefined,
              };
            }
          }
        } catch (e) {
          console.warn('Could not get audio metadata:', e);
        }

        const bitrate = file.size * 8 / video.duration;

        const mimeCodecs = file.type.split(';')[1]?.match(/codecs="([^"]+)"/)?.[1];
        const [videoCodec, audioCodec] = mimeCodecs?.split(',') || [];

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
          audioCodec,
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
              </dl>
            </div>

            {/* Audio Specifications */}
            {(metadata?.audioCodec || metadata?.audioChannels || metadata?.audioSampleRate) && (
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-400">
                <h4 className="font-medium text-gray-900 mb-4">Audio Specifications</h4>
                <dl className="space-y-2">
                  {metadata?.audioCodec && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Audio Codec</dt>
                      <dd className="text-gray-900">{metadata.audioCodec}</dd>
                    </div>
                  )}
                  {metadata?.audioChannels && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Audio Channels</dt>
                      <dd className="text-gray-900">
                        {metadata.audioChannels === 1 ? 'Mono' : 
                         metadata.audioChannels === 2 ? 'Stereo' : 
                         `${metadata.audioChannels} channels`}
                      </dd>
                    </div>
                  )}
                  {metadata?.audioSampleRate && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Sample Rate</dt>
                      <dd className="text-gray-900">{(metadata.audioSampleRate / 1000).toFixed(1)} kHz</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
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
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium border-2 border-gray-400 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium border-2 border-blue-700"
          >
            Proceed with Upload
          </button>
        </div>
      </div>
    </div>
  );
}
