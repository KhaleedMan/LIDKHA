import React from 'react';
import './CommunityPage.css';

const CommunityPage = () => {
  // Sample data
  const community = {
    name: 'SKILWHOP Community',
    description: 'Welcome to the official SKILWHOP community! Connect with other creators and students.',
    totalMembers: 1234,
    onlineMembers: 157,
  };

  const posts = [
    { id: 1, author: 'SIRKHALIDMAN', authorBadge: 'Creator', content: 'Hey everyone! Just dropped a new video on advanced Facebook marketing techniques. Check it out!', likes: 56, comments: 12, saved: false, type: 'text' },
    { id: 2, author: 'Jane Doe', authorBadge: 'Student', content: 'Just made my first $100 using the strategies from the course! So excited!', likes: 120, comments: 25, saved: true, type: 'text' },
    { id: 3, author: 'SKILWHOP', authorBadge: 'Admin', content: 'New course "WhatsApp for Business" is now LIVE! Enroll now and get a 20% discount.', announcement: true, pinned: true, likes: 250, comments: 45, saved: false, type: 'announcement' },
  ];

  const discussions = [
    { id: 1, title: 'Best way to get your first 100 followers?', author: 'John Doe', replies: 15, views: 250 },
    { id: 2, title: 'Feedback on my new landing page', author: 'Jane Smith', replies: 8, views: 150 },
  ];

  const questions = [
    { id: 1, question: 'In the Facebook Ads module, what do you mean by "lookalike audiences"?', response: "Lookalike audiences are a way to reach new people who are likely to be interested in your business because they're similar to your best existing customers.", author: 'SIRKHALIDMAN', date: '2 days ago' },
  ];

  const members = [
    { id: 1, name: 'SIRKHALIDMAN', badge: 'Creator' },
    { id: 2, name: 'Jane Doe', badge: 'Student' },
    { id: 3, name: 'John Doe', badge: 'Student' },
  ];

  return (
    <div className="community-page">
      {/* Community Home */}
      <div className="community-home">
        <h1>{community.name}</h1>
        <p>{community.description}</p>
        <div className="community-stats">
          <span>{community.totalMembers} Total Members</span>
          <span>{community.onlineMembers} Online</span>
        </div>
      </div>

      <div className="community-main">
        <div className="community-feed">
          {/* Announcements */}
          <div className="announcements">
            <h2>Announcements</h2>
            {posts.filter(post => post.announcement).map(post => (
              <div key={post.id} className="feed-post pinned">
                <div className="post-header">
                  <span className="post-author">{post.author}</span>
                  <span className="post-badge">{post.authorBadge}</span>
                </div>
                <div className="post-content">{post.content}</div>
                <div className="post-actions">
                  <button>Like</button>
                  <button>Comment</button>
                  <button>Save</button>
                </div>
              </div>
            ))}
          </div>

          {/* Community Feed */}
          <h2>Community Feed</h2>
          {posts.filter(post => !post.announcement).map(post => (
            <div key={post.id} className="feed-post">
              <div className="post-header">
                <span className="post-author">{post.author}</span>
                <span className="post-badge">{post.authorBadge}</span>
              </div>
              <div className="post-content">{post.content}</div>
              <div className="post-actions">
                <button>Like ({post.likes})</button>
                <button>Comment ({post.comments})</button>
                <button>{post.saved ? 'Saved' : 'Save'}</button>
              </div>
            </div>
          ))}
        </div>

        <div className="community-sidebar">
          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button>Create Post</button>
            <button>Create Announcement</button>
            <button>Create Discussion</button>
            <button>Ask Question</button>
            <button>View Members</button>
          </div>

          {/* Discussions */}
          <div className="discussions">
            <h3>Discussions</h3>
            <ul>
              {discussions.map(discussion => (
                <li key={discussion.id}>
                  <p>{discussion.title}</p>
                  <span>by {discussion.author} | {discussion.replies} replies | {discussion.views} views</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Q&A */}
          <div className="course-qa">
            <h3>Course Q&A</h3>
            <ul>
              {questions.map(q => (
                <li key={q.id}>
                  <p><strong>Q:</strong> {q.question}</p>
                  <p><strong>A:</strong> {q.response} - <em>{q.author} ({q.date})</em></p>
                </li>
              ))}
            </ul>
          </div>

          {/* Members */}
          <div className="members">
            <h3>Members</h3>
            <ul>
              {members.map(member => (
                <li key={member.id}>
                  {member.name} <span className="member-badge">{member.badge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
