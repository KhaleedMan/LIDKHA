import './AboutPage.css'

export default function AboutPage({ onBack }) {
  const skills = [
    {
      title: 'Make Money with Facebook & WhatsApp',
      description: 'Learn to earn real income using just your smartphone and social platforms.',
      icon: '💰'
    },
    {
      title: 'Graphic Design',
      description: 'Master design basics to create stunning visuals for your online business.',
      icon: '🎨'
    },
    {
      title: 'Video Editing',
      description: 'Edit professional videos that engage and convert your audience.',
      icon: '🎬'
    },
    {
      title: 'Content Creation',
      description: 'Create viral content strategies that grow your online presence fast.',
      icon: '📱'
    },
    {
      title: 'Copywriting',
      description: 'Write persuasive copy that sells and builds your personal brand.',
      icon: '✍️'
    },
    {
      title: 'Social Media Marketing',
      description: 'Master Instagram, TikTok, and Facebook to reach your ideal customers.',
      icon: '📊'
    },
  ]

  return (
    <div className="about-page">
      <header className="about-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <div className="brand">LIDKHA</div>
      </header>

      <main className="about-main">
        <section className="about-hero">
          <h1>Learn Digital Skills, Build Real Income</h1>
          <p>
            LIDKHA is a learning platform designed to help you master digital skills 
            and turn them into real income. We teach you everything from social media marketing 
            to graphic design, all designed for beginners.
          </p>
        </section>

        <section className="about-mission">
          <div className="mission-box">
            <h2>Our Mission</h2>
            <p>
              We believe anyone can build a successful online business with the right skills and guidance. 
              That's why we've created courses that teach practical, proven methods you can start using today.
            </p>
          </div>

          <div className="mission-box">
            <h2>Why LIDKHA?</h2>
            <p>
              No complicated theory. No long lectures. Just step-by-step guides that show you exactly 
              how to earn money using your smartphone. Learn at your own pace and start earning immediately.
            </p>
          </div>
        </section>

        <section className="skills-section">
          <h2>Skills You Can Learn</h2>
          <p className="section-intro">Master multiple digital skills to build your online income empire</p>

          <div className="skills-grid">
            {skills.map((skill, idx) => (
              <article className="skill-card" key={idx}>
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-about">
          <h2>Ready to start learning?</h2>
          <p>Join thousands who are building their digital income with LIDKHA</p>
          <button className="button button-primary" onClick={onBack}>Explore courses</button>
        </section>
      </main>

      <footer className="about-footer">
        <p>© 2026 LIDKHA — Learn, Build, Earn</p>
      </footer>
    </div>
  )
}
