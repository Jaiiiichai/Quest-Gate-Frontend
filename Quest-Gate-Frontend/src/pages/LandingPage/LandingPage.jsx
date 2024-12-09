import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import '../../pages/LandingPage/LandingPage.css';
import bgHero from '../../assets/LandingPage/bg_11.png';
import bgFeatures from '../../assets/Maps/vocablis map.png';
import logo from '../../assets/StartScreen/logo-removebg-preview.png';
import academia from '../../assets/Academia/Academia Bg.png';
import gameplay from '../../assets/Maps/kanaji map.png';
import lastbg from '../../assets/Level/LEVEL BACKGROUND.JPG';
import features from '../../assets/StartScreen/features.png';
import boss1 from '../../assets/Enemies/BOSS 2.gif';
import boss2 from '../../assets/Enemies/mino.gif';
import boss3 from '../../assets/Enemies/assasin.gif';
import boss4 from '../../assets/Enemies/sasuke.gif';
import boss from '../../assets/StartScreen/boss.png';
import join from '../../assets/StartScreen/Join.png';
import gameplayVid from '../../assets/StartScreen/gameplay.mp4';

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation
  
  return (
    <nav className="navbar">
      <ul>
        <img src={logo} alt="logo" className="logo" />
        <li><a href="#hero">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#gameplay">Gameplay</a></li>
        <li><a href="#join">Join Now</a></li>
      </ul>
      <button className="playButton" onClick={() => navigate('/signup')}>Play Now</button> {/* Button for signup */}
    </nav>
  );
};

// Individual Section Components
const HeroSection = () => {
  const navigate = useNavigate(); // Hook for navigation
  
  return (
    <div id="hero" className="section hero-section">
      <img src={logo} alt="logo" className="hero-logo" />
      <p>EMBARK ON A PIXELATED ADVENTURE TO MASTER LANGUAGES THROUGH EPIC BATTLES</p>
      <button onClick={() => navigate('/signup')}>Get Started</button> {/* Button for signup */}
    </div>
  );
};

const FeaturesSection = () => (
  <div id="features" className="section features-section">
    <img src={features} alt="logo" className="feature-logo" />
    <div className="features-cards">
      <div className="feature-card">
        <h3>Interactive Language Learning</h3>
        <p>Dive into a story-based adventure that takes you through immersive lessons and fun quests, all while leveling up your Japanese skills.</p>
      </div>
      <div className="feature-card">
        <h3>Gamified Lessons & Quizzes</h3>
        <p>Challenge yourself with quizzes, earn rewards like coins, items, and experience points, and unlock new levels as you learn.</p>
      </div>
      <div className="feature-card">
        <h3>Engage with the Story Mode</h3>
        <p>Explore regions like Vocabulary, Grammar, and Conversation. Defeat bosses and unlock new content as you progress.</p>
      </div>
      <div className="feature-card">
        <h3>Battles with Real-Time Questions</h3>
        <p>Fight enemies and bosses using your language knowledge—correct answers lead to successful attacks in battle!</p>
      </div>
    </div>
  </div>
);

const WhyLearnBisaya = () => (
  <div id="why-learn" className="section why-learn-section">
    <img src={boss} alt="logo" className="boss-logo" />
    <div className="boss-card-container">
      <div className='boss-card'>
        <img src={boss1} alt="logo" className="boss-img" />
      </div>
      <div className='boss-card'>
        <img src={boss2} alt="logo" className="boss-img" />
      </div>
      <div className='boss-card'>
        <img src={boss3} alt="logo" className="boss-img" />
      </div>
      <div className='boss-card'>
        <img src={boss4} alt="logo" className="boss-img" />
      </div>
    </div>
    <div className='boss-text'>Defeat epic bosses to unlock new realms and powers!</div>
  </div>
);

const Gameplay = () => {
  return (
    <div id="gameplay" className='gameplay-section'>
      <div className='gameplay-text'>
        WITNESS THE BATTLE FOR LANGUAGE MASTERY
      </div>
      <div className='vid-container'>
        <video width="600" controls autoPlay loop muted>
          <source src={gameplayVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const Last = () => {
  const navigate = useNavigate(); // Hook for navigation
  
  return (
    <div id="join" className='last-section'>
      <img src={join} alt="logo" className="boss-img" />
      <p>Dive into the world of Quest Gate and transform your language skills through epic battles and quests! Are you ready to conquer?</p>
      <button onClick={() => navigate('/signup')}>Start Now</button> {/* Button for signup */}
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>About Us</h4>
        <p>Your trusted platform to learn Bisaya through interactive games.</p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#why-learn">Why Learn Bisaya</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 Language Learning Platform. All rights reserved.</p>
    </div>
  </footer>
);

// Parallax Section Component
// eslint-disable-next-line react/prop-types
const ParallaxSection = ({ children, bgImage }) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const springProps = useSpring({
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    opacity: inView ? 1 : 0,
    config: { tension: 120, friction: 14 },
  });

  return (
    <div
      className="parallax-section"
      style={{ backgroundImage: `url(${bgImage})` }}
      ref={ref}
    >
      <animated.div style={springProps}>{children}</animated.div>
    </div>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const sections = [
    { component: <HeroSection />, bgImage: bgHero },
    { component: <FeaturesSection />, bgImage: bgFeatures },
    { component: <WhyLearnBisaya />, bgImage: academia },
    { component: <Gameplay />, bgImage: gameplay },
    { component: <Last />, bgImage: lastbg }
  ];

  return (
    <div className="landing-page">
      <Navbar />
      {sections.map((section, index) => (
        <ParallaxSection key={index} bgImage={section.bgImage}>
          {section.component}
        </ParallaxSection>
      ))}
      <Footer />
    </div>
  );
};

export default LandingPage;
