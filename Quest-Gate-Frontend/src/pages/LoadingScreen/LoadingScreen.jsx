import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LoadingScreen.module.css';
import running from '../../assets/Knightgif/__Run.gif';

function LoadingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetRoute = location.state?.targetRoute || '/'; // Default route to go to if none is passed

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(targetRoute); // Navigate to the target route after the delay
    }, 2000); // Delay of 2 seconds for loading

    return () => clearTimeout(timer); // Clean up timer when component is unmounted
  }, [navigate, targetRoute]);

  return (
    <div className={styles.loadingContainer}>
      <img src={running} alt="running" className={styles.running} />
      <p className={styles.loadingTxt}>Loading...</p>
    </div>
  );
}

export default LoadingScreen;
