import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import Loader from './components/Loader/Loader.tsx';
import ProjectsPage from './pages/ProjectsPage.tsx';
import ProjectDetail from './components/ProjectDetail/ProjectDetail.tsx';
import Footer from './components/footer/Footer.tsx';
import { useLoading } from './app/hooks/useLoading.ts';
import './App.css';

const App = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <h1>Test</h1>
      {isLoading && <Loader />}
      <Header />
      <main>
        <Routes>
          <Route path="/en" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/en/projects" element={<ProjectsPage />} />
          <Route path="en/projects/:category/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;