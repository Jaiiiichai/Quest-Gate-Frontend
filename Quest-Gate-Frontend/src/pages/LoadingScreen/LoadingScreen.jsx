import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LoadingScreen.module.css';
import running from '../../assets/Knightgif/__Run.gif';
import background from '../../assets/Level/loadingbg.jpg'

function LoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { targetRoute, ...data } = location.state || {}; // Extract additional data from state

  useEffect(() => {
    const timer = setTimeout(() => {
      if (targetRoute) {
        navigate(targetRoute, { state: data }); // Pass additional data to the next route
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate, targetRoute, data]);

  return (
    <div className={styles.loadingContainer}>
      <img src={running} alt="running" className={styles.running} />
      <img src={background} alt="running" className={styles.loadingBackground} />
      <p className={styles.loadingTxt} style={{ fontSize: '50px' }}>Loading...</p>
    </div>
  );
}

export default LoadingScreen;
