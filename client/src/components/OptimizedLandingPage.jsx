import { useState, useEffect } from 'react';
import './OptimizedLandingPage.css';

export default function OptimizedLandingPage({ onSignUp }) {
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.observe').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section observe" id="hero">
        <div className="hero-content">
          <h1 className={visibleSections.hero ? 'fade-in' : ''}>
            Learn to Make Money from Your Smartphone
          </h1>
          <p className={visibleSections.hero ? 'fade-in-delay' : ''}>
            Join thousands of creators earning real income using Facebook, WhatsApp, and proven digital strategies.
          </p>
          <button className="cta-button primary" onClick={onSignUp}>
            Start Free Today
          </button>
        </div>
        <div className="hero-image">
          <div className="phone-mockup"></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section observe" id="benefits">
        <h2>Why Choose SKILWHOP?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3>Mobile-First Learning</h3>
            <p>Complete lessons on your phone, anytime, anywhere.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Real Income Potential</h3>
            <p>Start earning within your first month with proven methods.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">👥</div>
            <h3>Community Support</h3>
            <p>Connect with other creators and share strategies.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📈</div>
            <h3>Track Progress</h3>
            <p>Monitor your growth with detailed analytics.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section observe" id="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"I made my first ₦50,000 in just 2 weeks following the Facebook strategy!"</p>
            <h4>Chioma - Lagos</h4>
          </div>
          <div className="testimonial">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"The WhatsApp business tips transformed my side hustle into my main income."</p>
            <h4>Ahmed - Abuja</h4>
          </div>
          <div className="testimonial">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Best ₦10,000 I ever spent. Now making ₦200,000 monthly!"</p>
            <h4>Zainab - Kano</h4>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section observe" id="pricing">
        <h2>Simple Pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Beginner</h3>
            <p className="price">₦9,999</p>
            <ul>
              <li>✓ All Courses</li>
              <li>✓ Video Access</li>
              <li>✓ Community Chat</li>
              <li>✗ Priority Support</li>
            </ul>
            <button className="cta-button secondary" onClick={onSignUp}>
              Get Started
            </button>
          </div>
          <div className="pricing-card featured">
            <h3>Premium</h3>
            <p className="price">₦24,999</p>
            <ul>
              <li>✓ All Courses</li>
              <li>✓ Video Access</li>
              <li>✓ Community Chat</li>
              <li>✓ Priority Support</li>
              <li>✓ 1-on-1 Coaching</li>
            </ul>
            <button className="cta-button primary" onClick={onSignUp}>
              Recommended
            </button>
          </div>
          <div className="pricing-card">
            <h3>Elite</h3>
            <p className="price">₦49,999</p>
            <ul>
              <li>✓ All Premium Features</li>
              <li>✓ Private Mastermind Group</li>
              <li>✓ Monthly 1-on-1 Calls</li>
              <li>✓ Personal Strategy Plan</li>
            </ul>
            <button className="cta-button secondary" onClick={onSignUp}>
              Join Elite
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section observe" id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Is this suitable for beginners?</h4>
            <p>Yes! SKILWHOP is designed specifically for people starting from zero. No prior experience needed.</p>
          </div>
          <div className="faq-item">
            <h4>How long until I start earning?</h4>
            <p>Most students report their first sales within 1-2 weeks of starting the course.</p>
          </div>
          <div className="faq-item">
            <h4>Do I need a large following?</h4>
            <p>No. Our methods work even with zero followers. We teach you how to build from scratch.</p>
          </div>
          <div className="faq-item">
            <h4>Is there a money-back guarantee?</h4>
            <p>Yes! 30-day money-back guarantee if you're not satisfied for any reason.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta observe" id="final-cta">
        <h2>Ready to Transform Your Income?</h2>
        <p>Join thousands of successful creators. Start your free trial today.</p>
        <button className="cta-button primary" onClick={onSignUp}>
          Start Learning Now
        </button>
      </section>
    </div>
  );
}
