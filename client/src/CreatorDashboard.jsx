import './CreatorDashboard.css';

const sampleCourses = [
    {
        id: 1,
        title: 'Make Money with Facebook & WhatsApp',
        status: 'Published',
        students: 102,
        revenue: 1530000,
    },
    {
        id: 2,
        title: 'The Complete Guide to Crypto & Blockchain',
        status: 'Draft',
        students: 0,
        revenue: 0,
    },
];

export default function CreatorDashboard({ onNavigateToCreateCourse }) {
  return (
    <div className="creator-dashboard">
      <div className="dashboard-header">
        <h1>Creator Dashboard</h1>
        <p>Manage your courses and view your performance.</p>
      </div>
      <div className="dashboard-actions">
        <button onClick={onNavigateToCreateCourse} className="button button-primary">+ Create New Course</button>
      </div>
      <div className="dashboard-section">
        <h2>Your Courses</h2>
        <div className="course-list">
          {sampleCourses.map(course => (
            <div key={course.id} className="course-list-item">
              <img src={`/images/course-thumbnail.jpg`} alt={course.title} className="course-item-thumbnail" />
              <div className="course-item-details">
                <h3>{course.title}</h3>
                <p>Status: {course.status}</p>
              </div>
              <div className="course-item-stats">
                  <p>Students: {course.students}</p>
                  <p>Revenue: NGN {course.revenue.toLocaleString()}</p>
              </div>
              <div className="course-item-actions">
                  <button className="button button-secondary">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
