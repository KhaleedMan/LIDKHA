import { useState, useMemo, useCallback } from 'react';
import './CreatorProfilePage.css';
import { countries } from './countries'; 

export default function CreatorProfilePage({ onProfileComplete }) {
  const [profile, setProfile] = useState({
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
  const [profilePicturePreview, setProfilePicturePreview] = useState('');

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profilePicture: file });
      setProfilePicturePreview(URL.createObjectURL(file));
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
    // Here you would typically handle the upload of the profile picture
    // and save the profile data to your backend.
    console.log('Profile data submitted:', profile);
    if (onProfileComplete) {
      onProfileComplete(profile);
    }
  }, [profile, onProfileComplete]);

  return (
    <div className="creator-profile-page">
      <div className="profile-form-container">
        <h1>Complete Your Creator Profile</h1>
        <div className="profile-setup-container">
          <div className="profile-form-sections">
            {/* Profile Picture Section */}
            <div className="form-section">
              <h2>Profile Picture</h2>
              <div className="profile-picture-upload">
                <div className="profile-picture-placeholder">
                  {profilePicturePreview ? (
                    <img src={profilePicturePreview} alt="Profile Preview" />
                  ) : (
                    <span>+</span>
                  )}
                </div>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handlePictureUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profilePicture" className="button">
                  Upload Profile Picture
                </label>
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

            {/* About Creator Section */}
            <div className="form-section">
                <h2>About Creator</h2>
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
                    <input type="url" id="youtube" value={profile.youtube} onChange={(e) => setProfile({ ...profile, youtube: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input type="url" id="linkedin" value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} />
                </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="button-primary" onClick={handleSubmit}>Save Profile</button>
            </div>
          </div>

          <div className="profile-completion-sidebar">
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
          </div>
        </div>
      </div>
    </div>
  );
}
