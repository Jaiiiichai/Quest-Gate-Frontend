import styles from './RegionPage.module.css'
import { Link } from 'react-router-dom';
// import town from '../../assets/Story/town map.png'
// import region1 from '../../assets/Story/region 1.png'
// import region3 from '../../assets/Story/region 3.png'
// import vocabulary from '../../assets/Story/vocabulary region.png'
//import map from '../../assets/Story/whole_map-resize.jpg'
{/* <div className={styles.townMap}>
<img src={town} alt="Back to Town"/>
</div>
<div className={styles.region1}>
<img src={region1} alt="Back to Town"/>
</div>
<div className= {styles.region3}>
<img src={region3} alt="Back to Town"/>
</div>
<div className={styles.vocabularycon}>
Vocabulary
</div> */}

//<img src={vocabulary} alt="Back to Town" className= {styles.vocabularyRegion}/>
function RegionPage(){
    return(
        <div className={styles.container}>
    <Link to="/regions">
        <img src="/assets/Shop/backbutton.png" alt="Back to Town" className={styles.backbutton} />
    </Link>
            <div className={styles.mapWrapper}>
                <Link to="/levels"><h1 className={`${styles.regionText} ${styles.vocabularytxt}`}>Frostword Vale</h1></Link>
                <h1 className={`${styles.regionText} ${styles.grammartxt}`}>Grammatica Highlands</h1>
                <h1 className={`${styles.regionText} ${styles.kanjitxt}`}>Kanaji Isles</h1>
                <h1 className={`${styles.regionText} ${styles.chattxt}`}>Chattermoor Valley</h1>
                <h1 className={`${styles.regionText} ${styles.towntxt}`}>Linguara Haven</h1>
            </div>
        </div>

    );
}

export default RegionPage;