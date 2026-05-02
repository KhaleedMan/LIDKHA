import './CoursePage.css'

export default function CoursePage({ user, onLogout }) {
  const lessons = [
    {
      title: 'Getting Started with Zero Followers',
      duration: '12 min',
      description: 'Learn the fundamentals even if you have no audience'
    },
    {
      title: 'Setting Up Your Facebook Profile',
      duration: '15 min',
      description: 'Create a profile optimized for earning'
    },
    {
      title: 'Facebook Marketplace Basics',
      duration: '18 min',
      description: 'Use Marketplace to find customers without followers'
    },
    {
      title: 'WhatsApp Business Setup',
      duration: '14 min',
      description: 'Configure WhatsApp for selling and customer communication'
    },
    {
      title: 'First Sales Strategy',
      duration: '20 min',
      description: 'Proven methods to make your first sale'
    },
    {
      title: 'Scaling Your Income',
      duration: '16 min',
      description: 'Grow from first sale to consistent monthly income'
    }
  ]

  return (
    <div className="course-page">
      <header className="course-header">
        <div className="course-nav">
          <div className="brand-small">LIDKHA</div>
          <div className="user-info">
            <span className="user-name">Welcome, {user?.name}</span>
            <button className="logout-btn" onClick={onLogout}>Log out</button>
          </div>
        </div>
      </header>

      <main className="course-main">
        <section className="course-hero">
          <div className="course-hero-content">
            <span className="course-tag">Your first course</span>
            <h1>How to Make Money Using Facebook and WhatsApp for Beginners</h1>
            <p className="course-subtitle">Step-by-step guide even with zero followers</p>
            
            <div className="course-stats">
              <div className="stat">
                <span className="stat-label">Total duration</span>
                <span className="stat-value">1.5 hours</span>
              </div>
              <div className="stat">
                <span className="stat-label">Lessons</span>
                <span className="stat-value">{lessons.length} lessons</span>
              </div>
              <div className="stat">
                <span className="stat-label">Level</span>
                <span className="stat-value">Beginner</span>
              </div>
            </div>
          </div>
        </section>

        <section className="lessons-section">
          <div className="lessons-header">
            <h2>Course Curriculum</h2>
            <p>Complete these lessons to learn the exact steps to earn with your smartphone</p>
          </div>

          <div className="lessons-grid">
            {lessons.map((lesson, idx) => (
              <article className="lesson-card" key={idx}>
                <div className="lesson-number">{idx + 1}</div>
                <div className="lesson-content">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                  <span className="lesson-duration">⏱ {lesson.duration}</span>
                </div>
                <button className="lesson-btn">Start lesson →</button>
              </article>
            ))}
          </div>
        </section>

        <section className="course-info">
          <div className="info-box">
            <h3>What you'll learn</h3>
            <ul>
              <li>How to start earning with zero followers</li>
              <li>Complete Facebook strategy for beginners</li>
              <li>WhatsApp selling fundamentals</li>
              <li>Your first customer acquisition strategy</li>
              <li>Scaling from first sale to real income</li>
              <li>Avoiding common beginner mistakes</li>
            </ul>
          </div>

          <div className="info-box">
            <h3>Your learning path</h3>
            <p>
              This course is designed for complete beginners. You don't need any followers, 
              experience, or previous knowledge. Start with lesson 1 and progress through at your own pace.
            </p>
            <p>
              Estimated time to complete: <strong>2-3 hours</strong>
            </p>
          </div>
        </section>
      </main>

      <footer className="course-footer">
        <p>© 2026 LIDKHA — Learn digital skills and earn from your smartphone</p>
      </footer>
    </div>
  )
}
