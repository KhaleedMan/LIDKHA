import React from 'react';
import './CreatorDashboard.css';

const sampleCreator = {
  name: 'Khalid Hussain',
  bio: 'Helping creators build profitable online businesses with practical, no-fluff strategies. Founder of SkilWhop.',
  profilePhotoUrl: 'https://via.placeholder.com/120',
  totalStudents: 1450,
  totalCourses: 4,
  totalEarnings: 850000,
  followers: 22000,
};

const quickStats = [
  { id: 'courses', label: 'Total Courses', value: '4' },
  { id: 'students', label: 'Total Students', value: '1,450' },
  { id: 'revenue', label: 'Revenue', value: '₦850,000' },
  { id: 'affiliate', label: 'Affiliate Sales', value: '₦120,500' },
];

const sampleCourses = [
  {
    id: 1,
    title: 'Make Money with Facebook & WhatsApp',
    thumbnailUrl: 'https://via.placeholder.com/320x180',
    students: 820,
    revenue: 410000,
    status: 'Published',
  },
  {
    id: 2,
    title: 'Graphic Design for Beginners',
    thumbnailUrl: 'https://via.placeholder.com/320x180',
    students: 410,
    revenue: 205000,
    status: 'Published',
  },
  {
    id: 3,
    title: 'Advanced Content Creation Strategy',
    thumbnailUrl: 'https://via.placeholder.com/320x180',
    students: 220,
    revenue: 235000,
    status: 'Published',
  },
  {
    id: 4,
    title: 'The Ultimate Guide to Online Sales',
    thumbnailUrl: 'https://via.placeholder.com/320x180',
    students: 0,
    revenue: 0,
    status: 'Draft',
  },
];

const CreatorDashboard = ({ onNavigateToCreateCourse }) => {
  return (
    <div className="creator-dashboard-page">
      {/* -- Dashboard Header -- */}
      <header className="dashboard-header">
        <div className="profile-photo-placeholder"></div>
        <div className="creator-info">
          <h1>{sampleCreator.name}</h1>
          <p className="bio">{sampleCreator.bio}</p>
          <div className="creator-meta-stats">
            <span><strong>{sampleCreator.totalStudents.toLocaleString()}</strong> Students</span>
            <span>·</span>
            <span><strong>{sampleCreator.totalCourses}</strong> Courses</span>
            <span>·</span>
            <span><strong>₦{sampleCreator.totalEarnings.toLocaleString()}</strong> Total Earnings</span>
            <span>·</span>
            <span><strong>{sampleCreator.followers.toLocaleString()}</strong> Followers</span>
          </div>
        </div>
      </header>

      {/* -- Quick Stats Cards -- */}
      <div className="quick-stats-grid">
        {quickStats.map(stat => (
          <div key={stat.id} className="stat-card">
            <h3>{stat.label}</h3>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* -- Quick Actions -- */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
            <h2>Quick Actions</h2>
        </div>
        <div className="quick-actions-grid">
            <button className="action-btn-card" onClick={onNavigateToCreateCourse}>Create New Course</button>
            <button className="action-btn-card">View Public Profile</button>
            <button className="action-btn-card">Manage Community</button>
            <button className="action-btn-card">View Earnings Details</button>
        </div>
      </div>


      {/* -- Course Management Section -- */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>Manage Your Courses</h2>
          <button className="action-btn-primary" onClick={onNavigateToCreateCourse}>+ New Course</button>
        </div>
        <div className="course-management-grid">
          {sampleCourses.map(course => (
            <div key={course.id} className="course-mgmt-card">
              <div className="course-mgmt-thumbnail"></div>
              <div className="course-mgmt-info">
                <h4>{course.title}</h4>
                <div className="course-mgmt-stats">
                  <span>{course.students} Students</span>
                  <span>₦{course.revenue.toLocaleString()}</span>
                  <span className={`status-badge ${course.status.toLowerCase()}`}>{course.status}</span>
                </div>
              </div>
              <div className="course-mgmt-actions">
                <button>Edit</button>
                <button>View</button>
                <button>Duplicate</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="two-column-grid">
        {/* -- Earnings Section -- */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Earnings</h2>
          </div>
          <div className="stat-card">
            <h3>Total earnings</h3>
            <p className="stat-value">₦{sampleCreator.totalEarnings.toLocaleString()}</p>
          </div>
           <div className="stat-card" style={{marginTop: '1rem'}}>
            <h3>This month</h3>
            <p className="stat-value">₦115,000</p>
          </div>
           <div className="stat-card" style={{marginTop: '1rem'}}>
            <h3>Pending Payouts</h3>
            <p className="stat-value">₦50,000</p>
          </div>
        </div>

        {/* -- Affiliate Performance -- */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>Affiliate Performance</h2>
          </div>
          <p>You have <strong>12 affiliates</strong> promoting your courses.</p>
          <p><strong>Top Affiliates:</strong></p>
          <ul>
            <li>AffiliateOne (₦45,000 in sales)</li>
            <li>AffiliateTwo (₦30,000 in sales)</li>
            <li>AffiliateThree (₦15,000 in sales)</li>
          </ul>
           <div className="stat-card" style={{marginTop: '1rem'}}>
            <h3>Total Affiliate Sales</h3>
            <p className="stat-value">₦120,500</p>
          </div>
        </div>
      </div>

        {/* -- Community Section -- */}
        <div className="dashboard-section">
            <div className="dashboard-section-header">
                <h2>Community Engagement</h2>
                <button className="action-btn-primary">Create Announcement</button>
            </div>
            <p>You have <strong>350 members</strong> in your community.</p>
            <p><strong>Recent Discussions:</strong></p>
            <ul>
                <li>'Welcome to the community!'</li>
                <li>'Best way to get your first 100 followers?'</li>
                <li>'Feedback on my new landing page'</li>
            </ul>
        </div>

    </div>
  );
};

export default CreatorDashboard;
