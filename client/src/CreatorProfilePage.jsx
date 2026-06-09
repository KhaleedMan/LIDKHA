import { useState } from 'react';
import './CreatorProfilePage.css';

const sampleCourses = [
    { id: 1, title: 'Make Money with Facebook & WhatsApp', category: 'Marketing', price: '15000' },
];

export default function CreatorProfilePage({ onProfileComplete, isNewCreator = false }) {
  const [profile, setProfile] = useState({
    fullName: 'Sirkhalidman',
    headline: 'Digital Marketer & Online Course Creator',
    bio: 'Helping people achieve financial freedom through digital skills. I have been in the online space for 5 years.',
    website: 'sirkhalidman.com',
    twitter: '@sirkhalidman',
    image: '' // Use a placeholder or a default image path
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfileComplete(profile);
  };

  if (isNewCreator) {
    return (
        <div className="creator-profile-page form-view">
            <div className="form-container">
                <h2>Create Your Creator Profile</h2>
                <p>This information will be displayed on your course pages.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={profile.fullName} onChange={e => setProfile({...profile, fullName: e.target.value})} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="headline">Headline</label>
                        <input type="text" id="headline" name="headline" value={profile.headline} onChange={e => setProfile({...profile, headline: e.target.value})} placeholder="e.g., Full-Stack Developer & Online Instructor" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea id="bio" name="bio" value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} rows="5" required></textarea>
                    </div>
                    <button type="submit" className="button button-primary">Save Profile</button>
                </form>
            </div>
      </div>
    );
  }

  return (
    <div className="creator-profile-page display-view">
      <div className="profile-header">
        <img src={profile.image || '/images/default-profile.png'} alt={profile.fullName} className="profile-image" />
        <div className="profile-info">
            <h1>{profile.fullName}</h1>
            <h2>{profile.headline}</h2>
            <p>{profile.bio}</p>
        </div>
      </div>
      <div className="profile-courses">
        <h2>Courses by {profile.fullName}</h2>
        <div className="course-grid">
            {sampleCourses.map(course => (
                <div key={course.id} className="course-card-small">
                    <img src={"/images/course-thumbnail.jpg"} alt={course.title} />
                    <h3>{course.title}</h3>
                    <p>{course.category}</p>
                    <span>NGN {course.price}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
