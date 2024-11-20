import styles from './RegionPage.module.css'
import { Link } from 'react-router-dom';
import town from '../../assets/Story/town map.png'
import region1 from '../../assets/Story/region 1.png'
import region3 from '../../assets/Story/region 3.png'

function RegionPage(){
    return(
        <div className={styles.container}>
             <Link to="/town">
                <img src="/assets/Shop/backbutton.png" alt="Back to Town" className={styles.backbutton} />
            </Link>
            <div className={styles.townMap}>
                 <img src={town} alt="Back to Town"/>
            </div>
            <div className={styles.region1}>
                 <img src={region1} alt="Back to Town"/>
            </div>
            <div className= {styles.region3}>
                 <img src={region3} alt="Back to Town"/>
            </div>
            <div className={styles.selectRegion}>
                Select Region
            </div>
        </div>
    );
}

export default RegionPage;