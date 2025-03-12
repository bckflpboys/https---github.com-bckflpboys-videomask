export type ResizeMode = 'stretch' | 'crop' | 'letterbox';

export interface VideoMetadata {
  fileName: string;
  fileSize: string;
  fileType: string;
  lastModified: string;
  duration: number;
  width: number;
  height: number;
  aspectRatio: string | number;
  frameRate?: number;
  bitrate?: number;
  videoCodec?: string;
  audioCodec?: string;
  audioChannels?: number;
  audioSampleRate?: number;
  speed?: number;
  resizeMode?: ResizeMode;
}
