import './App.css';
import Header from './components/Header/Header.tsx';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/en" element={<Header />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<HomePage />} />
      </Routes>
    </>

  );
};

export default App;