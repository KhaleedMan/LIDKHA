import React, { useState, useRef, useEffect } from 'react';
import './CourseCurriculumPage.css';

// Helper icons for the UI
const GrabHandleIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6C6 4.89543 6.89543 4 8 4C9.10457 4 10 4.89543 10 6Z" fill="currentColor"/><path d="M10 12C10 13.1046 9.10457 14 8 14C6.89543 14 6 13.1046 6 12C6 10.8954 6.89543 10 8 10C9.10457 10 10 10.8954 10 12Z" fill="currentColor"/><path d="M10 18C10 19.1046 9.10457 20 8 20C6.89543 20 6 19.1046 6 18C6 16.8954 6.89543 16 8 16C9.10457 16 10 16.8954 10 18Z" fill="currentColor"/><path d="M18 6C18 7.10457 17.1046 8 16 8C14.8954 8 14 7.10457 14 6C14 4.89543 14.8954 4 16 4C17.1046 4 18 4.89543 18 6Z" fill="currentColor"/><path d="M18 12C18 13.1046 17.1046 14 16 14C14.8954 14 14 13.1046 14 12C14 10.8954 14.8954 10 16 10C17.1046 10 18 10.8954 18 12Z" fill="currentColor"/><path d="M18 18C18 19.1046 17.1046 20 16 20C14.8954 20 14 19.1046 14 18C14 16.8954 14.8954 16 16 16C17.1046 16 18 16.8954 18 18Z" fill="currentColor"/></svg>;
const EditIcon = () => <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z"></path></svg>;
const DeleteIcon = () => <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>;
const PlusIcon = () => <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>;
const UploadIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"></path></svg>;
const VideoIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"></path></svg>;
const ResourceIcon = () => <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,3.5L18.5,9H13V3.5M12,11H18V13H12V11M12,15H18V17H12V15M6,12.5A1.5,1.5 0 0,1 7.5,11A1.5,1.5 0 0,1 9,12.5A1.5,1.5 0 0,1 7.5,14A1.5,1.5 0 0,1 6,12.5M6,16.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 9,16.5A1.5,1.5 0 0,1 7.5,18A1.5,1.5 0 0,1 6,16.5Z"></path></svg>


const initialModules = [
    {
      id: 'mod1',
      title: 'Module 1: Introduction',
      lessons: [
        { id: 'les1', title: 'Welcome to the Course', subtitle: 'An overview of what to expect.', description: 'This is the first lesson.', videoType: 'external', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', videoFile: null, uploadStatus: 'idle', resources: [] },
        { id: 'les2', title: 'How the web works', subtitle: 'Understanding the fundamentals.', description: 'A deep dive into web architecture.', videoType: 'upload', videoUrl: '', videoFile: { name: 'web-fundamentals.mp4', size: 1024 * 1024 * 5 }, uploadStatus: 'ready', resources: [{name: 'diagram.pdf', type: 'pdf'}] },
      ]
    },
    {
      id: 'mod2',
      title: 'Module 2: Facebook Marketing',
      lessons: []
    }
];

const CourseBuilderPage = ({ onBack, onPreview }) => {
  const [modules, setModules] = useState(initialModules);
  const [activeLesson, setActiveLesson] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const videoInputRef = useRef(null);
  const resourceInputRef = useRef(null);

  useEffect(() => {
    if (activeLesson) {
        const lessonExists = modules.some(m => m.lessons.some(l => l.id === activeLesson.id));
        if (!lessonExists) {
            setActiveLesson(null);
        }
    }
  }, [modules, activeLesson]);


  const updateLesson = (lessonId, updatedProps) => {
      let newModules = modules.map(m => ({
          ...m,
          lessons: m.lessons.map(l => {
              if (l.id === lessonId) {
                  return { ...l, ...updatedProps };
              }
              return l;
          })
      }));
      setModules(newModules);
      if (activeLesson && activeLesson.id === lessonId) {
          setActiveLesson(prev => ({ ...prev, ...updatedProps }));
      }
  };

  const handleLessonChange = (field, value) => {
      if (!activeLesson) return;
      updateLesson(activeLesson.id, { [field]: value });
  };
  
  const handleVideoFileChange = (e) => {
    if (!activeLesson || !e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file.');
        return;
    }

    updateLesson(activeLesson.id, { videoFile: file, uploadStatus: 'uploading' });

    setUploadProgress(0);
    const interval = setInterval(() => {
        setUploadProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                updateLesson(activeLesson.id, { uploadStatus: 'ready' });
                return 100;
            }
            return prev + 10;
        });
    }, 200);
  };
  
  const handleResourceFileChange = (e) => {
      if (activeLesson && e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const newResource = { name: file.name, type: file.type.split('/')[1] || 'file' };
          const updatedResources = [...(activeLesson.resources || []), newResource];
          updateLesson(activeLesson.id, { resources: updatedResources });
      }
  };

  const removeResource = (resourceName) => {
    if (activeLesson) {
        const updatedResources = activeLesson.resources.filter(r => r.name !== resourceName);
        updateLesson(activeLesson.id, { resources: updatedResources });
    }
  }
  
  const deleteModule = (moduleId) => {
      if (modules.length > 1) {
        setModules(modules.filter(m => m.id !== moduleId));
      }
  }

  const deleteLesson = (moduleId, lessonId) => {
      const targetModule = modules.find(m => m.id === moduleId);
      if (targetModule && targetModule.lessons.length > 1) {
          const updatedLessons = targetModule.lessons.filter(l => l.id !== lessonId);
          const updatedModules = modules.map(m => m.id === moduleId ? { ...m, lessons: updatedLessons } : m);
          setModules(updatedModules);
      } else if (targetModule && targetModule.lessons.length <= 1 && modules.length > 1) {
          setModules(modules.filter(m => m.id !== moduleId));
      }
  }

  const addModule = () => {
    const newModule = { id: `mod${Date.now()}`, title: `Module ${modules.length + 1}: New Module`, lessons: [] };
    setModules([...modules, newModule]);
  };
  
  const addLesson = (moduleId) => {
    const newLesson = { id: `les${Date.now()}`, title: 'New Lesson', subtitle: '', description: '', videoType: 'upload', videoUrl: '', videoFile: null, uploadStatus: 'idle', resources: [] };
    const updatedModules = modules.map(m => m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m);
    setModules(updatedModules);
  };
  
  const progress = 60;

  return (
    <div className="course-builder-page">
      <div className="builder-header">
        <h1>Course Builder</h1>
        <p className="subtitle">Create and structure your course content, from modules to video lessons.</p>
      </div>

      <div className="progress-tracker">
        <div className="progress-info">
            <p><strong>Course Setup Progress:</strong> {progress}% Completed</p>
        </div>
        <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${progress}%`}}></div>
        </div>
        <div className="progress-steps">
            Step 1: Create Course Info <span>(Completed)</span> → Step 2: Build Curriculum <span className="pending">(In Progress)</span> → Step 3: Publish
        </div>
      </div>

      <div className="builder-main-content">
        <div className="module-container">
          {modules.map((module) => (
            <div key={module.id} className="module-card">
              <div className="module-card-header">
                <div className="drag-handle"><GrabHandleIcon /></div>
                <input type="text" value={module.title} onChange={(e) => setModules(modules.map(m => m.id === module.id ? {...m, title: e.target.value} : m))} className="module-title-input" />
                <div className="module-actions">
                  <button className="icon-button"><EditIcon /></button>
                  <button className="icon-button" onClick={() => deleteModule(module.id)}><DeleteIcon /></button>
                </div>
              </div>
              <div className="lesson-list">
                {module.lessons.map(lesson => (
                  <div key={lesson.id} className={`lesson-item ${activeLesson?.id === lesson.id ? 'active' : ''}`} onClick={() => setActiveLesson(lesson)}>
                    <div className="drag-handle"><GrabHandleIcon /></div>
                    <div className="lesson-item-title">{lesson.title}</div>
                    <div className="lesson-item-actions">
                      <button className="icon-button" onClick={(e) => { e.stopPropagation(); setActiveLesson(lesson); }}><EditIcon /></button>
                      <button className="icon-button" onClick={(e) => { e.stopPropagation(); deleteLesson(module.id, lesson.id); }}><DeleteIcon /></button>
                    </div>
                  </div>
                ))}
                <button className="add-lesson-button" onClick={() => addLesson(module.id)}><PlusIcon/> Add Lesson</button>
              </div>
            </div>
          ))}
          <button className="add-module-button" onClick={addModule}><PlusIcon/> Add Module</button>
        </div>

        <div className="lesson-editor">
          {activeLesson ? (
            <div className="editor-content">
              <h3>Lesson Details</h3>
              <div className="form-group"><label>Lesson Title</label><input type="text" value={activeLesson.title} onChange={(e) => handleLessonChange('title', e.target.value)} /></div>
              <div className="form-group"><label>Lesson Subtitle</label><input type="text" value={activeLesson.subtitle} onChange={(e) => handleLessonChange('subtitle', e.target.value)} /></div>
              <div className="form-group"><label>Description</label><textarea value={activeLesson.description} onChange={(e) => handleLessonChange('description', e.target.value)} rows="4"></textarea></div>

              <h3 className="editor-section-title">Video Content</h3>
              <div className="content-source-selector">
                  <label className={activeLesson.videoType === 'upload' ? 'active' : ''}><input type="radio" name="videoType" value="upload" checked={activeLesson.videoType === 'upload'} onChange={(e) => handleLessonChange('videoType', e.target.value)} /> Upload Video</label>
                  <label className={activeLesson.videoType === 'external' ? 'active' : ''}><input type="radio" name="videoType" value="external" checked={activeLesson.videoType === 'external'} onChange={(e) => handleLessonChange('videoType', e.target.value)} /> External Link</label>
              </div>
              
              {activeLesson.videoType === 'upload' ? (
                  <div className="video-upload-area">
                      <input type="file" ref={videoInputRef} onChange={handleVideoFileChange} style={{display: 'none'}} accept="video/*" />
                      {activeLesson.uploadStatus === 'uploading' && (
                          <div className="upload-progress-container">
                              <span>Uploading...</span>
                              <div className="upload-progress-bar-background"><div className="upload-progress-bar" style={{width: `${uploadProgress}%`}}></div></div>
                              <span>{uploadProgress}%</span>
                          </div>
                      )}
                      {activeLesson.uploadStatus === 'idle' && (
                          <>
                              <button className="upload-video-btn" onClick={() => videoInputRef.current.click()}><UploadIcon /> Upload Video</button>
                              <p>MP4, MOV, 1080p, up to 2GB</p>
                          </>
                      )}
                      {activeLesson.uploadStatus === 'ready' && activeLesson.videoFile && (
                          <div className="file-preview ready">
                              <div className="file-info">
                                <VideoIcon />
                                <div>
                                    <span className="file-name">{activeLesson.videoFile.name}</span>
                                    <span className="file-size">{(activeLesson.videoFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                              </div>
                              <div className="file-actions">
                                  <button onClick={() => videoInputRef.current.click()}>Replace</button>
                                  <button onClick={() => updateLesson(activeLesson.id, { videoFile: null, uploadStatus: 'idle' })}>Remove</button>
                              </div>
                          </div>
                      )}
                  </div>
              ) : (
                <div className="form-group">
                    <label>YouTube, Vimeo, or Loom URL</label>
                    <input type="text" value={activeLesson.videoUrl} onChange={(e) => handleLessonChange('videoUrl', e.target.value)} placeholder="e.g., https://www.youtube.com/watch?v=..."/>
                </div>
              )}

              <h3 className="editor-section-title">Downloadable Resources</h3>
              <div className="resource-upload-area">
                <input type="file" ref={resourceInputRef} onChange={handleResourceFileChange} style={{display: 'none'}} />
                <button className="upload-resource-btn" onClick={() => resourceInputRef.current.click()}><PlusIcon /> Add Resource</button>
              </div>
              <div className="resource-list">
                {(activeLesson.resources || []).map(resource => (
                    <div key={resource.name} className="file-preview">
                        <span><ResourceIcon /> {resource.name}</span>
                        <button onClick={() => removeResource(resource.name)}>Remove</button>
                    </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="editor-placeholder">Select a lesson to edit its content, video, and resources.</div>
          )}
        </div>
      </div>

      <div className="builder-bottom-actions">
        <button className="action-btn-secondary" onClick={onBack}>Previous Step</button>
        <button className="action-btn-secondary">Save Draft</button>
        <button className="action-btn-primary" onClick={() => onPreview({ title: 'Your Course Title', subtitle: 'Course Subtitle', description: 'Description...', modules })}>Preview Course</button>
      </div>
    </div>
  );
};

export default CourseBuilderPage;
