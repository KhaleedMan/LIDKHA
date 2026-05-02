import { useState } from 'react'
import './AdminDashboard.css'

export default function AdminDashboard({ user, onBack }) {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Make Money with Facebook & WhatsApp',
      lessons: [
        { id: 1, title: 'Getting Started with Zero Followers', videoUrl: null, duration: '12 min' },
        { id: 2, title: 'Setting Up Your Facebook Profile', videoUrl: null, duration: '15 min' },
        { id: 3, title: 'Facebook Marketplace Basics', videoUrl: null, duration: '18 min' },
        { id: 4, title: 'WhatsApp Business Setup', videoUrl: null, duration: '14 min' },
        { id: 5, title: 'First Sales Strategy', videoUrl: null, duration: '20 min' },
        { id: 6, title: 'Scaling Your Income', videoUrl: null, duration: '16 min' }
      ]
    }
  ])

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [uploadStatus, setUploadStatus] = useState({})
  const [expandedLesson, setExpandedLesson] = useState(null)

  const handleVideoUpload = (courseId, lessonId, file) => {
    if (!file) return

    const reader = new FileReader()
    const key = `${courseId}-${lessonId}`

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
      ))

      setUploadStatus(prev => ({
        ...prev,
        [key]: { status: 'success', message: 'Video uploaded successfully!' }
      }))

      setTimeout(() => {
        setUploadStatus(prev => {
          const newStatus = { ...prev }
          delete newStatus[key]
          return newStatus
        })
      }, 3000)
    }

    reader.readAsDataURL(file)
  }

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
    ))
  }

  const uploadedCount = selectedCourse
    ? selectedCourse.lessons.filter(l => l.videoUrl).length
    : 0

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-title-section">
          <h1>📹 Admin Dashboard - Video Management</h1>
          <p className="admin-subtitle">Upload and manage course videos</p>
        </div>
        <div className="admin-user-section">
          <span className="admin-user-name">👤 {user?.name}</span>
          <button className="admin-back-btn" onClick={onBack}>Back to Dashboard</button>
        </div>
      </header>

      <main className="admin-main">
        <section className="courses-selector">
          <h2>Select a Course</h2>
          <div className="courses-grid">
            {courses.map(course => (
              <button
                key={course.id}
                className={`course-selector-btn ${selectedCourse?.id === course.id ? 'active' : ''}`}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="course-selector-title">{course.title}</div>
                <div className="course-selector-stats">
                  {course.lessons.filter(l => l.videoUrl).length} / {course.lessons.length} videos
                </div>
              </button>
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
                          <p className="upload-text">Drag and drop your video here</p>
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
                          handleVideoUpload(selectedCourse.id, lesson.id, e.target.files[0])
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
        <p>📝 Admin Video Management Panel - LIDKHA Learning Platform</p>
      </footer>
    </div>
  )
}
