import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import '../../pages/LandingPage/LandingPage.css';
import bgHero from '../../assets/LandingPage/bg_11.png';
import bgFeatures from '../../assets/LandingPage/bg_6.png';


// Individual Section Components
const HeroSection = () => (
  <div className="section hero-section">
    <h1>Learn Bisaya Through Fun and Play!</h1>
    <p>A gamified language learning experience focused on teaching you Bisaya words and phrases.</p>
    <button>Start Learning Now</button>
  </div>
);

const FeaturesSection = () => (
  <div className="section features-section">
    <h2>Features</h2>
    <div className="features-cards">
      <div className="feature-card">
        <h3>Game Mechanics</h3>
        <p>Quizzes, challenges, and leveling up for engaging learning.</p>
      </div>
      <div className="feature-card">
        <h3>Real-World Vocabulary</h3>
        <p>Learn practical Bisaya words and phrases.</p>
      </div>
      <div className="feature-card">
        <h3>Progress Tracking</h3>
        <p>Track your progress with levels and badges.</p>
      </div>
    </div>
  </div>
);


const WhyLearnBisaya = () => (
  <div className="section why-learn-section">
    <h2>Why Learn Bisaya?</h2>
    <p>Experience the culture and connect with locals in a more meaningful way.</p>
  </div>
);
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




// Main Landing Page Component
const LandingPage = () => {
  const sections = [
    { component: <HeroSection />, bgImage: bgHero },
    { component: <FeaturesSection />, bgImage: bgFeatures },
    { component: <WhyLearnBisaya />, bgImage: bgHero }, 
  ];

  return (
    <div className="landing-page">
      {sections.map((section, index) => (
        <ParallaxSection key={index} bgImage={section.bgImage}>
          {section.component}
        </ParallaxSection>
      ))}
      <Footer />
    </div>
  );
};

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

export default LandingPage;
