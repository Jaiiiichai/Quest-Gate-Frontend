// App.jsx
import { Routes, Route } from 'react-router-dom';
import ShopPage from './pages/Shop/ShopPage';
import AcademiaPage from './pages/Academia/AcademiaPage';

import LoadingScreen from './pages/LoadingScreen/LoadingScreen';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/SignUp/SignupPage';
import TownPage from './pages/Town/TownPage';
import BattlePage from './pages/Battle/BattlePage';
import QuestPage from './pages/Quest/QuestPage';
//import BattlePage from './pages/Battle/BattlePage';
//import BattlePage from './pages/Battle/BattlePage';



function App() {
  return (
    <div>
    
      <Routes>
        <Route path="/" element={<QuestPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/town" element={<TownPage />} />
        <Route path="/academia" element={<AcademiaPage />} />
        <Route path='/battle' element={<BattlePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
