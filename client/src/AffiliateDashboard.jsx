import React from 'react';
import './AffiliateDashboard.css';

const AffiliateDashboard = () => {
  const affiliate = {
    name: 'TopAffiliate123',
    level: 'Gold',
    totalEarnings: 7500,
    totalSales: 150,
    totalClicks: 1250,
    affiliateLink: 'https://skilwhop.com/course/facebook-marketing?ref=affiliate123'
  };

  const performance = {
    totalCommissions: '₦7,500',
    salesThisMonth: '₦1,200',
    conversionRate: '12%',
    pendingEarnings: '₦500',
  };

  const promotedCourses = [
    { id: 1, title: 'Make Money with Facebook & WhatsApp', creator: 'SIRKHALIDMAN', commission: '15%', sales: 50, earnings: 2500, thumbnail: 'https://via.placeholder.com/120x80' },
    { id: 2, title: 'Graphic Design Basics', creator: 'Jane Designs', commission: '20%', sales: 30, earnings: 1500, thumbnail: 'https://via.placeholder.com/120x80' },
  ];

  const marketplaceCourses = [
    { id: 3, title: 'Video Editing Mastery', creator: 'VideoPro', commission: '25%', price: '₦10,000' },
    { id: 4, title: 'Content Creation Strategy', creator: 'ContentKing', commission: '20%', price: '₦8,000' },
  ];

  const leaderboard = [
    { name: 'TopAffiliate123', sales: 150, earnings: '₦7,500' },
    { name: 'SuperSeller', sales: 120, earnings: '₦6,200' },
    { name: 'MegaMover', sales: 105, earnings: '₦5,100' },
  ];

  const payouts = {
    availableBalance: '₦7,000',
    pendingBalance: '₦500',
    history: [
      { date: '2024-06-15', amount: '₦3,000', status: 'Paid' },
      { date: '2024-05-15', amount: '₦2,500', status: 'Paid' },
    ]
  };

  return (
    <div className="affiliate-dashboard">
      <header className="affiliate-header">
        <div>
          <h1>Welcome, {affiliate.name}</h1>
          <span className="affiliate-level">{affiliate.level} Affiliate</span>
        </div>
        <div className="header-stats">
          <div className="header-stat">
            <span>Total Earnings</span>
            <strong>₦{affiliate.totalEarnings.toLocaleString()}</strong>
          </div>
          <div className="header-stat">
            <span>Total Sales</span>
            <strong>{affiliate.totalSales}</strong>
          </div>
          <div className="header-stat">
            <span>Total Clicks</span>
            <strong>{affiliate.totalClicks}</strong>
          </div>
        </div>
      </header>

      <main className="affiliate-main-content">
        <section id="performance-overview" className="dashboard-section">
          <h2>Performance Overview</h2>
          <div className="stats-grid">
            <div className="stat-card"><h3>Total Commissions</h3><p>{performance.totalCommissions}</p></div>
            <div className="stat-card"><h3>Sales This Month</h3><p>{performance.salesThisMonth}</p></div>
            <div className="stat-card"><h3>Conversion Rate</h3><p>{performance.conversionRate}</p></div>
            <div className="stat-card"><h3>Pending Earnings</h3><p>{performance.pendingEarnings}</p></div>
          </div>
        </section>

        <section id="promoted-courses" className="dashboard-section">
          <h2>Promoted Courses</h2>
          <div className="course-list">
            {promotedCourses.map(course => (
              <div key={course.id} className="course-card">
                <img src={course.thumbnail} alt={course.title} className="course-thumbnail"/>
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>by {course.creator}</p>
                  <div className="course-stats">
                    <span>{course.commission} Commission</span>
                    <span>{course.sales} Sales</span>
                    <span>₦{course.earnings} Earned</span>
                  </div>
                </div>
                <div className="course-actions">
                  <button>View Course</button>
                  <button>Copy Affiliate Link</button>
                  <button className="secondary">Stop Promoting</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="marketplace" className="dashboard-section">
          <h2>Marketplace</h2>
           <div className="course-list">
            {marketplaceCourses.map(course => (
              <div key={course.id} className="course-card marketplace-card">
                 <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>by {course.creator}</p>
                   <div className="course-stats">
                    <span>{course.commission} Commission</span>
                    <span>Price: {course.price}</span>
                  </div>
                </div>
                <div className="course-actions">
                  <button>Promote Course</button>
                  <button className="secondary">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <div className="grid-2-col">
            <section id="affiliate-links" className="dashboard-section">
              <h2>Your Affiliate Link</h2>
              <div className="affiliate-link-box">
                <input type="text" value={affiliate.affiliateLink} readOnly />
                <button>Copy Link</button>
                <button className="secondary">Share</button>
              </div>
            </section>

            <section id="leaderboard" className="dashboard-section">
              <h2>Top Affiliates</h2>
              <ul className="leaderboard-list">
                {leaderboard.map(aff => <li key={aff.name}><span>{aff.name}</span><span>{aff.sales} sales</span><span>{aff.earnings}</span></li>)}
              </ul>
            </section>
        </div>

        <section id="payouts" className="dashboard-section">
          <h2>Payouts</h2>
          <div className="payout-summary">
            <div className="stat-card"><h3>Available Balance</h3><p>{payouts.availableBalance}</p></div>
            <div className="stat-card"><h3>Pending Balance</h3><p>{payouts.pendingBalance}</p></div>
          </div>
          <h3>Payout History</h3>
          <ul className="payout-history-list">
            {payouts.history.map((p, index) => <li key={index}><span>{p.date}</span><span>{p.amount}</span><span className={`status-${p.status.toLowerCase()}`}>{p.status}</span></li>)}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AffiliateDashboard;
