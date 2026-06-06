import React from 'react';
import './CreatorsDirectoryPage.css';

const CreatorsDirectoryPage = ({ onViewCreatorProfile }) => {
    const sampleCreators = [
        { id: 1, name: 'Khalid Hussain', bio: 'Helping people learn online business and digital skills.', courses: 12, students: 4500 },
        { id: 2, name: 'Angela Yu', bio: 'Teacher of 1.5M+ students. I teach Flutter, Web, App Development & Data Science.', courses: 8, students: 15000 },
        { id: 3, name: 'Jonas Schmedtmann', bio: 'Building premium courses on web design and development since 2015.', courses: 15, students: 10000 },
        { id: 4, name: 'Jose Portilla', bio: 'Head of Data Science at Pierian Data Inc. and best-selling instructor.', courses: 20, students: 20000 },
        { id: 5, name: 'Jane Doe', bio: 'Award-winning designer and passionate instructor.', courses: 25, students: 150000 },
    ];

    return (
        <div className="creators-directory-page">
            <h1>Creators Directory</h1>
            <p>Discover and connect with our talented creators.</p>
            <div className="creator-grid">
                {sampleCreators.map(creator => (
                    <div key={creator.id} className="creator-card">
                        <div className="creator-profile-placeholder"></div>
                        <h3>{creator.name}</h3>
                        <p className="creator-bio">{creator.bio}</p>
                        <div className="creator-stats">
                            <span>📚 {creator.courses} Courses</span>
                            <span>👥 {creator.students} Students</span>
                        </div>
                        <div className="creator-buttons">
                            <button className="follow-button">Follow</button>
                            <button className="view-profile-button" onClick={onViewCreatorProfile}>View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreatorsDirectoryPage;