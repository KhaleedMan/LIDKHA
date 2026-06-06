import React from 'react';
import './CreatorProfilePage.css';

const CreatorProfilePage = () => {
    const creator = {
        name: 'Jane Doe',
        username: '@janedoe',
        bio: 'Award-winning designer and passionate instructor.',
        profilePicture: 'https://i.pravatar.cc/150?img=1',
        joinDate: 'Joined July 2023',
        followers: '1.2M',
        students: '150K',
        courses: 25,
        social: {
            twitter: '#',
            linkedin: '#',
            website: '#'
        },
        story: 'Jane has been designing for over 10 years, working with top brands and startups. She is passionate about sharing her knowledge and helping others succeed in the design industry.',
        experience: '10+ years in UI/UX design',
        skills: ['UI/UX Design', 'Web Development', 'Project Management'],
        expertise: 'User-centered design and interaction design'
    };

    const courses = [
        { id: 1, title: 'Introduction to UI/UX Design', rating: 4.9, students: '12.5K', price: '$49.99', thumbnail: '/images/course1.jpg' },
        { id: 2, title: 'Advanced Web Design', rating: 4.8, students: '8K', price: '$79.99', thumbnail: '/images/course2.jpg' },
        { id: 3, title: 'Project Management for Designers', rating: 4.7, students: '5.2K', price: '$39.99', thumbnail: '/images/course3.jpg' },
        { id: 4, title: 'Data Visualization Techniques', rating: 4.9, students: '10.1K', price: '$59.99', thumbnail: '/images/course4.jpg' },
        { id: 5, title: 'Mobile App Design from Scratch', rating: 4.8, students: '7.8K', price: '$69.99', thumbnail: '/images/course5.jpg' },
        { id: 6, title: 'Freelancing for Creatives', rating: 4.9, students: '15K', price: '$29.99', thumbnail: '/images/course6.jpg' }
    ];

    const stats = {
        totalStudents: '150K',
        totalCourses: 25,
        completionRate: '92%',
        averageRating: 4.8
    };

    const reviews = [
        { id: 1, name: 'John S.', review: 'Jane is an amazing instructor! Her courses are well-structured and easy to follow.', rating: 5 },
        { id: 2, name: 'Emily R.', review: 'I learned so much from the UI/UX design course. Highly recommended!', rating: 5 },
        { id: 3, name: 'David L.', review: "The best investment I've made in my design career.", rating: 5 }
    ];

    return (
        <div className="creator-profile-page">
            {/* Creator Header */}
            <header className="creator-header">
                <div className="profile-picture-container">
                    <img src={creator.profilePicture} alt={creator.name} className="profile-picture" />
                </div>
                <div className="creator-info">
                    <h1>{creator.name}</h1>
                    <p className="username">{creator.username}</p>
                    <p className="bio">{creator.bio}</p>
                    <div className="social-links">
                        <a href={creator.social.twitter}>Twitter</a>
                        <a href={creator.social.linkedin}>LinkedIn</a>
                        <a href={creator.social.website}>Website</a>
                    </div>
                    <div className="creator-meta">
                        <span>{creator.joinDate}</span>
                        <span>{creator.followers} Followers</span>
                        <span>{creator.students} Students</span>
                        <span>{creator.courses} Courses</span>
                    </div>
                </div>
                <div className="creator-actions">
                    <button className="follow-button">Follow Creator</button>
                    <button className="share-button">Share Profile</button>
                </div>
            </header>

            {/* About Section */}
            <section className="about-section">
                <h2>About Me</h2>
                <p>{creator.story}</p>
                <ul>
                    <li><strong>Experience:</strong> {creator.experience}</li>
                    <li><strong>Skills:</strong> {creator.skills.join(', ')}</li>
                    <li><strong>Expertise:</strong> {creator.expertise}</li>
                </ul>
            </section>

            {/* Published Courses */}
            <section className="published-courses">
                <h2>Published Courses</h2>
                <div className="courses-grid">
                    {courses.map(course => (
                        <div key={course.id} className="course-card">
                            <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                            <div className="course-info">
                                <h3>{course.title}</h3>
                                <div className="course-meta">
                                    <span>Rating: {course.rating}</span>
                                    <span>{course.students} Students</span>
                                </div>
                                <p className="course-price">{course.price}</p>
                                <button className="view-course-button">View Course</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Creator Statistics */}
            <section className="creator-statistics">
                <h2>My Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Students</h3>
                        <p>{stats.totalStudents}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Courses</h3>
                        <p>{stats.totalCourses}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Course Completion Rate</h3>
                        <p>{stats.completionRate}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Average Rating</h3>
                        <p>{stats.averageRating}</p>
                    </div>
                </div>
            </section>

            {/* Reviews About Creator */}
            <section className="reviews-section">
                <h2>Reviews About Me</h2>
                <div className="reviews-grid">
                    {reviews.map(review => (
                        <div key={review.id} className="testimonial-card">
                            <p>"{review.review}"</p>
                            <div className="reviewer-info">
                                <span>- {review.name}</span>
                                <div className="rating">{'★'.repeat(review.rating)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CreatorProfilePage;