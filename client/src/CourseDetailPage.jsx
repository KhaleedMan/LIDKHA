
import React, { useState } from 'react';
import './CourseDetailPage.css';

// Placeholder Data
const courseData = {
    thumbnail: '',
    title: 'The Complete Web Developer Course 3.0',
    subtitle: 'Go from zero to hero in web development. Learn everything you need to build amazing websites and apps.',
    creatorName: 'Dr. Angela Yu',
    creatorAvatar: '',
    rating: 4.8,
    students: 2500,
    category: 'Programming',
    lastUpdated: 'October 2023',
    price: '₦25,000',
    discountPrice: '₦12,500',
    description: 'This is the most comprehensive web development course available online. It covers everything from the basics of HTML, CSS, and JavaScript to advanced topics like React, Node.js, and databases. By the end of this course, you will have built over 15 real-world projects and will be ready to apply for web developer jobs.',
    learningOutcomes: [
        'Build beautiful and responsive websites.',
        'Master front-end development with React.',
        'Understand back-end development with Node.js and Express.',
        'Work with databases like MongoDB and PostgreSQL.',
        'Become a professional web developer.'
    ],
    curriculum: [
        {
            title: 'Module 1: Introduction to Web Development',
            lessons: ['Welcome to the course', 'How the web works', 'Setting up your development environment']
        },
        {
            title: 'Module 2: HTML 5',
            lessons: ['HTML Basics', 'HTML Tables', 'HTML Forms']
        },
        {
            title: 'Module 3: CSS 3',
            lessons: ['CSS Basics', 'Flexbox', 'CSS Grid', 'Responsive Design']
        },
        {
            title: 'Module 4: JavaScript',
            lessons: ['JavaScript Fundamentals', 'DOM Manipulation', 'ES6+ Features']
        }
    ],
    creator: {
        name: 'Dr. Angela Yu',
        avatar: '',
        bio: 'I\'m a doctor and a teacher of 1.5M+ students on Udemy. I teach Flutter, Web, App Development & Data Science.',
        students: 15000,
        courses: 8
    },
    reviews: [
        {
            id: 1,
            name: 'John Doe',
            avatar: '',
            rating: 5,
            text: 'This course is absolutely amazing! I learned so much and now feel confident in my web development skills.'
        },
        {
            id: 2,
            name: 'Jane Smith',
            avatar: '',
            rating: 4,
            text: 'Great course with a lot of valuable content. The instructor explains everything very clearly.'
        }
    ]
};


function CourseHero() {
    return (
        <section className="course-hero">
            <div className="course-hero-content">
                <div className="course-thumbnail-banner"></div>
                <h1>{courseData.title}</h1>
                <p className="subtitle">{courseData.subtitle}</p>
                <div className="creator-info">
                    <div className="creator-avatar-placeholder"></div>
                    <span>{courseData.creatorName}</span>
                </div>
                <div className="course-meta-info">
                    <span className="rating">⭐ {courseData.rating}</span>
                    <span className="students">👥 {courseData.students} students</span>
                    <span className="category">📁 {courseData.category}</span>
                    <span className="last-updated">🔄 Last updated {courseData.lastUpdated}</span>
                </div>
                <div className="course-hero-buttons">
                    <button className="enroll-btn-main">Enroll Now</button>
                    <button className="wishlist-btn">Add to Wishlist</button>
                    <button className="share-btn">Share Course</button>
                </div>
            </div>
        </section>
    );
}

function PricingCard() {
    return (
        <div className="pricing-card-sticky">
            <h3>{courseData.price}</h3>
            {courseData.discountPrice && <p className="discount">{courseData.discountPrice}</p>}
            <ul>
                <li>✓ Lifetime access</li>
                <li>✓ Access on mobile and TV</li>
                <li>✓ Certificate of completion</li>
            </ul>
            <button className="enroll-btn-pricing">Enroll Now</button>
        </div>
    );
}

function CourseContent() {
    const [openModule, setOpenModule] = useState(null);

    const toggleModule = (index) => {
        setOpenModule(openModule === index ? null : index);
    };

    return (
        <div className="course-content-main">
            <section className="course-description-section">
                <h2>Description</h2>
                <p>{courseData.description}</p>
                <h3>What you'll learn</h3>
                <ul className="learning-outcomes">
                    {courseData.learningOutcomes.map((outcome, i) => (
                        <li key={i}>{outcome}</li>
                    ))}
                </ul>
            </section>

            <section className="course-curriculum-section">
                <h2>Course Curriculum</h2>
                <div className="curriculum-accordion">
                    {courseData.curriculum.map((module, index) => (
                        <div key={index} className="module">
                            <div className="module-header" onClick={() => toggleModule(index)}>
                                <h4>{module.title}</h4>
                                <span>{openModule === index ? '-' : '+'}</span>
                            </div>
                            {openModule === index && (
                                <ul className="lesson-list">
                                    {module.lessons.map((lesson, i) => <li key={i}>{lesson}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function CreatorSection() {
    return (
        <section className="creator-profile-section">
            <h2>About the Creator</h2>
            <div className="creator-details">
                <div className="creator-avatar-large-placeholder"></div>
                <h3>{courseData.creator.name}</h3>
                <p className="creator-bio">{courseData.creator.bio}</p>
                <div className="creator-stats-coursepage">
                    <span>👥 {courseData.creator.students} Students</span>
                    <span>📚 {courseData.creator.courses} Courses</span>
                </div>
                <div className="creator-section-buttons">
                    <button>View Creator Profile</button>
                    <button>Follow Creator</button>
                </div>
            </div>
        </section>
    );
}

function StudentReviews() {
    return (
        <section className="student-reviews-section">
            <h2>Student Reviews</h2>
            <div className="reviews-grid">
                {courseData.reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <div className="student-avatar-placeholder"></div>
                            <div>
                                <h4>{review.name}</h4>
                                <div className="review-rating">{'⭐'.repeat(review.rating)}</div>
                            </div>
                        </div>
                        <p className="review-text">{review.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}


export default function CourseDetailPage({ onBack }) {
    return (
        <div className="course-detail-page">
             <button onClick={onBack} className="back-button">← Back to Courses</button>
            <div className="course-detail-layout">
                <div className="main-course-content">
                    <CourseHero />
                    <CourseContent />
                    <CreatorSection />
                    <StudentReviews />
                </div>
                <aside className="sidebar-course-content">
                    <PricingCard />
                </aside>
            </div>
        </div>
    );
}
