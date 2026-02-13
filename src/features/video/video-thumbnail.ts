/**
 * Utility functions for video thumbnail generation
 */

/**
 * Generate a thumbnail from a video file by capturing a frame at a specific time
 * @param videoFile - The video file to generate thumbnail from
 * @param captureTime - Time in seconds to capture the frame (default: 1s)
 * @returns Promise<Blob | null> - The thumbnail as a JPEG blob
 */
export async function generateVideoThumbnail(
  videoFile: File,
  captureTime = 1,
): Promise<{ thumbnail: Blob; duration: number } | null> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      resolve(null);
      return;
    }

    // Create object URL for the video
    const videoUrl = URL.createObjectURL(videoFile);
    video.src = videoUrl;
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    // Handle metadata loaded
    video.onloadedmetadata = () => {
      // Set capture time to 1 second or 10% of the video, whichever is smaller
      const actualCaptureTime = Math.min(captureTime, video.duration * 0.1);
      video.currentTime = actualCaptureTime;
    };

    // Handle seek complete
    video.onseeked = () => {
      // Set canvas size based on video dimensions
      const maxSize = 640; // Max thumbnail width
      const ratio = video.videoWidth / video.videoHeight;

      if (video.videoWidth > video.videoHeight) {
        canvas.width = Math.min(video.videoWidth, maxSize);
        canvas.height = canvas.width / ratio;
      } else {
        canvas.height = Math.min(video.videoHeight, maxSize);
        canvas.width = canvas.height * ratio;
      }

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          // Clean up
          URL.revokeObjectURL(videoUrl);
          video.remove();
          canvas.remove();

          if (blob) {
            resolve({
              thumbnail: blob,
              duration: video.duration,
            });
          } else {
            resolve(null);
          }
        },
        "image/jpeg",
        0.8,
      );
    };

    // Handle errors
    video.onerror = () => {
      URL.revokeObjectURL(videoUrl);
      video.remove();
      canvas.remove();
      resolve(null);
    };

    // Start loading
    video.load();
  });
}

/**
 * Convert a Blob to a File object
 */
export function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
}
