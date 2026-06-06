import React from 'react';
import './CoursePreviewPage.css';

const getEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return null;

    try {
        if (url.includes('youtube.com/watch')) {
            const urlObject = new URL(url);
            const videoId = urlObject.searchParams.get('v');
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        } 
        if (url.includes('vimeo.com')) {
            const videoId = url.split('/').pop();
            return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
        } 
        if (url.includes('loom.com')) {
            const videoId = url.split('/').pop();
            return videoId ? `https://www.loom.com/embed/${videoId}` : null;
        }
    } catch (error) {
        // This will safely catch errors for invalid URLs (e.g., partial user input)
        return null;
    }

    return null;
};


const CoursePreviewPage = ({ course, onBack, onPublish }) => {

  // FIX: Use a fallback object for `course` to prevent crash if it's null.
  const currentCourse = course || {};
  const { title, subtitle, description, benefits, modules, price, level } = currentCourse;

  return (
    <div className="course-preview-page">
      <div className="header">
          <button onClick={onBack} className="back-btn">← Back to Builder</button>
          <h1>Course Preview</h1>
      </div>
      <p className='preview-tag'>This is how your course will look to students.</p>

      <div className="preview-container">
        <div className="course-main-content">
            <img src="https://via.placeholder.com/350x200" alt={title || 'Course Thumbnail'} className="course-thumbnail-preview" />
            <h2>{title || 'Your Course Title'}</h2>
            <h3>{subtitle || 'A compelling subtitle for your course.'}</h3>
            <p>{description || 'A detailed description of what students will learn.'}</p>

            <div className="course-benefits">
                <h4>What you'll learn</h4>
                <ul>
                    {(benefits || []).map((benefit, index) => <li key={index}>{benefit}</li>)}
                </ul>
            </div>

            <div className="course-curriculum-preview">
                <h4>Course Content</h4>
                {(modules || []).map((module, index) => (
                    <div key={module.id || index} className="module-preview-item">
                        <h5>{module.title}</h5>
                        <ul>
                            {(module.lessons || []).map((lesson, lessonIndex) => (
                                <li key={lesson.id || lessonIndex}>
                                    <span>{lesson.title}</span> 
                                    <div className="lesson-details-preview">
                                        {lesson.videoType === 'external' && getEmbedUrl(lesson.videoUrl) && 
                                            <span className='lesson-type-tag video'>Video</span>
                                        }
                                        {lesson.videoType === 'upload' && lesson.videoFile &&
                                            <span className='lesson-type-tag video'>Video</span>
                                        }
                                        {(lesson.resources || []).length > 0 && 
                                            <span className='lesson-type-tag resource'>Resource</span>
                                        }
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div className="course-sidebar">
          <div className="sidebar-card">
              <h4>Price: ₦{price || '0'}</h4>
              <p>Level: {level || 'Beginner'}</p>
              <button className="action-btn-primary full-width">Enroll Now</button>
          </div>
        </div>
      </div>

      <div className="page-actions">
        <button className="action-btn-secondary" onClick={onBack}>Previous Step</button>
        <button className="action-btn-primary" onClick={onPublish}>Publish Course</button>
      </div>
    </div>
  );
};

export default CoursePreviewPage;
