import { useState } from 'react';
import './AdminDashboard.css';
import './features.css';
import logo from './assets/logo.png.png';

export default function AdminDashboard({ user, onBack, registeredUsers, setRegisteredUsers, courses, setCourses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({});
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('');

  const handleCreateCourse = () => {
    if (!newCourseTitle) return;
    const newCourse = {
      id: Date.now(),
      title: newCourseTitle,
      author: user.username,
      lessons: [],
    };
    setCourses(prev => [...prev, newCourse]);
    setNewCourseTitle('');
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
    setSelectedCourse(null);
  };

  const handleAddLesson = (courseId) => {
    if (!newLessonTitle || !newLessonDuration) return;
    const newLesson = {
      id: Date.now(),
      title: newLessonTitle,
      duration: newLessonDuration,
      videoUrl: null,
    };
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, lessons: [...course.lessons, newLesson] }
        : course
    ));
    setNewLessonTitle('');
    setNewLessonDuration('');
  };

  const handleVideoUpload = (courseId, lessonId, file) => {
    if (!file) return;

    const reader = new FileReader();
    const key = `${courseId}-${lessonId}`;

    reader.onload = (e) => {
      setCourses(prev => prev.map(course => 
        course.id === courseId
          ? {
              ...course,
              lessons: course.lessons.map(lesson =>
                lesson.id === lessonId
                  ? { ...lesson, videoUrl: e.target.result }
                  : lesson
              )
            }
          : course
      ));

      setUploadStatus(prev => ({
        ...prev,
        [key]: { status: 'success', message: 'Video uploaded successfully!' }
      }));

      setTimeout(() => {
        setUploadStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[key];
          return newStatus;
        });
      }, 3000);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveVideo = (courseId, lessonId) => {
    setCourses(prev => prev.map(course =>
      course.id === courseId
        ? {
            ...course,
            lessons: course.lessons.map(lesson =>
              lesson.id === lessonId
                ? { ...lesson, videoUrl: null }
                : lesson
            )
          }
        : course
    ));
  };

  const uploadedCount = selectedCourse
    ? selectedCourse.lessons.filter(l => l.videoUrl).length
    : 0;

  const toggleVerified = (email) => {
    setRegisteredUsers(prev =>
      prev.map(u => (u.email === email ? { ...u, isVerified: !u.isVerified } : u))
    );
  };

  const affiliates = registeredUsers.filter(u => u.referrer);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-title-section" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="SKILWHOP Logo" style={{ height: '40px', marginRight: '15px' }} />
          <div>
            <h1>SKILWHOP TECHNOLOGY LIMITED</h1>
            <p className="admin-subtitle">Admin Dashboard</p>
          </div>
        </div>
        <div className="admin-user-section">
          <span className="admin-user-name">👤 {user?.name}</span>
          <button className="admin-back-btn" onClick={onBack}>Back to Dashboard</button>
        </div>
      </header>

      <main className="admin-main">
        <section className="course-creation">
          <h2>Create New Course</h2>
          <div className="form-group">
            <input type="text" value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} placeholder="New course title" />
            <button onClick={handleCreateCourse}>Create Course</button>
          </div>
        </section>

        <section className="user-management">
          <h2>User Management</h2>
          <div className="user-list-container">
            <div className="user-list-header">
              <span>Username</span>
              <span>Email</span>
              <span>Verified</span>
              <span>Actions</span>
            </div>
            <div className="user-list">
              {registeredUsers.map(user => (
                <div className="user-list-item" key={user.email}>
                  <span>{user.username}</span>
                  <span>{user.email}</span>
                  <span>{user.isVerified ? 'Yes' : 'No'}</span>
                  <button onClick={() => toggleVerified(user.email)}>
                    {user.isVerified ? 'Unverify' : 'Verify'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="affiliate-management">
          <h2>Affiliate Management</h2>
          <div className="affiliate-list-container">
            <div className="affiliate-list-header">
              <span>Username</span>
              <span>Email</span>
              <span>Referrer</span>
            </div>
            <div className="affiliate-list">
              {affiliates.map(affiliate => (
                <div className="affiliate-list-item" key={affiliate.email}>
                  <span>{affiliate.username}</span>
                  <span>{affiliate.email}</span>
                  <span>{affiliate.referrer}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="courses-selector">
          <h2>Course Management</h2>
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-selector-btn-wrapper">
                <button
                  className={`course-selector-btn ${selectedCourse?.id === course.id ? 'active' : ''}`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="course-selector-title">{course.title}</div>
                  <div className="course-selector-author">by {course.author}</div>
                  <div className="course-selector-stats">
                    {course.lessons.filter(l => l.videoUrl).length} / {course.lessons.length} videos
                  </div>
                </button>
                {user.isAdmin && (
                  <button className="delete-course-btn" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                )}
              </div>
            ))}
          </div>
        </section>

        {selectedCourse && (
          <section className="lessons-management">
            <div className="lessons-header">
              <h2>{selectedCourse.title}</h2>
              <div className="progress-indicator">
                <div className="progress-label">
                  {uploadedCount} of {selectedCourse.lessons.length} lessons completed
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(uploadedCount / selectedCourse.lessons.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="lesson-creation">
              <h3>Add New Lesson</h3>
              <div className="form-group">
                <input type="text" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} placeholder="New lesson title" />
                <input type="text" value={newLessonDuration} onChange={(e) => setNewLessonDuration(e.target.value)} placeholder="Lesson duration (e.g., 15 min)" />
                <button onClick={() => handleAddLesson(selectedCourse.id)}>Add Lesson</button>
              </div>
            </div>

            <div className="lessons-list">
              {selectedCourse.lessons.map(lesson => (
                <div key={lesson.id} className="lesson-upload-item">
                  <div
                    className="lesson-header-row"
                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                  >
                    <div className="lesson-number">{lesson.id}</div>
                    <div className="lesson-info">
                      <h3>{lesson.title}</h3>
                      <span className="lesson-duration">⏱ {lesson.duration}</span>
                    </div>
                    <div className="lesson-status">
                      {lesson.videoUrl ? (
                        <span className="status-badge status-uploaded">✓ Uploaded</span>
                      ) : (
                        <span className="status-badge status-pending">○ Pending</span>
                      )}
                    </div>
                    <button className="expand-btn">
                      {expandedLesson === lesson.id ? '▼' : '▶'}
                    </button>
                  </div>

                  {expandedLesson === lesson.id && (
                    <div className="lesson-upload-area">
                      {lesson.videoUrl ? (
                        <div className="video-preview-section">
                          <video
                            className="video-preview"
                            controls
                            src={lesson.videoUrl}
                          >
                            Your browser does not support the video tag.
                          </video>
                          <div className="video-actions">
                            <button
                              className="action-btn btn-replace"
                              onClick={() => document.getElementById(`video-input-${lesson.id}`).click()}
                            >
                              Replace Video
                            </button>
                            <button
                              className="action-btn btn-remove"
                              onClick={() => handleRemoveVideo(selectedCourse.id, lesson.id)}
                            >
                              Remove Video
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="upload-drop-zone">
                          <div className="upload-icon">📤</div>
                          <p className-="upload-text">Drag and drop your video here</p>
                          <p className="upload-subtext">or click to select a file</p>
                          <p className="upload-format">Supported formats: MP4, MOV, AVI, WebM</p>
                        </div>
                      )}

                      <input
                        id={`video-input-${lesson.id}`}
                        type="file"
                        accept="video/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          handleVideoUpload(selectedCourse.id, lesson.id, e.target.files[0]);
                        }}
                      />

                      <button
                        className="upload-btn"
                        onClick={() => document.getElementById(`video-input-${lesson.id}`).click()}
                      >
                        {lesson.videoUrl ? '🔄 Choose Different Video' : '📹 Choose Video'}
                      </button>

                      {uploadStatus[`${selectedCourse.id}-${lesson.id}`] && (
                        <div className={`upload-message ${uploadStatus[`${selectedCourse.id}-${lesson.id}`].status}`}>
                          {uploadStatus[`${selectedCourse.id}-${lesson.id}`].message}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {!selectedCourse && (
          <div className="placeholder">
            <p>Select a course to manage its videos</p>
          </div>
        )}
      </main>

      <footer className="admin-footer">
        <p>📝 Admin Video Management Panel - SKILWHOP Learning Platform</p>
      </footer>
    </div>
  );
}
