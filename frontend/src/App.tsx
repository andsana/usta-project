import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import Loader from './components/Loader/Loader.tsx';
import './App.css';

const App = () => {

  return (
    <>
      <Loader />
      <Header />
      <main>
        <Routes>
          <Route path="/en" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;