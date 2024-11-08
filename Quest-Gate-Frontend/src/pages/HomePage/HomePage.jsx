import styles from './HomePage.module.css'
import knight from '../../assets/StartScreen/Knight.png'
import title from '../../assets//StartScreen/GameTitle.png'
import newgame from '../../assets/StartScreen/newgametext.png'
import load from '../../assets/StartScreen/loadtext.png'

function HomePage(){
    return(
        <div className={styles.container}>
            <div className={styles.knight}>
            <img src={knight} alt="running" className={styles.running} />
            </div>
            <div className={styles.texts}>
            <img src={title} alt="running" className={styles.title} />
            <img src={newgame} alt="running" className={styles.options} />
            <img src={load} alt="running" className={styles.options} />
            </div>
          
        </div>
    );
}
export default HomePage;