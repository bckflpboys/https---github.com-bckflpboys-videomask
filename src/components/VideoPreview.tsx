'use client';

import { useState, useEffect } from 'react';
import { getVideoMetadata, getVideoFrameRate } from '@/lib/videoMetadata';
import type { DevicePreset } from '@/lib/devicePresets';

interface VideoPreviewProps {
  file: File;
  devicePreset: DevicePreset;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function VideoPreview({ file, devicePreset, onConfirm, onCancel }: VideoPreviewProps) {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideoData = async () => {
      try {
        // Create video URL
        const url = URL.createObjectURL(file);
        setVideoUrl(url);

        // Get metadata
        const meta = await getVideoMetadata(file);
        
        // Get frame rate (optional, as it requires playing the video)
        const videoElement = document.createElement('video');
        videoElement.src = url;
        const frameRate = await getVideoFrameRate(videoElement);
        
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

    // Cleanup
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [file]);

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
      <div className="relative aspect-video max-w-3xl mx-auto bg-black rounded-xl overflow-hidden">
        <video
          src={videoUrl}
          controls
          className="w-full h-full"
          style={{
            maxWidth: devicePreset.resolution ? `${parseInt(devicePreset.resolution.split('x')[0])}px` : 'none',
            maxHeight: devicePreset.resolution ? `${parseInt(devicePreset.resolution.split('x')[1])}px` : 'none',
          }}
        />
      </div>

      {/* Metadata Display */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">File Details</h4>
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
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Video Specifications</h4>
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
          <div className="mt-6 pt-6 border-t border-gray-200">
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
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Proceed with Upload
          </button>
        </div>
      </div>
    </div>
  );
}
