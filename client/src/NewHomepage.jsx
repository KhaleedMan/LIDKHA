import { useState } from 'react';
import './NewHomepage.css';
import AffiliateDashboard from './AffiliateDashboard';
import AdminDashboard from './AdminDashboard';

function HomeFeed({ courses, onCourseClick }) {
  return (
    <div>
      <h2>Home Feed</h2>
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

export default function NewHomepage({ user, onLogout, registeredUsers, setCurrentView, setSelectedCourseId, courses, setCourses }) {
  const [activeView, setActiveView] = useState('home');

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentView('courseDetail');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeFeed courses={courses} onCourseClick={handleCourseClick} />;
      case 'discover':
        return <Discover courses={courses} onCourseClick={handleCourseClick} />;
      case 'affiliate':
        return <AffiliateDashboard user={user} registeredUsers={registeredUsers} />;
      case 'dashboard':
        return <AdminDashboard user={user} registeredUsers={registeredUsers} setRegisteredUsers={() => {}} onBack={() => setActiveView('home')} courses={courses} setCourses={setCourses} />;
      default:
        return <HomeFeed courses={courses} onCourseClick={handleCourseClick} />;
    }
  };

  return (
    <div className="new-homepage">
      <div className="sidebar">
        <div className="sidebar-header">SKILWHOP</div>
        <nav className="sidebar-nav">
          <a href="#" className={activeView === 'home' ? 'active' : ''} onClick={() => setActiveView('home')}>Home</a>
          <a href="#" className={activeView === 'discover' ? 'active' : ''} onClick={() => setActiveView('discover')}>Discover</a>
          {user.isAdmin && <a href="#" className={activeView === 'dashboard' ? 'active' : ''} onClick={() => setActiveView('dashboard')}>Dashboard</a>}
          <a href="#" className={activeView === 'affiliate' ? 'active' : ''} onClick={() => setActiveView('affiliate')}>Affiliate</a>
        </nav>
      </div>
      <div className="main-content">
        {renderActiveView()}
      </div>
      <div className="messages-panel">
        <h2>Messages</h2>
        {/* Placeholder for messages */}
      </div>
    </div>
  );
}
