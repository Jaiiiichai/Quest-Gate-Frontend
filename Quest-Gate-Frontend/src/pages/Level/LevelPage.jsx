import styles from './LevelPage.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import skeleton from '../../assets/Enemies/mino.gif';
import goblin from '../../assets/Enemies/goblins.gif';
import bat from '../../assets/Enemies/flying bat.gif';
import mushroom from '../../assets/Enemies/mushroom.gif';
import axios from 'axios';

function LevelPage() {
    const location = useLocation(); // Receive data passed from RegionPage
    const { map, regionName,category} = location.state || {}; // Destructure map from state

    const [gruntIds, setGruntIds] = useState({}); // Store grunt IDs using dynamic keys

    const enemy = {
        skeleton: skeleton,
        goblin: goblin,
        bat: bat,
        mushroom: mushroom
    };

    useEffect(() => {
        const fetchGruntIds = async () => {
            try {
                const response1 = await axios.get(`http://localhost:3000/api/levels/${regionName}/1`);
             //   const response2 = await axios.get(`http://localhost:3000/api/levels/${regionName}/2`);
            //    const response3 = await axios.get(`http://localhost:3000/api/levels/${regionName}/3`);
            //    const response4 = await axios.get(`http://localhost:3000/api/levels/${regionName}/4`);
    
                setGruntIds({
                    level1: response1.data.grunt_id,
            //        level2: response2.data.grunt_id,
            //        level3: response3.data.grunt_id,
           //         level4: response4.data.grunt_id,
                });
    
               // console.log("gruntIds:", response1.data.grunt_id, response2.data.grunt_id, response3.data.grunt_id, response4.data.grunt_id);
            } catch (error) {
                console.error('Error fetching grunt IDs:', error);
            }
        };
    
        fetchGruntIds();
    });
    
    return (
        <div className={styles.container}>
            <Link to="/town">
                <img src="/assets/Shop/backbutton.png" alt="Back to Town" className={styles.backbutton} />
            </Link>
            {/* Pass map and grunt_id to BattlePage */}
            <Link to="/battle" state={{ map: map, grunt_id: gruntIds.level1, enemy: enemy.skeleton, category: category }}>
                <div className={`${styles.levelselect} ${styles.level1}`}>
                    <h3>1</h3>
                </div>
            </Link>

            <Link to="/battle" state={{ map: map, grunt_id: gruntIds.level2, enemy: enemy.goblin }}>
                <div className={`${styles.levelselect} ${styles.level2}`}>
                    <h3>2</h3>
                </div>
            </Link>

            <Link to="/battle" state={{ map: map, grunt_id: gruntIds.level3, enemy: enemy.bat }}>
                <div className={`${styles.levelselect} ${styles.level3}`}>
                    <h3>3</h3>
                </div>
            </Link>

            <Link to="/battle" state={{ map: map, grunt_id: gruntIds.level4, enemy: enemy.mushroom }}>
                <div className={`${styles.levelselect} ${styles.level4}`}>
                    <h3>4</h3>
                </div>
            </Link>


            <div className={`${styles.levelselect} ${styles.level5}`}>
                <h3>5</h3>
            </div>
            <div className={styles.line}></div>
        </div>
    );
}

export default LevelPage;
