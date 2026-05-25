import { useState } from 'react';
import './AffiliateDashboard.css';

export default function AffiliateDashboard({ user, registeredUsers }) {
  const [activeTab, setActiveTab] = useState('overview');

  const affiliateLink = `https://skilwhop.com.ng/join?ref=${user.username}`;

  const referrals = registeredUsers.filter(u => u.referrer === user.username);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <div className="affiliate-dashboard">
      <header className="affiliate-header">
        <h2>Affiliate Program</h2>
        <p>Promote SKILWHOP and earn commissions on every new customer.</p>
      </header>

      <main className="affiliate-main">
        <div className="affiliate-link-section">
          <h3>Your Unique Affiliate Link</h3>
          <div className="affiliate-link-box">
            <input type="text" value={affiliateLink} readOnly />
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </div>

        <div className="affiliate-stats">
          <div className="stat-card">
            <h4>Total Referrals</h4>
            <p>{referrals.length}</p>
          </div>
          <div className="stat-card">
            <h4>Commission Rate</h4>
            <p>10%</p>
          </div>
          <div className="stat-card">
            <h4>Total Earnings</h4>
            <p>$0.00</p>
          </div>
        </div>

        <div className="affiliate-referrals">
          <h3>Your Referrals</h3>
          {referrals.length > 0 ? (
            <div className="referral-list">
              <div className="referral-list-header">
                <span>Username</span>
                <span>Email</span>
                <span>Date Joined</span>
              </div>
              {referrals.map(referral => (
                <div className="referral-list-item" key={referral.email}>
                  <span>{referral.username}</span>
                  <span>{referral.email}</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't referred anyone yet. Share your link to get started!</p>
          )}
        </div>
      </main>
    </div>
  );
}
