import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import Loader from './components/Loader/Loader.tsx';
import ProjectsPage from './pages/ProjectsPage.tsx';
import './App.css';
import Footer from './components/footer/Footer.tsx';

const App = () => {

  return (
    <>
      <Loader />
      <Header />
      <main>
        <Routes>
          <Route path="/en" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/en/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;