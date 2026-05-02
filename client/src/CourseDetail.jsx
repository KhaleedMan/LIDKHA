import { useState } from 'react'
import './CourseDetail.css'

export default function CourseDetail({ courseId, user, onBack }) {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Getting Started with Zero Followers',
      duration: '12 min',
      description: 'Learn the fundamentals even if you have no audience',
      videoUrl: null, // Will be populated when videos are uploaded by admin
      completed: false
    },
    {
      id: 2,
      title: 'Setting Up Your Facebook Profile',
      duration: '15 min',
      description: 'Create a profile optimized for earning',
      videoUrl: null,
      completed: false
    },
    {
      id: 3,
      title: 'Facebook Marketplace Basics',
      duration: '18 min',
      description: 'Use Marketplace to find customers without followers',
      videoUrl: null,
      completed: false
    },
    {
      id: 4,
      title: 'WhatsApp Business Setup',
      duration: '14 min',
      description: 'Configure WhatsApp for selling and customer communication',
      videoUrl: null,
      completed: false
    },
    {
      id: 5,
      title: 'First Sales Strategy',
      duration: '20 min',
      description: 'Proven methods to make your first sale',
      videoUrl: null,
      completed: false
    },
    {
      id: 6,
      title: 'Scaling Your Income',
      duration: '16 min',
      description: 'Grow from first sale to consistent monthly income',
      videoUrl: null,
      completed: false
    }
  ])

  const [expandedLessonId, setExpandedLessonId] = useState(null)

  const handleLessonComplete = (lessonId) => {
    setLessons(prev => prev.map(lesson =>
      lesson.id === lessonId
        ? { ...lesson, completed: true }
        : lesson
    ))
  }

  const completedLessons = lessons.filter(lesson => lesson.completed).length
  const progressPercentage = Math.round((completedLessons / lessons.length) * 100)

  const getLessonNotes = (lessonId) => {
    const notes = {
      1: [
        'Start with what you know and can offer',
        'Don\'t wait for followers to begin',
        'Identify your skills and services',
        'Create a simple offer that solves problems'
      ],
      2: [
        'Professional profile picture matters',
        'Write a compelling bio that attracts customers',
        'Add contact information clearly',
        'Use keywords that customers search for'
      ],
      3: [
        'Marketplace is free advertising',
        'Post regularly with good photos',
        'Respond quickly to inquiries',
        'Build trust through communication'
      ],
      4: [
        'Set up business profile for credibility',
        'Use automated messages wisely',
        'Organize contacts and conversations',
        'Follow up consistently with leads'
      ],
      5: [
        'Start with low-price offers to build confidence',
        'Use social proof from first customers',
        'Ask satisfied customers for referrals',
        'Create packages for repeat business'
      ],
      6: [
        'Reinvest profits into marketing',
        'Create systems for consistent sales',
        'Build a customer database',
        'Scale by hiring help when ready'
      ]
    }
    return notes[lessonId] || []
  }

  const handleLessonClick = (lessonId) => {
    setExpandedLessonId(expandedLessonId === lessonId ? null : lessonId)
  }

  return (
    <div className="course-detail">
      <header className="detail-header">
        <button className="back-button" onClick={onBack}>← Back to dashboard</button>
        <div className="user-section">
          <span className="user-name">{user?.name}</span>
          <button className="logout-btn" onClick={onBack}>Exit course</button>
        </div>
      </header>

      <main className="detail-main">
        <section className="detail-hero">
          <h1>How to Make Money Using Facebook and WhatsApp for Beginners</h1>
          <p className="subtitle">Step-by-step guide even with zero followers</p>
          <div className="course-stats-detail">
            <span>📚 6 lessons</span>
            <span>⏱ 1.5 hours</span>
            <span>🎯 Beginner level</span>
          </div>
        </section>

        <section className="lessons-list">
          <h2>Course Lessons</h2>
          <p className="lessons-intro">Watch the lessons in order to complete the course and unlock your earning potential.</p>

          <div className="lessons-container">
            {lessons.map((lesson) => (
              <article className="lesson-item" key={lesson.id}>
                <div className="lesson-header-detail" onClick={() => handleLessonClick(lesson.id)}>
                  <div className="lesson-number-circle">{lesson.id}</div>
                  <div className="lesson-info">
                    <h3>{lesson.title}</h3>
                    <p className="lesson-desc">{lesson.description}</p>
                    <span className="lesson-duration">⏱ {lesson.duration}</span>
                  </div>
                  <button 
                    className="expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLessonClick(lesson.id);
                    }}
                  >
                    {expandedLessonId === lesson.id ? '▼' : '▶'}
                  </button>
                </div>

                {expandedLessonId === lesson.id && (
                  <div className="lesson-expand">
                    <div className="video-player-area">
                      <div className="video-player">
                        {lesson.videoUrl ? (
                          <>
                            <video
                              className="lesson-video"
                              controls
                              src={lesson.videoUrl}
                              onEnded={() => handleLessonComplete(lesson.id)}
                            >
                              Your browser does not support the video tag.
                            </video>
                            {!lesson.completed && (
                              <button
                                className="complete-btn"
                                onClick={() => handleLessonComplete(lesson.id)}
                              >
                                Mark as Complete
                              </button>
                            )}
                            {lesson.completed && (
                              <button className="complete-btn" disabled>
                                ✓ Lesson Completed
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="video-placeholder">
                            <div className="placeholder-icon">🎥</div>
                            <p className="placeholder-text">Video Coming Soon</p>
                            <p className="placeholder-subtext">This lesson video is being prepared by the instructor.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lesson-content-area">
                      <h3>{lesson.title}</h3>
                      <div className="lesson-description">
                        <p>{lesson.description}</p>
                      </div>
                      <div className="lesson-notes">
                        <h4>Key Points:</h4>
                        <ul>
                          {getLessonNotes(lesson.id).map((note, index) => (
                            <li key={index}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="course-summary">
          <h2>Course Overview</h2>
          <div className="summary-content">
            <div className="summary-box">
              <h3>What Students Will Learn</h3>
              <ul>
                <li>How to start earning with zero followers</li>
                <li>Complete Facebook strategy for beginners</li>
                <li>WhatsApp selling fundamentals</li>
                <li>Your first customer acquisition strategy</li>
                <li>Scaling from first sale to real income</li>
                <li>Avoiding common beginner mistakes</li>
              </ul>
            </div>

            <div className="summary-box">
              <h3>Your Progress</h3>
              <p className="status-text">
                You have completed <strong>{completedLessons} out of {lessons.length}</strong> lessons.
              </p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <p className="progress-percentage">{progressPercentage}% Complete</p>
              <p className="status-note">
                {completedLessons === lessons.length
                  ? '🎉 Congratulations! You have completed the entire course!'
                  : 'Keep learning to unlock your earning potential.'
                }
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="detail-footer">
        <p>© 2026 LIDKHA — Create and share your expertise</p>
      </footer>
    </div>
  )
}
