import cloudinary from './cloudinary';

export async function uploadVideo(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Upload to our API route
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return {
      success: true,
      data: {
        url: data.secure_url,
        publicId: data.public_id,
        format: data.format,
        duration: data.duration,
      },
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'Failed to upload video',
    };
  }
}
