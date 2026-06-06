import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getCourseById,
} from '../services/databaseService';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  getDocs: vi.fn(),
  getDoc: vi.fn(),
  doc: vi.fn(),
}));

vi.mock('../firebaseConfig', () => ({
  db: {}, // Mock the Firestore instance
}));

describe('Course Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new course successfully', async () => {
    const courseData = {
      title: 'Learn React',
      description: 'Master React from basics',
      author: 'John Doe',
      price: 9999,
    };
    const mockDocRef = { id: 'course123' };

    // Mocking the Firebase function
    addDoc.mockResolvedValue(mockDocRef);

    const result = await createCourse(courseData);

    expect(addDoc).toHaveBeenCalledWith(collection(expect.anything(), 'courses'), expect.objectContaining({
      ...courseData,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    }));
    expect(result).toEqual({ id: 'course123', success: true });
  });

  it('should handle errors when creating a course', async () => {
    const courseData = {
      title: 'Learn React',
      description: 'Master React from basics',
      author: 'John Doe',
      price: 9999,
    };
    const errorMessage = 'Failed to create course';
    addDoc.mockRejectedValue(new Error(errorMessage));

    const result = await createCourse(courseData);

    expect(addDoc).toHaveBeenCalledWith(collection(expect.anything(), 'courses'), expect.objectContaining(courseData));
    expect(result).toEqual({ error: errorMessage, success: false });
  });

  it('should update an existing course successfully', async () => {
    const courseId = 'course123';
    const updateData = { title: 'Advanced React', price: 12999 };
    const mockDocRef = {}; // updateDoc doesn't return a value we typically assert on

    // Mocking the Firebase function
    doc.mockReturnValue(mockDocRef); // Mock doc to return a reference
    updateDoc.mockResolvedValue(undefined);

    const result = await updateCourse(courseId, updateData);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'courses', courseId);
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, expect.objectContaining({
      ...updateData,
      updatedAt: expect.any(Date),
    }));
    expect(result).toEqual({ success: true });
  });

  it('should handle errors when updating a course', async () => {
    const courseId = 'course123';
    const updateData = { title: 'Advanced React' };
    const errorMessage = 'Failed to update course';

    doc.mockReturnValue({}); // Mock doc
    updateDoc.mockRejectedValue(new Error(errorMessage));

    const result = await updateCourse(courseId, updateData);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'courses', courseId);
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(updateData));
    expect(result).toEqual({ error: errorMessage, success: false });
  });

  it('should delete a course successfully', async () => {
    const courseId = 'course123';
    const mockDocRef = {};

    // Mocking the Firebase functions
    doc.mockReturnValue(mockDocRef);
    deleteDoc.mockResolvedValue(undefined);

    const result = await deleteCourse(courseId);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'courses', courseId);
    expect(deleteDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toEqual({ success: true });
  });

  it('should handle errors when deleting a course', async () => {
    const courseId = 'course123';
    const errorMessage = 'Failed to delete course';

    doc.mockReturnValue({});
    deleteDoc.mockRejectedValue(new Error(errorMessage));

    const result = await deleteCourse(courseId);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'courses', courseId);
    expect(deleteDoc).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual({ error: errorMessage, success: false });
  });

  it('should retrieve all courses successfully', async () => {
    const mockCourseData = [
      { id: 'course1', title: 'Course 1', description: 'Desc 1', price: 1000 },
      { id: 'course2', title: 'Course 2', description: 'Desc 2', price: 2000 },
    ];
    const mockQuerySnapshot = {
      docs: mockCourseData.map(course => ({
        id: course.id,
        data: () => ({ ...course, createdAt: new Date(), updatedAt: new Date() }), // Mocking data method
      })),
    };

    // Mocking the Firebase functions
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const result = await getCourses();

    expect(getDocs).toHaveBeenCalledWith(collection(expect.anything(), 'courses'));
    expect(result.courses).toHaveLength(2);
    expect(result.courses[0]).toEqual(expect.objectContaining({ title: 'Course 1' }));
    expect(result.success).toBe(true);
  });

  it('should handle errors when retrieving all courses', async () => {
    const errorMessage = 'Failed to fetch courses';
    getDocs.mockRejectedValue(new Error(errorMessage));

    const result = await getCourses();

    expect(getDocs).toHaveBeenCalledWith(collection(expect.anything(), 'courses'));
    expect(result).toEqual({ error: errorMessage, success: false });
  });

  it('should retrieve a single course by ID successfully', async () => {
    const courseId = 'course123';
    const mockCourseData = { id: courseId, title: 'Single Course', description: 'Desc', price: 5000 };
    const mockDocSnapshot = {
      exists: () => true,
      data: () => mockCourseData,
    };
    const mockDocRef = {};

    // Mocking the Firebase functions
    doc.mockReturnValue(mockDocRef);
    getDoc.mockResolvedValue(mockDocSnapshot);

    const result = await getCourseById(courseId);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'courses', courseId);
    expect(getDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toEqual({ course: mockCourseData, success: true });
  });

  it('should return null if course by ID is not found', async () => {
    const courseId = 'nonexistent-course';
    const mockDocSnapshot = { exists: () => false };
    const mockDocRef = {};

    doc.mockReturnValue(mockDocRef);
    getDoc.mockResolvedValue(mockDocSnapshot);

    const result = await getCourseById(courseId);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'courses', courseId);
    expect(getDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toEqual({ course: null, success: false });
  });

  it('should handle errors when retrieving a single course by ID', async () => {
    const courseId = 'course123';
    const errorMessage = 'Failed to fetch course';
    const mockDocRef = {};

    doc.mockReturnValue(mockDocRef);
    getDoc.mockRejectedValue(new Error(errorMessage));

    const result = await getCourseById(courseId);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'courses', courseId);
    expect(getDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toEqual({ error: errorMessage, success: false });
  });
});
