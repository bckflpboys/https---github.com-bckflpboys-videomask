'use client';

import { useState, useEffect, useRef } from 'react';
import { getVideoMetadata, getVideoFrameRate } from '@/lib/videoMetadata';
import type { DevicePreset } from '@/lib/devicePresets';

interface VideoPreviewProps {
  file: File;
  devicePreset?: DevicePreset;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function VideoPreview({ file, devicePreset, onConfirm, onCancel }: VideoPreviewProps) {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let objectUrl = '';
    
    const loadVideoData = async () => {
      try {
        // Create video URL
        objectUrl = URL.createObjectURL(file);
        setVideoUrl(objectUrl);

        // Get metadata
        const meta = await getVideoMetadata(file);
        
        // Get frame rate (optional, as it requires playing the video)
        const tempVideo = document.createElement('video');
        tempVideo.muted = true;
        tempVideo.src = objectUrl;
        const frameRate = await getVideoFrameRate(tempVideo);
        tempVideo.remove(); // Clean up the temporary video element
        
        setMetadata({
          ...meta,
          frameRate
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading video:', error);
        setLoading(false);
      }
    };

    loadVideoData();

    // Cleanup function
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
                <div className="flex justify-between">
                  <dt className="text-gray-500">Name</dt>
                  <dd className="text-gray-900">{metadata.fileName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Size</dt>
                  <dd className="text-gray-900">{metadata.fileSize}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Type</dt>
                  <dd className="text-gray-900">{metadata.fileType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Modified</dt>
                  <dd className="text-gray-900">{metadata.lastModified}</dd>
                </div>
              </dl>
            </div>

            {/* Video Specifications */}
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-400">
              <h4 className="font-medium text-gray-900 mb-4">Video Specifications</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Duration</dt>
                  <dd className="text-gray-900">{metadata.duration.toFixed(2)}s</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Resolution</dt>
                  <dd className="text-gray-900">{metadata.width} × {metadata.height}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Aspect Ratio</dt>
                  <dd className="text-gray-900">{metadata.aspectRatio.toFixed(2)}</dd>
                </div>
                {metadata.frameRate && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Frame Rate</dt>
                    <dd className="text-gray-900">{metadata.frameRate} fps</dd>
                  </div>
                )}
              </dl>
            </div>
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
