import { useState, useEffect, useRef } from 'react';
import './LoginModal.css';
import { countries } from './countries';

const EyeIcon = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

export default function LoginModal({ isOpen, onClose, onSignUp, onLogin }) {
  const [mode, setMode] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    email: '',
    username: '',
    password: '',
    country: '',
    language: 'English',
    agreedToTerms: false,
  });
  const [error, setError] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const countryRef = useRef(null);
  const modalContentRef = useRef(null); /* Ref for modal content */

  const countryObjects = countries.map(name => ({ name }));

  useEffect(() => {
    if (isCountryDropdownOpen) {
      const searchLower = countrySearch.toLowerCase();
      const results = countryObjects.filter(c => 
        c.name.toLowerCase().includes(searchLower)
      );
      setFilteredCountries(results);
      setHighlightedIndex(-1);
    } else {
      setFilteredCountries([]);
    }
  }, [countrySearch, isCountryDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (countryName) => {
    setFormData(prev => ({ ...prev, country: countryName }));
    setCountrySearch(countryName);
    setIsCountryDropdownOpen(false);
  }

  const handleCountryKeyDown = (e) => {
    if (isCountryDropdownOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex].name);
        }
      } else if (e.key === 'Escape') {
        setIsCountryDropdownOpen(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetForm = () => {
    setFormData({ identifier: '', email: '', username: '', password: '', country: '', language: 'English', agreedToTerms: false });
    setError('');
    setCountrySearch('');
  };

  const handleModeSwitch = (e) => {
    e.preventDefault();
    setMode(prev => (prev === 'signup' ? 'login' : 'signup'));
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (!formData.agreedToTerms) return setError('You must agree to the terms to sign up.');
      if (formData.password.length < 8) return setError('Password must be at least 8 characters.');
      if (!formData.country) return setError('Please select your country.');
      onSignUp(formData).catch(err => setError(err.message));
    } else {
      if (!formData.identifier || !formData.password) return setError('Please enter your credentials.');
      onLogin(formData).catch(err => setError(err.message));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-content" ref={modalContentRef} onMouseDown={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <h2>{mode === 'signup' ? 'Get started with SKILWHOP' : 'Log in to SKILWHOP'}</h2>
          <p>{mode === 'signup' ? 'Create your account' : 'Welcome back!'}</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {mode === 'signup' ? (
            <>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" autoComplete="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
              </div>
            </>
          ) : (
            <div className="form-group">
              <label htmlFor="identifier">Username or Email</label>
              <input type="text" id="identifier" name="identifier" autoComplete="username" value={formData.identifier} onChange={handleChange} placeholder="Username or your.email@example.com" required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={formData.password} onChange={handleChange} placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'} required />
              <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            </div>
          </div>
          {mode === 'signup' && (
            <>
              <div className="form-row">
                <div className="form-group country-selector" ref={countryRef}>
                  <label htmlFor="country">Country</label>
                  <input type="text" id="country" value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} onFocus={() => setIsCountryDropdownOpen(true)} onKeyDown={handleCountryKeyDown} placeholder="Your country" autoComplete="off"/>
                  {isCountryDropdownOpen && (
                    <ul className="country-dropdown">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, index) => (
                          <li key={country.name} className={highlightedIndex === index ? 'selected' : ''} onClick={() => handleCountrySelect(country.name)} onMouseOver={() => setHighlightedIndex(index)}>
                            {country.name}
                          </li>
                        ))
                      ) : ( <li>No country found</li> )}
                    </ul>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="language">Language</label>
                  <select id="language" name="language" value={formData.language} onChange={handleChange}>
                    <option>English</option>
                    <option>Français</option>
                    <option>Español</option>
                    <option>Português</option>
                    <option>العربية</option>
                    <option>हिन्दी</option>
                  </select>
                </div>
              </div>
              <div className="form-group-agree">
                <input type="checkbox" id="agreedToTerms" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} required />
                <label htmlFor="agreedToTerms">
                  I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                </label>
              </div>
            </>
          )}
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="submit-btn" disabled={mode === 'signup' && !formData.agreedToTerms}>{mode === 'signup' ? 'Agree and Continue' : 'Log In'}</button>
          <div className="mode-switch">
            <span>{mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}</span>
            <a href="#" onClick={handleModeSwitch}>{mode === 'signup' ? 'Log In' : 'Sign Up'}</a>
          </div>
        </form>
      </div>
    </div>
  );
}
