import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebaseConfig';

// Upload video file with progress tracking
export const uploadVideo = async (file, courseId, lessonId, onProgress) => {
  try {
    const storageRef = ref(
      storage,
      `courses/${courseId}/lessons/${lessonId}/video_${Date.now()}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          reject({ error: error.message, success: false });
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url: downloadURL, success: true });
          } catch (error) {
            reject({ error: error.message, success: false });
          }
        }
      );
    });
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Delete video file
export const deleteVideo = async (videoUrl) => {
  try {
    const videoRef = ref(storage, videoUrl);
    await deleteObject(videoRef);
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Upload course thumbnail
export const uploadThumbnail = async (file, courseId) => {
  try {
    const storageRef = ref(storage, `courses/${courseId}/thumbnail`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          reject({ error: error.message, success: false });
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url: downloadURL, success: true });
          } catch (error) {
            reject({ error: error.message, success: false });
          }
        }
      );
    });
  } catch (error) {
    return { error: error.message, success: false };
  }
};
