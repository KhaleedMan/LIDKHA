import { useState, useEffect } from 'react';
import './App.css';
import ChatSection from './ChatSection';
import AboutPage from './AboutPage';
import CourseDetailPage from './CourseDetailPage';
import AdminDashboard from './AdminDashboard';
import NewHomepage from './NewHomepage';
import CreatorProfilePage from './CreatorProfilePage';
import CreatorsDirectoryPage from './CreatorsDirectoryPage';
import MessagesPage from './MessagesPage';
import ExploreCoursesPage from './ExploreCoursesPage';
import CreatorDashboard from './CreatorDashboard';
import CreateCoursePage from './CreateCoursePage';
import ManageCoursesPage from './ManageCoursesPage';
import CourseBuilderPage from './CourseCurriculumPage.jsx';
import CoursePreviewPage from './CoursePreviewPage';
import VideoUploadPage from './VideoUploadPage';
import StudentDashboard from './StudentDashboard';
import CommunityPage from './CommunityPage';
import AffiliateDashboard from './AffiliateDashboard';
import SearchPage from './SearchPage';
import LandingPage from './LandingPage';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseDataForPreview, setCourseDataForPreview] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Make Money with Facebook & WhatsApp',
      author: 'SIRKHALIDMAN',
      lessons: [
        { id: 1, title: 'Getting Started with Zero Followers', videoUrl: null, duration: '12 min' },
        { id: 2, title: 'Setting Up Your Facebook Profile', videoUrl: null, duration: '15 min' },
        { id: 3, title: 'Facebook Marketplace Basics', videoUrl: null, duration: '18 min' },
        { id: 4, title: 'WhatsApp Business Setup', videoUrl: null, duration: '14 min' },
        { id: 5, title: 'First Sales Strategy', videoUrl: null, duration: '20 min' },
        { id: 6, title: 'Scaling Your Income', videoUrl: null, duration: '16 min' },
      ],
    },
  ]);
  const [creatorProfile, setCreatorProfile] = useState(null);

  const adminEmails = ['creator@skilwhop.com.ng', 'admin@skilwhop.com.ng', 'khalidhussainadam1@gmail.com'];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    const ref = urlParams.get('ref');
    if (ref) {
      localStorage.setItem('referrer', ref);
    }

    if (path === '/creator-dashboard') setCurrentView('creatorDashboard');
    else if (path === '/student-dashboard') setCurrentView('studentDashboard');
    else if (path === '/community') setCurrentView('community');
    else if (path === '/affiliate-dashboard') setCurrentView('affiliate-dashboard');
    else if (path === '/search') {
      const query = urlParams.get('q') || '';
      setSearchQuery(query);
      setCurrentView('search');
    } else {
      setCurrentView('landing');
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentView('search');
    window.history.pushState(null, '', `/search?q=${encodeURIComponent(query)}`);
    window.scrollTo(0, 0);
  };

  const handleHomepageAccess = () => {
    const dummyUser = {
      name: 'Guest',
      isAdmin: false,
    };
    setUser(dummyUser);
    setCurrentView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleStudentDashboardClick = () => {
    setCurrentView('studentDashboard');
    window.history.pushState(null, '', '/student-dashboard');
    window.scrollTo(0, 0);
  };

  const handleCommunityClick = () => {
    setCurrentView('community');
    window.history.pushState(null, '', '/community');
    window.scrollTo(0, 0);
  };

  const handleAffiliateDashboardClick = () => {
    setCurrentView('affiliate-dashboard');
    window.history.pushState(null, '', '/affiliate-dashboard');
    window.scrollTo(0, 0);
  };

  const handleEnrollClickFromLanding = (courseId) => {
    const dummyUser = {
      name: 'Guest',
      isAdmin: false,
    };
    setUser(dummyUser);
    setSelectedCourseId(courseId);
    setCurrentView('courseDetail');
    window.scrollTo(0, 0);
  };

  const handleAdminAccess = () => {
    if (user?.isAdmin) {
      setCurrentView('admin');
      window.scrollTo(0, 0);
    }
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    if (loggedInUser.isAdmin) {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentView('courseDetail');
    window.scrollTo(0, 0);
  };

  const handleCreatorProfileClick = () => {
    if (!creatorProfile) {
      setCurrentView('creatorProfile');
    } else {
      setCurrentView('creatorDashboard');
    }
    window.scrollTo(0, 0);
  };

  const handleCreatorsDirectoryClick = () => {
    setCurrentView('creatorsDirectory');
    window.scrollTo(0, 0);
  };

  const handleMessagesClick = () => {
    setCurrentView('messages');
    window.scrollTo(0, 0);
  };

  const handleExploreCoursesClick = () => {
    setCurrentView('exploreCourses');
    window.scrollTo(0, 0);
  };

  const handleCreatorDashboardClick = () => {
    setCurrentView('creatorDashboard');
    window.history.pushState(null, '', '/creator-dashboard');
    window.scrollTo(0, 0);
  };

  const handleCreateCourseClick = () => {
    setCurrentView('createCourse');
    window.scrollTo(0, 0);
  };

  const handleManageCoursesClick = () => {
    setCurrentView('manageCourses');
    window.scrollTo(0, 0);
  };

  const handleCourseCurriculumClick = () => {
    setCurrentView('courseCurriculum');
    window.scrollTo(0, 0);
  };

  const handleCoursePreviewClick = (courseData) => {
    setCourseDataForPreview(courseData);
    setCurrentView('coursePreview');
    window.scrollTo(0, 0);
  };

  const handleCourseCreated = () => {
    setCurrentView('courseCurriculum');
    window.scrollTo(0, 0);
  };

  const handlePublish = () => {
    alert('Course published successfully!');
    setCurrentView('creatorDashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleBackToCreatorDashboard = () => {
    setCurrentView('creatorDashboard');
    window.scrollTo(0, 0);
  };

  const handleBackToCreateCourse = () => {
    setCurrentView('createCourse');
    window.scrollTo(0, 0);
  };

  const handleBackToCurriculum = () => {
    setCurrentView('courseCurriculum');
    window.scrollTo(0, 0);
  };

  const handleAboutPage = () => {
    setCurrentView('about');
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    window.history.pushState(null, '', '/');
    window.scrollTo(0, 0);
  };
  
  const handleProfileComplete = (profile) => {
    setCreatorProfile(profile);
    setCurrentView('creatorDashboard');
  };


  // ========= ROUTING & VIEW RENDERING =============

  if (currentView === 'landing') {
    return <LandingPage handleHomepageAccess={handleHomepageAccess} handleAboutPage={handleAboutPage} handleEnrollClickFromLanding={handleEnrollClickFromLanding} handleBackToLanding={handleBackToLanding} />;
  }

  if (currentView === 'search') {
    return <SearchPage searchQuery={searchQuery} />;
  }

  if (currentView === 'about') {
    return <AboutPage onBack={handleBackToLanding} />;
  }

  if (currentView === 'community') {
    return <CommunityPage />;
  }

  if (currentView === 'affiliate-dashboard') {
    return <AffiliateDashboard />;
  }

  if (currentView === 'dashboard' && user) {
    return (
      <NewHomepage
        user={user}
        onLogout={handleLogout}
        registeredUsers={registeredUsers}
        setCurrentView={setCurrentView}
        setSelectedCourseId={setSelectedCourseId}
        courses={courses}
        setCourses={setCourses}
        onViewCreatorProfile={handleCreatorProfileClick}
        onNavigateToCreators={handleCreatorsDirectoryClick}
        onNavigateToMessages={handleMessagesClick}
        onNavigateToExploreCourses={handleExploreCoursesClick}
        onNavigateToCreatorDashboard={handleCreatorDashboardClick}
      />
    );
  }

  if (currentView === 'creatorProfile') {
    return <CreatorProfilePage onBack={handleBackToDashboard} isNewCreator={!creatorProfile} onProfileComplete={handleProfileComplete} />;
  }

  if (currentView === 'creatorsDirectory') {
    return <CreatorsDirectoryPage onViewCreatorProfile={handleCreatorProfileClick} />;
  }

  if (currentView === 'messages') {
    return <MessagesPage />;
  }

  if (currentView === 'exploreCourses') {
    return <ExploreCoursesPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'creatorDashboard') {
    return <CreatorDashboard onNavigateToCreateCourse={handleCreateCourseClick} />;
  }

  if (currentView === 'studentDashboard') {
    return <StudentDashboard />;
  }

  if (currentView === 'createCourse') {
    return <CreateCoursePage onBack={handleBackToCreatorDashboard} onCourseCreated={handleCourseCreated} />;
  }

  if (currentView === 'manageCourses') {
    return <ManageCoursesPage onBack={handleBackToCreatorDashboard} onNavigateToCurriculum={handleCourseCurriculumClick} />;
  }

  if (currentView === 'courseCurriculum') {
    return <CourseBuilderPage onBack={handleBackToCreateCourse} onPreview={handleCoursePreviewClick} />;
  }

  if (currentView === 'coursePreview') {
    return <CoursePreviewPage course={courseDataForPreview} onBack={handleBackToCurriculum} onPublish={handlePublish} />;
  }

  if (currentView === 'admin' && user) {
    return (
      <AdminDashboard
        user={user}
        onBack={() => {
          setCurrentView('dashboard');
          window.scrollTo(0, 0);
        }}
        registeredUsers={registeredUsers}
        setRegisteredUsers={setRegisteredUsers}
        courses={courses}
        setCourses={setCourses}
      />
    );
  }

  if (currentView === 'courseDetail' && user) {
    return <CourseDetailPage onBack={handleBackToDashboard} />;
  }

  // Fallback for any other invalid view
  return <LandingPage handleHomepageAccess={handleHomepageAccess} handleAboutPage={handleAboutPage} handleEnrollClickFromLanding={handleEnrollClickFromLanding} handleBackToLanding={handleBackToLanding} />;
}
