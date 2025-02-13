interface VideoMetadata {
  // Basic file info
  fileName: string;
  fileSize: string;
  fileType: string;
  lastModified: string;
  
  // Video specs
  duration: number;
  width: number;
  height: number;
  aspectRatio: number;
  frameRate?: number;
  
  // Additional info
  videoCodec?: string;
  audioCodec?: string;
  bitrate?: number;
  audioChannels?: number;
  audioSampleRate?: number;
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getVideoMetadata = async (file: File): Promise<VideoMetadata> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    // Create object URL for the file
    const objectUrl = URL.createObjectURL(file);
    
    video.onloadedmetadata = () => {
      // Revoke the object URL to free up memory
      URL.revokeObjectURL(objectUrl);
      
      const metadata: VideoMetadata = {
        // Basic file info
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        fileType: file.type,
        lastModified: new Date(file.lastModified).toLocaleString(),
        
        // Video specs
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        aspectRatio: video.videoWidth / video.videoHeight,
      };
      
      resolve(metadata);
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      throw new Error('Error loading video metadata');
    };
    
    video.src = objectUrl;
  });
};

// Additional utility functions for metadata extraction
export const getVideoFrameRate = async (videoElement: HTMLVideoElement): Promise<number> => {
  return new Promise((resolve) => {
    let frames = 0;
    let startTime: number;
    
    const countFrames = () => {
      frames++;
    };
    
    videoElement.requestVideoFrameCallback(function callback(now) {
      if (!startTime) startTime = now;
      else if (now - startTime > 1000) {
        videoElement.removeEventListener('play', startPlayback);
        resolve(frames);
        return;
      }
      countFrames();
      videoElement.requestVideoFrameCallback(callback);
    });
    
    const startPlayback = () => {
      videoElement.currentTime = 0;
    };
    
    videoElement.addEventListener('play', startPlayback);
    videoElement.play();
  });
};

export const extractAdvancedMetadata = async (file: File): Promise<Partial<VideoMetadata>> => {
  // This is a placeholder for more advanced metadata extraction
  // In a production environment, you might want to use libraries like media-metadata-parser
  // or implement server-side extraction using ffmpeg
  return {};
};
