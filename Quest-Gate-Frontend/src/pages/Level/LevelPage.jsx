import styles from './LevelPage.module.css'
import { Link } from 'react-router-dom';

function LevelPage(){

    return(
        <div className={styles.container}>
             <Link to="/town">
                <img src="/assets/Shop/backbutton.png" alt="Back to Town" className={styles.backbutton} />
            </Link>
            <Link to="/battle">
                <div className={`${styles.levelselect} ${styles.level1}`}>
                    <h3>1</h3>
                </div>
             </Link>
           
            <div className={`${styles.levelselect} ${styles.level2}`}>
                <h3>2</h3>
            </div>
            <div className={`${styles.levelselect} ${styles.level3}`}>
                <h3>3</h3>
            </div>
            <div className={`${styles.levelselect} ${styles.level4}`}>
                <h3>4</h3>
            </div>
            <div className={`${styles.levelselect} ${styles.level5}`}>
                <h3>5</h3>
            </div>
            <div className={styles.line}>

            </div>
        </div>
    );
}

export default LevelPage;