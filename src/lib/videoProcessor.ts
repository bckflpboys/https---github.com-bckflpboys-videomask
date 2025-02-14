import { VideoMetadata } from '@/types/video';

export async function processVideo(inputFile: File, metadata: VideoMetadata): Promise<File> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(inputFile);
    video.muted = true;

    video.onloadedmetadata = async () => {
      try {
        // Create canvas with desired dimensions
        const canvas = document.createElement('canvas');
        canvas.width = metadata.width;
        canvas.height = metadata.height;
        const ctx = canvas.getContext('2d')!;

        // Calculate timing based on speed
        const duration = video.duration;
        const frameCount = Math.floor(duration * (metadata.frameRate || 30));
        const timeStep = duration / frameCount;
        const speedMultiplier = metadata.speed || 1;

        // Create MediaRecorder
        const stream = canvas.captureStream(metadata.frameRate || 30);
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: metadata.fileType,
          videoBitsPerSecond: metadata.bitrate
        });

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: metadata.fileType });
          const processedFile = new File([blob], metadata.fileName, {
            type: metadata.fileType,
            lastModified: new Date(metadata.lastModified).getTime()
          });
          resolve(processedFile);
        };

        mediaRecorder.start();

        // Process each frame
        let currentTime = 0;
        const processFrame = async () => {
          if (currentTime >= duration) {
            mediaRecorder.stop();
            return;
          }

          video.currentTime = currentTime * speedMultiplier;
          await new Promise(r => setTimeout(r, 10)); // Wait for seek
          
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          currentTime += timeStep;
          requestAnimationFrame(processFrame);
        };

        await processFrame();
      } catch (error) {
        reject(error);
      }
    };

    video.onerror = () => reject(new Error('Error loading video'));
  });
}

function buildVideoFilters(metadata: VideoMetadata): string {
  const filters: string[] = [];

  // Scale video based on resolution and aspect ratio
  if (metadata.width && metadata.height) {
    filters.push(`scale=${metadata.width}:${metadata.height}`);
  }

  // Adjust video speed
  if (metadata.speed && metadata.speed !== 1) {
    filters.push(`setpts=${1/metadata.speed}*PTS`);
  }

  return filters.join(',');
}

function getFormatFromMimeType(mimeType: string): string {
  const formats: { [key: string]: string } = {
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/x-matroska': 'matroska',
    'video/quicktime': 'mov',
    'video/x-msvideo': 'avi',
    'video/x-flv': 'flv'
  };

  return formats[mimeType] || 'mp4';
}
