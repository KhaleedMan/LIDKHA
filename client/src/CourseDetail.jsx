import { useState } from 'react';
import './CourseDetail.css';

export default function CourseDetail({ courseId, user, onBack, courses }) {
  const course = courses.find(c => c.id === courseId);
  const [activeLesson, setActiveLesson] = useState(course?.lessons[0]);

  if (!course) {
    return (
      <div className="course-detail">
        <p>Course not found.</p>
        <button onClick={onBack}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="course-detail">
      <div className="course-sidebar">
        <button className="back-button" onClick={onBack}>← Back to Courses</button>
        <h2>{course.title}</h2>
        <p className="course-author">by {course.author}</p>
        <ul className="lesson-list">
          {course.lessons.map(lesson => (
            <li key={lesson.id} className={activeLesson?.id === lesson.id ? 'active' : ''} onClick={() => setActiveLesson(lesson)}>
              {lesson.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="course-content">
        {activeLesson ? (
          <div>
            <h3>{activeLesson.title}</h3>
            {activeLesson.videoUrl ? (
              <video controls src={activeLesson.videoUrl} width="100%">
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="no-video-placeholder">
                <p>No video available for this lesson.</p>
                <p>The instructor has not uploaded a video yet.</p>
              </div>
            )}
            {/* Add any other lesson content here */}
          </div>
        ) : (
          <p>Select a lesson to begin.</p>
        )}
      </div>
    </div>
  );
}
