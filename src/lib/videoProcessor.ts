import { VideoMetadata, ResizeMode } from '@/types/video';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

async function getFFmpeg() {
  if (!ffmpeg) {
    console.log('Initializing FFmpeg...');
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    ffmpeg = new FFmpeg();
    
    // Load FFmpeg with the correct core URL
    console.log('Loading FFmpeg core...');
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';
    try {
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
      });
      console.log('FFmpeg loaded successfully');
    } catch (error) {
      console.error('Error loading FFmpeg:', error);
      throw new Error('Failed to load FFmpeg. Please try again.');
    }
  }
  return ffmpeg;
}

export async function processVideo(inputFile: File, metadata: VideoMetadata, onProgress?: (progress: number) => void): Promise<File> {
  try {
    console.log('Starting video processing...');
    const ffmpeg = await getFFmpeg();

    // Log input file details
    console.log('Input file:', {
      name: inputFile.name,
      type: inputFile.type,
      size: inputFile.size
    });

    // Write the input file to FFmpeg's virtual filesystem
    console.log('Writing input file...');
    await ffmpeg.writeFile('input.mp4', await fetchFile(inputFile));
    console.log('Input file written successfully');

    // Calculate dimensions with a maximum size limit
    const MAX_DIMENSION = 480; // Limit to 480p for faster processing
    
    // Get target dimensions based on the desired aspect ratio
    let targetWidth, targetHeight;
    
    if (metadata.aspectRatio) {
      try {
        let aspectRatioStr: string;
        if (typeof metadata.aspectRatio === 'number') {
          // For numeric aspect ratios (e.g., 0.5625 for 16:9)
          const width = 16;
          const height = Math.round(width / metadata.aspectRatio);
          aspectRatioStr = `${width}:${height}`;
        } else {
          aspectRatioStr = metadata.aspectRatio;
        }

        if (!aspectRatioStr) {
          throw new Error('Empty aspect ratio');
        }

        const delimiter = aspectRatioStr.includes(':') ? ':' : '/';
        const parts = aspectRatioStr.split(delimiter);

        if (parts.length !== 2) {
          throw new Error('Invalid aspect ratio format');
        }

        // Ensure we have exactly two parts and they're numbers
        const width = Number(parts[0]);
        const height = Number(parts[1]);
        
        if (!width || !height || width <= 0 || height <= 0) {
          throw new Error('Invalid aspect ratio numbers');
        }

        if (metadata.width >= metadata.height) {
          targetWidth = Math.min(metadata.width, MAX_DIMENSION);
          targetHeight = Math.round(targetWidth * (height / width));
        } else {
          targetHeight = Math.min(metadata.height, MAX_DIMENSION);
          targetWidth = Math.round(targetHeight * (width / height));
        }
      } catch (error) {
        console.error('Error parsing aspect ratio:', error);
        // Fallback to original dimensions if aspect ratio is invalid
        targetWidth = Math.min(metadata.width, MAX_DIMENSION);
        targetHeight = Math.min(metadata.height, MAX_DIMENSION);
      }
    } else {
      targetWidth = Math.min(metadata.width, MAX_DIMENSION);
      targetHeight = Math.min(metadata.height, MAX_DIMENSION);
    }

    console.log('Dimensions:', {
      original: { width: metadata.width, height: metadata.height },
      target: { width: targetWidth, height: targetHeight },
      aspectRatio: metadata.aspectRatio,
      mode: metadata.resizeMode || 'stretch' // Default to stretch if undefined
    });

    const dimensions = calculateDimensions(
      metadata.width,
      metadata.height,
      targetWidth,
      targetHeight,
      metadata.resizeMode || 'stretch'
    );

    console.log('Calculated dimensions:', dimensions);

    // Build FFmpeg command based on resize mode
    let filterComplex = '';
    switch (metadata.resizeMode) {
      case 'letterbox':
        filterComplex = `[0:v]scale=${dimensions.width}:${dimensions.height}:force_original_aspect_ratio=decrease,pad=${dimensions.canvasWidth}:${dimensions.canvasHeight}:(ow-iw)/2:(oh-ih)/2:black[v]`;
        break;
      case 'crop':
        filterComplex = `[0:v]scale=${dimensions.width}:${dimensions.height}:force_original_aspect_ratio=increase,crop=${dimensions.canvasWidth}:${dimensions.canvasHeight}[v]`;
        break;
      default: // stretch
        filterComplex = `[0:v]scale=${dimensions.canvasWidth}:${dimensions.canvasHeight}:force_original_aspect_ratio=disable[v]`;
        break;
    }

    console.log('FFmpeg filter:', filterComplex);

    // Set up progress handling
    ffmpeg.on('progress', ({ progress, time }) => {
      console.log('Processing progress:', progress, 'Time:', time);
      onProgress?.(progress * 100); // Convert to percentage
    });

    // Run FFmpeg command with minimal quality for speed
    console.log('Starting FFmpeg processing...');
    const startTime = Date.now();
    
    const ffmpegArgs = [
      '-i', 'input.mp4',
      '-filter_complex', filterComplex,
      '-map', '[v]',
      '-map', '0:a',
      '-c:a', 'aac',        // Use AAC for audio (faster than copy)
      '-b:a', '96k',        // Low audio bitrate
      '-c:v', 'libx264',    // Use x264 codec
      '-preset', 'ultrafast',
      '-tune', 'fastdecode,zerolatency',
      '-crf', '35',         // Very low quality for speed
      '-maxrate', '1M',     // Limit bitrate
      '-bufsize', '2M',
      '-r', '24',           // Reduce frame rate
      '-g', '48',           // Keyframe every 2 seconds
      '-threads', '0',      // Use all available threads
      '-movflags', '+faststart',
      '-y',
      'output.mp4'
    ];

    console.log('FFmpeg command:', ffmpegArgs.join(' '));
    await ffmpeg.exec(ffmpegArgs);

    console.log('FFmpeg processing completed in', (Date.now() - startTime) / 1000, 'seconds');

    // Read the output file
    console.log('Reading output file...');
    const data = await ffmpeg.readFile('output.mp4');
    console.log('Output file read successfully');

    // Clean up
    console.log('Cleaning up...');
    await ffmpeg.deleteFile('input.mp4');
    await ffmpeg.deleteFile('output.mp4');

    // Create a new File object
    const processedFile = new File([data], metadata.fileName, {
      type: metadata.fileType,
      lastModified: new Date(metadata.lastModified).getTime()
    });

    console.log('Processing completed successfully');
    return processedFile;

  } catch (error) {
    console.error('Error in processVideo:', error);
    throw error;
  }
}

function calculateDimensions(
  srcWidth: number,
  srcHeight: number,
  targetWidth: number,
  targetHeight: number,
  mode: ResizeMode
): { width: number; height: number; canvasWidth: number; canvasHeight: number } {
  const srcRatio = srcWidth / srcHeight;
  const targetRatio = targetWidth / targetHeight;

  switch (mode) {
    case 'stretch':
      return {
        width: targetWidth,
        height: targetHeight,
        canvasWidth: targetWidth,
        canvasHeight: targetHeight
      };

    case 'crop':
      // Scale to fill the target canvas, maintaining aspect ratio
      let scaleWidth = targetWidth;
      let scaleHeight = targetHeight;

      if (srcRatio > targetRatio) {
        // Source is wider - scale to match height
        scaleHeight = targetHeight;
        scaleWidth = scaleHeight * srcRatio;
      } else {
        // Source is taller - scale to match width
        scaleWidth = targetWidth;
        scaleHeight = scaleWidth / srcRatio;
      }

      return {
        width: scaleWidth,
        height: scaleHeight,
        canvasWidth: targetWidth,
        canvasHeight: targetHeight
      };

    case 'letterbox':
      // Scale to fit within target canvas, maintaining aspect ratio
      let fitWidth = targetWidth;
      let fitHeight = targetHeight;

      if (srcRatio > targetRatio) {
        // Source is wider - scale to match width
        fitWidth = targetWidth;
        fitHeight = fitWidth / srcRatio;
      } else {
        // Source is taller - scale to match height
        fitHeight = targetHeight;
        fitWidth = fitHeight * srcRatio;
      }

      return {
        width: fitWidth,
        height: fitHeight,
        canvasWidth: targetWidth,
        canvasHeight: targetHeight
      };

    default:
      throw new Error(`Unknown resize mode: ${mode}`);
  }
}
