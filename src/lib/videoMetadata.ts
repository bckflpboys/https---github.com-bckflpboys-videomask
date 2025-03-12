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
  bitrate?: number;
  
  // Additional info
  videoCodec?: string;
  audioCodec?: string;
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

export const getVideoFrameRate = async (video: HTMLVideoElement): Promise<number | undefined> => {
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
          
          // After collecting enough samples or reaching 1 second
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
      // If we can't play the video, we cannot determine the frame rate
      resolve(undefined);
    });
  });
};

export const getVideoMetadata = async (file: File): Promise<VideoMetadata> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    
    const objectUrl = URL.createObjectURL(file);
    
    video.onloadedmetadata = async () => {
      URL.revokeObjectURL(objectUrl);
      
      // Get frame rate
      const frameRate = await getVideoFrameRate(video);
      
      // Try to get audio context info
      let audioInfo = {};
      try {
        const audioContext = new AudioContext();
        const audioTrack = video.captureStream().getAudioTracks()[0];
        if (audioTrack) {
          const settings = audioTrack.getSettings();
          audioInfo = {
            audioChannels: settings.channelCount || undefined,
            audioSampleRate: settings.sampleRate || undefined,
          };
        }
      } catch (e) {
        console.warn('Could not get audio metadata:', e);
      }

      // Estimate bitrate from file size and duration
      const bitrate = file.size * 8 / video.duration; // bits per second

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
        frameRate,
        bitrate,
        
        // Try to get codec info from the file type
        videoCodec: file.type.split('codecs=')[1]?.split(',')[0]?.replace(/"/g, '') || undefined,
        audioCodec: file.type.split('codecs=')[1]?.split(',')[1]?.replace(/"/g, '') || undefined,
        
        // Audio specs
        ...audioInfo
      };
      
      resolve(metadata);
    };
    
    video.src = objectUrl;
  });
};

export const extractAdvancedMetadata = async (file: File): Promise<Partial<VideoMetadata>> => {
  // This is a placeholder for more advanced metadata extraction
  // In a production environment, you might want to use libraries like media-metadata-parser
  // or implement server-side extraction using ffmpeg
  return {};
};
