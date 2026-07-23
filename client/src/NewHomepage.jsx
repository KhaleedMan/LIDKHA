import './NewHomepage.css';

export default function NewHomepage({
  onNavigateToCreatorDashboard,
  onNavigateToExploreCourses,
}) {
  return (
    <div className="new-homepage">
        <section className="hero-section">
          <h1>Unlock Your Potential, Master New Skills.</h1>
          <p>Join a community of learners and creators. Explore courses, share your knowledge, and start earning.</p>
          <div className="hero-buttons">
            <button onClick={onNavigateToExploreCourses}>Explore Courses</button>
            <button onClick={onNavigateToCreatorDashboard}>Become a Creator</button>
          </div>
        </section>

        <div className="category-bar">
          <button>Marketing</button>
          <button>Design</button>
          <button>Programming</button>
          <button>Business</button>
          <button>Lifestyle</button>
          <button>Photography</button>
        </div>

        <section className="featured-courses">
          <h2>Featured Courses</h2>
          <div className="course-grid">
            {/* Course Card 1 */}
            <div className="course-card">
              <div className="course-thumbnail-placeholder"></div>
              <h3>Make Money with Facebook & WhatsApp</h3>
              <p className="creator">by SIRKHALIDMAN</p>
              <div className="course-meta">
                <span className="category">Marketing</span>
              </div>
              <div className="course-stats">
                <span>★ 4.8 (1.2k)</span>
                <span>10.5 hours</span>
              </div>
              <p className="price">$49.99</p>
              <button className="enroll-button">Enroll Now</button>
            </div>
            {/* More course cards can be added here */}
          </div>
        </section>

        <section className="trending-creators">
          <h2>Trending Creators</h2>
          <div className="creator-grid">
            {/* Creator Card 1 */}
            <div className="creator-card">
              <div className="creator-profile-placeholder"></div>
              <h3>SIRKHALIDMAN</h3>
              <p className="creator-bio">Digital marketing expert with over 10 years of experience.</p>
              <div className="creator-stats">
                <div><strong>5k</strong><br/>Followers</div>
                <div><strong>12</strong><br/>Courses</div>
              </div>
              <div className="creator-buttons">
                <button className="follow-button">Follow</button>
                <button className="view-profile-button">View Profile</button>
              </div>
            </div>
            {/* More creator cards can be added here */}
          </div>
        </section>
    </div>
  );
}
