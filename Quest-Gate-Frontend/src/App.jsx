// App.jsx
import { Routes, Route } from 'react-router-dom';
import ShopPage from './pages/Shop/ShopPage';
import AcademiaPage from './pages/Academia/AcademiaPage';

import LoadingScreen from './pages/LoadingScreen/LoadingScreen';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/SignUp/SignupPage';
import TownPage from './pages/Town/TownPage';


function App() {
  return (
    <div>
    
      <Routes>
        <Route path="/" element={<AcademiaPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/town" element={<TownPage />} />
      </Routes>
    </div>
  );
}

export default App;
