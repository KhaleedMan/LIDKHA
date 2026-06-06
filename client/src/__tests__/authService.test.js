import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  signup,
  login,
  logout,
  getUserProfile,
} from '../services/authService';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Mock Firebase modules
vi.mock('../firebaseConfig', () => ({
  auth: {},
  db: {},
}));

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  setDoc: vi.fn(),
  getDoc: vi.fn(),
}));

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test for signup
  it('should sign up a new user successfully', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
      country: 'Nigeria',
    };
    const mockUserCredential = { user: { uid: 'test-uid', email: formData.email } };
    const mockDocRef = {};
    const mockDocSnap = { exists: () => true, data: () => ({ ...formData, uid: 'test-uid' }) };

    // Mocking the Firebase functions
    createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
    doc.mockReturnValue(mockDocRef);
    setDoc.mockResolvedValue(undefined);
    getDoc.mockResolvedValue(mockDocSnap);

    const result = await signup(formData.email, formData.password, { username: formData.username, country: formData.country });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), formData.email, formData.password);
    expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', 'test-uid');
    expect(setDoc).toHaveBeenCalledWith(mockDocRef, expect.objectContaining({
      uid: 'test-uid',
      email: formData.email,
      username: formData.username,
      country: formData.country,
    }));
    expect(result).toEqual({ user: mockUserCredential.user, success: true });
  });

  // Test for signup error handling
  it('should handle signup errors', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
      country: 'Nigeria',
    };
    const errorMessage = 'Firebase: Error creating user.';
    createUserWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));

    const result = await signup(formData.email, formData.password, { username: formData.username, country: formData.country });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), formData.email, formData.password);
    expect(result).toEqual({ error: errorMessage, success: false });
  });

  // Test for login
  it('should login an existing user successfully', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockUserCredential = { user: { uid: 'test-uid', email: credentials.email } };

    signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);

    const result = await login(credentials.email, credentials.password);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), credentials.email, credentials.password);
    expect(result).toEqual({ user: mockUserCredential.user, success: true });
  });

  // Test for login error handling (optional, can be added similarly to signup error)
  it('should handle login errors', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };
    const errorMessage = 'Firebase: Error authenticating user.';
    signInWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));

    const result = await login(credentials.email, credentials.password);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), credentials.email, credentials.password);
    expect(result).toEqual({ error: errorMessage, success: false });
  });

  // Test for logout
  it('should logout user successfully', async () => {
    signOut.mockResolvedValue(undefined);

    const result = await logout();

    expect(signOut).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual({ success: true });
  });

  // Test for logout error handling (optional)
  it('should handle logout errors', async () => {
    const errorMessage = 'Firebase: Error signing out.';
    signOut.mockRejectedValue(new Error(errorMessage));

    const result = await logout();

    expect(signOut).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual({ error: errorMessage, success: false });
  });

  // Test for getting user profile
  it('should get user profile successfully', async () => {
    const uid = 'test-uid';
    const mockDocSnap = {
      exists: () => true,
      data: () => ({ uid: uid, username: 'testuser', country: 'Nigeria' }),
    };
    const mockDocRef = {};

    doc.mockReturnValue(mockDocRef);
    getDoc.mockResolvedValue(mockDocSnap);

    const result = await getUserProfile(uid);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', uid);
    expect(getDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toEqual({ data: mockDocSnap.data(), success: true });
  });

  // Test for getting user profile when user does not exist
  it('should return null for user profile if user does not exist', async () => {
    const uid = 'non-existent-uid';
    const mockDocSnap = { exists: () => false };
    const mockDocRef = {};

    doc.mockReturnValue(mockDocRef);
    getDoc.mockResolvedValue(mockDocSnap);

    const result = await getUserProfile(uid);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', uid);
    expect(getDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toEqual({ data: null, success: false });
  });

  // Test for getting user profile error handling (optional)
  it('should handle errors when getting user profile', async () => {
    const uid = 'test-uid';
    const errorMessage = 'Firebase: Error getting document.';
    const mockDocRef = {};

    doc.mockReturnValue(mockDocRef);
    getDoc.mockRejectedValue(new Error(errorMessage));

    const result = await getUserProfile(uid);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'users', uid);
    expect(getDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toEqual({ error: errorMessage, success: false });
  });
});
