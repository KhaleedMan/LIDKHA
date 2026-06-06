import { useState, useEffect } from 'react'
import './App.css'
import ChatSection from './ChatSection'
import AboutPage from './AboutPage'
import CourseDetailPage from './CourseDetailPage'
import AdminDashboard from './AdminDashboard'
import NewHomepage from './NewHomepage'
import CreatorProfilePage from './CreatorProfilePage';
import CreatorsDirectoryPage from './CreatorsDirectoryPage';
import MessagesPage from './MessagesPage';
import ExploreCoursesPage from './ExploreCoursesPage';
import CreatorDashboard from './CreatorDashboard';
import CreateCoursePage from './CreateCoursePage';
import ManageCoursesPage from './ManageCoursesPage';
import CourseBuilderPage from './CourseCurriculumPage'; // Renamed for clarity
import CoursePreviewPage from './CoursePreviewPage';
import VideoUploadPage from './VideoUploadPage';
import StudentDashboard from './StudentDashboard';
import logo from './assets/logo.png.png';

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
    id: 1, // Added an ID for navigation
    title: 'Make Money with Facebook & WhatsApp',
    description: 'Learn to earn real income using social platforms even with zero followers.',
    status: 'available'
  },
  {
    id: 2,
    title: 'Graphic Design Basics',
    description: 'Create stunning visual designs that sell and convert your audience.',
    status: 'coming-soon'
  },
  {
    id: 3,
    title: 'Video Editing Mastery',
    description: 'Edit professional videos that engage and grow your following fast.',
    status: 'coming-soon'
  },
  {
    id: 4,
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
  const [currentView, setCurrentView] = useState('landing') // landing, auth, about, dashboard, courseDetail, admin, creatorProfile, creatorsDirectory, messages, exploreCourses, creatorDashboard, createCourse, manageCourses, courseCurriculum, videoUpload, coursePreview, studentDashboard
  const [user, setUser] = useState(null)
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [courseDataForPreview, setCourseDataForPreview] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Make Money with Facebook & WhatsApp',
      author: 'SIRKHALIDMAN',
      lessons: [
        { id: 1, title: 'Getting Started with Zero Followers', videoUrl: null, duration: '12 min' },
        { id: 2, title: 'Setting Up Your Facebook Profile', videoUrl: null, duration: '15 min' },
        { id: 3, title: 'Facebook Marketplace Basics', videoUrl: null, duration: '18 min' },
        { id: 4, title: 'WhatsApp Business Setup', videoUrl: null, duration: '14 min' },
        { id: 5, title: 'First Sales Strategy', videoUrl: null, duration: '20 min' },
        { id: 6, title: 'Scaling Your Income', videoUrl: null, duration: '16 min' }
      ]
    }
  ]);

  const adminEmails = ['creator@skilwhop.com.ng', 'admin@skilwhop.com.ng', 'khalidhussainadam1@gmail.com']

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      localStorage.setItem('referrer', ref);
    }
    const path = window.location.pathname;
    if (path === '/creator-dashboard') {
      setCurrentView('creatorDashboard');
    }
    if (path === '/student-dashboard') {
      setCurrentView('studentDashboard');
    }

  }, []);

  const handleHomepageAccess = () => {
    const dummyUser = {
        name: 'Guest',
        isAdmin: false,
    };
    setUser(dummyUser);
    setCurrentView('dashboard');
    window.scrollTo(0, 0);
  }
  
  const handleStudentDashboardClick = () => {
    setCurrentView('studentDashboard');
    window.history.pushState(null, '', '/student-dashboard');
    window.scrollTo(0, 0);
  };

  const handleEnrollClickFromLanding = (courseId) => {
    const dummyUser = {
        name: 'Guest',
        isAdmin: false,
    };
    setUser(dummyUser);
    setSelectedCourseId(courseId);
    setCurrentView('courseDetail');
    window.scrollTo(0, 0);
  }

  const handleAdminAccess = () => {
    if (user?.isAdmin) {
      setCurrentView('admin')
      window.scrollTo(0, 0)
    }
  }

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    if (loggedInUser.isAdmin) {
        setCurrentView('admin');
    } else {
        setCurrentView('dashboard');
    }
    window.scrollTo(0, 0);
  };


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
  
  const handleCreatorProfileClick = () => {
    setCurrentView('creatorProfile');
    window.scrollTo(0, 0);
  };
  
  const handleCreatorsDirectoryClick = () => {
    setCurrentView('creatorsDirectory');
    window.scrollTo(0, 0);
  };
  
  const handleMessagesClick = () => {
    setCurrentView('messages');
    window.scrollTo(0, 0);
  };
  
  const handleExploreCoursesClick = () => {
    setCurrentView('exploreCourses');
    window.scrollTo(0, 0);
  };
  
  const handleCreatorDashboardClick = () => {
    setCurrentView('creatorDashboard');
    window.history.pushState(null, '', '/creator-dashboard');
    window.scrollTo(0, 0);
  };
  
  const handleCreateCourseClick = () => {
    setCurrentView('createCourse');
    window.scrollTo(0, 0);
  };

  const handleManageCoursesClick = () => {
    setCurrentView('manageCourses');
    window.scrollTo(0, 0);
  };

  const handleCourseCurriculumClick = () => {
    setCurrentView('courseCurriculum');
    window.scrollTo(0, 0);
  };

  const handleCoursePreviewClick = (courseData) => {
    setCourseDataForPreview(courseData);
    setCurrentView('coursePreview');
    window.scrollTo(0, 0);
  };

  const handleCourseCreated = () => {
    setCurrentView('courseCurriculum');
    window.scrollTo(0, 0);
  };

  const handlePublish = () => {
    alert('Course published successfully!');
    setCurrentView('creatorDashboard');
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    window.scrollTo(0, 0)
  }

  const handleBackToCreatorDashboard = () => {
    setCurrentView('creatorDashboard');
    window.scrollTo(0, 0);
  }

  const handleBackToCreateCourse = () => {
    setCurrentView('createCourse');
    window.scrollTo(0, 0);
  }

  const handleBackToCurriculum = () => {
    setCurrentView('courseCurriculum');
    window.scrollTo(0, 0);
  }

  const handleAboutPage = () => {
    setCurrentView('about')
    window.scrollTo(0, 0)
  }

  const handleBackToLanding = () => {
    setCurrentView('landing')
    window.history.pushState(null, '', '/');
    window.scrollTo(0, 0)
  }

  if (currentView === 'about') {
    return <AboutPage onBack={handleBackToLanding} />
  }

  if (currentView === 'dashboard' && user) {
    return <NewHomepage user={user} onLogout={handleLogout} registeredUsers={registeredUsers} setCurrentView={setCurrentView} setSelectedCourseId={setSelectedCourseId} courses={courses} setCourses={setCourses} onViewCreatorProfile={handleCreatorProfileClick} onNavigateToCreators={handleCreatorsDirectoryClick} onNavigateToMessages={handleMessagesClick} onNavigateToExploreCourses={handleExploreCoursesClick} onNavigateToCreatorDashboard={handleCreatorDashboardClick} />
  }
  
  if (currentView === 'creatorProfile') {
    return <CreatorProfilePage onBack={handleBackToDashboard} />;
  }
  
  if (currentView === 'creatorsDirectory') {
    return <CreatorsDirectoryPage onViewCreatorProfile={handleCreatorProfileClick} />;
  }
  
  if (currentView === 'messages') {
    return <MessagesPage />;
  }
  
  if (currentView === 'exploreCourses') {
    return <ExploreCoursesPage onBack={handleBackToDashboard} />;
  }
  
  if (currentView === 'creatorDashboard') {
    return <CreatorDashboard onNavigateToCreateCourse={handleCreateCourseClick} />;
  }
  
  if (currentView === 'studentDashboard') {
    return <StudentDashboard />;
  }

  if (currentView === 'createCourse') {
    return <CreateCoursePage onBack={handleBackToCreatorDashboard} onCourseCreated={handleCourseCreated} />;
  }

  if (currentView === 'manageCourses') {
    return <ManageCoursesPage onBack={handleBackToCreatorDashboard} onNavigateToCurriculum={handleCourseCurriculumClick} />;
  }

  if (currentView === 'courseCurriculum') {
    return <CourseBuilderPage onBack={handleBackToCreateCourse} onPreview={handleCoursePreviewClick} />;
  }

  if (currentView === 'coursePreview') {
    return <CoursePreviewPage course={courseDataForPreview} onBack={handleBackToCurriculum} onPublish={handlePublish} />;
  }

  if (currentView === 'admin' && user) {
    return (
      <AdminDashboard
        user={user}
        onBack={() => {
          setCurrentView('dashboard')
          window.scrollTo(0, 0)
        }}
        registeredUsers={registeredUsers}
        setRegisteredUsers={setRegisteredUsers}
        courses={courses}
        setCourses={setCourses}
      />
    )
  }

  if (currentView === 'courseDetail' && user) {
    return (
      <CourseDetailPage 
        onBack={handleBackToDashboard}
      />
    )
  }

  // Default to landing page
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="SKILWHOP Logo" style={{ height: '32px', marginRight: '12px' }} />
          SKILWHOP
        </div>
        <nav className="site-nav">
          <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}>Home</a>
          <a href="#courses" onClick={(e) => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }}>Courses</a>
          <button onClick={handleAboutPage} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontWeight: 500, fontSize: '1rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}>About</button>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
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
          <div className="feature-.grid">
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
  )
}
