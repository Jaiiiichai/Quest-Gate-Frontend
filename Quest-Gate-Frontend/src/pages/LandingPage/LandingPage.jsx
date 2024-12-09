import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { FaGamepad, FaLanguage, FaChartLine, FaTrophy, FaUsers, FaClock, FaFacebook, FaInstagram } from 'react-icons/fa';
import '../../pages/LandingPage/LandingPage.css';
import bgHero from '../../assets/LandingPage/bg_11.png';
import bgFeatures from '../../assets/LandingPage/bg_11.png';
import bgGameplay from '../../assets/LandingPage/bg_11.png';

// Navigation Bar Component
const Navbar = () => (
  <nav className="navbar">
    <div className="nav-logo">Quest Gate</div>
    <ul className="nav-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#gameplay">Gameplay</a></li>
      <li><a href="#why-learn">Why Learn</a></li>
      <li><a href="#signup">Sign Up</a></li>
      <li><a href="#login">Login</a></li>
    </ul>
  </nav>
);

// Hero Section with Call-to-Action
const HeroSection = () => (
  <div id="hero" className="section hero-section">
    <h1>Learn Japanese Through Fun and Play!</h1>
    <p>
      Embark on a quest to master Japanese through a gamified experience filled with challenges, rewards, 
      and real-world vocabulary. Ready to level up your skills?
    </p>
    <button className="cta-button" onClick={() => window.location.href = "#signup"}>
      Start Your Journey
    </button>
  </div>
);

// Features Section with Icons
const FeaturesSection = () => (
  <div id="features" className="section features-section">
    <h2>Game Features</h2>
    <div className="features-cards">
      <div className="feature-card">
        <FaGamepad size={50} color="#ff6b35" />
        <h3>Interactive Quests</h3>
        <p>Complete quests and challenges designed to teach you useful Japanese phrases.</p>
      </div>
      <div className="feature-card">
        <FaLanguage size={50} color="#ff6b35" />
        <h3>Real-World Vocabulary</h3>
        <p>Learn words you'll actually use in conversations and travel scenarios.</p>
      </div>
      <div className="feature-card">
        <FaChartLine size={50} color="#ff6b35" />
        <h3>Progress Tracking</h3>
        <p>Track your journey with achievements, levels, and personalized stats.</p>
      </div>
      <div className="feature-card">
        <FaTrophy size={50} color="#ff6b35" />
        <h3>Earn Rewards</h3>
        <p>Unlock badges, trophies, and exclusive content as you progress.</p>
      </div>
    </div>
  </div>
);

// New Gameplay Section
const GameplaySection = () => (
  <div id="gameplay" className="section gameplay-section">
    <h2>How the Game Works</h2>
    <p>
      Explore different levels, complete challenges, and practice vocabulary through fun mini-games. 
      Play solo or compete with friends in real-time battles!
    </p>
    <div className="gameplay-details">
      <div className="gameplay-item">
        <FaUsers size={50} color="#ff6b35" />
        <h3>Multiplayer Mode</h3>
        <p>Challenge friends and learn collaboratively in real-time quests.</p>
      </div>
      <div className="gameplay-item">
        <FaClock size={50} color="#ff6b35" />
        <h3>Daily Challenges</h3>
        <p>Complete daily tasks to earn bonus points and stay motivated.</p>
      </div>
    </div>
  </div>
);

// Why Learn Japanese Section
const WhyLearnJapanese = () => (
  <div id="why-learn" className="section why-learn-section">
    <h2>Why Learn Japanese?</h2>
    <p>Experience the culture, travel with confidence, and connect with locals in a meaningful way.</p>
  </div>
);

// Footer with Social Links
const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>About Us</h4>
        <p>Your trusted platform to learn Japanese through interactive games.</p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#gameplay">Gameplay</a></li>
          <li><a href="#why-learn">Why Learn Japanese</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 Language Learning Platform. All rights reserved.</p>
    </div>
  </footer>
);

// Parallax Section Component
const ParallaxSection = ({ children, bgImage }) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const springProps = useSpring({
    transform: inView ? 'translateY(0%)' : 'translateY(20%)',
    opacity: inView ? 1 : 0,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <div ref={ref} className="parallax-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <animated.div style={springProps} className="content">
        {children}
      </animated.div>
    </div>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const sections = [
    { component: <HeroSection />, bgImage: bgHero },
    { component: <FeaturesSection />, bgImage: bgFeatures },
    { component: <GameplaySection />, bgImage: bgGameplay },
    { component: <WhyLearnJapanese />, bgImage: bgHero }, 
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
