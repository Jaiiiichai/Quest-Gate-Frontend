import { useState, useRef } from 'react';
import styles from '../Battle/BattlePage.module.css';
import avatar from '../../assets/Town/Profile view main Character.png';
//import kapre from '../../assets/Battle/KAPRE MODEL.png';
import skeleton from '../../assets/Enemies/skeleton.gif'
// import tiyanak from '../../assets/Battle/TIYANAK MODEL.png'
// import tikbalang from '../../assets/Battle/TIKBALANG MODEL.png'
import knight from '../../assets/Battle/knight_idle.gif'

function BattlePage() {
    const [logs, setLogs] = useState([]);
    const logsRef = useRef(null);
    const [health, setHealth] = useState(100); // Initial health is 100
    const [enemyHealth, setEnemyHealth] = useState(100); // Enemy health
    const maxHealth = 100; // Define the maximum health for both player and enemy

    // Function to add a log entry
    const addLog = (message) => {
        setLogs(prevLogs => {
            const newLogs = [...prevLogs, message];
            // Scroll to the bottom of the logs div
            if (logsRef.current) {
                logsRef.current.scrollTop = logsRef.current.scrollHeight;
            }
            return newLogs;
        });
    };

    // Function to update health, ensuring it doesn't exceed maxHealth
    const updateHealth = (amount, isPlayer = true) => {
        if (isPlayer) {
            setHealth(prevHealth => {
                const newHealth = prevHealth + amount;
                return Math.min(Math.max(newHealth, 0), maxHealth); // Ensure health stays within bounds (0 to 100)
            });
        } else {
            setEnemyHealth(prevHealth => {
                const newHealth = prevHealth + amount;
                return Math.min(Math.max(newHealth, 0), maxHealth); // Ensure enemy health stays within bounds (0 to 100)
            });
        }
    };

    return (
        <div className={styles.screencontainer}>
            <div className={styles.battlecontainer}>
                <div className={styles.charscreen}>
                    {/* Enemy Health Bar at the top center */}
                    <div className={styles.enemyHealthBarContainer}>
                        <div
                            className={styles.enemyHealthBar}
                            style={{ width: `${(enemyHealth / maxHealth) * 100}%` }} // Adjust width based on enemy health
                        ></div>
                        <span className={styles.enemyHealthText}>{enemyHealth}/{maxHealth}</span>
                    </div>

                    <img src={skeleton} alt="enemy" className={styles.enemychar} />
                    <img src={knight} alt="player" className={styles.playchar} />
                </div>

                <div className={styles.battleoptions}>
                    <div className={styles.playermoves}>
                        <div className={styles.playerstats}>
                            <div className={styles.avatarpic}>
                                <div className={styles.imgcon}>
                                    <img src={avatar} alt="player" className={styles.avatarimg} />
                                    <p>Tidert</p>
                                </div>
                            </div>  
                            <div className={styles.avatarstats}>
                                <p className={styles.stattexts}>Your Stats:</p>
                                <div className={styles.healthBarContainer}>
                                    <div 
                                        className={styles.healthBar} 
                                        style={{ width: `${(health / maxHealth) * 100}%` }} // Adjust width based on health
                                    >
                                    </div>
                                    <span className={styles.healthText}>{health}/{maxHealth}</span>
                                </div>
                                <p className={styles.stattexts}>Attack: 30</p>
                                <p className={styles.stattexts}>Defense: 40</p>
                                <div className={styles.status}>
                                    You are poisoned!
                                </div>
                            </div>
                        </div>
                        <div className={styles.playeroptions}>
                            <button 
                                className={styles.playerButtons}
                                onClick={() => {
                                    addLog("Player used Attack!");
                                    updateHealth(-10); // Decrease player health by 10 for Attack
                                    updateHealth(-10, false); // Decrease enemy health by 10 for Attack
                                }}
                            >
                                Attack
                            </button>
                            <button 
                                className={styles.playerButtons}
                                onClick={() => {
                                    addLog("Player used Defend!");
                                    updateHealth(-5); // Decrease health by 5 for Defend
                                    updateHealth(-5, false); // Decrease enemy health by 5 for Defend
                                }}
                            >
                                Defend
                            </button>
                            <button 
                                className={styles.playerButtons}
                                onClick={() => {
                                    addLog("Player used Item!");
                                    updateHealth(20); // Increase health by 20 for Item
                                }}
                            >
                                Item
                            </button>
                            <button 
                                className={styles.playerButtons}
                                onClick={() => addLog("Player tried to Flee!")}
                            >
                                Flee
                            </button>
                        </div>
                    </div>

                    <div className={styles.logs} ref={logsRef}>
                        {/* Display logs */}
                        {logs.map((log, index) => (
                            <p key={index}>{log}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BattlePage;
