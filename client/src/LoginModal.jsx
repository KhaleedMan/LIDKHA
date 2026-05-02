import { useState } from 'react'
import './LoginModal.css'

export default function LoginModal({ isOpen, onClose, onSignUp }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    state: '',
    language: 'English'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSignUp(formData)
    setFormData({ email: '', name: '', state: '', language: 'English' })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>Get started with LIDKHA</h2>
          <p>Sign up to access your first course</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Your state or region"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              <option>English</option>
              <option>Français</option>
              <option>Español</option>
              <option>Português</option>
              <option>العربية</option>
              <option>हिन्दी</option>
            </select>
          </div>

          <button type="submit" className="button button-primary submit-btn">
            Sign up and start learning
          </button>
        </form>
      </div>
    </div>
  )
}
