'use client';

import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiVideo, FiHardDrive, FiClock, FiDollarSign, FiInfo, FiDownload, FiShare2, FiTrash2, FiSearch } from 'react-icons/fi';

// Types for our video data
type VideoStatus = 'completed' | 'processing' | 'failed';

interface Video {
  id: string;
  title: string;
  status: VideoStatus;
  processedDate: string;
  size: string;
  thumbnailUrl?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | VideoStatus>('all');
  
  // Sample video data - replace with actual API call
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Sample Video 1',
      status: 'completed',
      processedDate: 'Feb 14, 2024',
      size: '2.5 MB'
    },
    {
      id: '2',
      title: 'Processing Video',
      status: 'processing',
      processedDate: 'Feb 14, 2024',
      size: '3.1 MB'
    },
    {
      id: '3',
      title: 'Failed Upload',
      status: 'failed',
      processedDate: 'Feb 14, 2024',
      size: '1.8 MB'
    }
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/signin');
    }
    if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status]);

  // Filter videos based on search term and status
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle video actions
  const handleDownload = (videoId: string) => {
    console.log('Downloading video:', videoId);
    // Implement download logic
  };

  const handleShare = (videoId: string) => {
    console.log('Sharing video:', videoId);
    // Implement share logic
  };

  const handleDelete = (videoId: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter(v => v.id !== videoId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
        {/* Header */}
        <div className="card p-8 mb-8 border-2 border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {session?.user?.name?.[0] || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome back, {session?.user?.name}!
              </h1>
              <p className="text-gray-600">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="card p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Videos</p>
                <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">0</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200">
                <FiVideo className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">0 MB</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200">
                <FiHardDrive className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Upload</p>
                <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Never</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200">
                <FiClock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200">
            <p className="text-sm font-medium text-gray-600 mb-3">Credits</p>
            <div className="flex items-center">
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-500">Premium</span>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">0</p>
              </div>
              <div className="mx-4 flex flex-col items-center justify-center">
                <div className="h-12 w-px bg-gray-400"></div>
                <div className="w-4 h-px bg-gray-400 my-1"></div>
                <div className="h-12 w-px bg-gray-400"></div>
              </div>
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs text-gray-500">Free</span>
                  <div className="group relative">
                    <FiInfo className="w-3 h-3 text-gray-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      Receive 10 free credits every month
                    </div>
                  </div>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">0</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200 mx-auto mt-3">
              <FiDollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Video Management Section */}
        <div className="card p-8 border-2 border-gray-200">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Videos
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | VideoStatus)}
                className="w-full sm:w-auto border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="all">All Videos</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.length > 0 ? (
              filteredVideos.map(video => (
                <div key={video.id} className="border-2 border-gray-300 rounded-lg overflow-hidden hover:border-blue-500 transition-colors group">
                  <div className="aspect-video bg-gray-100 relative border-b-2 border-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiVideo className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className={`absolute bottom-2 right-2 text-white text-xs px-2 py-1 rounded ${
                      video.status === 'completed' ? 'bg-blue-500' :
                      video.status === 'processing' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{video.title}</h3>
                    <p className="text-sm text-gray-500 mb-3 truncate">Processed on {video.processedDate}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 truncate max-w-[30%]">{video.size}</div>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                          title="Download"
                          onClick={() => handleDownload(video.id)}
                        >
                          <FiDownload className="w-4 h-4 text-gray-600 hover:text-blue-500" />
                        </button>
                        <button 
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                          title="Share"
                          onClick={() => handleShare(video.id)}
                        >
                          <FiShare2 className="w-4 h-4 text-gray-600 hover:text-blue-500" />
                        </button>
                        <button 
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                          title="Delete"
                          onClick={() => handleDelete(video.id)}
                        >
                          <FiTrash2 className="w-4 h-4 text-red-400 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center">
                <FiVideo className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center mb-4">
                  {videos.length === 0 
                    ? "Upload your first video to get started" 
                    : "No videos match your search criteria"}
                </p>
                {videos.length === 0 && (
                  <Link href="/upload">
                    <button className="btn-primary">Upload Video</button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
