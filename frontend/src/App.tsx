import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.tsx';
import HomePage from './pages/HomePage.tsx';

const App = () => {
  return (
    <>
      <Routes>
        {/*<Route path="/" element={<Header />} />*/}
        {/*<Route path="/en" element={<Header />} />*/}
        {/*<Route path="/en" element={<HomePage />} />*/}
        <Route path="/" element={<><Header /><HomePage /></>} />
        <Route path="/en" element={<><Header /><HomePage /></>} />
      </Routes>
    </>

  );
};

export default App;