import { useState } from 'react'
import './StudentDashboard.css'

export default function StudentDashboard({ user, onLogout, onAdminAccess, onSelectCourse, onCourseClick }) {
  const courses = [
    {
      id: 1,
      title: 'Make Money with Facebook & WhatsApp',
      description: 'Learn to earn real income using social platforms even with zero followers.',
      status: 'available',
      lessons: 6,
      duration: '1.5 hours',
      icon: '💰'
    },
    {
      id: 2,
      title: 'Graphic Design Basics',
      description: 'Create stunning visual designs that sell and convert your audience.',
      status: 'coming-soon',
      lessons: 8,
      duration: '2 hours',
      icon: '🎨'
    },
    {
      id: 3,
      title: 'Video Editing Mastery',
      description: 'Edit professional videos that engage and grow your following fast.',
      status: 'coming-soon',
      lessons: 10,
      duration: '3 hours',
      icon: '🎬'
    },
    {
      id: 4,
      title: 'Content Creation Strategy',
      description: 'Create viral content that attracts customers and builds your brand.',
      status: 'coming-soon',
      lessons: 7,
      duration: '2.5 hours',
      icon: '📱'
    },
    {
      id: 5,
      title: 'Copywriting for Sales',
      description: 'Write persuasive copy that converts visitors into paying customers.',
      status: 'coming-soon',
      lessons: 6,
      duration: '2 hours',
      icon: '✍️'
    },
  ]

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="dashboard-nav">
          <div className="brand-small">LIDKHA</div>
          <div className="user-info">
            <span className="user-name">Welcome back, {user?.name}!</span>
            {user?.isAdmin && (
              <button className="admin-btn" onClick={onAdminAccess}>Admin panel</button>
            )}
            <button className="logout-btn" onClick={onLogout}>Log out</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-welcome">
          <h1>Your Learning Journey Starts Here</h1>
          <p>Choose a course and start learning practical skills to earn real income online.</p>
        </section>

        <section className="dashboard-chat">
          <div className="chat-banner">
            <span className="chat-icon">💬</span>
            <div>
              <h3>Need help?</h3>
              <p>Chat with our support team anytime if you have questions.</p>
            </div>
          </div>
        </section>

        <section className="courses-section">
          <div className="courses-header">
            <h2>Available Courses</h2>
            <p>Start with any course and progress at your own pace</p>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <article 
                className={`course-card dashboard-course ${course.status}`} 
                key={course.id}
              >
                <div className="course-icon">{course.icon}</div>
                <div className="course-header-dash">
                  <h3>{course.title}</h3>
                  {course.status === 'coming-soon' && (
                    <span className="coming-soon-badge">Coming soon</span>
                  )}
                </div>
                <p className="course-desc">{course.description}</p>
                
                <div className="course-meta">
                  <span className="meta-item">📚 {course.lessons} lessons</span>
                  <span className="meta-item">⏱ {course.duration}</span>
                </div>

                {course.status === 'available' ? (
                  <button 
                    className="button button-primary"
                    onClick={() => onCourseClick(course.id)}
                  >
                    Start learning →
                  </button>
                ) : (
                  <button className="button button-disabled" disabled>
                    Loading...
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="progress-section">
          <h2>Your Progress</h2>
          <div className="progress-box">
            <div className="progress-stat">
              <span className="stat-number">1</span>
              <span className="stat-label">Courses started</span>
            </div>
            <div className="progress-stat">
              <span className="stat-number">0</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="progress-stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Waiting for you</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>© 2026 LIDKHA — Learn, Build, Earn</p>
      </footer>
    </div>
  )
}
