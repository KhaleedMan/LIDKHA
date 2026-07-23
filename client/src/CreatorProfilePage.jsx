import { useState, useMemo, useCallback, useEffect } from 'react';
import './CreatorProfilePage.css';
import { countries } from './countries';

export default function CreatorProfilePage({ onProfileComplete, existingProfile, isPublicView, courses, onBack }) {
  const [profile, setProfile] = useState(existingProfile || {
    profilePicture: '',
    fullName: '',
    username: '',
    headline: '',
    country: '',
    website: '',
    bio: '',
    skills: '',
    experience: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    linkedin: '',
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(existingProfile?.profilePicture || '');

  useEffect(() => {
    if (existingProfile) {
      setProfile(existingProfile);
      if (existingProfile.profilePicture) {
        setProfilePicturePreview(existingProfile.profilePicture);
      }
    }
  }, [existingProfile]);

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setProfilePicturePreview(dataUrl);
        setProfile({ ...profile, profilePicture: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const completionPercentage = useMemo(() => {
    const fields = [
      profile.profilePicture,
      profile.fullName,
      profile.username,
      profile.headline,
      profile.bio,
      profile.skills,
      profile.experience,
    ];
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  }, [profile]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Profile data submitted:', profile);
    if (onProfileComplete) {
      onProfileComplete(profile);
    }
  }, [profile, onProfileComplete]);

  const isEditing = !!existingProfile && !isPublicView;

  if (isPublicView) {
    const publishedCourses = courses.filter(course => course.status === 'Published');
    return (
      <div className="public-profile-view">
        <div className="profile-header-public">
          <img src={profile.profilePicture || '/images/default-profile.png'} alt={profile.fullName} className="profile-picture-public" />
          <div className="creator-details-public">
            <h1>{profile.fullName}</h1>
            <p>{profile.headline}</p>
          </div>
        </div>
        <div className="profile-bio-public">
          <h2>About Me</h2>
          <p>{profile.bio}</p>
        </div>
        <div className="published-courses-section">
          <h2>Published Courses ({publishedCourses.length})</h2>
          <div className="course-grid-public">
            {publishedCourses.map(course => (
              <div key={course.id} className="course-card-public">
                <img src={course.thumbnail || '/images/course-thumbnail.jpg'} alt={course.title} className="course-thumbnail-public" />
                <div className="course-info-public">
                  <h4>{course.title}</h4>
                  <p>{course.students} Students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="creator-profile-page">
      <div className="profile-form-container">
        <div className="profile-header">
            <h1>{isEditing ? 'Edit Your Creator Profile' : 'Complete Your Creator Profile'}</h1>
            <p>Your profile is your creator homepage. Make it count.</p>
        </div>
        <div className="profile-setup-container">
          <div className="profile-form-sections">
            {/* Profile Picture Section */}
            <div className="form-section">
              <h2>Profile Picture</h2>
              <div className="profile-picture-upload">
                 <label htmlFor="profilePicture" className="profile-picture-placeholder">
                    {profilePicturePreview ? (
                        <img src={profilePicturePreview} alt="Profile Preview" />
                    ) : (
                        <div className="upload-icon"><span>+</span></div>
                    )}
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handlePictureUpload}
                  style={{ display: 'none' }}
                />
                <div className="upload-instructions">
                    <label htmlFor="profilePicture" className="button-secondary">
                    Upload Image
                    </label>
                    <p>1:1 aspect ratio recommended. <br /> Max file size: 5MB</p>
                </div>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="form-section">
              <h2>Basic Information</h2>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input type="text" id="fullName" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label htmlFor="username">Creator Username *</label>
                <input type="text" id="username" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} required />
              </div>
              <div className="form-group">
                <label htmlFor="headline">Professional Headline *</label>
                <input type="text" id="headline" value={profile.headline} onChange={(e) => setProfile({ ...profile, headline: e.target.value })} required />
              </div>
               <div className="form-group">
                <label htmlFor="bio">Bio / About Me</label>
                <textarea id="bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="skills">Skills & Expertise</label>
                <input type="text" id="skills" value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} placeholder="e.g., Digital Marketing, Graphic Design"/>
            </div>
            <div className="form-group">
                <label htmlFor="experience">Years of Experience</label>
                <input type="number" id="experience" value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value })} />
            </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select id="country" value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })}>
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input type="url" id="website" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} />
              </div>
            </div>

            {/* Social Presence Section */}
            <div className="form-section">
                <h2>Social Presence</h2>
                <div className="form-group">
                    <label htmlFor="facebook">Facebook</label>
                    <input type="url" id="facebook" value={profile.facebook} onChange={(e) => setProfile({ ...profile, facebook: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="twitter">X (Twitter)</label>
                    <input type="url" id="twitter" value={profile.twitter} onChange={(e) => setProfile({ ...profile, twitter: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="instagram">Instagram</label>
                    <input type="url" id="instagram" value={profile.instagram} onChange={(e) => setProfile({ ...profile, instagram: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="youtube">YouTube</label>
                    <input type="url" id="youtube" value={profile.youtube} onChange={(e) => setProfile({ ...profile, youtube: e.g.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input type="url" id="linkedin" value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} />
                </div>
            </div>
            
            
          </div>

          <aside className="profile-completion-sidebar">
            <div className="progress-section">
              <h2>Profile Completion</h2>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${completionPercentage}%` }}></div>
              </div>
              <p>{completionPercentage}% Complete</p>
              <ul className="completion-checklist">
                <li className={profile.profilePicture ? 'completed' : ''}>✓ Profile Photo Added</li>
                <li className={profile.fullName ? 'completed' : ''}>✓ Full Name Added</li>
                <li className={profile.username ? 'completed' : ''}>✓ Username Added</li>
                <li className={profile.headline ? 'completed' : ''}>✓ Headline Added</li>
                <li className={profile.bio ? 'completed' : ''}>✓ Bio Added</li>
                <li className={profile.skills ? 'completed' : ''}>✓ Skills Added</li>
                <li className={profile.experience ? 'completed' : ''}>✓ Experience Added</li>
              </ul>
            </div>
          </aside>
        </div>
         <div className="form-actions">
              <button type="button" className="button-primary" onClick={handleSubmit}>{isEditing ? 'Save Changes' : 'Save Profile'}</button>
            </div>
      </div>
    </div>
  );
}
