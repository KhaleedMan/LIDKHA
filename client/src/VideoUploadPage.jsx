import React from 'react';
import './VideoUploadPage.css';

const VideoUploadPage = ({ onBack, onPublish }) => {
  return (
    <div className="video-upload-page">
      <div className="header">
        <button onClick={onBack} className="back-btn">← Back to Curriculum</button>
        <h1>Upload Videos</h1>
      </div>

      <div className="upload-container">
        <div className="upload-section">
          <h2>Upload Course Videos</h2>
          <p>Select the lesson and upload the corresponding video file.</p>
          
          <div className="form-group">
            <label htmlFor="lesson-select">Select Lesson</label>
            <select id="lesson-select">
              <option>Module 1: Lesson 1 - Welcome to the Course</option>
              <option>Module 1: Lesson 2 - What You Will Learn</option>
              <option>Module 2: Lesson 1 - Setting Up Your Environment</option>
            </select>
          </div>

          <div className="file-upload-area">
            <p>Drag & drop your video here, or click to browse.</p>
            <input type="file" />
          </div>
        </div>

        <div className="upload-queue">
          <h3>Upload Queue</h3>
          <ul className="queue-list">
            <li className="queue-item">
              <span>Lesson 1 - Welcome.mp4</span>
              <div className="progress-bar">
                <div className="progress" style={{width: '75%'}}></div>
              </div>
              <span>75%</span>
            </li>
            <li className="queue-item">
              <span>Lesson 2 - Setup.mp4</span>
              <div className="progress-bar">
                <div className="progress" style={{width: '30%'}}></div>
              </div>
              <span>30%</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="page-actions">
        <button className="action-btn">Save Draft</button>
        <button className="action-btn">Preview Course</button>
        <button className="action-btn primary" onClick={onPublish}>Publish Course</button>
      </div>
    </div>
  );
};

export default VideoUploadPage;
