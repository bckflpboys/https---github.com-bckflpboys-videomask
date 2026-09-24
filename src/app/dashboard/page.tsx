'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { 
  FiVideo, 
  FiHardDrive, 
  FiClock, 
  FiZap, 
  FiInfo, 
  FiDownload, 
  FiShare2, 
  FiTrash2, 
  FiSearch,
  FiPlus,
  FiSliders,
  FiGrid,
  FiList,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader
} from 'react-icons/fi';
import { MdCameraAlt, MdOutlineShield, MdPhoneIphone, MdPhoneAndroid } from 'react-icons/md';

type VideoStatus = 'completed' | 'processing' | 'failed';

interface Video {
  id: string;
  title: string;
  targetDevice: string;
  status: VideoStatus;
  processedDate: string;
  size: string;
  duration: string;
  resolution: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | VideoStatus>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Summer_Vlog_Cinematic.mp4',
      targetDevice: 'iPhone 16 Pro Max',
      status: 'completed',
      processedDate: 'Today at 2:45 PM',
      size: '14.2 MB',
      duration: '0:42',
      resolution: '4K ProRes'
    },
    {
      id: '2',
      title: 'Street_Food_Tokyo_Reel.mov',
      targetDevice: 'Samsung Galaxy S24 Ultra',
      status: 'processing',
      processedDate: 'Today at 1:12 PM',
      size: '28.5 MB',
      duration: '1:15',
      resolution: '4K 60fps'
    },
    {
      id: '3',
      title: 'Workout_Tutorial_Clip.mp4',
      targetDevice: 'iPhone 15 Pro',
      status: 'failed',
      processedDate: 'Yesterday',
      size: '8.4 MB',
      duration: '0:28',
      resolution: '1080p 60fps'
    }
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.targetDevice.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownload = (videoId: string) => {
    alert(`Downloading video #${videoId} with patched EXIF metadata`);
  };

  const handleShare = (videoId: string) => {
    navigator.clipboard?.writeText(window.location.origin + `/share/${videoId}`);
    alert('Shareable link copied to clipboard!');
  };

  const handleDelete = (videoId: string) => {
    if (window.confirm('Are you sure you want to delete this video record?')) {
      setVideos(videos.filter(v => v.id !== videoId));
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6]">
        <div className="w-10 h-10 rounded-full border-3 border-[#31AAA9]/20 border-t-[#31AAA9] animate-spin mb-3"></div>
        <p className="text-xs font-semibold text-gray-500">Loading your Studio Workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#180606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Apple iOS User Banner Card */}
        <div className="apple-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#A82020] via-[#6C1A1A] to-[#31AAA9] p-1 shadow-md flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-[#180606] rounded-full flex items-center justify-center">
                <span className="text-[#F8E0A4] text-2xl font-black">
                  {session?.user?.name?.[0] || 'C'}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-[#180606] tracking-tight">
                  Welcome back, {session?.user?.name || 'Creator'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#31AAA9]/15 text-[#31AAA9]">
                  <FiCheckCircle className="w-3 h-3" />
                  <span>Pro Cloak Pass</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{session?.user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/upload"
              className="w-full sm:w-auto btn-primary !py-2.5 !px-5 text-xs !rounded-full shadow-sm hover:shadow-md"
            >
              <FiPlus className="w-4 h-4" />
              <span>Cloak New Video</span>
            </Link>
          </div>
        </div>

        {/* Apple 4-Stat Widgets Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="apple-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Total Videos</span>
              <div className="w-8 h-8 rounded-xl bg-[#31AAA9]/15 text-[#31AAA9] flex items-center justify-center">
                <FiVideo className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-[#180606]">{videos.length}</p>
            <p className="text-[11px] text-gray-500 font-medium">3 active in library</p>
          </div>

          <div className="apple-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Storage Used</span>
              <div className="w-8 h-8 rounded-xl bg-[#A82020]/15 text-[#A82020] flex items-center justify-center">
                <FiHardDrive className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-[#180606]">51.1 MB</p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#A82020] h-full rounded-full" style={{ width: '12%' }} />
            </div>
          </div>

          <div className="apple-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Algorithm Trust</span>
              <div className="w-8 h-8 rounded-xl bg-[#31AAA9]/15 text-[#31AAA9] flex items-center justify-center">
                <MdOutlineShield className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-[#31AAA9]">99.8%</p>
            <p className="text-[11px] text-green-700 font-medium">Verified native pass</p>
          </div>

          <div className="apple-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Available Credits</span>
              <div className="w-8 h-8 rounded-xl bg-[#F8E0A4]/40 text-[#6C1A1A] flex items-center justify-center">
                <FiZap className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#180606]">87</span>
              <span className="text-xs text-gray-500 font-semibold">/ 100 Pro</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Renews in 18 days</p>
          </div>

        </div>

        {/* Video Library Section with Apple Segmented Controls */}
        <div className="apple-card p-6 sm:p-8 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
            
            {/* Status Segmented Filter Bar */}
            <div className="apple-segmented-bar p-1 overflow-x-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`apple-segmented-item flex items-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'all' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <span>All</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/5">{videos.length}</span>
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`apple-segmented-item flex items-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'completed' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <FiCheckCircle className="w-3.5 h-3.5 text-[#31AAA9]" />
                <span>Completed</span>
              </button>
              <button
                onClick={() => setStatusFilter('processing')}
                className={`apple-segmented-item flex items-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'processing' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <FiLoader className="w-3.5 h-3.5 text-[#D6B563]" />
                <span>Processing</span>
              </button>
              <button
                onClick={() => setStatusFilter('failed')}
                className={`apple-segmented-item flex items-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'failed' ? 'apple-segmented-active' : 'apple-segmented-inactive'
                }`}
              >
                <FiAlertCircle className="w-3.5 h-3.5 text-[#A82020]" />
                <span>Failed</span>
              </button>
            </div>

            {/* Search & Layout toggle */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search file or device..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#F8F7F3] border border-black/5 rounded-full text-xs focus:ring-2 focus:ring-[#31AAA9] focus:outline-none transition-all"
                />
              </div>

              <div className="hidden sm:flex items-center bg-[#F3F2EE] p-1 rounded-full border border-black/5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-[#180606]' : 'text-gray-400 hover:text-black'
                  }`}
                  title="Grid View"
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-full transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-xs text-[#180606]' : 'text-gray-400 hover:text-black'
                  }`}
                  title="List View"
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Videos View */}
          {filteredVideos.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="apple-card p-5 flex flex-col justify-between hover:border-[#31AAA9] group transition-all"
                  >
                    <div>
                      {/* Video Poster Preview */}
                      <div className="aspect-video bg-[#180606] rounded-2xl relative overflow-hidden mb-4 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FiVideo className="w-5 h-5 text-[#F8E0A4]" />
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-2.5 right-2.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            video.status === 'completed'
                              ? 'bg-[#31AAA9] text-white'
                              : video.status === 'processing'
                              ? 'bg-[#F8E0A4] text-[#180606]'
                              : 'bg-[#A82020] text-white'
                          }`}>
                            <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                            <span>{video.status}</span>
                          </span>
                        </div>

                        {/* Duration Pill */}
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-mono">
                          {video.duration}
                        </div>
                      </div>

                      <h4 className="font-bold text-sm text-[#180606] truncate mb-1" title={video.title}>
                        {video.title}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                        <MdCameraAlt className="w-3.5 h-3.5 text-[#31AAA9]" />
                        <span className="font-semibold text-gray-700">{video.targetDevice}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-400 pb-3 border-b border-black/[0.05]">
                        <span>{video.processedDate}</span>
                        <span className="font-mono font-bold text-gray-600">{video.size}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                        {video.resolution}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDownload(video.id)}
                          className="p-2 rounded-full hover:bg-black/5 text-gray-600 hover:text-[#31AAA9] transition-colors"
                          title="Download Cloaked Video"
                        >
                          <FiDownload className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(video.id)}
                          className="p-2 rounded-full hover:bg-black/5 text-gray-600 hover:text-[#31AAA9] transition-colors"
                          title="Copy Share Link"
                        >
                          <FiShare2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(video.id)}
                          className="p-2 rounded-full hover:bg-black/5 text-gray-400 hover:text-[#A82020] transition-colors"
                          title="Delete Video"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List Mode */
              <div className="divide-y divide-black/[0.05]">
                {filteredVideos.map((video) => (
                  <div key={video.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#FAF9F6] px-3 rounded-2xl transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#180606] text-[#F8E0A4] flex items-center justify-center flex-shrink-0">
                        <FiVideo className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-[#180606] truncate">{video.title}</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {video.targetDevice} • {video.size} • {video.processedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        video.status === 'completed' ? 'bg-[#31AAA9]/15 text-[#31AAA9]' :
                        video.status === 'processing' ? 'bg-[#F8E0A4] text-[#180606]' :
                        'bg-[#A82020]/15 text-[#A82020]'
                      }`}>
                        {video.status}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDownload(video.id)}
                          className="p-2 rounded-full hover:bg-black/5 text-gray-600 hover:text-[#31AAA9]"
                        >
                          <FiDownload className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(video.id)}
                          className="p-2 rounded-full hover:bg-black/5 text-gray-400 hover:text-[#A82020]"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[#FAF9F6] border-2 border-dashed border-black/10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#31AAA9]/10 text-[#31AAA9] flex items-center justify-center mx-auto">
                <FiVideo className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#180606]">No videos match this filter</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Upload and mask your videos to simulate authentic mobile camera roll recordings.
              </p>
              <Link href="/upload" className="btn-primary !px-5 !py-2 text-xs !rounded-full inline-block mt-2">
                Upload Video
              </Link>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
