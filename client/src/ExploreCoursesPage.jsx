import './ExploreCoursesPage.css';

const sampleCourses = [
  {
    id: 1,
    title: "Make Money with Facebook & WhatsApp",
    author: "SIRKHALIDMAN",
    price: "15000",
    subtitle: "Learn the secrets to earning from social media."
  },
  {
    id: 2,
    title: "The Complete Guide to Crypto & Blockchain",
    author: "John Doe",
    price: "25000",
    subtitle: "Master the world of cryptocurrency and blockchain technology."
  },
  {
    id: 3,
    title: "Digital Art & Illustration for Beginners",
    author: "Jane Smith",
    price: "10000",
    subtitle: "Unleash your creativity with digital drawing and painting."
  },
    {
    id: 4,
    title: "Public Speaking Masterclass",
    author: "Emily White",
    price: "12500",
    subtitle: "Conquer your fear and deliver powerful presentations."
  },
];

export default function ExploreCoursesPage({ onBack }) {

  return (
    <div className="explore-courses-page">
      <div className="page-header">
        <h1>Explore Courses</h1>
        <p>Find your next learning adventure from our growing library of courses.</p>
      </div>
      <div className="course-grid-large">
        {sampleCourses.map(course => (
          <div key={course.id} className="course-card-large">
             <img src={"/images/course-thumbnail.jpg"} alt={course.title} className="course-card-thumbnail" />
             <div className="course-card-content">
                <h3>{course.title}</h3>
                <p className="course-author">By {course.author}</p>
                <p className="course-description">{course.subtitle}</p>
                <div className="course-card-footer">
                    <span className="course-price">NGN {course.price}</span>
                    <button className="button button-secondary">View Details</button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
