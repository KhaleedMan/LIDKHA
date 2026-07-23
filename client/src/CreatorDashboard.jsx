import './CreatorDashboard.css';

export default function CreatorDashboard({ creatorProfile, courses = [], onNavigateToCreateCourse, onEditProfile }) {
  const publishedCourses = courses.filter(c => c.status === 'Published');
  const draftCourses = courses.filter(c => c.status === 'Draft');

  if (!creatorProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="creator-dashboard">
      <div className="dashboard-hero">
        <div className="creator-profile-card">
          <div className="profile-card-header">
            <img src={creatorProfile.profilePicture} alt="Creator" className="profile-picture" />
            <div className="creator-info">
              <div className="creator-name-verified">
                <h2>{creatorProfile.fullName}</h2>
                <span className="verified-badge">✔</span>
              </div>
              <p className="creator-username">{creatorProfile.username}</p>
            </div>
          </div>
          <p className="creator-headline">{creatorProfile.headline}</p>
          <div className="creator-stats">
            <div className="stat-item">
              <span className="stat-value">{publishedCourses.length + draftCourses.length}</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{courses.reduce((acc, course) => acc + course.students, 0).toLocaleString()}</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-item">
              {/* Placeholder for rating. You might need to calculate this based on course reviews */}
              <span className="stat-value">4.8</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
          <button className="edit-profile-button" onClick={onEditProfile}>Edit Profile</button>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
            <h2>My Courses</h2>
            <button onClick={onNavigateToCreateCourse} className="button button-primary">+ Create New Course</button>
        </div>

        <h3>Published ({publishedCourses.length})</h3>
        <div className="course-list">
          {publishedCourses.map(course => (
            <div key={course.id} className="course-list-item">
              <div className="course-item-details">
                <h4>{course.title}</h4>
                <p>Students: {course.students}</p>
                <p>Revenue: NGN {course.revenue.toLocaleString()}</p>
              </div>
              <div className="course-item-actions">
                  <button className="button button-secondary">Edit</button>
              </div>
            </div>
          ))}
        </div>

        <h3>Drafts ({draftCourses.length})</h3>
        <div className="course-list">
          {draftCourses.map(course => (
            <div key={course.id} className="course-list-item">
              <div className="course-item-details">
                <h4>{course.title}</h4>
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