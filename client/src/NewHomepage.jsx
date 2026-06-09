
import { useState } from 'react';
import './NewHomepage.css';
import AffiliateDashboard from './AffiliateDashboard';
import AdminDashboard from './AdminDashboard';

function HeroSection({ onNavigateToExploreCourses, onViewCreatorProfile }) {
  return (
    <div className="hero-section">
      <h1>Learn. Build. Earn.</h1>
      <p>Discover valuable skills, create courses, grow your audience, and earn from your knowledge with SKILWHOP.</p>
      <div className="hero-buttons">
        <button onClick={onNavigateToExploreCourses}>Explore Courses</button>
        <button onClick={onViewCreatorProfile}>Become a Creator</button>
      </div>
    </div>
  );
}

function CategoryBar() {
  const categories = ['Business', 'AI', 'Marketing', 'E-commerce', 'Programming', 'Design', 'Trading', 'Freelancing'];
  return (
    <div className="category-bar">
      {categories.map(category => (
        <button key={category}>{category}</button>
      ))}
    </div>
  );
}

function FeaturedCourses({ onCourseClick }) {
    const sampleCourses = [
        { id: 1, title: 'Make Money with Facebook & WhatsApp', creator: 'SIRKHALIDMAN', category: 'Marketing', rating: 4.9, students: 1250, price: '₦15,000' },
        { id: 2, title: 'The Complete Web Developer Course 3.0', creator: 'Dr. Angela Yu', category: 'Programming', rating: 4.8, students: 2500, price: '₦25,000' },
        { id: 3, title: 'Advanced CSS and Sass: Flexbox, Grid, Animations', creator: 'Jonas Schmedtmann', category: 'Design', rating: 4.7, students: 1800, price: '₦20,000' },
        { id: 4, title: 'Python for Data Science and Machine Learning Bootcamp', creator: 'Jose Portilla', category: 'Programming', rating: 4.6, students: 3000, price: '₦30,000' },
    ];

    return (
        <div className="featured-courses">
            <h2>Featured Courses</h2>
            <div className="course-grid">
                {sampleCourses.map(course => (
                    <div key={course.id} className="course-card">
                        <div className="course-thumbnail-placeholder"></div>
                        <h3>{course.title}</h3>
                        <p className="creator">By {course.creator}</p>
                        <div className="course-meta">
                            <span className="category">{course.category}</span>
                        </div>
                        <div className="course-stats">
                            <span className="rating">⭐ {course.rating}</span>
                            <span className="students">👥 {course.students} Students</span>
                        </div>
                        <p className="price">{course.price}</p>
                        <button className="enroll-button" onClick={() => onCourseClick(course.id)}>Enroll Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TrendingCreators({ onViewCreatorProfile }) {
    const sampleCreators = [
        { id: 1, name: 'Khalid Hussain', bio: 'Helping people learn online business and digital skills.', courses: 12, students: 4500 },
        { id: 2, name: 'Angela Yu', bio: 'Teacher of 1.5M+ students. I teach Flutter, Web, App Development & Data Science.', courses: 8, students: 15000 },
        { id: 3, name: 'Jonas Schmedtmann', bio: 'Building premium courses on web design and development since 2015.', courses: 15, students: 10000 },
        { id: 4, name: 'Jose Portilla', bio: 'Head of Data Science at Pierian Data Inc. and best-selling instructor.', courses: 20, students: 20000 },
    ];

    return (
        <div className="trending-creators">
            <h2>Trending Creators</h2>
            <div className="creator-grid">
                {sampleCreators.map(creator => (
                    <div key={creator.id} className="creator-card">
                        <div className="creator-profile-placeholder"></div>
                        <h3>{creator.name}</h3>
                        <p className="creator-bio">{creator.bio}</p>
                        <div className="creator-stats">
                            <span>📚 {creator.courses} Courses</span>
                            <span>👥 {creator.students} Students</span>
                        </div>
                        <div className="creator-buttons">
                            <button className="follow-button">Follow</button>
                            <button className="view-profile-button" onClick={onViewCreatorProfile}>View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AffiliateMarketplacePreview() {
    const sampleOpportunities = [
        { id: 1, title: 'Facebook Marketing Masterclass', creator: 'Khalid Hussain', commission: '30%', earnings: '₦7,500' },
        { id: 2, title: 'The Complete Web Developer Course 3.0', creator: 'Dr. Angela Yu', commission: '25%', earnings: '₦6,250' },
        { id: 3, title: 'Advanced CSS and Sass', creator: 'Jonas Schmedtmann', commission: '20%', earnings: '₦4,000' },
        { id: 4, title: 'Python for Data Science Bootcamp', creator: 'Jose Portilla', commission: '35%', earnings: '₦10,500' },
    ];

    return (
        <div className="affiliate-marketplace-preview">
            <h2>Earn by Promoting Courses</h2>
            <p className="section-subtitle">Join the SKILWHOP affiliate marketplace and earn commissions by promoting high-quality courses.</p>
            <div className="affiliate-grid">
                {sampleOpportunities.map(opp => (
                    <div key={opp.id} className="affiliate-card">
                        <div className="course-thumbnail-placeholder"></div>
                        <h3>{opp.title}</h3>
                        <p className="creator">By {opp.creator}</p>
                        <div className="affiliate-meta">
                            <span className="commission">💰 {opp.commission} Commission</span>
                            <span className="earnings">📈 Earn up to {opp.earnings} per sale</span>
                        </div>
                        <button className="promote-button">Promote Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SuccessStories() {
    const sampleTestimonials = [
        { id: 1, name: 'Amina Yusuf', role: 'Affiliate Marketer', story: '"Within 3 months, I earned over ₦250,000 promoting courses on SKILWHOP."', rating: 5 },
        { id: 2, name: 'David Okafor', role: 'Student', story: '"The web development course helped me land a new job with a 50% salary increase."', rating: 5 },
        { id: 3, name: 'Chiamaka Nwosu', role: 'Creator', story: '"I made my first ₦1,000,000 selling my design course. The platform is so easy to use!"', rating: 5 },
    ];

    return (
        <div className="success-stories">
            <h2>Success Stories</h2>
            <p className="section-subtitle">See how members of the SKILWHOP community are learning, building, and earning.</p>
            <div className="testimonial-grid">
                {sampleTestimonials.map(testimonial => (
                    <div key={testimonial.id} className="testimonial-card">
                        <div className="testimonial-profile-placeholder"></div>
                        <h3>{testimonial.name}</h3>
                        <p className="testimonial-role">{testimonial.role}</p>
                        <p className="testimonial-text">{testimonial.story}</p>
                        <div className="testimonial-rating">
                            {'⭐'.repeat(testimonial.rating)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Footer({ onViewCreatorProfile }) {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>SKILWHOP</h3>
                    <p className="tagline">Learn. Build. Earn.</p>
                    <p>The all-in-one platform for knowledge creators and learners.</p>
                </div>
                <div className="footer-section links">
                    <h3>Platform</h3>
                    <ul>
                        <li><a href="#">Explore Courses</a></li>
                        <li><a href="#">Creators</a></li>
                        <li><a href="#">Affiliates</a></li>
                        <li><a href="#">Categories</a></li>
                    </ul>
                </div>
                <div className="footer-section links">
                    <h3>Creators</h3>
                    <ul>
                        <li><a href="#" onClick={onViewCreatorProfile}>Become a Creator</a></li>
                        <li><a href="#">Upload Courses</a></li>
                        <li><a href="#">Creator Resources</a></li>
                    </ul>
                </div>
                <div className="footer-section links">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h3>Social Links</h3>
                    <div className="social-icons">
                        <a href="#">FB</a>
                        <a href="#">X</a>
                        <a href="#">IG</a>
                        <a href="#">YT</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2026 SKILWHOP. All rights reserved.</p>
            </div>
        </footer>
    )
}

function Discover({ courses, onCourseClick }) {
  return (
    <div>
      <h2>Discover Courses</h2>
      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card" onClick={() => onCourseClick(course.id)}>
            <h3>{course.title}</h3>
            <p>by {course.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NewHomepage({ user, onLogout, registeredUsers, setCurrentView, setSelectedCourseId, courses, setCourses, onViewCreatorProfile, onNavigateToCreators, onNavigateToMessages, onNavigateToExploreCourses, onNavigateToCreatorDashboard }) {
  const [activeView, setActiveView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentView('courseDetail');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <HeroSection onNavigateToExploreCourses={onNavigateToExploreCourses} onViewCreatorProfile={onViewCreatorProfile} />
            <CategoryBar />
            <FeaturedCourses onCourseClick={handleCourseClick} />
            <TrendingCreators onViewCreatorProfile={onViewCreatorProfile} />
            <AffiliateMarketplacePreview />
            <SuccessStories />
          </>
        );
      case 'discover':
        return <Discover courses={courses} onCourseClick={handleCourseClick} />;
      case 'affiliate':
        return <AffiliateDashboard user={user} registeredUsers={registeredUsers} />;
      case 'dashboard':
        return <AdminDashboard user={user} registeredUsers={registeredUsers} setRegisteredUsers={() => {}} onBack={() => setActiveView('home')} courses={courses} setCourses={setCourses} />;
      default:
        return (
          <>
            <HeroSection onNavigateToExploreCourses={onNavigateToExploreCourses} onViewCreatorProfile={onViewCreatorProfile} />
            <CategoryBar />
            <FeaturedCourses onCourseClick={handleCourseClick} />
            <TrendingCreators onViewCreatorProfile={onViewCreatorProfile} />
            <AffiliateMarketplacePreview />
            <SuccessStories />
          </>
        );
    }
  };

  return (
    <div className="new-homepage">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">SKILWHOP</div>
        <nav className="sidebar-nav">
          <a href="#" className={activeView === 'home' ? 'active' : ''} onClick={() => {setActiveView('home'); setIsSidebarOpen(false);}}>Home</a>
          <a href="#" onClick={() => {onNavigateToExploreCourses(); setIsSidebarOpen(false);}}>Explore Courses</a>
          <a href="#" className={activeView === 'discover' ? 'active' : ''} onClick={() => {setActiveView('discover'); setIsSidebarOpen(false);}}>Discover</a>
          <a href="#" onClick={() => {onNavigateToCreators(); setIsSidebarOpen(false);}}>Creators</a>
          {user.isAdmin && <a href="#" onClick={() => {setCurrentView('admin'); setIsSidebarOpen(false);}}>Admin Dashboard</a>}
          <a href="#" onClick={() => {onViewCreatorProfile(); setIsSidebarOpen(false);}}>Creator Dashboard</a>
          <a href="#" className={activeView === 'affiliate' ? 'active' : ''} onClick={() => {setActiveView('affiliate'); setIsSidebarOpen(false);}}>Affiliate</a>
        </nav>
      </div>

      <div className="main-content-wrapper">
        <div className="top-bar">
            <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                &#x2630;
            </button>
            <div className="top-bar-title">SKILWHOP</div>
            <div className="top-bar-actions">
                <button onClick={onViewCreatorProfile}>Profile</button>
                <button onClick={onNavigateToMessages}>Messages</button>
            </div>
        </div>
        <div className="main-content">
          {renderActiveView()}
        </div>
        <Footer onViewCreatorProfile={onViewCreatorProfile} />
      </div>
    </div>
  );
}
