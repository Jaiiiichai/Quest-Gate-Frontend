// LoadingScreen.jsx

import styles from './LoadingScreen.module.css';
import running from '../../assets/Knightgif/__Run.gif'

function LoadingScreen() {
  return (
    <div className={styles.loadingContainer}>
         <img src={running} alt="running" className={styles.running} />
         <p className={styles.loadingTxt}>Loading...</p>
    </div>
  );
}

export default LoadingScreen;
