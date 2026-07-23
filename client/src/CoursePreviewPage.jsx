import './CoursePreviewPage.css';

export default function CoursePreviewPage({ course, creatorProfile, onBack, onPublish }) {

  // Use a fallback course object if the course prop is not provided
  const currentCourse = course || {
    title: 'Your Awesome Course Title',
    description: 'A detailed and engaging description of what your students will learn. Cover the key topics and the value you provide.',
    benefits: [
      'Benefit 1: What they will achieve',
      'Benefit 2: A new skill they will learn',
      'Benefit 3: A career advantage they will gain',
    ],
    modules: [
      {
        title: 'Module 1: Introduction',
        lessons: [{ title: 'Welcome to the Course' }, { title: 'Setting Up Your Environment' }]
      },
      {
        title: 'Module 2: Core Concepts',
        lessons: [{ title: 'Understanding the Basics' }, { title: 'Advanced Techniques' }]
      },
    ],
    thumbnail: '/images/course-thumbnail.jpg' // Default thumbnail
  };

  const creator = creatorProfile || {
      fullName: 'Creator Name',
      profilePicture: '/images/default-profile.png'
  }

  return (
    <div className="course-preview-page">
      <div className="preview-top-bar">
        <button onClick={onBack} className="back-button">← Back to Editor</button>
        <button onClick={onPublish} className="publish-button">Publish Course</button>
      </div>

      <div className="preview-layout">
        <div className="main-content">
          <div className="course-thumbnail-container">
            <img src={currentCourse.thumbnail || '/images/course-thumbnail.jpg'} alt="Course Thumbnail" className="course-thumbnail" />
          </div>
          <h1 className="course-title">{currentCourse.title}</h1>
          
           <div className="creator-info-bar">
            <img src={creator.profilePicture} alt={creator.fullName} className="creator-avatar" />
            <span className="creator-name">{creator.fullName}</span>
          </div>
          
          <div className="course-details-section">
            <h3>Description</h3>
            <p>{currentCourse.description}</p>
          </div>

          <div className="course-details-section">
            <h3>What you'll learn</h3>
            <ul className="benefits-list">
              {currentCourse.benefits.map((benefit, index) => (
                <li key={index}>✓ {benefit}</li>
              ))}
            </ul>
          </div>

          <div className="course-details-section">
            <h3>Course Curriculum</h3>
            <div className="curriculum-accordion">
              {currentCourse.modules.map((module, index) => (
                <div key={index} className="module-item">
                  <div className="module-header">
                    <strong>{module.title}</strong>
                  </div>
                  <ul className="lesson-list">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex}>- {lesson.title}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar">
            {/* The sidebar is currently empty as per the new design focus on the main content. */}
            {/* You can add elements like a 'Buy Now' card or related courses here in the future. */}
        </div>
      </div>
    </div>
  );
}
