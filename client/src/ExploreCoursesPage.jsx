import React from 'react';
import './ExploreCoursesPage.css';

const ExploreCoursesPage = () => {
    const courses = [
        { id: 1, title: 'Make Money with Facebook & WhatsApp', creator: 'SIRKHALIDMAN', rating: 4.9, students: 1250, price: '₦15,000', thumbnail: '/images/course1.jpg', level: 'Beginner' },
        { id: 2, title: 'The Complete Web Developer Course 3.0', creator: 'Dr. Angela Yu', rating: 4.8, students: 2500, price: '₦25,000', thumbnail: '/images/course2.jpg', level: 'Advanced' },
        { id: 3, title: 'Advanced CSS and Sass: Flexbox, Grid, Animations', creator: 'Jonas Schmedtmann', rating: 4.7, students: 1800, price: '₦20,000', thumbnail: '/images/course3.jpg', level: 'Intermediate' },
        { id: 4, title: 'Python for Data Science and Machine Learning Bootcamp', creator: 'Jose Portilla', rating: 4.6, students: 3000, price: '₦30,000', thumbnail: '/images/course4.jpg', level: 'Advanced' },
        { id: 5, title: 'Mobile App Design from Scratch', creator: 'Jane Doe', rating: 4.8, students: 7800, price: '₦69,000', thumbnail: '/images/course5.jpg', level: 'Beginner' },
        { id: 6, title: 'Freelancing for Creatives', creator: 'John Doe', rating: 4.9, students: 15000, price: 'Free', thumbnail: '/images/course6.jpg', level: 'Beginner' },
        { id: 7, title: 'The Ultimate Guide to AI & ChatGPT', creator: 'Khalid Hussain', rating: 4.9, students: 5500, price: '₦45,000', thumbnail: '/images/course7.jpg', level: 'Intermediate' },
        { id: 8, title: 'E-commerce Masterclass: Shopify & WooCommerce', creator: 'Amina Yusuf', rating: 4.7, students: 3200, price: '₦35,000', thumbnail: '/images/course8.jpg', level: 'Advanced' },
    ];

    return (
        <div className="explore-courses-page">
            <header className="page-header">
                <h1>Explore Courses</h1>
                <p>Discover courses from top creators and start learning today.</p>
            </header>

            <div className="search-bar">
                <input type="text" placeholder="Search courses by title..." />
                <button>Search</button>
            </div>

            <div className="page-content">
                <aside className="filter-sidebar">
                    <h3>Categories</h3>
                    <ul>
                        <li><a href="#">Business</a></li>
                        <li><a href="#">AI</a></li>
                        <li><a href="#">Marketing</a></li>
                        <li><a href="#">E-commerce</a></li>
                        <li><a href="#">Programming</a></li>
                        <li><a href="#">Design</a></li>
                        <li><a href="#">Trading</a></li>
                        <li><a href="#">Freelancing</a></li>
                    </ul>

                    <h3>Price</h3>
                    <ul>
                        <li><input type="checkbox" id="free" /><label htmlFor="free">Free</label></li>
                        <li><input type="checkbox" id="paid" /><label htmlFor="paid">Paid</label></li>
                    </ul>

                    <h3>Level</h3>
                    <ul>
                        <li><input type="checkbox" id="beginner" /><label htmlFor="beginner">Beginner</label></li>
                        <li><input type="checkbox" id="intermediate" /><label htmlFor="intermediate">Intermediate</label></li>
                        <li><input type="checkbox" id="advanced" /><label htmlFor="advanced">Advanced</label></li>
                    </ul>
                </aside>

                <main className="course-grid-container">
                    <div className="course-grid-main">
                        {courses.map(course => (
                            <div key={course.id} className="course-card-explore">
                                <div className="course-thumbnail-placeholder"></div>
                                <div className="course-info-explore">
                                    <h3>{course.title}</h3>
                                    <p className="creator-name">By {course.creator}</p>
                                    <div className="course-meta-explore">
                                        <span className="rating">⭐ {course.rating}</span>
                                        <span className="students">👥 {course.students} Students</span>
                                    </div>
                                    <p className="price">{course.price}</p>
                                    <button className="view-course-button">View Course</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button>&laquo;</button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>&raquo;</button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ExploreCoursesPage;
