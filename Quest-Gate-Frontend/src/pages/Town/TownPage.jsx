import styles from './TownPage.module.css'
import avatar from '../../assets/Town/Profile view main Character.png'
import attack from '../../assets/Town/Attack bar.png'
import defense from '../../assets/Town/Defense Bar.png'
import health from '../../assets/Town/Health bar.png'
import character from '../../assets/Town/Anime Character.png'
import academia from '../../assets/Town/academia-removebg-preview.png'
import story from '../../assets/Town/Story_Button-removebg-preview.png'
import quests from '../../assets/Town/Quests_Button-removebg-preview.png'
import shop from '../../assets/Town/Shop_Button-removebg-preview.png'
import coin from '../../assets/Town/coins.png'
import {Link} from 'react-router-dom'

function TownPage(){
    return(
        <div className={styles.container}>
            <div className= {styles.profile}>
                <div className={styles.avatarcon}>
                    <p>Tidert</p>
                    <img src={avatar} alt="running" className={styles.avatar} />
                </div>
                <div className={styles.texts}>
                    <p>Attack: 39</p>
                    <img src={attack} alt="attack" className={styles.stats} />
                    <p>Defense: 60</p>
                    <img src={defense} alt="defense" className={styles.stats} />
                    <p>Health: 78</p>
                    <img src={health} alt="health" className={styles.stats} />
                    <p>Level: 10</p>
                </div>
            </div>
            <img src={character} alt="health" className={styles.anime} />
            <Link to="/academia"><img src={academia} alt="health" className={styles.academia} /></Link>
            <img src={story} alt="health" className={styles.story} />
             <Link to="/"> <img src={quests} alt="health" className={styles.quests} /></Link>
            <Link to="/shop"><img src={shop} alt="health" className={styles.shop}/></Link>
            <div className={styles.coinslot}>
                 <img src={coin} alt="health" className={styles.coin} />
                 <p>1000</p>
            </div>

        </div>
    );
};

export default TownPage;