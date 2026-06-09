import './SearchPage.css';

const allCourses = [
    { id: 1, title: 'Make Money with Facebook & WhatsApp', author: 'SIRKHALIDMAN', price: '15000', description: 'Learn the secrets to earning from social media.' },
    { id: 2, title: 'The Complete Guide to Crypto & Blockchain', author: 'John Doe', price: '25000', description: 'Master the world of cryptocurrency and blockchain technology.' },
    { id: 3, title: 'Digital Art & Illustration for Beginners', author: 'Jane Smith', price: '10000', description: 'Unleash your creativity with digital drawing and painting.' },
    { id: 4, title: 'Public Speaking Masterclass', author: 'Emily White', price: '12500', description: 'Conquer your fear and deliver powerful presentations.' },
];

export default function SearchPage({ searchQuery }) {

  const filteredCourses = allCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-page">
        <div className="search-header">
            <h1>Search Results for "{searchQuery}"</h1>
            <p>{filteredCourses.length} courses found.</p>
        </div>
        <div className="search-results-grid">
            {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                    <div key={course.id} className="course-card-search">
                        <img src={"/images/course-thumbnail.jpg"} alt={course.title} />
                        <div className="course-details">
                            <h3>{course.title}</h3>
                            <p>By {course.author}</p>
                            <span>NGN {course.price}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p>No courses match your search. Try a different term.</p>
            )}
        </div>
    </div>
  );
}
