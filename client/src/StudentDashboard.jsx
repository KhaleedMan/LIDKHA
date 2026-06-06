import React from 'react';
import './StudentDashboard.css';

const sampleStudent = {
  name: 'Alex Doe',
  learningStreak: 14, // in days
  coursesEnrolled: 3,
  certificatesEarned: 1,
};

const enrolledCourses = [
  {
    id: 1,
    title: 'Make Money with Facebook & WhatsApp',
    instructor: 'Khalid Hussain',
    thumbnailUrl: 'https://via.placeholder.com/300x170',
    progress: 75,
    lastLesson: 'Lesson 5: First Sales Strategy',
    status: 'inprogress',
  },
  {
    id: 2,
    title: 'Graphic Design for Beginners',
    instructor: 'Jane Smith',
    thumbnailUrl: 'https://via.placeholder.com/300x170',
    progress: 100,
    lastLesson: 'Lesson 10: Final Project',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Advanced Content Creation Strategy',
    instructor: 'Sam Wilson',
    thumbnailUrl: 'https://via.placeholder.com/300x170',
    progress: 20,
    lastLesson: 'Lesson 2: Finding Your Niche',
    status: 'inprogress',
  },
];

const recommendedCourses = [
  { id: 4, title: 'The Ultimate Guide to Online Sales', instructor: 'Khalid Hussain' },
  { id: 5, title: 'Introduction to Digital Marketing', instructor: 'Emily White' },
];

const StudentDashboard = () => {
  const coursesInProgress = enrolledCourses.filter(c => c.status === 'inprogress');
  const completedCourses = enrolledCourses.filter(c => c.status === 'completed');

  return (
    <div className="student-dashboard-page">
      {/* -- Student Header -- */}
      <header className="student-header">
        <div className="student-profile-photo"></div>
        <div className="student-info">
          <h1>Welcome back, {sampleStudent.name}!</h1>
          <div className="student-meta-stats">
            <span>🔥 {sampleStudent.learningStreak} Day Streak</span>
            <span>·</span>
            <span>🎓 {sampleStudent.coursesEnrolled} Courses Enrolled</span>
            <span>·</span>
            <span>🏆 {sampleStudent.certificatesEarned} Certificates</span>
          </div>
        </div>
      </header>

      {/* -- Learning Progress & Quick Actions -- */}
      <div className="dashboard-section">
        <div className="two-column-grid">
            <div>
                 <div className="dashboard-section-header">
                    <h2>Learning Progress</h2>
                </div>
                <p>You have <strong>{coursesInProgress.length} courses</strong> in progress and completed <strong>{completedCourses.length} courses</strong>.</p>
                <p>Keep up the great work!</p>
                <button className="action-btn-primary" style={{marginTop: '1rem'}}>Continue My Last Lesson</button>
            </div>
            <div>
                 <div className="dashboard-section-header">
                    <h2>Quick Actions</h2>
                </div>
                <div className="quick-actions-grid">
                    <button className="action-btn-card">Explore Courses</button>
                    <button className="action-btn-card">My Certificates</button>
                    <button className="action-btn-card">Community</button>
                    <button className="action-btn-card">Profile Settings</button>
                </div>
            </div>
        </div>
      </div>


      {/* -- My Courses Section -- */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>My Courses</h2>
        </div>
        <div className="my-courses-grid">
          {enrolledCourses.map(course => (
            <div key={course.id} className="course-card-student">
              <div className="course-card-thumbnail"></div>
              <div className="course-card-info">
                <h4>{course.title}</h4>
                <p className="instructor">by {course.instructor}</p>
                <div className="progress-bar-container-student">
                  <div className="progress-bar-student" style={{ width: `${course.progress}%` }}></div>
                </div>
                <p className="progress-label">{course.progress}% Complete</p>
                <div className="course-card-actions">
                  {course.status === 'inprogress' ? (
                    <button className="action-btn-primary">Continue Learning</button>
                  ) : (
                    <button className="action-btn-secondary">Download Certificate</button>
                  )}
                  <button className="action-btn-secondary">View Course</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="two-column-grid">
        {/* -- Recommended & Saved Courses -- */}
        <div>
            <div className="dashboard-section">
                <div className="dashboard-section-header">
                    <h2>Recommended For You</h2>
                </div>
                <div>
                    {recommendedCourses.map(course => (
                        <div key={course.id} className="list-item"><strong>{course.title}</strong> by {course.instructor}</div>
                    ))}
                </div>
            </div>
            <div className="dashboard-section">
                <div className="dashboard-section-header">
                    <h2>Saved Courses</h2>
                </div>
                 <p>You have no saved courses yet.</p>
            </div>
        </div>
        
        {/* -- Messages & Community -- */}
        <div>
            <div className="dashboard-section">
                <div className="dashboard-section-header">
                    <h2>Recent Messages</h2>
                </div>
                 <div className="list-item">From <strong>Khalid Hussain</strong>: "Welcome to the course! Let me know if you have questions."</div>
                 <div className="list-item">From <strong>Jane Smith</strong>: "New resource added to the Graphic Design course."</div>
            </div>
            <div className="dashboard-section">
                <div className="dashboard-section-header">
                    <h2>Community Activity</h2>
                </div>
                <div className="list-item"><strong>Announcement from Khalid:</strong> "Join the live Q&A session this Friday!"</div>
                <div className="list-item"><strong>New Discussion:</strong> "What's the best way to find clients for graphic design?"</div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;
