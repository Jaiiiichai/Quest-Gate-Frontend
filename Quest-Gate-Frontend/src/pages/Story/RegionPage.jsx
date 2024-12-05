import styles from './RegionPage.module.css'
import { Link } from 'react-router-dom';
import kanaji from '../../assets/Maps/kanaji.png'
import vocablis from '../../assets/Battle/bg3.png'
import gramatica from '../../assets/Maps/gramatica.png'

function RegionPage(){

    const maps ={
        kanajimap :kanaji,
        vocablismap : vocablis,
        gramaticamap : gramatica
    }

    return(
        <div className={styles.container}>
    <Link to="/town">
        <img src="/assets/Shop/backbutton.png" alt="Back to Town" className={styles.backbutton} />
    </Link>
            <div className={styles.mapWrapper}>
                <Link to="/levels" state={{map: maps.gramaticamap, regionName: "grammatica" ,category:"Grammar"}}> <h1 className={`${styles.regionText} ${styles.grammartxt}`}>Grammatica Highlands</h1></Link>
                <Link to="/levels" state={{map: maps.kanajimap , regionName: "kanaji",category:"Hiragana"}}> <h1 className={`${styles.regionText} ${styles.kanjitxt}`}>Kanaji Isles</h1></Link>
                <Link to="/levels" state={{map: maps.vocablismap, regionName: "vocablis" ,category:"Vocabulary"}}><h1 className={`${styles.regionText} ${styles.chattxt}`}>Vocablis Valley</h1></Link>
                
                <Link to="/town">
                <h1 className={`${styles.regionText} ${styles.towntxt}`}>Linguara Haven</h1>    
                </Link>
            </div>
        </div>

    );
}

export default RegionPage;