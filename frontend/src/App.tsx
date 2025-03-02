import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import ProjectsPage from './pages/ProjectsPage.tsx';
import ProjectDetailPage from './pages/ProjectDetailPage/ProjectDetailPage.tsx';
import ServiceDetailPage from './pages/ServiceDetailPage.tsx';
import Footer from './components/Footer/Footer.tsx';
import MessageIcon from './components/MessageIcon/MessageIcon.tsx';
import './App.css';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/en" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/en/projects" element={<ProjectsPage />} />
          <Route path="/projects/:category" element={<ProjectsPage />} />
          <Route path="/en/projects/:category" element={<ProjectsPage />} />
          <Route
            path="/projects/:category/:uid"
            element={<ProjectDetailPage />}
          />
          <Route
            path="/en/projects/:category/:uid"
            element={<ProjectDetailPage />}
          />
          <Route path="/services/:uid" element={<ServiceDetailPage />} />
          <Route path="/en/services/:uid" element={<ServiceDetailPage />} />
        </Routes>
      </main>
      <Footer />
      <MessageIcon />
    </div>
  );
};

export default App;
