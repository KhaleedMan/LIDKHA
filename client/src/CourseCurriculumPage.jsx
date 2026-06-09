import { useState } from 'react';
import './CourseCurriculumPage.css';

export default function CourseCurriculumPage({ onBack, onPreview }) {
  const [modules, setModules] = useState([]);

  const handleAddModule = () => {
    setModules([...modules, { id: Date.now(), title: '', lessons: [] }]);
  };

  const handleAddLesson = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons.push({ id: Date.now(), title: '', videoUrl: '', duration: '' });
    setModules(newModules);
  };

  const handleModuleChange = (index, value) => {
    const newModules = [...modules];
    newModules[index].title = value;
    setModules(newModules);
  };

  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons[lessonIndex][field] = value;
    setModules(newModules);
  };

  const handlePreviewClick = () => {
    // This is where we would pass the data to the preview page
    // For now, it passes a placeholder
    onPreview({
        title: 'Your Course Title',
        subtitle: 'A great subtitle for your amazing course.',
        description: 'This is a sample description that tells students what they will learn. It should be engaging and informative.',
        category: 'Programming',
        level: 'Beginner',
        price: '15000',
        benefits: ['Learn a new skill', 'Get a certificate', 'Boost your career'],
        author: 'John Doe',
        creator: { name: 'John Doe', image: '' },
        modules: modules
    });
  };

  return (
    <div className="course-curriculum-page">
      <div className="page-header">
          <button onClick={onBack} className="back-button">← Back to Course Details</button>
          <h1>Course Curriculum</h1>
          <p>Structure your course by adding modules and lessons.</p>
      </div>
      <div className="curriculum-builder">
        {modules.map((module, moduleIndex) => (
          <div key={module.id} className="module-card">
            <input type="text" value={module.title} onChange={(e) => handleModuleChange(moduleIndex, e.target.value)} placeholder="Module Title (e.g., Introduction)" className="module-title-input"/>
            <div className="lessons-list">
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="lesson-item">
                  <input type="text" value={lesson.title} onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title', e.target.value)} placeholder="Lesson Title (e.g., Welcome to the course)" className="lesson-input"/>
                  <input type="text" value={lesson.videoUrl} onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'videoUrl', e.target.value)} placeholder="Video URL" className="lesson-input small"/>
                  <input type="text" value={lesson.duration} onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'duration', e.target.value)} placeholder="Duration (e.g., 10 min)" className="lesson-input small"/>
                </div>
              ))}
            </div>
            <button onClick={() => handleAddLesson(moduleIndex)} className="button button-secondary">+ Add Lesson</button>
          </div>
        ))}
        <button onClick={handleAddModule} className="button button-primary">+ Add Module</button>
      </div>
      <div className="page-actions">
        <button onClick={handlePreviewClick} className="button button-primary">Preview Course</button>
      </div>
    </div>
  );
}
