// App.jsx
import { Routes, Route } from 'react-router-dom';
import ShopPage from './pages/Shop/ShopPage';
import AcademiaPage from './pages/Academia/AcademiaPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoadingScreen from './pages/LoadingScreen/LoadingScreen';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/SignUp/SignupPage';
import TownPage from './pages/Town/TownPage';
import BattlePage from './pages/Battle/BattlePage';
import QuestPage from './pages/Quest/QuestPage';
import RegionPage from './pages/Story/RegionPage';
import LevelPage from './pages/Level/LevelPage';
import CreateLessonPage from '../Test/CreateLessonPage';
import LessonContent from './pages/Academia/LessonContent';
import QuizPage from './pages/Academia/QuizPage'




function App() {
  return (
    <div>
    
      <Routes>
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/" element={<QuizPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/town" element={<TownPage />} />
        <Route path="/academia" element={<AcademiaPage />} />
        <Route path='/battle' element={<BattlePage/>}/>
        <Route path="/quests" element={<QuestPage />} />
        <Route path="/regions" element={<RegionPage />} />
        <Route path="/levels" element={<LevelPage />} />
        <Route path="/addlesson" element={<CreateLessonPage />} />
        <Route path="/lessonContent" element={<LessonContent />} />
      </Routes>
    </div>
  );
}

export default App;
