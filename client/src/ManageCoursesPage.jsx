import React from 'react';
import './ManageCoursesPage.css';

const ManageCoursesPage = ({ onNavigateToCurriculum }) => {
  const courses = [
    {
      thumbnail: 'https://via.placeholder.com/150',
      title: 'Complete Web Development Bootcamp',
      category: 'Web Development',
      students: 1200,
      revenue: 54000,
      status: 'Published',
    },
    {
      thumbnail: 'https://via.placeholder.com/150',
      title: 'Advanced React and Redux',
      category: 'Web Development',
      students: 850,
      revenue: 38000,
      status: 'Published',
    },
    {
      thumbnail: 'https://via.placeholder.com/150',
      title: 'Introduction to Python for Data Science',
      category: 'Data Science',
      students: 2500,
      revenue: 98000,
      status: 'Published',
    },
    {
        thumbnail: 'https://via.placeholder.com/150',
        title: 'UI/UX Design Fundamentals',
        category: 'Design',
        students: 0,
        revenue: 0,
        status: 'Draft',
    },
    {
        thumbnail: 'https://via.placeholder.com/150',
        title: 'Digital Marketing Masterclass',
        category: 'Marketing',
        students: 50,
        revenue: 2500,
        status: 'Archived',
    }
  ];

  const totalCourses = courses.length;
  const publishedCourses = courses.filter(c => c.status === 'Published').length;
  const draftCourses = courses.filter(c => c.status === 'Draft').length;
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);

  return (
    <div className="manage-courses-page">
      <div className="header">
        <h1>My Courses</h1>
        <p>Manage, edit, and track all your courses.</p>
      </div>

      <div className="course-stats">
        <div className="stat-card">
          <h4>Total Courses</h4>
          <p>{totalCourses}</p>
        </div>
        <div className="stat-card">
          <h4>Published Courses</h4>
          <p>{publishedCourses}</p>
        </div>
        <div className="stat-card">
          <h4>Draft Courses</h4>
          <p>{draftCourses}</p>
        </div>
        <div className="stat-card">
          <h4>Total Students</h4>
          <p>{totalStudents}</p>
        </div>
      </div>

      <div className="course-list-controls">
        <input type="text" placeholder="Search by title..." className="search-input" />
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Published</button>
          <button className="filter-btn">Draft</button>
          <button className="filter-btn">Archived</button>
        </div>
      </div>

      <div className="course-table">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Category</th>
              <th>Students</th>
              <th>Revenue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>
                  <div className="course-info">
                    <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                    <span>{course.title}</span>
                  </div>
                </td>
                <td>{course.category}</td>
                <td>{course.students}</td>
                <td>${course.revenue.toLocaleString()}</td>
                <td>
                  <span className={`status-badge status-${course.status.toLowerCase()}`}>{course.status}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn" onClick={onNavigateToCurriculum}>Edit Course</button>
                    <button className="action-btn">View Course</button>
                    <button className="action-btn">Duplicate Course</button>
                    <button className="action-btn archive-btn">Archive Course</button>
                    <button className="action-btn">Copy Course Link</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoursesPage;
