import styles from './AcademiaPage.module.css'
import teacher from '../../assets/Academia/TEACHER.png'
import backButton from '../../assets/Quest/backbutton.png'
import {Link} from 'react-router-dom'

function AcademiaPage(){
    return(
        <div className={styles.container}>
                 <img src={teacher} alt="Health Potion" className={styles.teacher} />
                 <Link to="/town"><img src={backButton} alt="Quest Header" className={styles.backbutton} /></Link>
                 <div className={styles.frame}>
                    <h1>Select Lesson Type</h1>
                    <div className={styles.lessons}>VOCABULARY</div>
                    <div className={styles.lessons}>GRAMMAR</div>
                    <div className={styles.lessons}>CONVERSATION</div>
                    
                 </div>
        </div>
    );

}

export default AcademiaPage;