import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

// ==================== COURSES ====================
export const createCourse = async (courseData) => {
  try {
    const docRef = await addDoc(collection(db, 'courses'), {
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docRef.id, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    await updateDoc(doc(db, 'courses', courseId), {
      ...courseData,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const deleteCourse = async (courseId) => {
  try {
    await deleteDoc(doc(db, 'courses', courseId));
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getCourses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    return { data: courses, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getCourseById = async (courseId) => {
  try {
    const docSnap = await getDoc(doc(db, 'courses', courseId));
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, success: true };
    }
    return { data: null, success: false };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// ==================== LESSONS ====================
export const addLesson = async (courseId, lessonData) => {
  try {
    const docRef = await addDoc(
      collection(db, 'courses', courseId, 'lessons'),
      {
        ...lessonData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
    return { id: docRef.id, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const updateLesson = async (courseId, lessonId, lessonData) => {
  try {
    await updateDoc(
      doc(db, 'courses', courseId, 'lessons', lessonId),
      {
        ...lessonData,
        updatedAt: new Date(),
      }
    );
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const deleteLesson = async (courseId, lessonId) => {
  try {
    await deleteDoc(doc(db, 'courses', courseId, 'lessons', lessonId));
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getLessons = async (courseId) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, 'courses', courseId, 'lessons')
    );
    const lessons = [];
    querySnapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() });
    });
    return { data: lessons, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// ==================== USERS ====================
export const updateUserProfile = async (userId, profileData) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...profileData,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return { data: users, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// ==================== ENROLLMENTS ====================
export const enrollCourse = async (userId, courseId) => {
  try {
    const docRef = await addDoc(collection(db, 'enrollments'), {
      userId,
      courseId,
      enrolledAt: new Date(),
      progress: 0,
    });
    return { id: docRef.id, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getUserEnrollments = async (userId) => {
  try {
    const q = query(
      collection(db, 'enrollments'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const enrollments = [];
    querySnapshot.forEach((doc) => {
      enrollments.push({ id: doc.id, ...doc.data() });
    });
    return { data: enrollments, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// ==================== REFERRALS ====================
export const trackReferral = async (referrerId, newUserId) => {
  try {
    const docRef = await addDoc(collection(db, 'referrals'), {
      referrerId,
      newUserId,
      createdAt: new Date(),
      commissionAmount: 0,
      commissionPaid: false,
    });
    return { id: docRef.id, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

export const getReferrals = async (referrerId) => {
  try {
    const q = query(
      collection(db, 'referrals'),
      where('referrerId', '==', referrerId)
    );
    const querySnapshot = await getDocs(q);
    const referrals = [];
    querySnapshot.forEach((doc) => {
      referrals.push({ id: doc.id, ...doc.data() });
    });
    return { data: referrals, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};
