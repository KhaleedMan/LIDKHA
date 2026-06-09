import React from 'react';
import './App.css';
import logo from './assets/logo.png.png';
import ChatSection from './ChatSection';

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
];

const landingCourses = [
  {
    id: 1,
    title: 'Make Money with Facebook & WhatsApp',
    description: 'Learn to earn real income using social platforms even with zero followers.',
    status: 'available',
  },
  {
    id: 2,
    title: 'Graphic Design Basics',
    description: 'Create stunning visual designs that sell and convert your audience.',
    status: 'coming-soon',
  },
  {
    id: 3,
    title: 'Video Editing Mastery',
    description: 'Edit professional videos that engage and grow your following fast.',
    status: 'coming-soon',
  },
  {
    id: 4,
    title: 'Content Creation Strategy',
    description: 'Create viral content that attracts customers and builds your brand.',
    status: 'coming-soon',
  },
];

const testimonials = [
  {
    quote: 'I launched my first paid course in one month and the templates helped a lot.',
    author: 'Nina, creator',
  },
  {
    quote: 'My landing page looks much more professional and people now trust my brand.',
    author: 'Sam, freelancer',
  },
];

export default function LandingPage({ handleHomepageAccess, handleAboutPage, handleEnrollClickFromLanding, handleBackToLanding }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand" onClick={handleBackToLanding} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="SKILWHOP Logo" style={{ height: '32px', marginRight: '12px' }} />
          SKILWHOP
        </div>
        <nav className="site-nav">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleBackToLanding(); }}>Home</a>
          <a href="#courses">Courses</a>
          <button onClick={handleAboutPage}>About</button>
          <a href="#contact">Contact</a>
        </nav>
        <button className="button button-primary" onClick={handleHomepageAccess}>Login</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">Introducing SKILWHOP</span>
            <h1>Learn how to make money using your smartphone online.</h1>
            <p>
              SKILWHOP is a platform where you learn practical ways to earn real
              income from your phone. Start with proven methods and grow your
              online earnings.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={handleHomepageAccess}>Sign up to get started</button>
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
            <h2>What you'll get with SKILWHOP</h2>
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
                  <button className="button button-primary" onClick={() => handleEnrollClickFromLanding(course.id)}>Sign up to enroll</button>
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
          <button className="button button-primary" onClick={handleHomepageAccess}>Start the course</button>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 SKILWHOP — Built for creators who want digital income.</p>
      </footer>

      <ChatSection />
    </div>
  );
}
