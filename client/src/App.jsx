import { useState } from 'react'
import './App.css'
import LoginModal from './LoginModal'
import ChatSection from './ChatSection'
import AboutPage from './AboutPage'
import StudentDashboard from './StudentDashboard'
import CourseDetail from './CourseDetail'
import AdminDashboard from './AdminDashboard'

const features = [
  {
    title: 'Learn on your smartphone',
    description: 'Get practical lessons that work on mobile devices anywhere, anytime.',
  },
  {
    title: 'Make money online',
    description: 'Follow step-by-step guides to earn real income from your phone.',
  },
  {
    title: 'Beginner-friendly path',
    description: 'Start from zero and build a sustainable online income.',
  },
]

const landingCourses = [
  {
    title: 'Make Money with Facebook & WhatsApp',
    description: 'Learn to earn real income using social platforms even with zero followers.',
    status: 'available'
  },
  {
    title: 'Graphic Design Basics',
    description: 'Create stunning visual designs that sell and convert your audience.',
    status: 'coming-soon'
  },
  {
    title: 'Video Editing Mastery',
    description: 'Edit professional videos that engage and grow your following fast.',
    status: 'coming-soon'
  },
  {
    title: 'Content Creation Strategy',
    description: 'Create viral content that attracts customers and builds your brand.',
    status: 'coming-soon'
  },
]

const testimonials = [
  {
    quote: 'I launched my first paid course in one month and the templates helped a lot.',
    author: 'Nina, creator',
  },
  {
    quote: 'My landing page looks much more professional and people now trust my brand.',
    author: 'Sam, freelancer',
  },
]

export default function App() {
  const [currentView, setCurrentView] = useState('landing') // landing, about, dashboard, courseDetail, admin
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [selectedCourseId, setSelectedCourseId] = useState(null)

  const adminEmails = ['creator@lidkha.com.ng', 'admin@lidkha.com.ng']

  const handleAdminAccess = () => {
    if (user?.isAdmin) {
      setCurrentView('admin')
      window.scrollTo(0, 0)
    }
  }

  const handleSignUp = (formData) => {
    const normalizedEmail = formData.email.trim().toLowerCase()
    setUser({
      ...formData,
      email: normalizedEmail,
      isAdmin: adminEmails.includes(normalizedEmail),
    })
    setIsLoginOpen(false)
    setCurrentView('dashboard')
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('landing')
    window.scrollTo(0, 0)
  }

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId)
    setCurrentView('courseDetail')
    window.scrollTo(0, 0)
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    window.scrollTo(0, 0)
  }

  const handleAboutPage = () => {
    setCurrentView('about')
    window.scrollTo(0, 0)
  }

  const handleBackToLanding = () => {
    setCurrentView('landing')
    window.scrollTo(0, 0)
  }

  // Show different pages based on currentView
  if (currentView === 'about') {
    return <AboutPage onBack={handleBackToLanding} />
  }

  if (currentView === 'dashboard' && user) {
    return (
      <StudentDashboard 
        user={user} 
        onLogout={handleLogout}
        onCourseClick={handleCourseClick}
        onAdminAccess={handleAdminAccess}
      />
    )
  }

  if (currentView === 'admin' && user) {
    return (
      <AdminDashboard
        user={user}
        onBack={() => {
          setCurrentView('dashboard')
          window.scrollTo(0, 0)
        }}
      />
    )
  }

  if (currentView === 'courseDetail' && user) {
    return (
      <CourseDetail 
        courseId={selectedCourseId}
        user={user}
        onBack={handleBackToDashboard}
      />
    )
  }

  // Default to landing page
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">LIDKHA</div>
        <nav className="site-nav">
          <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}>Home</a>
          <a href="#courses" onClick={(e) => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }}>Courses</a>
          <button onClick={handleAboutPage} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontWeight: 500, fontSize: '1rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}>About</button>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
        </nav>
        <button className="button button-primary" onClick={() => setIsLoginOpen(true)}>Login</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">Introducing LIDKHA</span>
            <h1>Learn how to make money using your smartphone online.</h1>
            <p>
              LIDKHA is a platform where you learn practical ways to earn real
              income from your phone. Start with proven methods and grow your
              online earnings.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => setIsLoginOpen(true)}>Sign up to get started</button>
              <button className="button button-secondary" onClick={handleAboutPage}>Learn more</button>
            </div>
          </div>

          <div className="hero-panel">
            <div className="video-card">
              <div className="video-preview">Your video guide</div>
              <div className="video-info">
                <strong>My beginner guide</strong>
                <span>Learn the exact steps to earn with Facebook and WhatsApp.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section feature-section">
          <div className="section-heading">
            <h2>What you'll get with LIDKHA</h2>
            <p>Everything you need to start earning from your smartphone today.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section course-section" id="courses">
          <div className="section-heading">
            <h2>Courses available</h2>
            <p>Start with any course and grow your skills at your own pace.</p>
          </div>
          <div className="course-grid">
            {landingCourses.map((course) => (
              <article className="course-card" key={course.title}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                {course.status === 'available' ? (
                  <button className="button button-primary" onClick={() => setIsLoginOpen(true)}>Sign up to enroll</button>
                ) : (
                  <button className="button button-coming-soon" disabled>Coming soon</button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section testimonial-section">
          <div className="section-heading">
            <h2>Trusted by early creators</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <blockquote className="testimonial-card" key={item.author}>
                <p>“{item.quote}”</p>
                <footer>{item.author}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="section cta-section" id="contact">
          <div>
            <h2>Ready to learn every step from my guide?</h2>
            <p>Start with a course designed for beginners who want real digital income skills.</p>
          </div>
          <button className="button button-primary" onClick={() => setIsLoginOpen(true)}>Start the course</button>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 LIDKHA — Built for creators who want digital income.</p>
      </footer>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSignUp={handleSignUp}
      />

      <ChatSection />
    </div>
  )
}
