import './CoursePreviewPage.css';

export default function CoursePreviewPage({ course, onBack, onPublish }) {

  return (
    <div className="course-preview-page">
      <div className="preview-header">
        <button onClick={onBack} className="back-button">← Back to Curriculum</button>
        <h1>Course Preview</h1>
        <p>This is how your course will look to students.</p>
      </div>
      <div className="course-preview-content-wrapper">
        <div className="course-preview-main">
          <img src={"/images/course-thumbnail.jpg"} alt={course?.title} className="course-preview-thumbnail" />
          <h2 className="course-preview-title">{course?.title || 'Your Course Title'}</h2>
          <p className="course-preview-subtitle">{course?.subtitle || 'A catchy subtitle for your course.'} </p>

          <h3>Description</h3>
          <p>{course?.description || 'A detailed description of what students will learn.'}</p>

          <h3>Course Benefits</h3>
          <ul>
            {(course?.benefits || []).map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>

          <h3>Curriculum</h3>
          <div className="course-curriculum-preview">
            {(course?.modules || []).map((module, index) => (
              <div key={index} className="module-preview-item">
                <strong>{module.title || `Module ${index + 1}`}</strong>
                <ul>
                  {(module.lessons || []).map((lesson, lessonIndex) => (
                    <li key={lessonIndex}>{lesson.title || `Lesson ${lessonIndex + 1}`}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="course-preview-sidebar">
          <div className="course-details-card">
              <h3>Course Details</h3>
              <p><strong>Category:</strong> {course?.category || 'N/A'}</p>
              <p><strong>Level:</strong> {course?.level || 'N/A'}</p>
              <p><strong>Price:</strong> NGN {course?.price || '0'}</p>
              <button onClick={onPublish} className="button button-primary publish-button">Publish Course</button>
          </div>
          <div className="creator-card">
            <h3>About the Creator</h3>
            <div className="creator-info">
                <img src={course?.creator?.image || '/images/default-profile.png'} alt={course?.creator?.name} />
                <div>
                    <h4>{course?.creator?.name || 'Creator Name'}</h4>
                    <p>Creator bio would appear here.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
