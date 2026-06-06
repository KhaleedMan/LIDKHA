import React, { useState } from 'react';
import './CreateCoursePage.css';

const CreateCoursePage = ({ onBack, onCourseCreated }) => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseSubtitle, setCourseSubtitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [category, setCategory] = useState('Business');
    const [pricing, setPricing] = useState('Paid');
    const [price, setPrice] = useState('25000');
    const [level, setLevel] = useState('Beginner');
    const [benefits, setBenefits] = useState(['', '', '']);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const handleBenefitChange = (index, value) => {
        const newBenefits = [...benefits];
        newBenefits[index] = value;
        setBenefits(newBenefits);
    };

    const addBenefit = () => {
        setBenefits([...benefits, '']);
    };

    const handleThumbnailUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setThumbnailPreview(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="create-course-page">
            <div className="form-header">
                <h1>Create New Course</h1>
                <p>Fill out the details below to create your new course.</p>
            </div>

            <div className="course-form-container">
                <form className="course-form" onSubmit={(e) => { e.preventDefault(); onCourseCreated(); }}>
                    {/* Basic Information */}
                    <div className="form-section">
                        <h2>Basic Information</h2>
                        <div className="form-group">
                            <label htmlFor="courseTitle">Course Title</label>
                            <input type="text" id="courseTitle" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="e.g., The Complete Web Development Bootcamp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="courseSubtitle">Course Subtitle</label>
                            <input type="text" id="courseSubtitle" value={courseSubtitle} onChange={(e) => setCourseSubtitle(e.target.value)} placeholder="e.g., Go from zero to hero in 12 weeks" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} placeholder="Describe what your course is about..."></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option>Business</option>
                                <option>AI</option>
                                <option>Marketing</option>
                                <option>E-commerce</option>
                                <option>Programming</option>
                                <option>Design</option>
                                <option>Trading</option>
                                <option>Freelancing</option>
                            </select>
                        </div>
                    </div>

                    {/* Course Thumbnail */}
                    <div className="form-section">
                        <h2>Course Thumbnail</h2>
                        <div className="thumbnail-upload-area">
                            {thumbnailPreview ? (
                                <img src={thumbnailPreview} alt="Thumbnail Preview" className="thumbnail-preview" />
                            ) : (
                                <div className="thumbnail-placeholder"><span>Click to upload</span></div>
                            )}
                            <input type="file" id="thumbnailUpload" onChange={handleThumbnailUpload} accept="image/*" />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="form-section">
                        <h2>Pricing</h2>
                        <div className="toggle-group">
                            <button type="button" className={pricing === 'Free' ? 'active' : ''} onClick={() => setPricing('Free')}>Free</button>
                            <button type="button" className={pricing === 'Paid' ? 'active' : ''} onClick={() => setPricing('Paid')}>Paid</button>
                        </div>
                        {pricing === 'Paid' && (
                            <div className="form-group">
                                <label htmlFor="price">Course Price (₦)</label>
                                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 15000" />
                            </div>
                        )}
                    </div>

                    {/* Course Level */}
                    <div className="form-section">
                        <h2>Course Level</h2>
                        <div className="radio-group">
                            <label><input type="radio" name="level" value="Beginner" checked={level === 'Beginner'} onChange={() => setLevel('Beginner')} /> Beginner</label>
                            <label><input type="radio" name="level" value="Intermediate" checked={level === 'Intermediate'} onChange={() => setLevel('Intermediate')} /> Intermediate</label>
                            <label><input type="radio" name="level" value="Advanced" checked={level === 'Advanced'} onChange={() => setLevel('Advanced')} /> Advanced</label>
                        </div>
                    </div>

                    {/* Course Benefits */}
                    <div className="form-section">
                        <h2>Course Benefits</h2>
                        <p>What will students learn in your course?</p>
                        {benefits.map((benefit, index) => (
                            <div key={index} className="form-group dynamic-input">
                                <input type="text" value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} placeholder="e.g., Learn affiliate marketing" />
                            </div>
                        ))}
                        <button type="button" className="add-more-btn" onClick={addBenefit}>+ Add another benefit</button>
                    </div>

                    {/* Actions */}
                    <div className="form-actions">
                        <button type="button" className="action-btn-secondary" onClick={onCourseCreated}>Save Draft</button>
                        <button type="submit" className="action-btn-primary">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCoursePage;
