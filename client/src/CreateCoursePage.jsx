import { useState } from 'react';
import './CreateCoursePage.css';

export default function CreateCoursePage({ onBack, onCourseCreated }) {
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    subtitle: '',
    category: '',
    level: '',
    price: '',
    thumbnail: null,
    description: '',
    benefits: ['', '', ''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...courseDetails.benefits];
    newBenefits[index] = value;
    setCourseDetails(prev => ({ ...prev, benefits: newBenefits }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCourseCreated();
  };

  return (
    <div className="create-course-page">
      <div className="page-header">
        <button onClick={onBack} className="back-button">← Back to Dashboard</button>
        <h1>Create Your Course</h1>
        <p>Fill in the details below to start building your course.</p>
      </div>
      <form onSubmit={handleSubmit} className="course-form-layout">
        <div className="form-main">
          <div className="form-card">
            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input type="text" id="title" name="title" value={courseDetails.title} onChange={handleChange} placeholder="e.g., The Complete Web Development Bootcamp" required />
            </div>
            <div className="form-group">
              <label htmlFor="subtitle">Course Subtitle</label>
              <input type="text" id="subtitle" name="subtitle" value={courseDetails.subtitle} onChange={handleChange} placeholder="e.g., Become a Full-Stack Developer with just ONE course." required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Course Description</label>
              <textarea id="description" name="description" value={courseDetails.description} onChange={handleChange} rows="6" placeholder="Describe what your course is about." required></textarea>
            </div>
          </div>
          <div className="form-card">
            <h2>Course Benefits</h2>
            <p>What will students learn in your course?</p>
            {courseDetails.benefits.map((benefit, index) => (
              <div key={index} className="form-group">
                <label htmlFor={`benefit-${index}`}>Benefit #{index + 1}</label>
                <input id={`benefit-${index}`} type="text" value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} placeholder={`e.g., Learn to build real-world applications`} required />
              </div>
            ))}
          </div>
        </div>
        <div className="form-sidebar">
          <div className="form-card">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={courseDetails.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select id="level" name="level" value={courseDetails.level} onChange={handleChange} required>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (NGN)</label>
              <input type="number" id="price" name="price" value={courseDetails.price} onChange={handleChange} placeholder="e.g., 15000" required />
            </div>
             <div className="form-group">
                <label htmlFor="thumbnail">Course Thumbnail</label>
                <input type="file" id="thumbnail" name="thumbnail" accept="image/*" />
            </div>
          </div>
          <button type="submit" className="button button-primary submit-btn">Save & Continue</button>
        </div>
      </form>
    </div>
  );
}
